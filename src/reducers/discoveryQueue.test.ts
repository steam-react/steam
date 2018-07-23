import discoveryQueueReducer from './discoveryQueue'
import { actions, getQueue } from './discoveryQueue'
import { TRootState } from './index'

describe('reducers', () => {
    it('should set discovery queue', () => {
        const result = discoveryQueueReducer([], actions.set(['1']))
        expect(result).toEqual(['1'])
    })
})

describe('selectors', () => {
    it('should get discovery queue', () => {
        const state = {
            discoveryQueue: ['1', '2', '3']
        }
        const result = getQueue(state as TRootState)
        expect(result).toEqual(['1', '2', '3'])
    })
})
