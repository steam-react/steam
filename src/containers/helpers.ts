import { TProductPriceInfo } from '../reducers/products'
import { TStorePriceInfoProps } from '../components/StorePriceInfo'

export type isNotFalse = <T>(x: T | false) => x is T;

// TODO: localization needed

const formatPrice = (price: number, currency: string) => `${price} ${currency}`
const formatDiscount = (discount: number) => `-${discount}%`

export const preparePiceInfo = (p: TProductPriceInfo) => {
    switch (p.type) {
        case 'normal':
            return {
                type: 'normal',
                price: formatPrice(p.price, p.currency),
            } as TStorePriceInfoProps;
        case 'discount':
            return {
                type: 'discount',
                priceOriginal: formatPrice(p.priceOriginal, p.currency),
                priceFinal: formatPrice(p.priceFinal, p.currency),
                discount: formatDiscount(p.discount),
            } as TStorePriceInfoProps;
        case 'free':
            return {
                type: 'free' as 'free'
            }
        default:
            throw new Error('Unknown price type')
    }
}
