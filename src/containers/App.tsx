import * as React from 'react'
import { LayoutGlobal } from '../components/LayoutGlobal'
import { NavigationGlobal } from '../components/NavigationGlobal'
import GlobalActions from './GlobalActions'
import { Route, Switch } from 'react-router-dom'
import { TRouterSettings } from '../routes'

export const App = ({ routes }: { routes: TRouterSettings }) => {
    const routeSettings = routes.map(({ path, component, exact }, i) =>
        <Route key={i + 'ROUTE_'} exact={exact} path={path} component={component} />
    )
    // const redirects = routeOptions.redirects.map(({ from, to, status }, i) =>
    // <RedirectWithStatus key={Math.random() + 'REDIRECT_'} from={from} to={to} status={status} />
    // )
    return (
        <LayoutGlobal
            navigation={<NavigationGlobal />}
            actions={<GlobalActions />}
        >
            <Switch>
                {routeSettings}
            </Switch>
        </LayoutGlobal>
    )
}
