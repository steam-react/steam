import { pick, pluck, concat, memoize } from 'lodash/fp'
import { IStoreApi, ISimilarProduct } from './store'
import { TProductId, IProductList } from '../reducers/products'
import fetch from 'node-fetch'
import * as recommendationsData from './recommendationsData.json'

// TODO: Better to store it in some environment variable
const FIREBASE_API_KEY = 'wgS46rNBWk6nSQLq2Da9YDvjUTeb1W36E5hdW2Zk'

// TODO: Better to move memoization code to service worker
const fetchJson = memoize((url: string) => {
    return fetch(url).then(response => {
        if (!response.ok) {
            throw new Error('Error fetching JSON')
        }

        return response.json()
    })
})

const getProductById = (id: string) => {
    return fetchJson(`https://steam-test-api.firebaseio.com/products/${id}.json?&auth=${FIREBASE_API_KEY}`)
}

const getProductsByIds = (ids: string[]) => {
    // TODO: This is not optimal, but Firebase doesn't
    // have a way to get items by a list of ids
    return Promise.all(ids.map(getProductById))
        .then(products => products.reduce((result, product, i) => {
            result[ids[i]] = product
            return result
        }, {}))
        .then((productsData: any) => ({
            data: ids,
            included: {
                products: productsData
            }
        }))
}

const getAllProductsData = memoize(() => {
    return fetchJson(`https://steam-test-api.firebaseio.com/products.json?&auth=${FIREBASE_API_KEY}`)
})

export const mockStoreApi: IStoreApi = {
    getFeaturedItems(token: string) {
        const ids = ["70", "434050", "730", "552520", "232090", "234140"]
        return getProductsByIds(ids)
    },

    getSpecialOffers(token: string) {
        const spotlightIds = ["265930", "282140",]
        const normalIds = ["218620", "220240", "222880", "234140", "238370", "24960", "257350", "264710"]

        const allIds = spotlightIds.concat(normalIds)
        return getProductsByIds(allIds).then(productsData => ({
            data: {
                spotlight: spotlightIds,
                normal: normalIds,
            },
            included: productsData.included
        }))
    },

    getWishlist(token: string) {
        return Promise.resolve({
            data: [] as TProductId[],
            included: {
                products: {},
            },
        })
    },

    getCart(token: string) {
        return Promise.resolve({
            data: [] as TProductId[],
            included: {
                products: {},
            },
        })
    },

    getDiscoveryQueue(token: string) {
        const ids = ["9010", "870630", "869760", "868550", "865130"]
        return getProductsByIds(ids)
    },

    getRecommendations(token: string) {
        return Promise.resolve({
            data: Object.assign({
                tags: [],
                wishlist: [],
                played: [],
                friends: [],
                curators: [],
            }, recommendationsData)
        })
    },

    getOwnedProducts(token: string) {
        const ids = ["13250", "108800", "17410"]
        return getProductsByIds(ids)
    },

    getIgnoredProducts(token: string) {
        return Promise.resolve({
            data: ["367520", "374040", "453480"]
        })
    },

    getProductsByIds(token: string, ids: TProductId[]) {
        return getProductsByIds(ids)
    },

    getSimilar(token: string, similarIds: TProductId[]) {
        return getAllProductsData().then((productsData: object) => {
            const productIds = Object.keys(productsData)
                .filter(id =>
                    productsData[id].pictures
                    && productsData[id].pictures.length > 3
                )

            const similarItems: ISimilarProduct[] = similarIds.reduce((result, id) => {
                return result.concat(getRandomItems(2, 3, productIds).map(x => ({
                    id: x,
                    similarTo: id
                })))
            }, [] as ISimilarProduct[]).filter(item =>
                productsData[item.id].pictures
                && productsData[item.id].pictures.length > 3
            )
            console.log(similarItems)
            return {
                data: similarItems,
                included: {
                    products: pick(
                        concat(
                            pluck('id', similarItems),
                            pluck('similarTo', similarItems),
                        ),
                        productsData
                    ) as IProductList
                }
            }
        })
    }
}

const getRandom = (minOrMax: number, max?: number) => typeof max === 'undefined'
    ? (Math.random() * minOrMax) | 0
    : minOrMax + (Math.random() * (max - minOrMax)) | 0

const getRandomItem = (arr: any[]): any => arr[getRandom(arr.length)]
const getRandomItems = (min: number, max: number, arr: any[]): any[] =>
    Array(getRandom(min, max)).fill('').reduce((result, x) => {
        let item
        while (result.includes(item = getRandomItem(arr))) { continue }
        result.push(item)
        return result
    }, [])
