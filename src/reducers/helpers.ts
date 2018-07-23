import { values } from 'lodash/fp'

/**
 * Here's some Typescript magic, needed to make clean and simple actions
 * creation.
 */

export function action<T extends string>(type: T): IAction<T>
export function action<T extends string, P>(type: T, payload: P): IAction<T, P>
export function action<T extends string, P>(type: T, payload?: P): IAction<T, P> {
    if (typeof payload === 'undefined') {
        return { type }
    }
    return { type, payload }
}

interface IAction<T extends string, P = undefined> {
    readonly type: T
    readonly payload?: P
}

type TActionCreatorFull<T extends string, P, TState> =
    ((p: P) => IAction<T, P>) & IActionCreatorWithHandler<P, TState>

type TActionCreator<T extends string = string, P = undefined, TState = undefined> =
    [P] extends [undefined] ? (() => IAction<T>) & IActionCreatorEmpty :
    [TState] extends [undefined] ? ((p: P) => IAction<T, P>) & IActionCreatorEmpty :
    TActionCreatorFull<T, P, TState>

interface IActionCreatorEmpty {
    getType: () => string
}
interface IActionCreatorWithHandler<P, TState> {
    getType: () => string
    getHandler?: TActionHandler<TState, P>
}

type TActionHandler<TState, P> = (state: TState, payload: P) => TState

export function createAction<T extends string>(actionType: T) {
    function c(): TActionCreator<T>
    function c<P>(): TActionCreator<T, P>
    function c<P, TState>(handler: TActionHandler<TState, P>): TActionCreator<T, P, TState>
    function c<P = undefined, TState = undefined>(handler?: TActionHandler<TState, P>): TActionCreator<T, P, TState> {
        const actionCreator = (payload: P) => action(actionType, payload)

        return (Object as any).assign(
            actionCreator,
            {
                getType: () => actionType,
                ...typeof handler !== 'undefined' && { getHandler: () => handler }
            }
        ) as TActionCreator<typeof actionType, P, TState>
    }
    return c
}

type ActionCreatorMap<T extends { [k: string]: (...args: any[]) => any }> = {
    [K in keyof T]: ReturnType<T[K]>
}

export type ActionType<T extends { [k: string]: (...args: any[]) => any }> =
    ActionCreatorMap<T>[keyof T]

export type StateType<ReducerOrMap> = ReducerOrMap extends (
    ...args: any[]
) => any
    ? ReturnType<ReducerOrMap>
    : ReducerOrMap extends object
    ? { [K in keyof ReducerOrMap]: StateType<ReducerOrMap[K]> }
    : never;

export function createReducer<TState, TActionType extends IAction<any, any>>(
    initialState: TState,
    actions: { [k: string]: TActionCreatorFull<any, any, any> }
) {
    const actionsList = values(actions)
    const reducer: (state: TState, action: TActionType) => TState =
        (/* istanbul ignore next */ state = initialState, currentAction: TActionType) => {
            const matches = actionsList.filter(a => a.getType() === currentAction.type)
            /* istanbul ignore if */
            if (matches.length === 0) {
                return state as never
            }

            const match = matches[0] as NonNullable<any>
            if (!match.getHandler) {
                return state
            }
            const handler = match.getHandler()
            /* istanbul ignore if */
            if (!handler) {
                return state as never
            }
            return handler(state, currentAction.payload)
        }

    return reducer
}
