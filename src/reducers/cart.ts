import { ActionType, createAction, createReducer } from './helpers'
import { getBaseProductsListActions } from './productsList'

const {
    baseInitialState,
    baseActions
} = getBaseProductsListActions('cart')

export const initialState = baseInitialState

export const actions = {
    ...baseActions,
    checkout: createAction('cart/CHECKOUT')(),
}

export type TCartAction = ActionType<typeof actions>

export default createReducer<typeof initialState, TCartAction>(initialState, actions)
