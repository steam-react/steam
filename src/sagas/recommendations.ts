import { eventChannel, buffers } from 'redux-saga'
import { call, all, put, take, select, delay } from 'redux-saga/effects'
import { IStoreApi } from '../services/store'

import { actions as recommendationsActions } from '../reducers/recommendations'
import { actions as productActions } from '../reducers/products'
import { getOwnedProducts } from '../reducers/owned'
import { getIgnoredProducts } from '../reducers/ignored'
import { actions as authActions, isLoggedIn, getAuthToken } from '../reducers/auth'

interface ITagItems {
    id: number
    tag: string
    items: string[]
}

const PIXELS_LEFT_TO_START = 300
const ITEMS_IN_PRIMARY_TAG = 2
const ITEMS_IN_SECONDARY_TAG = 4
const ITEMS_SIMILAR = 3

export const recommendationsSaga = (storeApi: IStoreApi) => function* () {
    // No recommendations until logged in
    const loggedIn = yield select(isLoggedIn)
    if (!loggedIn) {
        yield take(authActions.loginSuccess.getType())
    }

    const token = yield select(getAuthToken)

    // Will initialize this later on first scroll to bottom
    let tagItems: IterableIterator<ITagItems | undefined> | null = null
    let similarItems: IterableIterator<string[] | undefined> | null = null

    // Event channel to watch
    const scrollChannel = yield call(createScrollChannel)

    while (true) {
        // Wait until user scrolls
        const scrollInfo = yield take(scrollChannel)
        if (scrollInfo.pixelsLeft < PIXELS_LEFT_TO_START) {
            yield put(recommendationsActions.setIsLoading(true))

            // Initialize recommendations
            if (!tagItems || !similarItems) {
                const { data: recommendations } = yield call(storeApi.getRecommendations, token)
                tagItems = getTagItems(recommendations.tags)
                similarItems = getSimilarItems(
                    {
                        wishlist: recommendations.wishlist,
                        friends: recommendations.friends,
                        curators: recommendations.curators,
                        played: recommendations.played,
                    },
                    yield select(getIgnoredProducts),
                    yield select(getOwnedProducts),
                )
                tagItems.next()
                similarItems.next()
            }

            // Get next page of recommendations
            const page = yield call(
                getRecommendationsPage,
                tagItems,
                similarItems,
                token,
                storeApi
            )

            // Show 'out of recommendations' message
            if (page === null) {
                yield put(recommendationsActions.setIsFinished(true))
                yield put(recommendationsActions.setIsLoading(false))
                scrollChannel.close()
                break
            }

            // Display recommendations page
            yield put(productActions.add(page.products))
            yield put(recommendationsActions.addPage(page.items))
            yield put(recommendationsActions.setIsLoading(false))
        }

        // Throttle
        yield delay(100)
    }
}

export const getTagItems = function* (tagItems: ITagItems[]) {
    let count = 0
    let i = 0
    let amount = yield
    while (count < tagItems.length) {
        if (tagItems[i].items.length >= amount) {
            amount = yield {
                tag: tagItems[i].tag,
                id: tagItems[i].id,
                items: tagItems[i].items.splice(0, amount)
            }
            count = 0
        }
        i = (i + 1) % tagItems.length
        count++
    }
}

export const getSimilarItems = function* (
    sources: {
        wishlist: string[],
        friends: string[],
        curators: string[],
        played: string[],
    },
    ignored: string[],
    owned: string[],
) {
    const keys = Object.keys(sources)
    let amount = yield
    let similar = []
    while (keys.length > 0) {
        const i = (Math.random() * keys.length) | 0
        const source = keys[i]
        if (sources[source].length < 1) {
            keys.splice(i, 1)
            continue
        }
        const item = sources[source].shift()
        if (
            ['played', 'curators', 'friends'].includes(source)
            && ignored.includes(item)
        ) {
            continue
        }
        if (
            ['curators', 'friends'].includes(source)
            && owned.includes(item)
        ) {
            continue
        }
        similar.push(item)
        if (similar.length === amount) {
            amount = yield similar
            similar = []
        }
    }
}

export const getRecommendationsPage = function* (
    tagItems: IterableIterator<ITagItems>,
    similarItems: IterableIterator<string[]>,
    token: string,
    storeApi: IStoreApi
) {
    const bucketPrimary = tagItems.next(ITEMS_IN_PRIMARY_TAG)
    const bucketSecondary = tagItems.next(ITEMS_IN_SECONDARY_TAG)
    const similarIds = similarItems.next(ITEMS_SIMILAR)
    if (
        bucketPrimary.done
        || bucketSecondary.done
        || similarIds.done
    ) {
        return null
    }

    const [bucketsResponse, similarResponse] = yield all([
        call(
            storeApi.getProductsByIds,
            token,
            bucketPrimary.value.items.concat(bucketSecondary.value.items)
        ),
        call(storeApi.getSimilar, token, similarIds.value),
    ])

    return {
        products: {
            ...bucketsResponse.included.products,
            ...similarResponse.included.products,
        },
        items: {
            primary: bucketPrimary.value,
            secondary: bucketSecondary.value,
            similar: similarResponse.data,
        }
    }
}

/* istanbul ignore next */
const getScrollInfo = (window: Window) => {
    const scrollElement = window.document.scrollingElement
    if (!scrollElement) {
        return {} as never
    }
    const scrollHeight = scrollElement.scrollHeight
    const windowHeight = window.innerHeight
    const pixelsScrolled = window.scrollY

    const pixelsLeft = scrollHeight - windowHeight - pixelsScrolled
    const percentLeft = (100 * pixelsLeft / scrollHeight) | 0

    return { pixelsScrolled, pixelsLeft, percentLeft }
}

/* istanbul ignore next */
export const createScrollChannel = () => eventChannel(emit => {
    const scrollHandler = (event: any) => {
        emit(getScrollInfo(window))
    }

    const unsubscribe = () => {
        window.removeEventListener('scroll', scrollHandler)
    }

    window.addEventListener('scroll', scrollHandler)

    return unsubscribe
}, buffers.sliding(1))
