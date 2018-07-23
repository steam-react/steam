import * as React from 'react'
import { SagaIterator } from 'redux-saga'
import { storeFrontSaga } from './sagas/storeFront'
import StoreFront from './containers/StoreFront'
import LoginPage from './containers/LoginPage'
import { IStoreApi } from './services/store'

export interface IRouteSettings {
    path: string
    component: () => React.ReactElement<any>
    exact: boolean
    saga: () => SagaIterator
}

export type TRouterSettings = IRouteSettings[]

export const getRoutes = (storeApi: IStoreApi): TRouterSettings => ([
    {
        path: '/',
        component: StoreFront,
        exact: true,
        saga: storeFrontSaga(storeApi),
    },
    {
        path: '/login/',
        component: LoginPage,
        exact: true,
        saga: storeFrontSaga(storeApi),
    },
])
