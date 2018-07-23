import * as React from 'react'
import * as styles from './styles.css'
import { classnames } from '../common/helpers'
import { TStorePriceInfoProps, StorePriceInfo } from '../StorePriceInfo'

export interface IStoreCapsuleMProps {
    className?: string
    name: string
    href: string
    picture: string
    body: string
    priceInfo: TStorePriceInfoProps
}

export const StoreCapsuleM = (p: IStoreCapsuleMProps) => (
    <a className={classnames(p.className, styles.StoreCapsuleM)} href={p.href}>
        <img className={styles.picture} src={p.picture} />
        <div className={styles.info}>
            <h2 className={styles.name}>{p.name}</h2>
            <p className={styles.body}>{p.body}</p>
            <StorePriceInfo {...p.priceInfo} />
        </div>
    </a>
)
