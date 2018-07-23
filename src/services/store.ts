import { IProductList, TProductId } from '../reducers/products'

export interface IApiEntity<TData, TIncluded = undefined> {
    data: TData
    included?: TIncluded
}

export interface IIncludedProducts {
    products: IProductList
}

export type TProductListResponse = IApiEntity<TProductId[], IIncludedProducts>

export interface ISimilarProduct {
    id: TProductId
    similarTo: TProductId
}

export interface ITagItems {
    tag: string
    id: number
    items: TProductId[]
}

export type TSimilarProductResponse = IApiEntity<ISimilarProduct[], IIncludedProducts>

export interface ISpecialOffers {
    spotlight: TProductId[]
    normal: TProductId[]
}

export type TSpecialOffersResponse = IApiEntity<ISpecialOffers, IIncludedProducts>

export interface IRecommendations {
    tags: ITagItems[]
    wishlist: TProductId[]
    played: TProductId[]
    friends: TProductId[]
    curators: TProductId[]
}

export type TRecommendationsResponse = IApiEntity<IRecommendations>

export interface IStoreApi {
    getFeaturedItems(token: string): Promise<TProductListResponse>
    getSpecialOffers(token: string): Promise<TSpecialOffersResponse>
    getWishlist(token: string): Promise<TProductListResponse>
    getCart(token: string): Promise<TProductListResponse>
    getDiscoveryQueue(token: string): Promise<TProductListResponse>
    getRecommendations(token: string): Promise<TRecommendationsResponse>
    getOwnedProducts(token: string): Promise<TProductListResponse>
    getIgnoredProducts(token: string): Promise<TProductListResponse>
    getProductsByIds(token: string, ids: TProductId[]): Promise<TProductListResponse>
    getSimilar(token: string, similarIds: TProductId[]): Promise<TSimilarProductResponse>
}
