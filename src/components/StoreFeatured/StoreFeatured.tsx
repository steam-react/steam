import * as React from 'react'
import * as styles from './styles.css'
import { classnames } from '../common/helpers'
import { Carousel } from '../Carousel'
import { IStoreCapsuleLProps, StoreCapsuleL } from '../StoreCapsuleL'

export interface IStoreFeaturedProps {
    className?: string
    items: IStoreCapsuleLProps[]
}

export const StoreFeatured = (p: IStoreFeaturedProps) => (p.items && p.items.length > 0)
    ? (
        <section className={classnames(styles.StoreFeatured, p.className)}>
            <header className={styles.header}>Featured & Recommended</header>
            <Carousel autoAdvance={true}>
                {p.items.map((item, i) => (
                    <StoreCapsuleL {...{ key: i, ...item }} />
                ))}
            </Carousel>
        </section>
    )
    : null
