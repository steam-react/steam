import * as React from 'react'
import * as styles from './styles.css'
import { classnames, splitArray } from '../common/helpers'
import { IStoreCapsuleMProps, StoreCapsuleM } from '../StoreCapsuleM'
import { IStoreCapsuleSProps, StoreCapsuleS } from '../StoreCapsuleS'
import { Carousel } from '../Carousel'

interface ISpotlightItemProps extends IStoreCapsuleMProps {
    type: 'spotlight'
}

interface INormalItemProps extends IStoreCapsuleSProps {
    type: 'normal'
}

export type TItemProps = ISpotlightItemProps | INormalItemProps

export interface IStoreSpecialOffersProps {
    className?: string
    items: TItemProps[]
}

const ItemCapsule = (p: TItemProps) => {
    switch (p.type) {
        case 'spotlight':
            return (<StoreCapsuleM className={styles.spotlight} {...(p as IStoreCapsuleMProps)} />)

        case 'normal':
            return (<StoreCapsuleS className={styles.normal} {...(p as IStoreCapsuleSProps)} />)

        default:
            throw new Error(`Unknown item type ${JSON.stringify(p)}`)
    }
}

const getPages = (items: TItemProps[]) => {
    const spotLightsPerPage = 3
    const normalPerSpotlight = 2

    const spotlightItems = items.filter(x => x.type === 'spotlight')
    const normalItems = items.filter(x => x.type === 'normal')

    let pages: TItemProps[][] = []

    pages = splitArray(3, spotlightItems) as TItemProps[][]

    const lastPage = pages[pages.length - 1]
    if (lastPage.length < 3) {
        lastPage.push.apply(lastPage, normalItems.splice(
            0,
            (spotLightsPerPage - lastPage.length) * normalPerSpotlight
        ))
    }

    pages.push.apply(
        pages,
        splitArray(spotLightsPerPage * normalPerSpotlight, normalItems)
    )

    return pages
}

export const StoreSpecialOffers = (p: IStoreSpecialOffersProps) => (
    <section className={classnames(p.className, styles.StoreSpecialOffers)}>
        <header className={styles.header}>Special offers</header>
        <Carousel>
            {
                getPages(p.items).map((page, i) => (
                    <div key={i} className={styles.page}>
                        {page.map((item, j) => (
                            <ItemCapsule key={j} {...item} />
                        ))}
                    </div>
                ))
            }
        </Carousel>
    </section>
)
