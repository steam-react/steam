```js
{
    var item = {
        name: 'Half-life',
        href: '#',
        picture: '/screenshots/hl1_00.jpg',
        priceInfo: {
            type: 'discount',
            priceOriginal: '$29.99',
            priceFinal: '$9.99',
            discount: '-66%',
        }
    }
}

<>
<StoreRecommendationTag
    type="primary"
    title="Action games"
    href="#"
    description="Due to your recent playtime in other Action games"
    items={[
        item,
        item,
    ]}
/>

<StoreRecommendationTag
    type="secondary"
    title="Action games"
    href="#"
    description="Due to your recent playtime in other Action games"
    items={[
        item,
        item,
        item,
        item,
    ]}
/>
</>
```
