/* istanbul ignore file */
import { ActionType, createReducer } from './helpers'
import { getBaseProductsListActions } from './productsList'
import { TRootState } from './index'

const { baseInitialState, baseActions } = getBaseProductsListActions('ignored')

export const initialState = baseInitialState
export const actions = baseActions

export type TIgnoredAction = ActionType<typeof actions>
export default createReducer<typeof initialState, TIgnoredAction>(
    initialState,
    actions,
)

export const getIgnoredProducts = (state: TRootState) => state.ignored
