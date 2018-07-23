Store front page layout, better view in expanded mode (because of media queries).

### Without takeover

```js
<LayoutStoreFront
    header={<HeaderStore />}
    gutter={<StoreGutter />}
>
    <div style={{backgroundColor: '#999', color: '#000', minHeight: '800px'}}>
        Content
    </div>
</LayoutStoreFront>
```

### With takeover

```js
<LayoutStoreFront
    header={<HeaderStore />}
    gutter={<StoreGutter />}
    hasTakeover
    takeoverPic="/devolver_promo.jpg"
    takeoverHref="#"
>
    <div style={{backgroundColor: '#999', color: '#000', minHeight: '800px'}}>
        Content
    </div>
</LayoutStoreFront>
```

