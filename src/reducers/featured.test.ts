import featuredReducer from './featured'
import { actions, initialState } from './featured'

it('should set featured products', () => {
    const result = featuredReducer(initialState, actions.setItems(['foo', 'bar']))
    expect(result).toEqual(['foo', 'bar'])
})
