/* istanbul ignore file */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import registerServiceWorker from './registerServiceWorker'
import { compose } from 'redux'
import { App } from './containers/App'
import createBrowserHistory from 'history/createBrowserHistory'
import { Router } from 'react-router'
import { Provider } from 'react-redux'
import { createStore } from './store'
import { mockStoreApi } from './services/store.mock'
import { mockAuthApi } from './services/auth.mock'
import { mockUsersApi } from './services/users.mock'
import { getRoutes } from './routes'
import { matchRoutes } from 'react-router-config'

declare global {
    interface Window {
        __PRELOADED_STATE__: any
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any
    }
}

const composeEnhancers = (typeof window != 'undefined')
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
    : compose

const routes = getRoutes(mockStoreApi)
const history = createBrowserHistory()

let preloadedState = {}

if (typeof window != 'undefined' && window.__PRELOADED_STATE__) {
    preloadedState = window.__PRELOADED_STATE__
    delete window.__PRELOADED_STATE__

}

if (typeof document != 'undefined') {
    document.addEventListener('click', (e) => {
        const el = e.target as HTMLAnchorElement;

        if (el && el.tagName && el.tagName === 'A') {
            if (
                el.host === location.host
                && matchRoutes(routes, el.pathname).length > 0
            ) {
                e.preventDefault();
                history.push(el.pathname);
            }
        }
    })
}

ReactDOM.render(
    <Provider store={createStore(
        history,
        composeEnhancers,
        preloadedState,
        mockStoreApi,
        mockAuthApi,
        mockUsersApi,
    )}>
        <Router history={history}>
            <App routes={routes} />
        </Router>
    </Provider>,
    document.getElementById('root') as HTMLElement
);

registerServiceWorker();
