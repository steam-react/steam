/* istanbul ignore file */
import { ActionType, createReducer } from './helpers'
import { getBaseProductsListActions } from './productsList'
import { TRootState } from './index'

const { baseInitialState, baseActions } = getBaseProductsListActions('featured')

export const initialState = baseInitialState
export const actions = baseActions

export type TProductsAction = ActionType<typeof actions>
export default createReducer<typeof initialState, TProductsAction>(initialState, actions)

export const getFeaturedItems = (state: TRootState) => state.featured
