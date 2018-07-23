import { applyMiddleware, compose, createStore as reduxCreateStore } from 'redux'
import createSagaMiddleware from 'redux-saga'
import reducers from './reducers'
import mainSaga from './sagas'
import { IStoreApi } from './services/store'
import { IAuthApi } from './services/auth'
import { IUsersApi } from './services/users'

export function createStore(
    history: any,
    composeEnhancers = compose,
    preloadedState = {},
    storeApi: IStoreApi,
    authApi: IAuthApi,
    usersApi: IUsersApi,
) {
    const sagaMiddleware = createSagaMiddleware()

    const store = reduxCreateStore(
        reducers,
        preloadedState,
        composeEnhancers(
            applyMiddleware(sagaMiddleware)
        )
    )

    sagaMiddleware.run(mainSaga(history, storeApi, authApi, usersApi))

    return store
}
