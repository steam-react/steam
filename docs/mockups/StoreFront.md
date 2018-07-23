## Logged out

```js
    const data = require('./dataStoreFront')

    var globalActionsLoggedIn = (<GlobalActions
        languages={data.languages}
        notifications={data.notifications}
    />)

    var navigationLoggedIn = (<NavigationGlobal
    />)

;<LayoutGlobal navigation={navigationLoggedIn} actions={globalActionsLoggedIn}>
    <LayoutStoreFront
        header={<HeaderStore />}
        gutter={<StoreGutter />}
    >
        <StoreFeatured items={data.featuredItems} />
        <StoreSpecialOffers items={data.specialOffersItems} />
    </LayoutStoreFront>
</LayoutGlobal>
```

## Logged in

```js
    const data = require('./dataStoreFront')

    var globalActionsLoggedIn = (<GlobalActions
        languages={data.languages}
        notifications={data.notifications}
        userId={data.userId}
        userPic={data.userPic}
    />)

    var navigationLoggedIn = (<NavigationGlobal
        userId={data.userId}
        userDisplayName={data.userDisplayName}
    />)

;<LayoutGlobal navigation={navigationLoggedIn} actions={globalActionsLoggedIn}>
    <LayoutStoreFront
        header={<HeaderStore />}
        gutter={<StoreGutter />}
    >
        <StoreFeatured items={data.featuredItems} />
        <StoreSpecialOffers items={data.specialOffersItems} />
    </LayoutStoreFront>
</LayoutGlobal>
```
