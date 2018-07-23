export interface ICredentialsToken {
    type: 'token'
    token: IToken
}
export interface ICredentialsPassword {
    type: 'password'
    login: string
    password: string
}

export type TCredentials = ICredentialsToken | ICredentialsPassword

export interface IToken {
    exp: number
    value: string
}

export interface IAuthApi {
    login(credentials: TCredentials): Promise<IToken>

    getAuthToken(): IToken | null
    setAuthToken(token: IToken): void
    removeAuthToken(): void
}
