import * as React from 'react'
import * as styles from './styles.css'

import {
    IStoreCapsuleRecommendationProps,
    StoreCapsuleRecommendation,
} from '../StoreCapsuleRecommendation'

type TTagType = 'primary' | 'secondary'

export interface IStoreRecommendationTagProps {
    className?: string
    type: TTagType
    href: string
    title: string
    description: string
    items: IStoreCapsuleRecommendationProps[]
}

const itemsSizes = {
    'primary': 'l' as 'l',
    'secondary': 's' as 's',
}

const Items = (p: IStoreRecommendationTagProps) => (
    <>
        {
            p.items.map((item, i) => (
                <StoreCapsuleRecommendation
                    size={itemsSizes[p.type]}
                    key={i}
                    {...item}
                />
            ))
        }
    </>
)

export const StoreRecommendationTag = (p: IStoreRecommendationTagProps) => (
    <section className={styles.StoreRecommendationTag}>
        <header>
            <a href={p.href} className={styles.tagName}>{p.title}</a>
            <span className={styles.tagDescription}>{p.description}</span>
        </header>
        <div>
            <Items {...p} />
        </div>
    </section>
)
