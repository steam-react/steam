/* istanbul ignore file */
import { ActionType, createReducer } from './helpers'
import { getBaseProductsListActions } from './productsList'
import { TRootState } from './index'

const { baseInitialState, baseActions } = getBaseProductsListActions('owned')
export const initialState = baseInitialState
export const actions = baseActions

type TOwnedAction = ActionType<typeof actions>
export default createReducer<typeof initialState, TOwnedAction>(
    initialState,
    actions,
)

export const getOwnedProducts = (state: TRootState) => state.owned
