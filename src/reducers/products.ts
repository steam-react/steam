import { createAction, createReducer, ActionType } from './helpers'
import { createSelector } from 'reselect'

export type TProductId = string

export interface IProductPriceFreeInfo {
    type: 'free'
}

export interface IProductPriceNormalInfo {
    type: 'normal'
    price: number
    currency: string
}

export interface IProductPriceDiscountInfo {
    type: 'discount'
    priceOriginal: number
    priceFinal: number
    discount: number
    currency: string
}

export type TProductPriceInfo = IProductPriceNormalInfo
    | IProductPriceDiscountInfo
    | IProductPriceFreeInfo

export type TPlatform = 'windows' | 'macos' | 'linux'

export interface IProductInfo {
    name: string
    detailsUrl: string
    pictures: string[]
    priceInfo: TProductPriceInfo
    platforms: TPlatform[]
}

export interface IProductList {
    [id: string]: IProductInfo | undefined
}

interface IProductsState {
    products: IProductList
}

export const initialState: IProductList = {}

export const actions = {
    add: createAction('products/ADD')<typeof initialState, typeof initialState>(
        (state, payload) => ({ ...state, ...payload })
    ),
}

export type TProductsAction = ActionType<typeof actions>
export default createReducer<typeof initialState, TProductsAction>(initialState, actions)

export const getAllProducts = <T extends IProductsState>(state: T) => state.products
export const getProduct = createSelector(
    getAllProducts,
    products => (id: TProductId) => products[id]
)

export const getProducts = createSelector(
    getAllProducts,
    products => (ids: TProductId[]) => ids.map(id => products[id])
)
