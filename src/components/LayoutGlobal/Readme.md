```js
{
    // In application, data will be passed from redux store
    // by container components

    var languages = [
        {id: 'english', caption: 'English', isActive: true},
        {id: 'bulgarian', caption: 'Български (Bulgarian)'},
        {id: 'czech', caption: 'čeština (Czech)'},
        {id: 'russian', caption: 'Русский (Russian)'},
    ]

    var notifications = {
        comments: 1,
        items: 1,
        invites: 0,
        gifts: 0,
        messages: 0,
    }

    var userId='mvasiliev'
    var userDisplayName='Max-at-work'
    var userPic='/avatars/maxatwork_medium.jpg'

    // "Container components" with data from redux store

    var globalActions = (<GlobalActions
        languages={languages}
        notifications={notifications}
        userId={userId}
        userPic={userPic}
    />)

    var navigation = (<NavigationGlobal
        userId={userId}
        userDisplayName={userDisplayName}
    />)
}

<LayoutGlobal navigation={navigation} actions={globalActions}>
    <div style={{backgroundColor: '#999', color: '#000', minHeight: '800px'}}>
        Content
    </div>
</LayoutGlobal>
```
