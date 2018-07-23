import wishlistReducer from './wishlist'
import { actions } from './wishlist'

it('adds item to wishlist', () => {
    const initialState = ['1']
    const result = wishlistReducer(initialState, actions.addItem('2'))
    expect(result).toEqual(['1', '2'])
})

it('does nothing if item already exists', () => {
    const initialState = ['1', '2']
    const result = wishlistReducer(initialState, actions.addItem('2'))
    expect(result).toEqual(initialState)
})

it('removes existing item', () => {
    const initialState = ['1', '2']
    const result = wishlistReducer(initialState, actions.removeItem('2'))
    expect(result).toEqual(['1'])
})

it('does nothing if item already removed', () => {
    const initialState = ['1']
    const result = wishlistReducer(initialState, actions.removeItem('2'))
    expect(result).toEqual(initialState)
})
