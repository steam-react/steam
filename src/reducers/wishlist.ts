/* istanbul ignore file */
import { ActionType, createReducer } from './helpers'
import { getBaseProductsListActions } from './productsList'
import { TRootState } from './index'

const { baseActions, baseInitialState } = getBaseProductsListActions('wishlist')

export const initialState = baseInitialState
export const actions = baseActions

export type TWishlistAction = ActionType<typeof actions>
export default createReducer<typeof initialState, TWishlistAction>(initialState, actions)

export const getWishlist = (state: TRootState) => state.wishlist
