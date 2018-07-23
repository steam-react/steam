import { createAction, createReducer, ActionType } from './helpers'

export interface ICredentialsPassword {
    type: 'password'
    login: string
    password: string
}

export type TCredentials = ICredentialsPassword

export type TAuthState = 'UNKNOWN' | 'LOGGED_OUT' | 'LOGGING_IN' | 'LOGGED_IN' | 'LOGGING_OUT'

export interface IAuthState extends IAuthInfo {
    status: TAuthState
}

export interface IAuthInfo {
    token?: string
    login?: string
    userId?: string
    error?: string
    avatarUrl?: string
    displayName?: string
}

export const initialState: IAuthState = {
    status: 'UNKNOWN' as 'UNKNOWN'
}

export const actions = {
    login: createAction('auth/LOGIN')<TCredentials, typeof initialState>(
        (state, payload) => ({
            ...state,
            status: 'LOGGING_IN'
        })
    ),
    logout: createAction('auth/LOGOUT')<undefined, typeof initialState>(
        (state) => ({
            ...state,
            status: 'LOGGING_OUT'
        })
    ),
    loginSuccess: createAction('auth/LOGIN_SUCCESS')<IAuthInfo, typeof initialState>(
        (state, payload) => ({
            status: 'LOGGED_IN',
            token: payload.token,
            login: payload.login,
            userId: payload.userId,
            avatarUrl: payload.avatarUrl,
            displayName: payload.displayName,
        })
    ),
    loginFailure: createAction('auth/LOGIN_FAILURE')<Error, typeof initialState>(
        (state, payload) => ({
            status: 'LOGGED_OUT',
            error: payload.message,
        })
    ),
    logoutSuccess: createAction('auth/LOGOUT_SUCCESS')<undefined, typeof initialState>(
        (state) => ({ status: 'LOGGED_OUT' })
    ),
    authCheckFinished: createAction('auth/AUTH_CHECK_FINISHED')<string | null>(),
}

export type TAuthAction = ActionType<typeof actions>
export default createReducer<typeof initialState, TAuthAction>(initialState, actions)

export const isAuthCheckFinished = <T extends { currentUser: IAuthState }>(state: T) =>
    state.currentUser.status !== 'UNKNOWN'

export const isLoggedIn = <T extends { currentUser: IAuthState }>(state: T) =>
    state.currentUser.status === 'LOGGED_IN'

// Trivial
/* istanbul ignore next */
export const getAuthToken = <T extends { currentUser: IAuthState }>(state: T) =>
    state.currentUser.token

// Trivial
/* istanbul ignore next */
export const getUserPic = <T extends { currentUser: IAuthState }>(state: T) =>
    state.currentUser.avatarUrl

// Trivial
/* istanbul ignore next */
export const getUserLogin = <T extends { currentUser: IAuthState }>(state: T) =>
    state.currentUser.login
