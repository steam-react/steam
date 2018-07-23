import { createReducer, createAction, ActionType } from './helpers'

type TNullableString = string | null

describe('createReducer', () => {
    const initialState: TNullableString[] = []
    const actions = {
        add: createAction('someReducer/ADD')<string, typeof initialState>(
            (state, item) => [...state, item]
        ),
        nostate: createAction('someReducer/NO_STATE')<string>(),
        unionPayload: createAction('someReducer/UNION_PAYLOAD')<TNullableString, typeof initialState>(
            (state, item) => [...state, item]
        ),
        noop: createAction('someReducer/NOOP')(),
    }

    const reducer = createReducer<typeof initialState, ActionType<typeof actions>>(initialState, actions)

    it('should create reducer', () => {
        expect(reducer).toBeDefined()
    })

    it('should process defined actions with handlers', () => {
        expect(reducer([], actions.add('1'))).toEqual(['1'])
    })

    it('should ignore defined actions without payload and handler', () => {
        expect(reducer([], actions.noop())).toEqual([])
    })

    it('should ignore defined actions with payload and without handler', () => {
        // Here should be no TypeScript errors
        expect(reducer([], actions.nostate('111'))).toEqual([])
        // Here should be Typescript error (uncomment to check)
        // expect(reducer([], actions.nostate(null))).toEqual([])
    })

    it('should process defined actions with union type payload', () => {
        // Here should be no TypeScript errors
        expect(reducer([], actions.unionPayload('111'))).toEqual(['111'])
        expect(reducer([], actions.unionPayload(null))).toEqual([null])
    })

    it('should work fine with type checks', () => {
        // Typescript compiler should fail here
        // Uncomment to check

        // Action type mismatch
        // expect(reducer([], undefined)).toEqual([])

        // Payload type mismatch
        // expect(reducer([], actions.add(1))).toEqual([1])

        // Action from another reducer
        // const anotherActions = {
        //     add: createAction('anotherReducer/ADD')<string, string[]>(
        //         (state, item) => [...state, item]
        //     )
        // }
        // expect(reducer([], anotherActions.add('1'))).toEqual([])
    })
})
