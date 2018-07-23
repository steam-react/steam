import { take, call } from 'redux-saga/effects'
import { eventChannel } from 'redux-saga'
import { expectSaga } from 'redux-saga-test-plan-ts'
import * as matchers from 'redux-saga-test-plan-ts/matchers'

import {
    getTagItems,
    getSimilarItems,
    recommendationsSaga,
    getRecommendationsPage,
    createScrollChannel
} from './recommendations'
import { mockStoreApi } from '../services/store.mock'
import {
    actions as recommendationsActions,
    IRecommendationsPage
} from '../reducers/recommendations'
import { actions as productActions } from '../reducers/products'
import { actions as authActions } from '../reducers/auth'

describe('getTagItems', () => {
    it('should return n elements from first tag if there are enough elements', () => {
        const tagItems = getTagItems([
            { id: 1, tag: 'Action', items: ['1', '2'] },
        ])

        tagItems.next()
        const result = tagItems.next(2)
        expect(result.done).toBe(false)
        expect(result.value).toEqual({
            tag: 'Action',
            id: 1,
            items: ['1', '2']
        })
    })

    it('should finish if there are not enough elements', () => {
        const tagItems = getTagItems([
            { id: 1, tag: 'Action', items: ['1', '2'] },
        ])

        tagItems.next()
        const result = tagItems.next(4)
        expect(result.done).toBe(true)
        expect(result.value).toEqual(undefined)
    })

    it('should work in sequence', () => {
        const tagItems = getTagItems([
            { id: 1, tag: 'Action', items: ['1', '2', '3', '4'] },
            { id: 2, tag: 'FPS', items: ['10', '20', '30', '40'] },
        ])
        tagItems.next()

        let result = tagItems.next(2)
        expect(result.done).toBe(false)
        expect(result.value).toEqual({ id: 1, tag: 'Action', items: ['1', '2'] })

        result = tagItems.next(4)
        expect(result.done).toBe(false)
        expect(result.value).toEqual({ id: 2, tag: 'FPS', items: ['10', '20', '30', '40'] })

        result = tagItems.next(2)
        expect(result.done).toBe(false)
        expect(result.value).toEqual({ id: 1, tag: 'Action', items: ['3', '4'] })

        result = tagItems.next(4)
        expect(result.done).toBe(true)
    })

    it('should keep "unused" items and use it in next call if possible', () => {
        const tagItems = getTagItems([
            { id: 1, tag: 'Action', items: ['1', '2'] },
            { id: 2, tag: 'FPS', items: ['10', '20', '30', '40'] },
        ])
        tagItems.next()

        let result = tagItems.next(4)
        expect(result.done).toBe(false)
        expect(result.value).toEqual({ id: 2, tag: 'FPS', items: ['10', '20', '30', '40'] })

        result = tagItems.next(2)
        expect(result.done).toBe(false)
        expect(result.value).toEqual({ id: 1, tag: 'Action', items: ['1', '2'] })
    })
})

describe('getSimilarItems', () => {
    it('should finish if there are not enough items', () => {
        const similarItems = getSimilarItems({
            wishlist: [],
            friends: [],
            curators: [],
            played: [],
        }, [], [])
        similarItems.next()
        const result = similarItems.next(3)
        expect(result.done).toBe(true)
    })

    it('should return desired amount of items', () => {
        const similarItems = getSimilarItems({
            wishlist: ['1', '2', '3'],
            friends: [],
            curators: [],
            played: [],
        }, [], [])
        similarItems.next()
        const result = similarItems.next(3)
        expect(result.done).toBe(false)
        expect(result.value).toEqual(['1', '2', '3'])
    })

    it('should skip ignored items', () => {
        const similarItems = getSimilarItems({
            wishlist: [],
            friends: ['1', '2', '3', '4', '5'],
            curators: [],
            played: [],
        }, ['2', '4'], [])
        similarItems.next()
        const result = similarItems.next(3)
        expect(result.done).toBe(false)
        expect(result.value).toEqual(['1', '3', '5'])
    })

    it('should skip owned items', () => {
        const similarItems = getSimilarItems({
            wishlist: [],
            friends: ['1', '2', '3', '4', '5'],
            curators: [],
            played: [],
        }, [], ['2', '4'])
        similarItems.next()
        const result = similarItems.next(3)
        expect(result.done).toBe(false)
        expect(result.value).toEqual(['1', '3', '5'])
    })

    it('should take from different sources until finished', () => {
        const similarItems = getSimilarItems({
            wishlist: ['1', '3'],
            friends: ['2', '5',],
            curators: ['4', '6'],
            played: ['7', '8', '9'],
        }, ['2', '4'], [])
        similarItems.next()
        let result = similarItems.next(3)
        expect(result.done).toBe(false)
        expect(result.value).toHaveLength(3)

        result = similarItems.next(3)
        expect(result.done).toBe(false)
        expect(result.value).toHaveLength(3)

        result = similarItems.next(3)
        expect(result.done).toBe(true)
    })
})

