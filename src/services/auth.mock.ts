import { TCredentials, IAuthApi, IToken } from './auth'

const getToken = () => ({
    exp: Date.now() + 3 * 60 * 1000,
    value: 'test_token',
})

export const mockAuthApi: IAuthApi = {
    login(credentials: TCredentials): Promise<IToken> {
        if (credentials.type === 'token') {
            if (credentials.token.exp > Date.now()) {
                return Promise.resolve(getToken())
            } else {
                return Promise.reject(new Error('Token expired'))
            }
        }
        if (credentials.type === 'password') {
            if (credentials.login === 'test' && credentials.password === 'password') {
                return Promise.resolve(getToken())
            } else {
                return Promise.reject(new Error('Invalid login or password'))
            }
        }
        return Promise.reject(new Error('No credentials specified'))
    },
    getAuthToken(): IToken | null {
        const tokenStr = localStorage.getItem('token')
        if (!tokenStr) {
            return null
        }
        return JSON.parse(tokenStr)
    },
    setAuthToken(token: IToken) {
        localStorage.setItem('token', JSON.stringify(token))
    },
    removeAuthToken() {
        localStorage.removeItem('token')
    },
}
