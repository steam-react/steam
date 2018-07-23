import { createReducer, createAction, ActionType } from './helpers'
import { TProductId } from '../reducers/products'
import { TRootState } from './index'

export const initialState: TProductId[] = []

export const actions = {
    set: createAction('discoveryQueue/SET')<TProductId[], TProductId[]>(
        (state, payload) => [...payload]
    )
}

export type TDiscoveryQueueActions = ActionType<typeof actions>

export default createReducer<typeof initialState, ActionType<typeof actions>>(initialState, actions)

export const getQueue = (state: TRootState) => state.discoveryQueue
