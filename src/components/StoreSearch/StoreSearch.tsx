import * as React from 'react'

import * as styles from './styles.css'

import { classnames } from '../common/helpers'

interface IStoreSearchProps {
    className?: string
}

export const StoreSearch = (p: IStoreSearchProps) => (
    <form action="https://store.steampowered.com/search/" method="GET" className={classnames(styles.StoreSearch, p.className)}>
        <input
            name="term"
            type="search"
            className={styles.input}
            placeholder="search the store" />
        <button type="submit" className={styles.button} />
    </form>
)
