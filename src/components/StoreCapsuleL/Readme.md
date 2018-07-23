Short product name

```js
{
    var pictures = [
        '/screenshots/hl3_00.jpg',
        '/screenshots/hl3_01.jpg',
        '/screenshots/hl3_02.jpg',
        '/screenshots/hl3_03.jpg',
        '/screenshots/hl3_04.jpg',
    ];
}

<StoreCapsuleL
    href="#"
    name="Half-Life 3"
    priceInfo={{
        type: 'normal',
        price: '$29.99',
    }}
    pictures={pictures}
    platforms={['windows', 'mac']}
    reason={{type: 'by_tags', tags: ['Action', 'FPS', 'Multiplayer']}}
/>
```

Long product name

```js
{
    var pictures = [
        '/screenshots/hl3_00.jpg',
        '/screenshots/hl3_01.jpg',
        '/screenshots/hl3_02.jpg',
        '/screenshots/hl3_03.jpg',
        '/screenshots/hl3_04.jpg',
    ];
}

<StoreCapsuleL
    href="#"
    name="Half-Life 3: There and Back Again"
    pictures={pictures}
    priceInfo={{
        type: 'normal',
        price: '$29.99',
    }}
    platforms={['mac', 'linux']}
    reason={{type: 'by_curator', name: 'IGN'}}
/>
```

No pictures

```js
{
    var pictures = [
        '/screenshots/hl3_00.jpg',
    ];
}

<StoreCapsuleL
    href="#"
    name="Half-Life 3: There and Back Again"
    priceInfo={{
        type: 'normal',
        price: '$29.99',
    }}
    pictures={pictures}
    platforms={['mac', 'linux']}
    reason={{type: 'by_tags', tags: ['Action', 'FPS', 'Multiplayer']}}
/>
```
<p><span style="font-size: 10px;">Concept art by [Shane Baxley](https://www.shanebaxley.com/)</span></p>

