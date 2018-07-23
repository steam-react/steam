```js
const data = require('./dataStoreFront')
var globalActionsLoggedIn = (<GlobalActions
    languages={data.languages}
    notifications={data.notifications}
/>)

var navigationLoggedIn = (<NavigationGlobal
/>)

;<LayoutGlobal navigation={navigationLoggedIn} actions={globalActionsLoggedIn}>
    <LayoutStore header={<HeaderStore />}>
        <LoginForm />
    </LayoutStore>
</LayoutGlobal>
```
