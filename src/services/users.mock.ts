import { IUserInfo, IUsersApi } from './users'

export const mockUsersApi: IUsersApi = {
    getTokenOwner(token: string): Promise<IUserInfo> {
        if (token === 'test_token') {
            return Promise.resolve({
                id: '1',
                login: 'test',
                avatarUrl: 'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/d9/d956bc4013e234d687e01e910297bd80cde68345_medium.jpg',
                displayName: 'Test User',
            })
        }
        return Promise.reject(new Error('Not found'))
    }
}
