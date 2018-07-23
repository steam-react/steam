import * as React from 'react'
import * as styles from './styles.css'
import { classnames } from '../common/helpers'
import { TStorePriceInfoProps, StorePriceInfo } from '../StorePriceInfo'

export interface IStoreCapsuleSProps {
    className?: string
    href: string
    picture: string
    priceInfo: TStorePriceInfoProps
}

export const StoreCapsuleS = (p: IStoreCapsuleSProps) => (
    <a href={p.href} className={classnames(p.className, styles.StoreCapsuleS)}>
        <img className={styles.picture} src={p.picture} />
        <div className={styles.info}>
            <StorePriceInfo {...p.priceInfo} />
        </div>
    </a>
)
