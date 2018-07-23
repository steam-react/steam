import { ActionType, createAction, createReducer } from './helpers'
import { TRootState } from '../reducers'

export interface ILanguageInfo {
    id: string
    caption: string
}

export const initialState: ILanguageInfo[] = []

export const actions = {
    set: createAction("languages/SET")<ILanguageInfo[], typeof initialState>(
        (state, payload) => [...payload]
    ),
}

export type TLanguagesAction = ActionType<typeof actions>
export default createReducer<typeof initialState, TLanguagesAction>(initialState, actions)

export const getLanguages = (state: TRootState) => state.languages
