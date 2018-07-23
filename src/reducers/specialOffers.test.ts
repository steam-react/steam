import specialOffersReducer from './specialOffers'
import { actions, initialState, getSpotlightIds, getNormalIds } from './specialOffers'

it('should set spotlight special offers', () => {
    const result = specialOffersReducer(initialState, actions.setSpotlight(['foo', 'bar']))
    expect(result).toEqual({
        spotlight: ['foo', 'bar'],
        normal: [],
    })
})

it('should set normal special offers', () => {
    const result = specialOffersReducer(initialState, actions.setNormal(['foo', 'bar']))
    expect(result).toEqual({
        spotlight: [],
        normal: ['foo', 'bar'],
    })
})

describe('selectors', () => {
    it('should return spotlight item ids on getSpotlightIds call', () => {
        const result = getSpotlightIds({
            specialOffers: {
                spotlight: ['1', '2'],
                normal: ['3', '4'],
            }
        })

        expect(result).toEqual(['1', '2'])
    })

    it('should return normal item ids on getNormalIds call', () => {
        const result = getNormalIds({
            specialOffers: {
                spotlight: ['1', '2'],
                normal: ['3', '4'],
            }
        })

        expect(result).toEqual(['3', '4'])
    })
})
