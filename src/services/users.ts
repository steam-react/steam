export interface IUserInfo {
    id: string
    login: string
    avatarUrl: string | null
    displayName: string
}

export interface IUsersApi {
    getTokenOwner(token: string): Promise<IUserInfo>
}
