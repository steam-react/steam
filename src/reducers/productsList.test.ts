import { ActionType, createReducer } from './helpers'
import { getBaseProductsListActions } from './productsList'

const { baseActions: actions, baseInitialState: initialState } = getBaseProductsListActions('test')
type TWishlistAction = ActionType<typeof actions>
const reducer = createReducer<typeof initialState, TWishlistAction>(initialState, actions)

it('adds item to productsList', () => {
    const result = reducer(initialState, actions.addItem('2'))
    expect(result).toEqual(['2'])
})

it('does nothing if item already exists', () => {
    const init = ['1', '2']
    const result = reducer(init, actions.addItem('2'))
    expect(result).toEqual(init)
})

it('removes existing item', () => {
    const init = ['1', '2']
    const result = reducer(init, actions.removeItem('2'))
    expect(result).toEqual(['1'])
})

it('does nothing if item already removed', () => {
    const init = ['1']
    const result = reducer(init, actions.removeItem('2'))
    expect(result).toEqual(init)
})
