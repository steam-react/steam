import { fork, call, all, put, select, take } from 'redux-saga/effects'
import { IStoreApi } from '../services/store'
import { actions as productActions } from '../reducers/products'
import { actions as featuredActions } from '../reducers/featured'
import { actions as specialOffersActions } from '../reducers/specialOffers'
import { actions as discoveryQueueActions } from '../reducers/discoveryQueue'
import { actions as wishlistActions } from '../reducers/wishlist'
import { actions as ownedActions } from '../reducers/owned'
import { actions as ignoredActions } from '../reducers/ignored'
import { recommendationsSaga } from './recommendations'
import { actions as authActions, isAuthCheckFinished, getAuthToken } from '../reducers/auth'

export const storeFrontSaga = (storeApi: IStoreApi) => function* () {
    const authCheckFinished = yield select(isAuthCheckFinished)
    if (!authCheckFinished) {
        yield take(authActions.authCheckFinished.getType())
    }
    const token = yield select(getAuthToken)
    const [featured, specials, queue, wishlist, owned, ignored] = yield all([
        call(storeApi.getFeaturedItems, token),
        call(storeApi.getSpecialOffers, token),
        call(storeApi.getDiscoveryQueue, token),
        call(storeApi.getWishlist, token),
        call(storeApi.getOwnedProducts, token),
        call(storeApi.getIgnoredProducts, token),
    ])

    yield fork(recommendationsSaga(storeApi))
    yield put(productActions.add({
        ...featured.included.products,
        ...specials.included.products,
        ...queue.included.products,
        ...wishlist.included.products,
        ...owned.included.products,
    }))

    yield put(featuredActions.setItems(featured.data))
    yield put(specialOffersActions.setNormal(specials.data.normal))
    yield put(specialOffersActions.setSpotlight(specials.data.spotlight))
    yield put(discoveryQueueActions.set(queue.data))
    yield put(wishlistActions.setItems(wishlist.data))
    yield put(ownedActions.setItems(owned.data))
    yield put(ignoredActions.setItems(ignored.data))

}
