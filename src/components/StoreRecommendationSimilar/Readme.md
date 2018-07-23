```js
<div style={{backgroundColor: '#1c202a',padding: '30px' }}>
<StoreRecommendationSimilar
    name="Half-Life 3"
    href="#details/half-life3"
    lookalikeHref="#like/half-life3"
    reason="Since you recently played"
    reasonItem="Half-Life"
    reasonHref="#details/half-life"
    priceInfo={{
        type: 'discount',
        priceOriginal: '$29.99',
        priceFinal: '$9.99',
        discount: '-66%',
    }}
    pictures={[
        {url: '/screenshots/hl3_00.jpg', href: '#details/half-life3'},
        {url: '/screenshots/hl3_01.jpg', href: '#details/half-life3'},
        {url: '/screenshots/hl3_02.jpg', href: '#details/half-life3'},
        {url: '/screenshots/hl3_03.jpg', href: '#details/half-life3'},
    ]}
    onAddToWhishlistClick={() => alert('Add to Wishlist clicked')}
    onNotInterestedClick={() => alert('Not interested clicked')}
/>
</div>
```
