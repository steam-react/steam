Normal price

```js
<StoreCapsuleM
    name="Free weekend"
    href="#"
    body="Play for free until Sunday at 1PM Pacific Time"
    picture="/screenshots/spotlight_image.jpg"
    priceInfo={{
        type: 'normal',
        price: 29.99,
        currency: '$'
    }}
/>
```

Discount price

```js
<StoreCapsuleM
    name="Free weekend"
    href="#"
    body="Play for free until Sunday at 1PM Pacific Time"
    picture="/screenshots/spotlight_image.jpg"
    priceInfo={{
        type: 'discount',
        priceOriginal: 29.99,
        priceFinal: 9.99,
        currency: '$',
        discount: '-66%',
    }}
/>
```
