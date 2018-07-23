import { call, take } from 'redux-saga/effects'
import { expectSaga } from 'redux-saga-test-plan-ts'
import { throwError } from 'redux-saga-test-plan-ts/providers'
import * as matchers from 'redux-saga-test-plan-ts/matchers'

import { authSaga } from './auth'
import { actions } from '../reducers/auth'
import { mockAuthApi } from '../services/auth.mock'
import { mockUsersApi } from '../services/users.mock'
import { createMemoryHistory } from 'history'

const token = {
    exp: Date.now() + 3600000
    value: 'test_token',
}

const tokenExpired = {
    exp: Date.now(),
    value: 'test_token',
}

const credentialsPassword = {
    type: 'password' as 'password',
    login: 'user',
    password: 'password',
}

const history = createMemoryHistory()

it('should yield loginSuccess on successful login', () => {
    return expectSaga(authSaga, history, mockAuthApi, mockUsersApi)
        .provide([
            [call(mockAuthApi.getAuthToken), undefined],
            [call(mockAuthApi.login, credentialsPassword), token],
            [matchers.call.fn(mockAuthApi.setAuthToken), undefined],
            [call(mockAuthApi.removeAuthToken), undefined],
            [
                call(mockUsersApi.getTokenOwner, token.value),
                {
                    id: '1',
                    login: 'test',
                    avatarUrl: 'example.com',
                    displayName: 'Test User',
                }
            ],
        ])
        .put(actions.authCheckFinished(null))
        .dispatch(actions.login(credentialsPassword))
        .put(actions.loginSuccess({
            token: token.value,
            userId: '1',
            login: 'test'
            avatarUrl: 'example.com',
            displayName: 'Test User',
        }))
        .silentRun(50) // infinite saga, so adjust timeout
})

it('should yield loginSuccess if already authenticated', () => {
    return expectSaga(authSaga, history, mockAuthApi, mockUsersApi)
        .provide([
            [call(mockAuthApi.getAuthToken), token],
            [call(mockAuthApi.removeAuthToken), undefined],
            [matchers.call.fn(mockAuthApi.login), token],
            [matchers.call.fn(mockAuthApi.setAuthToken), undefined],
            [
                call(mockUsersApi.getTokenOwner, token.value),
                {
                    id: '1',
                    login: 'test',
                    avatarUrl: 'example.com',
                    displayName: 'Test User',
                }
            ],
        ])
        .put(actions.loginSuccess({
            token: token.value,
            userId: '1',
            login: 'test',
            avatarUrl: 'example.com',
            displayName: 'Test User',
        }))
        .silentRun(50) // infinite saga, so adjust timeout
})

it('should yield loginFailure on failed login', () => {
    const err = new Error('test')
    return expectSaga(authSaga, history, mockAuthApi, mockUsersApi)
        .provide([
            [call(mockAuthApi.getAuthToken), null],
            [call(mockAuthApi.login, credentialsPassword), throwError(err)],
            [matchers.call.fn(mockAuthApi.setAuthToken), undefined],
            [call(mockAuthApi.removeAuthToken), undefined],
        ])
        .put(actions.loginFailure(err))
        .dispatch(actions.login({ type: 'password', login: 'user', password: 'password' }))
        .silentRun(50) // infinite saga, so adjust timeout
})

it('should yield logoutSuccess on successful logout', () => {
    return expectSaga(authSaga, history, mockAuthApi, mockUsersApi)
        .provide([
            [call(mockAuthApi.getAuthToken), null],
            [call(mockAuthApi.login, credentialsPassword), token],
            [matchers.call.fn(mockAuthApi.setAuthToken), undefined],
            [call(mockAuthApi.removeAuthToken), undefined],
            [
                call(mockUsersApi.getTokenOwner, token.value),
                {
                    id: '1',
                    login: 'test',
                    avatarUrl: 'example.com',
                    displayName: 'Test User',
                }
            ],
        ])
        .put(actions.loginSuccess({
            token: token.value,
            userId: '1',
            login: 'test',
            avatarUrl: 'example.com',
            displayName: 'Test User',
        }))
        .put(actions.logoutSuccess())
        .dispatch(actions.login(credentialsPassword))
        .dispatch(actions.logout())
        .silentRun(50) // infinite saga, so adjust timeout
})

it('should handle logout immediately after login', () => {
    return expectSaga(authSaga, history, mockAuthApi, mockUsersApi)
        .provide([
            [call(mockAuthApi.getAuthToken), token],
            [matchers.call.fn(mockAuthApi.removeAuthToken), undefined],
            [matchers.call.fn(mockAuthApi.setAuthToken), undefined],
            [take(actions.logout.getType()), undefined]
        ])
        .put(actions.logoutSuccess())
        .silentRun(50)
})

it('should try relogin on token expiration', () => {
    return expectSaga(authSaga, history, mockAuthApi, mockUsersApi)
        .provide([
            [call(mockAuthApi.getAuthToken), tokenExpired],
            [call(mockAuthApi.removeAuthToken), undefined],
            [matchers.call.fn(mockAuthApi.setAuthToken), undefined],
            [call(mockAuthApi.login, { type: 'token', token: tokenExpired }), tokenExpired],
        ])
        .call(mockAuthApi.login, { type: 'token', token: tokenExpired })
        .put(actions.authCheckFinished(tokenExpired.value))
        .call(mockAuthApi.login, { type: 'token', token: tokenExpired })
        .silentRun(50)
})
