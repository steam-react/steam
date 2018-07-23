import productsReducer from './products'
import { actions, TPlatform, getAllProducts, getProduct, getProducts } from './products'

const productData = {
    '1': {
        name: 'Half-life',
        detailsUrl: '#',
        pictures: [
            '/screenshots/hl1_00.jpg',
            '/screenshots/hl1_01.jpg',
        ],
        priceInfo: {
            type: 'normal' as 'normal',
            price: 29.99,
            currency: '$',
        },
        platforms: ['windows', 'linux'] as TPlatform[],
    },
    '2': {
        name: 'Half-life 2: Episode One',
        detailsUrl: '#',
        pictures: [
            '/screenshots/hl2_00.jpg',
            '/screenshots/hl2_01.jpg',
        ],
        priceInfo: {
            type: 'discount' as 'discount',
            priceOriginal: 29.99,
            priceFinal: 9.99,
            discount: 66,
            currency: '$',
        },
        platforms: ['windows', 'linux'] as TPlatform[],
    },
}

it('should add products', () => {
    const initialState = {
        '1': productData['1']
    }
    const result = productsReducer(initialState, actions.add({
        '2': productData['2']
    }))
    expect(result).toEqual({
        '1': productData['1'],
        '2': productData['2'],
    })
})

describe('selectors', () => {
    it('should return all products on getAllProducts call', () => {
        const result = getAllProducts({
            products: {
                '1': {
                    name: 'foo',
                    detailsUrl: 'example.com',
                    pictures: ['example.com'],
                    priceInfo: {
                        type: 'normal',
                        price: 0.99,
                        currency: '$',
                    }
                    platforms: ['windows']
                }
            }
        })

        expect(result).toEqual({
            '1': {
                name: 'foo',
                detailsUrl: 'example.com',
                pictures: ['example.com'],
                priceInfo: {
                    type: 'normal',
                    price: 0.99,
                    currency: '$',
                }
                    platforms: ['windows']
            }
        })
    })

    it('should return specified product on getProduct call', () => {
        const result = getProduct({
            products: {
                '1': {
                    name: 'foo',
                    detailsUrl: 'example.com',
                    pictures: ['example.com'],
                    priceInfo: {
                        type: 'normal',
                        price: 0.99,
                        currency: '$',
                    },
                    platforms: ['windows']
                }
            }
        })('1')

        expect(result).toEqual({
            name: 'foo',
            detailsUrl: 'example.com',
            pictures: ['example.com'],
            priceInfo: {
                type: 'normal',
                price: 0.99,
                currency: '$',
            },
            platforms: ['windows']
        })
    })

    it('should return specified products on getProducts call', () => {
        const state = {
            products: {
                '1': {
                    name: 'foo',
                    detailsUrl: 'example.com',
                    pictures: ['example.com'],
                    priceInfo: {
                        type: 'normal',
                        price: 0.99,
                        currency: '$',
                    },
                    platforms: ['windows']
                },
                '2': {
                    name: 'foo',
                    detailsUrl: 'example.com',
                    pictures: ['example.com'],
                    priceInfo: {
                        type: 'normal',
                        price: 0.99,
                        currency: '$',
                    },
                    platforms: ['windows']
                }
            }
        }
        const result = getProducts(state)(['1'])

        expect(result).toEqual([
            {
                name: 'foo',
                detailsUrl: 'example.com',
                pictures: ['example.com'],
                priceInfo: {
                    type: 'normal',
                    price: 0.99,
                    currency: '$',
                }
                    platforms: ['windows']
            }
        ])
    })
})
