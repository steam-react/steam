Additional recommendations block (under footer)

There are several types of recommendations:
 - two in a row (as far as I understand that's for some "primary" tag choosen for recommendations)
 - four in a row (for the "secondary" tag)
 - then several rows of one game in a row (similar to games in wishlist?)


### Empty and loading

```js
<StoreAdditional pages={[]} isLoading={true} />
```

### Non empty

```js
{
    var itemsTagPrimary = [
        {
            name: 'Portal 2',
            picture: '/screenshots/portal2_00.jpg',
            href: '#',
            priceInfo: {
                type: 'discount',
                priceOriginal: '$29.99',
                priceFinal: '$9.99',
                discount: '-60%',
            }
        },
        {
            name: 'Half-life',
            picture: '/screenshots/hl1_00.jpg',
            href: '#',
            priceInfo: {
                type: 'normal',
                price: '$29.99',
            }
        },
    ];

    var itemsTagSecondary = [
        {
            name: 'Portal 2',
            picture: '/screenshots/portal2_00.jpg',
            href: '#',
            priceInfo: {
                type: 'discount',
                priceOriginal: '$29.99',
                priceFinal: '$9.99',
                discount: '-60%',
            }
        },
        {
            name: 'Portal 2',
            picture: '/screenshots/portal2_00.jpg',
            href: '#',
            priceInfo: {
                type: 'discount',
                priceOriginal: '$29.99',
                priceFinal: '$9.99',
                discount: '-60%',
            }
        },
        {
            name: 'Portal 2',
            picture: '/screenshots/portal2_00.jpg',
            href: '#',
            priceInfo: {
                type: 'discount',
                priceOriginal: '$29.99',
                priceFinal: '$9.99',
                discount: '-60%',
            }
        },
        {
            name: 'Portal 2',
            picture: '/screenshots/portal2_00.jpg',
            href: '#',
            priceInfo: {
                type: 'discount',
                priceOriginal: '$29.99',
                priceFinal: '$9.99',
                discount: '-60%',
            }
        },
    ];

    var itemsSimilar = [
        {
        name: "Half-Life 3",
            href: "#details/half-life3",
            lookalikeHref: "#like/half-life3",
            reason: "Since you recently played",
            reasonItem: "Half-Life",
            reasonHref: "#details/half-life",
            priceInfo: {
                type: 'discount',
                priceOriginal: '$29.99',
                priceFinal: '$9.99',
                discount: '-66%',
            },
            pictures: [
                {url: '/screenshots/hl3_00.jpg', href: '#details/half-life3'},
                {url: '/screenshots/hl3_01.jpg', href: '#details/half-life3'},
                {url: '/screenshots/hl3_02.jpg', href: '#details/half-life3'},
                {url: '/screenshots/hl3_03.jpg', href: '#details/half-life3'},
            ],
        },
        {
        name: "Half-Life 3",
            href: "#details/half-life3",
            lookalikeHref: "#like/half-life3",
            reason: "Since you recently played",
            reasonItem: "Half-Life",
            reasonHref: "#details/half-life",
            priceInfo: {
                type: 'discount',
                priceOriginal: '$29.99',
                priceFinal: '$9.99',
                discount: '-66%',
            },
            pictures: [
                {url: '/screenshots/hl3_00.jpg', href: '#details/half-life3'},
                {url: '/screenshots/hl3_01.jpg', href: '#details/half-life3'},
                {url: '/screenshots/hl3_02.jpg', href: '#details/half-life3'},
                {url: '/screenshots/hl3_03.jpg', href: '#details/half-life3'},
            ],
        },
    ];

}

<StoreAdditional
    pages={[
        {
            tagPrimary: {
                title: 'Action games',
                description: 'Due to your recent playtime in other Action games',
                href: '#',
                items: itemsTagPrimary,
            },
            tagSecondary: {
                title: 'FPS games',
                description: 'Due to your recent playtime in other FPS games',
                items: itemsTagSecondary,
            },
            similar: itemsSimilar,
        },
    ]}
/>
```
### Non empty, loading

```js
{
    var itemsTagPrimary = [
        {
            name: 'Portal 2',
            picture: '/screenshots/portal2_00.jpg',
            href: '#',
            priceInfo: {
                type: 'discount',
                priceOriginal: '$29.99',
                priceFinal: '$9.99',
                discount: '-60%',
            }
        },
        {
            name: 'Half-life',
            picture: '/screenshots/hl1_00.jpg',
            href: '#',
            priceInfo: {
                type: 'normal',
                price: '$29.99',
            }
        },
    ];

    var itemsTagSecondary = [
        {
            name: 'Portal 2',
            picture: '/screenshots/portal2_00.jpg',
            href: '#',
            priceInfo: {
                type: 'discount',
                priceOriginal: '$29.99',
                priceFinal: '$9.99',
                discount: '-60%',
            }
        },
        {
            name: 'Portal 2',
            picture: '/screenshots/portal2_00.jpg',
            href: '#',
            priceInfo: {
                type: 'discount',
                priceOriginal: '$29.99',
                priceFinal: '$9.99',
                discount: '-60%',
            }
        },
        {
            name: 'Portal 2',
            picture: '/screenshots/portal2_00.jpg',
            href: '#',
            priceInfo: {
                type: 'discount',
                priceOriginal: '$29.99',
                priceFinal: '$9.99',
                discount: '-60%',
            }
        },
        {
            name: 'Portal 2',
            picture: '/screenshots/portal2_00.jpg',
            href: '#',
            priceInfo: {
                type: 'discount',
                priceOriginal: '$29.99',
                priceFinal: '$9.99',
                discount: '-60%',
            }
        },
    ];

    var itemsSimilar = [
        {
        name: "Half-Life 3",
            href: "#details/half-life3",
            lookalikeHref: "#like/half-life3",
            reason: "Since you recently played",
            reasonItem: "Half-Life",
            reasonHref: "#details/half-life",
            priceInfo: {
                type: 'discount',
                priceOriginal: '$29.99',
                priceFinal: '$9.99',
                discount: '-66%',
            },
            pictures: [
                {url: '/screenshots/hl3_00.jpg', href: '#details/half-life3'},
                {url: '/screenshots/hl3_01.jpg', href: '#details/half-life3'},
                {url: '/screenshots/hl3_02.jpg', href: '#details/half-life3'},
                {url: '/screenshots/hl3_03.jpg', href: '#details/half-life3'},
            ],
        },
        {
        name: "Half-Life 3",
            href: "#details/half-life3",
            lookalikeHref: "#like/half-life3",
            reason: "Since you recently played",
            reasonItem: "Half-Life",
            reasonHref: "#details/half-life",
            priceInfo: {
                type: 'discount',
                priceOriginal: '$29.99',
                priceFinal: '$9.99',
                discount: '-66%',
            },
            pictures: [
                {url: '/screenshots/hl3_00.jpg', href: '#details/half-life3'},
                {url: '/screenshots/hl3_01.jpg', href: '#details/half-life3'},
                {url: '/screenshots/hl3_02.jpg', href: '#details/half-life3'},
                {url: '/screenshots/hl3_03.jpg', href: '#details/half-life3'},
            ],
        },
    ];

}

<StoreAdditional
    isLoading={true}
    pages={[
        {
            tagPrimary: {
                title: 'Action games',
                description: 'Due to your recent playtime in other Action games',
                href: '#',
                items: itemsTagPrimary,
            },
            tagSecondary: {
                title: 'FPS games',
                description: 'Due to your recent playtime in other FPS games',
                items: itemsTagSecondary,
            },
            similar: itemsSimilar,
        },
    ]}
/>
```
