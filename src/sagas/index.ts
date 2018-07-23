import { router } from 'redux-saga-router'
import { fork, put } from 'redux-saga/effects'
import { IStoreApi } from '../services/store'
import { IAuthApi } from '../services/auth'
import { IUsersApi } from '../services/users'
import { getRoutes } from '../routes'
import { authSaga } from './auth'
import { History } from 'history'
import { actions as languagesActions } from '../reducers/languages'

export default (history: History, storeApi: IStoreApi, authApi: IAuthApi, usersApi: IUsersApi) => {
    const routes = getRoutes(storeApi)
    const routeSettings = routes.map(route => ({
        pattern: route.path,
        handler: route.saga,
    }))

    return function* () {
        yield put(languagesActions.set([
            { id: 'english', caption: 'English' },
            { id: 'bulgarian', caption: 'Български (Bulgarian)' },
            { id: 'czech', caption: 'čeština (Czech)' },
            { id: 'russian', caption: 'Русский (Russian)' },
        ]))
        yield fork(authSaga, history, authApi, usersApi)
        yield fork(router, history, routeSettings)
    }
}
