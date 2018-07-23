import languagesReducer from './languages'
import { actions, getLanguages } from './languages'
import { TRootState } from './index'

it('should set languages on set()', () => {
    const result = languagesReducer([], actions.set([
        { id: 'en', caption: 'English' }
    ]))
    expect(result).toEqual([
        { id: 'en', caption: 'English' }
    ])
})

it('should get languages list', () => {
    const result = getLanguages({
        languages: [{ id: 'en', caption: 'English' }]
    } as TRootState)

    expect(result).toEqual([{
        id: 'en',
        caption: 'English'
    }])
})
