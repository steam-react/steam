import { createAction } from './helpers'

export type TProductId = string

export const getBaseProductsListActions = (prefix: string) => {
    const baseInitialState: TProductId[] = []

    const baseActions = {
        addItem: createAction(`${prefix}/ADD_ITEM`)<TProductId, typeof baseInitialState>(
            (state, payload) => Array.from(new Set([...state, payload]))
        ),
        removeItem: createAction(`${prefix}/REMOVE_ITEM`)<TProductId, typeof baseInitialState>(
            (state, payload) => Array.from(new Set([...state].filter(item => item !== payload)))
        ),
        setItems: createAction(`${prefix}/SET_ITEMS`)<TProductId[], typeof baseInitialState>(
            (state, payload) => Array.from(new Set([...payload]))
        ),
    }

    return {
        baseInitialState,
        baseActions
    }
}
