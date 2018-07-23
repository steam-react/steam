Not logged in

```js
{
    var languages = [
        {id: 'english', caption: 'English', isActive: true},
        {id: 'bulgarian', caption: 'Български (Bulgarian)'},
        {id: 'czech', caption: 'čeština (Czech)'},
        {id: 'russian', caption: 'Русский (Russian)'},
    ]
}

<GlobalActions languages={languages} />
```


Logged in, no notifications

```js
{
    var languages = [
        {id: 'english', caption: 'English', isActive: true},
        {id: 'bulgarian', caption: 'Български (Bulgarian)'},
        {id: 'czech', caption: 'čeština (Czech)'},
        {id: 'russian', caption: 'Русский (Russian)'},
    ]

    var notifications = {
        comments: 0,
        items: 0,
        invites: 0,
        gifts: 0,
        messages: 0,
    }
}

<GlobalActions
    languages={languages}
    notifications={notifications}
    userId="mvasiliev"
    userPic="/avatars/maxatwork_medium.jpg" />
```

Logged in, has notifications

```js
{
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
}

<GlobalActions
    languages={languages}
    notifications={notifications}
    userId="mvasiliev"
    userPic="/avatars/maxatwork_medium.jpg" />
```
