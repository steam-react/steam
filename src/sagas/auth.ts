import { take, call, put, delay, race } from 'redux-saga/effects'
import { IAuthApi, IToken, TCredentials } from '../services/auth'
import { IUsersApi } from '../services/users'
import { actions } from '../reducers/auth'
import { History } from 'history'

export function* authSaga(
    history: History,
    authApi: IAuthApi,
    usersApi: IUsersApi
) {
    let token: IToken = yield call(authApi.getAuthToken)

    if (token) {
        token = yield call(login, history, authApi, usersApi, { type: 'token', token })
    } else {
        yield put(actions.logoutSuccess())
    }

    yield put(actions.authCheckFinished(token && token.value || null))

    while (true) {
        if (!token) {
            const { payload: credentials } = yield take(actions.login.getType())
            token = yield call(login, history, authApi, usersApi, credentials)
            if (token) {
                history.push('/')
            }
        }

        if (!token) {
            continue
        }

        let userLoggedOut = false
        while (!userLoggedOut) {
            const { expired } = yield race({
                expired: delay(Math.max(token.exp - Date.now() - 30000, 0)),
                loggedOut: take(actions.logout.getType()),
            })

            if (expired) {
                token = yield call(login, history, authApi, usersApi, { type: 'token', token })
            } else {
                yield call(logout, authApi)
                userLoggedOut = true
            }
        }
    }
}

function* login(history: History, authApi: IAuthApi, usersApi: IUsersApi, credentials: TCredentials) {
    try {
        const { token }: { token: IToken } = yield race({
            token: call(authApi.login, credentials),
            logout: take(actions.logout.getType()),
        })

        if (token) {
            yield call(authApi.setAuthToken, token)
            const user = yield call(usersApi.getTokenOwner, token.value)
            yield put(actions.loginSuccess({
                token: token.value,
                login: user.login,
                userId: user.id,
                avatarUrl: user.avatarUrl,
                displayName: user.displayName
            }))
            return token
        } else {
            yield call(logout, authApi)
        }
    } catch (e) {
        yield call(authApi.removeAuthToken)
        yield put(actions.loginFailure(e))
        return null
    }
}

function* logout(authApi: IAuthApi) {
    yield call(authApi.removeAuthToken)
    yield put(actions.logoutSuccess())
    /* istanbul ignore next */
    if (typeof window !== 'undefined') {
        window.location.href = '/'
    }
}
