import recommendationsReducer from './recommendations'
import { actions, initialState, getIsLoading, getPages } from './recommendations'

it('should add next page of recommendations to empty state', () => {
    const result = recommendationsReducer(initialState, actions.addPage({
        primary: {
            tag: 'Action',
            id: 1,
            items: []
        },
        secondary: {
            tag: 'FPS',
            id: 2,
            items: []
        },
        similar: [],
    }))

    expect(result).toEqual({
        isLoading: false,
        isFinished: false,
        pages: [
            {
                primary: {
                    tag: 'Action',
                    id: 1,
                    items: []
                },
                secondary: {
                    tag: 'FPS',
                    id: 2,
                    items: []
                },
                similar: [],
            }
        ]
    })
})

it('should set isLoading flag', () => {
    const result = recommendationsReducer(initialState, actions.setIsLoading(true))
    expect(result).toHaveProperty('isLoading')
    expect(result.isLoading).toBe(true)
})

it('should clear isLoading flag', () => {
    const result = recommendationsReducer(initialState, actions.setIsLoading(false))
    expect(result).toHaveProperty('isLoading')
    expect(result.isLoading).toBe(false)
})

it('should set isFinished flag', () => {
    const result = recommendationsReducer(initialState, actions.setIsFinished(true))
    expect(result).toHaveProperty('isFinished')
    expect(result.isFinished).toBe(true)
})

it('should clear isFinished flag', () => {
    const result = recommendationsReducer(initialState, actions.setIsFinished(false))
    expect(result).toHaveProperty('isFinished')
    expect(result.isFinished).toBe(false)
})

describe('selectors', () => {
    const mockState = {
        recommendations: {
            isLoading: false,
            isFinished: false,
            pages: []
        }
    }

    it('should get isLoading from state', () => {
        expect(getIsLoading(mockState)).toEqual(false)
    })

    it('should get pages from state', () => {
        expect(getPages(mockState)).toEqual([])
    })
})