describe('getRecommendationsPage', () => {
    it('should return null if there are no recommendations', () => {
        const result = getRecommendationsPage(
            [][Symbol.iterator](),
            [][Symbol.iterator](),
            'test_token',
            mockStoreApi,
        )

        expect(result.next().value).toBeNull()
    })

    it('should get recommended products page', () => {
        const tagItems = [
            { id: 1, tag: 'Action', items: ['1', '2'] },
            { id: 2, tag: 'FPS', items: ['3', '4', '5', '6'] },
        ]
        const similarItems = [
            ['7', '8', '9', '10'],
        ]

        return expectSaga(getRecommendationsPage,
            tagItems[Symbol.iterator](),
            similarItems[Symbol.iterator](),
            '',
            mockStoreApi,
        ).provide([
            [
                call(mockStoreApi.getProductsByIds, '', ['1', '2', '3', '4', '5', '6']),
                {
                    data: ['1', '2', '3', '4', '5', '6'],
                    included: {
                        products: {
                            '1': 'p1',
                            '2': 'p2',
                            '3': 'p3',
                            '4': 'p4',
                            '5': 'p5',
                            '6': 'p6',
                        }
                    }
                }
            ],
            [
                call(mockStoreApi.getSimilar, '', ['7', '8', '9', '10']),
                {
                    data: ['11', '12'],
                    included: {
                        products: { '11': 'p11', '12': 'p12' }
                    }
                }
            ],
        ])
            .call(mockStoreApi.getProductsByIds, '', ['1', '2', '3', '4', '5', '6'])
            .call(mockStoreApi.getSimilar, '', ['7', '8', '9', '10'])
            .returns({
                products: {
                    '1': 'p1',
                    '2': 'p2',
                    '3': 'p3',
                    '4': 'p4',
                    '5': 'p5',
                    '6': 'p6',
                    '11': 'p11',
                    '12': 'p12',
                },
                items: {
                    primary: { id: 1, tag: 'Action', items: ['1', '2'] },
                    secondary: { id: 2, tag: 'FPS', items: ['3', '4', '5', '6'] },
                    similar: ['11', '12'],
                }
            }).run()
    })
})

describe('recommendationsSaga', () => {
    const mockRecommendations = {
        wishlist: [],
        tags: [],
        friends: [],
        curators: [],
        played: [],
    }

    const mockScrollChannel = eventChannel(() => () => { /* doesn't matter */ })
    const mockScrollInfo301px = {
        pixelsScrolled: 100,
        pixelsLeft: 301,
        percentLeft: 31,
    }

    const mockScrollInfo299px = {
        pixelsScrolled: 100,
        pixelsLeft: 299,
        percentLeft: 30,
    }

    const mockPage = {
        products: {},
        items: {} as IRecommendationsPage
    }

    it('should wait until user logs in', () => {
        return expectSaga(recommendationsSaga(mockStoreApi))
            .withState({
                currentUser: {}
            })
            .take(authActions.loginSuccess.getType())
            .silentRun(50)
    })

    it('should wait until user scrolls below 300px to the page end', () => {
        return expectSaga(recommendationsSaga(mockStoreApi))
            .withState({
                currentUser: {
                    status: 'LOGGED_IN',
                    token: '',
                },
                ignored: [],
                owned: [],
            })
            .provide([
                [call(mockStoreApi.getRecommendations, ''), { data: mockRecommendations }],
                [call(createScrollChannel), mockScrollChannel],
                [take(mockScrollChannel), mockScrollInfo301px],
                [matchers.call.fn(getRecommendationsPage), mockPage],
            ])
            .delay(100)
            .silentRun(50)
    })

    it('should request recommendations on scrolling below 300px to page end', () => {
        return expectSaga(recommendationsSaga(mockStoreApi))
            .withState({
                currentUser: {
                    status: 'LOGGED_IN',
                    token: '',
                },
                ignored: [],
                owned: [],
            })
            .provide([
                [call(mockStoreApi.getRecommendations, ''), { data: mockRecommendations }],
                [call(createScrollChannel), mockScrollChannel],
                [take(mockScrollChannel), mockScrollInfo299px],
                [matchers.call.fn(getRecommendationsPage), mockPage],
            ])
            .call(mockStoreApi.getRecommendations, '')
            .silentRun(50)
    })

    it('should set isFinished if no recommendations returned', () => {
        return expectSaga(recommendationsSaga(mockStoreApi))
            .withState({
                currentUser: {
                    status: 'LOGGED_IN',
                    token: '',
                },
                ignored: [],
                owned: [],
            })
            .provide([
                [call(mockStoreApi.getRecommendations, ''), { data: mockRecommendations }],
                [call(createScrollChannel), mockScrollChannel],
                [take(mockScrollChannel), mockScrollInfo299px],
                [matchers.call.fn(getRecommendationsPage), null],
            ])
            .put(recommendationsActions.setIsFinished(true))
            .run()
    })

    it('should add recommendations page if recommendations were returned', () => {
        return expectSaga(recommendationsSaga(mockStoreApi))
            .withState({
                currentUser: {
                    status: 'LOGGED_IN',
                    token: '',
                },
                ignored: [],
                owned: [],
            })
            .provide([
                [call(mockStoreApi.getRecommendations, ''), { data: mockRecommendations }],
                [call(createScrollChannel), mockScrollChannel],
                [take(mockScrollChannel), mockScrollInfo299px],
                [matchers.call.fn(getRecommendationsPage), mockPage],
                [take(mockScrollChannel), mockScrollInfo299px],
                [matchers.call.fn(getRecommendationsPage), mockPage],
            ])
            .put(productActions.add(mockPage.products))
            .put(recommendationsActions.addPage(mockPage.items))
            .delay(100)
            .put(productActions.add(mockPage.products))
            .put(recommendationsActions.addPage(mockPage.items))
            .silentRun(150)
    })
})
