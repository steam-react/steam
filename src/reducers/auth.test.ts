import authReducer from './auth'
import {
    actions,
    initialState,
    isAuthCheckFinished,
    isLoggedIn,
} from './auth'

it('set login status to LOGGING_IN on login', () => {
    const result = authReducer(initialState, actions.login({
        type: 'password',
        login: 'test',
        password: 'test',
    }))
    expect(result).toHaveProperty('status')
    expect(result.status).toEqual('LOGGING_IN')
})

it('set login status to LOGGING_OUT on login', () => {
    const result = authReducer(initialState, actions.logout())
    expect(result).toHaveProperty('status')
    expect(result.status).toEqual('LOGGING_OUT')
})

it('sets auth info on login success', () => {
    const state = { status: 'LOGGED_OUT' as 'LOGGED_OUT' }
    const result = authReducer(state, actions.loginSuccess({
        token: 'test_token',
        userId: '1',
        login: 'test_login',
    }))
    expect(result).toEqual({
        status: 'LOGGED_IN',
        token: 'test_token',
        login: 'test_login',
        userId: '1',
    })
})

it('sets error message on login failure', () => {
    const state = { status: 'LOGGED_OUT' as 'LOGGED_OUT' }
    const result = authReducer(
        state,
        actions.loginFailure(new Error('Login failed'))
    )
    expect(result).toEqual({
        status: 'LOGGED_OUT',
        error: 'Login failed',
    })
})

it('clears auth info on logout success', () => {
    const state = {
        status: 'LOGGED_IN' as 'LOGGED_IN',
        token: 'test_token',
        login: 'bar',
        userId: 'bar',
    }
    const result = authReducer(state, actions.logoutSuccess())
    expect(result).toEqual({
        status: 'LOGGED_OUT'
    })
})

describe('selectors', () => {
    describe('isAuthCheckFinished', () => {
        it('should return false if authcheck have not been done', () => {
            const result = isAuthCheckFinished({
                currentUser: { status: 'UNKNOWN' }
            })
            expect(result).toEqual(false)
        })
        it('should return true if authcheck have been done', () => {
            const result = isAuthCheckFinished({
                currentUser: { status: 'LOGGED_OUT' }
            })
            expect(result).toEqual(true)
        })
    })
    describe('isLoggedIn', () => {
        it('should return false if user is not logged in', () => {
            const result = isLoggedIn({
                currentUser: { status: 'UNKNOWN' }
            })
            expect(result).toEqual(false)
        })
        it('should return true if user is logged in', () => {
            const result = isLoggedIn({
                currentUser: { status: 'LOGGED_IN' }
            })
            expect(result).toEqual(true)
        })
    })
})
