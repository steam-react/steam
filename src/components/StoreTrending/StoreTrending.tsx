import * as React from 'react'
import * as styles from './styles.css'
import { classnames, splitArray } from '../common/helpers'
import { Carousel } from '../Carousel'
import { IStoreCapsuleXSProps, StoreCapsuleXS } from '../StoreCapsuleXS'

export interface IStoreTrendingProps {
    className?: string
    items: IStoreCapsuleXSProps[]
}

export const StoreTrending = (p: IStoreTrendingProps) => (
    <section className={classnames(
        p.className,
        styles.StoreTrending,
    )}>
        <header className={styles.header}>Trending among friends</header>
        <Carousel>
            {
                splitArray(4, p.items).map((page, i) => (
                    <div key={i} className={styles.page}>
                        {page.map((item, j) => (
                            <StoreCapsuleXS
                                className={styles.item}
                                key={j}
                                {...item} />
                        ))}
                    </div>
                ))
            }
        </Carousel>
    </section>
)
