import * as React from 'react'
import * as styles from './styles.css'
import { Button } from '../Button'

export interface IDiscoveryQueueProps {
    pictures: string[]
    href: string
}

export const StoreDiscoveryQueue = (p: IDiscoveryQueueProps) => (
    <div className={styles.StoreDiscoveryQueue}>
        <header className={styles.header}>
            Your Discovery Queue
            <Button
                className={styles.btnLearnMore}
                type="minor"
                size="s"
                uppercase={true}
                caption="Learn more" href="#" />
        </header>
        <div className={styles.content}>
            <a href={p.href} className={styles.link}>
                <div className={styles.arrow}>
                    Click here to begin exploring your queue
                </div>
            </a>
            <div className={styles.pictures}>
                {p.pictures.map(url => (
                    <img key={url} className={styles.picture} src={url} />
                ))}
            </div>
        </div>
    </div>
)
