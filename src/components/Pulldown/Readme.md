```js
<div style={{display: 'flex', flexGrow: 1, justifyContent: 'space-between'}}>
    <Pulldown opens="up" align="left" caption="Pulldown">
        <div style={{'width': '120px', 'padding': '10px'}}>
            <h3>Pulldown content</h3>
            <p>Can contain any markup</p>
            <p>Opens: up, align: left</p>
        </div>
    </Pulldown>

    <Pulldown opens="down" align="left" caption="Pulldown">
        <div style={{'width': '120px', 'padding': '10px'}}>
            <h3>Pulldown content</h3>
            <p>Can contain any markup</p>
            <p>Opens: down, align: left</p>
        </div>
    </Pulldown>

    <Pulldown opens="up" align="right" caption="Pulldown">
        <div style={{'width': '120px', 'padding': '10px'}}>
            <h3>Pulldown content</h3>
            <p>Can contain any markup</p>
            <p>Opens: up, align: right</p>
        </div>
    </Pulldown>

    <Pulldown opens="down" align="right" caption="Pulldown">
        <div style={{'width': '120px', 'padding': '10px'}}>
            <h3>Pulldown content</h3>
            <p>Can contain any markup</p>
            <p>Opens: down, align: right</p>
        </div>
    </Pulldown>
</div>
<div style={{marginTop: '20px', display: 'flex', flexGrow: 1, justifyContent: 'space-between'}}>
    <Pulldown opens="right" align="top" caption="Pulldown">
        <div style={{'width': '120px', 'padding': '10px'}}>
            <h3>Pulldown content</h3>
            <p>Can contain any markup</p>
            <p>Opens: right, align: top</p>
        </div>
    </Pulldown>

    <Pulldown opens="right" align="bottom" caption="Pulldown">
        <div style={{'width': '120px', 'padding': '10px'}}>
            <h3>Pulldown content</h3>
            <p>Can contain any markup</p>
            <p>Opens: right, align: bottom</p>
        </div>
    </Pulldown>

    <Pulldown opens="left" align="top" caption="Pulldown">
        <div style={{'width': '120px', 'padding': '10px'}}>
            <h3>Pulldown content</h3>
            <p>Can contain any markup</p>
            <p>Opens: left, align: top</p>
        </div>
    </Pulldown>

    <Pulldown opens="left" align="bottom" caption="Pulldown">
        <div style={{'width': '120px', 'padding': '10px'}}>
            <h3>Pulldown content</h3>
            <p>Can contain any markup</p>
            <p>Opens: left, align: bottom</p>
        </div>
    </Pulldown>
</div>
```

### Nested pulldowns

```js
<Pulldown opens="down" align="left" caption="Pulldown">
    <div style={{width: '120px', padding: '10px'}}>
        <h3>Nested pulldown</h3>
        <Pulldown opens="right" align="top" caption="Pulldown">
            <div style={{width: '120px', padding: '10px'}}>
                <h3>Nested!</h3>
            </div>
        </Pulldown>
    </div>
</Pulldown>
```

### Any clickable element as a trigger

```js
<Pulldown opens="down" align="left" caption={<Button size="s" caption="Pulldown" />}>
    <div style={{width: '200px', padding: '10px', background: '#333', color: '#eee'}}>
        <h3>Nested pulldown</h3>
        <Pulldown opens="right" align="top" caption={<Button type="secondary" size="l" caption="Nested pulldown" />}>
            <div style={{width: '120px', padding: '10px', color: '#333'}}>
                <h3>Nested!</h3>
            </div>
        </Pulldown>
    </div>
</Pulldown>
```

### Opens on hover

```js
<Pulldown type="hover" opens="down" align="left" caption={<Button size="s" caption="Pulldown" />}>
    <div style={{width: '200px', padding: '10px', background: '#333', color: '#eee'}}>
        <h3>Nested pulldown</h3>
        <Pulldown type="hover" opens="right" align="top" caption={<Button type="secondary" size="l" caption="Nested pulldown" />}>
            <div style={{width: '120px', padding: '10px', color: '#333'}}>
                <h3>Nested!</h3>
            </div>
        </Pulldown>
    </div>
</Pulldown>
```


