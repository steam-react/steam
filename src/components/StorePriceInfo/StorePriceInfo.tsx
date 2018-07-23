import * as React from 'react'
import * as styles from './styles.css'

import { classnames } from '../common/helpers'

export type TStorePriceInfoProps = IStorePriceInfoNormalProps
    | IStorePriceInfoDiscountProps
    | IStorePriceInfoFreeProps

export interface IStorePriceInfoFreeProps {
    type: 'free'
    size?: 'm' | 's'
}

export interface IStorePriceInfoNormalProps {
    type: 'normal'
    price: string
    size?: 'm' | 's'
}

export interface IStorePriceInfoDiscountProps {
    type: 'discount'
    priceOriginal: string
    priceFinal: string
    discount: string
    size?: 'm' | 's'
}

const sizeClasses = {
    'm': styles.sizeM,
    's': styles.sizeS,
}

const getSizeClass = (size: string | null | undefined) => size
    ? sizeClasses[size]
    : sizeClasses.m

const PriceNormal = (p: IStorePriceInfoNormalProps) => (
    <div className={classnames(styles.StorePriceInfoNormal, getSizeClass(p.size))}>
        {p.price}
    </div>
)

const PriceDiscount = (p: IStorePriceInfoDiscountProps) => (
    <div className={classnames(styles.StorePriceInfoDiscount, getSizeClass(p.size))}>
        <div className={styles.discount}>{p.discount}</div>
        <div className={styles.prices}>
            <div className={styles.priceOriginal}>{p.priceOriginal}</div>
            <div className={styles.priceFinal}>{p.priceFinal}</div>
        </div>
    </div>
)

const PriceFree = (p: IStorePriceInfoFreeProps) => (
    <div className={classnames(styles.StorePriceInfoNormal, getSizeClass(p.size))}>
        Free
    </div>
)

export const StorePriceInfo = (p: TStorePriceInfoProps) => {
    switch (p.type) {
        case 'normal':
            return (<PriceNormal {...(p as IStorePriceInfoNormalProps)} />)
        case 'discount':
            return (<PriceDiscount {...(p as IStorePriceInfoDiscountProps)} />)
        case 'free':
            return (<PriceFree {...(p as IStorePriceInfoFreeProps)} />)
        default:
            throw new Error(`Unknown price type`)
    }
}
