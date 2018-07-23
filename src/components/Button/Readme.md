### Button

Usual button. Can be in s, m or l size.

```js
<Button caption="Press me (s)" size="s"/>
<span> </span>
<Button caption="Press me (m)" size="m"/>
<span> </span>
<Button caption="Press me (l)" size="l"/>
```

### Secondary button

Less distinctive than normal

```js
<Button type="secondary" size="s" caption="Press me (s)" href="#" />
<span> </span>
<Button type="secondary" size="m" caption="Press me (m)" href="#" />
<span> </span>
<Button type="secondary" size="l" caption="Press me (l)" href="#" />
<span> </span>
```

### Action button

More distinctive than normal

```js
<Button type="action" caption="Press me (s)" size="s" />
<span> </span>
<Button type="action" caption="Press me (m)" size="m" />
<span> </span>
<Button type="action" caption="Press me (l)" size="l" />
<span> </span>
```

### Minor button

Less distinctive than secondary button

```js
<Button type="minor" caption="Press me (s)" size="s" />
<span> </span>
<Button type="minor" caption="Press me (m)" size="m" />
<span> </span>
<Button type="minor" caption="Press me (l)" size="l" />
<span> </span>
```

### Uppercase button

```js
<p>
<Button type="secondary" uppercase size="s" caption="Press me" href="#" />
<span> </span>
<Button type="normal" uppercase size="s" caption="Press me" href="#" />
<span> </span>
<Button type="action" uppercase size="s" caption="Press me" href="#" />
<span> </span>
<Button type="minor" uppercase caption="Press me" size="s" />
</p>
<p>
<Button type="secondary" uppercase size="m" caption="Press me" href="#" />
<span> </span>
<Button type="normal" uppercase size="m" caption="Press me" href="#" />
<span> </span>
<Button type="action" uppercase size="m" caption="Press me" href="#" />
<span> </span>
<Button type="minor" uppercase caption="Press me" size="m" />
</p>
<p>
<Button type="secondary" uppercase size="l" caption="Press me" href="#" />
<span> </span>
<Button type="normal" uppercase size="l" caption="Press me" href="#" />
<span> </span>
<Button type="action" uppercase size="l" caption="Press me" href="#" />
<span> </span>
<Button type="minor" uppercase caption="Press me" size="l" />
</p>
```

### Button with icon

For complete icons list see `components/icons/styles.css`

```js
<p>
<Button type="normal" caption="Press me" icon="EnvelopeBefore" size="s" />
<span> </span>
<Button type="normal" caption="" icon="EnvelopeBefore" size="s" />
</p>
<p>
<Button type="normal" caption="Press me" icon="EnvelopeBefore" size="m" />
<span> </span>
<Button type="normal" caption="" icon="EnvelopeBefore" size="m" />
</p>
<p>
<Button type="normal" caption="Press me" icon="EnvelopeBefore" size="l" />
<span> </span>
<Button type="normal" caption="" icon="EnvelopeBefore" size="l" />
</p>
```
