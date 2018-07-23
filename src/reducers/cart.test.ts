import cartReducer from './cart'
import { actions } from './cart'

it('adds item to cart', () => {
    const initialState = ['1']
    const result = cartReducer(initialState, actions.addItem('2'))
    expect(result).toEqual(['1', '2'])
})

it('does nothing on adding already existing item', () => {
    const initialState = ['1', '2']
    const result = cartReducer(initialState, actions.addItem('2'))
    expect(result).toEqual(initialState)
})

it('removes item from cart', () => {
    const initialState = ['1', '2']
    const result = cartReducer(initialState, actions.removeItem('2'))
    expect(result).toEqual(['1'])
})

it('does nothing on removal of inexsisting item', () => {
    const initialState = ['1', '2']
    const result = cartReducer(initialState, actions.removeItem('3'))
    expect(result).toEqual(initialState)
})
