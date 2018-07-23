import ownedReducer from './owned'
import { actions, initialState } from './owned'

it('should set owned products', () => {
    const result = ownedReducer(initialState, actions.setItems(['foo', 'bar']))
    expect(result).toEqual(['foo', 'bar'])
})
