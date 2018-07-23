import * as React from 'react'
import * as styles from './styles.css'
import { classnames } from '../common/helpers'
import { TStorePriceInfoProps, StorePriceInfo } from '../StorePriceInfo'

type TSize = 'l' | 'm' | 's'

export interface IStoreCapsuleRecommendationProps {
    className?: string
    size?: TSize
    name?: string
    href: string
    picture: string
    priceInfo: TStorePriceInfoProps
}

const sizeClassnames = {
    'l': styles.sizeL,
    'm': styles.sizeM,
    's': styles.sizeS,
}

const getMainClassName = (p: IStoreCapsuleRecommendationProps) =>
    classnames(
        sizeClassnames[p.size || 'l'],
        p.className,
        styles.StoreCapsuleRecommendation,
    )

export const StoreCapsuleRecommendation = (p: IStoreCapsuleRecommendationProps) => (
    <a href={p.href} className={getMainClassName(p)}>
        <img src={p.picture} className={styles.picture} />
        {
            p.name
                ? <span className={styles.name}>{p.name}</span>
                : null
        }
        <StorePriceInfo size="s" {...p.priceInfo} />
    </a>
)
