import * as React from 'react'
import * as styles from './styles.css'
import { TStorePriceInfoProps } from '../StorePriceInfo'
import { StoreCapsuleRecommendation } from '../StoreCapsuleRecommendation'
import { Button } from '../Button'

export interface IStoreRecommendationSimilarProps {
    className?: string
    name: string
    href: string
    lookalikeHref: string
    reason: string
    reasonItem: string
    reasonHref: string
    priceInfo: TStorePriceInfoProps
    pictures: IPictureDescription[]
    onAddToWhishlistClick?: React.MouseEventHandler<any>
    onNotInterestedClick?: React.MouseEventHandler<any>
}

interface IPictureDescription {
    href: string
    url: string
}

interface IPicturesProps {
    pictures: IPictureDescription[]
}

class PicturesBox extends React.Component<IPicturesProps> {
    constructor(p: IPicturesProps) {
        super(p)
    }

    public render() {
        const p = this.props
        return (
            <div className={styles.PicturesBox}>
                {p.pictures.map(picture => (
                    <a key={picture.url} className={styles.pictureLink} href={picture.href}>
                        <img
                            className={styles.picture}
                            src={picture.url}
                        />
                    </a>
                ))}
            </div>
        )
    }
}

export const StoreRecommendationSimilar = (p: IStoreRecommendationSimilarProps) => (
    <div className={styles.StoreRecommendationSimilar}>
        <div className={styles.productLink}>
            <div className={styles.name}>{p.name}</div>
            <div className={styles.reason}>{p.reason} <a className={styles.reasonLink} href={p.reasonHref}>{p.reasonItem}</a></div>
            <div className='pictures'>
                <StoreCapsuleRecommendation
                    className={styles.capsule}
                    size="m"
                    href={p.href}
                    picture={p.pictures[0].url}
                    priceInfo={p.priceInfo}
                />
                <PicturesBox pictures={p.pictures.slice(1)} />
            </div>
        </div>
        <div className={styles.buttons}>
            <Button className={styles.btnVisit} size="s" caption="Visit product page" />
            <Button className={styles.btnAddToWishlist} size="s" caption="Add to your wishlist" />
            <Button className={styles.btnNotInterested} size="s" caption="Not interested" />
            <Button className={styles.btnFindMore} size="s" caption="Find more like this" />
        </div>
    </div>
)
