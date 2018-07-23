import { call, fork, select } from 'redux-saga/effects'
import { recommendationsSaga } from './recommendations'
import { storeFrontSaga } from './storeFront'
import { expectSaga } from 'redux-saga-test-plan-ts'
import { mockStoreApi } from '../services/store.mock'
import reducer from '../reducers'
import { actions as authActions, isAuthCheckFinished } from '../reducers/auth'

describe('storeFrontSaga', () => {
    it('should wait for authentication', () => {
        return expectSaga(storeFrontSaga(mockStoreApi))
            .provide([
                [select(isAuthCheckFinished), false]
            ])
            .take(authActions.authCheckFinished.getType())
            .silentRun(50)
    })

    it('should preload page data and start watching recommendations', () => {
        return expectSaga(storeFrontSaga(mockStoreApi))
            .withReducer(reducer, {
                currentUser: { status: 'LOGGED_OUT' },
                cart: [],
                wishlist: [],
                languages: [],
                products: {},
                featured: [],
                specialOffers: { spotlight: [], normal: [] },
                discoveryQueue: [],
                recommendations: { isLoading: false, isFinished: false, pages: [] },
                owned: [],
                ignored: []
            })
            .provide([
                [select(isAuthCheckFinished), true],
                [
                    call(mockStoreApi.getFeaturedItems, undefined),
                    { data: ['1'], included: { products: { '1': {} } } }
                ],
                [
                    call(mockStoreApi.getSpecialOffers, undefined),
                    { data: { normal: ['2'], spotlight: [] }, included: { products: { '2': {} } } }
                ],
                [
                    call(mockStoreApi.getDiscoveryQueue, undefined),
                    { data: ['3'], included: { products: { '3': {} } } }
                ],
                [
                    call(mockStoreApi.getWishlist, undefined),
                    { data: ['4'], included: { products: { '4': {} } } }
                ],
                [
                    call(mockStoreApi.getOwnedProducts, undefined),
                    { data: ['5'], included: { products: { '5': {} } } }
                ],
                [
                    call(mockStoreApi.getIgnoredProducts, undefined),
                    { data: ['6'] }
                ],
                [
                    fork(recommendationsSaga(mockStoreApi)),
                    function* () { yield null }
                ]
            ])
            .hasFinalState({
                currentUser: { status: 'LOGGED_OUT' },
                cart: [],
                wishlist: ['4'],
                languages: [],
                products: { '1': {}, '2': {}, '3': {}, '4': {}, '5': {} },
                featured: ['1'],
                specialOffers: { spotlight: [], normal: ['2'] },
                discoveryQueue: ['3'],
                recommendations: { isLoading: false, isFinished: false, pages: [] },
                owned: ['5'],
                ignored: ['6']
            })
            .silentRun(150)
    })
})
