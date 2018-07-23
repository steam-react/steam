import * as React from 'react'
import * as styles from './styles.css'

export const StoreThrobber: React.SFC = () => (
    <div className={styles.StoreThrobber}>
        <div className={styles.bar} />
        <div className={styles.bar} />
        <div className={styles.bar} />
    </div>
)
