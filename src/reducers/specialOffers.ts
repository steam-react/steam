import { ActionType, createAction, createReducer } from './helpers'

export interface ISpecialOffersState {
    spotlight: string[]
    normal: string[]
}

export const initialState: ISpecialOffersState = {
    spotlight: [],
    normal: []
}

export const actions = {
    setSpotlight: createAction('specialOffers/SET_SPOTLIGHT')<string[], typeof initialState>(
        (state, payload) => ({
            ...state,
            spotlight: [...payload]
        })
    ),
    setNormal: createAction('specialOffers/SET_NORMAL')<string[], typeof initialState>(
        (state, payload) => ({
            ...state,
            normal: [...payload]
        })
    ),
}

export type TSpecialOffersAction = ActionType<typeof actions>
export default createReducer<typeof initialState, TSpecialOffersAction>(initialState, actions)

export const getSpotlightIds = <T extends { specialOffers: ISpecialOffersState }>(state: T) => state.specialOffers.spotlight
export const getNormalIds = <T extends { specialOffers: ISpecialOffersState }>(state: T) => state.specialOffers.normal
