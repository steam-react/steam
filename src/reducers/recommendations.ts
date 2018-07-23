import { ActionType, createAction, createReducer } from './helpers'

export interface ITagItems {
    tag: string
    id: number
    items: string[]
}

export interface ISimilarProduct {
    id: string
    similarTo: string
}

export interface IRecommendationsPage {
    primary: ITagItems
    secondary: ITagItems
    similar: ISimilarProduct[]
}

export interface IRecommendationsState {
    isLoading: boolean
    isFinished: boolean
    pages: IRecommendationsPage[]
}

export const initialState: IRecommendationsState = {
    isLoading: false,
    isFinished: false,
    pages: []
}

export const actions = {
    addPage: createAction('additional/ADD_PAGE')<IRecommendationsPage, typeof initialState>(
        (state, payload) => ({
            ...state,
            pages: [...state.pages, payload],
        })
    ),
    setIsLoading: createAction('recommendations/SET_IS_LOADING')<boolean, typeof initialState>(
        (state, payload) => ({
            ...state,
            isLoading: payload,
        })
    ),
    setIsFinished: createAction('recommendations/SET_IS_FINISHED')<boolean, typeof initialState>(
        (state, payload) => ({
            ...state,
            isFinished: payload,
        })
    ),
}

export type TRecommendationsAction = ActionType<typeof actions>

export default createReducer<typeof initialState, TRecommendationsAction>(
    initialState,
    actions,
)

export const getIsLoading = (state: { recommendations: typeof initialState }): boolean => state.recommendations.isLoading
export const getPages = (state: { recommendations: typeof initialState }): IRecommendationsPage[] => state.recommendations.pages
