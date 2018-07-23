import * as React from 'react'
import * as styles from './styles.css'

import { StoreThrobber } from '../StoreThrobber'
import { IStoreCapsuleRecommendationProps } from '../StoreCapsuleRecommendation'
import { StoreRecommendationTag } from '../StoreRecommendationTag'
import { IStoreRecommendationSimilarProps, StoreRecommendationSimilar } from '../StoreRecommendationSimilar'
import { StoreFrontBlock } from '../StoreFrontBlock'

export interface IRecommendationTag {
    title: string
    description: string
    href: string
    items: IStoreCapsuleRecommendationProps[]
}

export interface IStoreAdditionalPage {
    tagPrimary: IRecommendationTag
    tagSecondary: IRecommendationTag
    similar: IStoreRecommendationSimilarProps[]
}

export interface IStoreAdditionalProps {
    isLoading: boolean
    pages: IStoreAdditionalPage[]
}

const Throbber = (p: { isLoading: boolean }) => p.isLoading ? (
    <div className={styles.throbber}>
        <StoreThrobber />
    </div>
) : null

const RecommendationsPage = (p: IStoreAdditionalPage) => (
    <div className='page'>
        <div className={styles.tags}>
            <StoreFrontBlock>
                <StoreRecommendationTag
                    type="primary"
                    {...p.tagPrimary} />
            </StoreFrontBlock>
            <StoreFrontBlock>
                <StoreRecommendationTag
                    type="secondary"
                    {...p.tagSecondary} />
            </StoreFrontBlock>
        </div>
        <div className={styles.similar}>
            <StoreFrontBlock>
                {
                    p.similar.map((item, i) => (
                        <StoreRecommendationSimilar key={i}
                            {...item}
                        />
                    ))
                }
            </StoreFrontBlock>
        </div>
    </div>
)

export const StoreAdditional = (p: IStoreAdditionalProps) => (
    <div className={styles.StoreAdditional}>
        {
            p.pages.map((page, i) => (
                <RecommendationsPage key={i} {...page} />
            ))
        }
        <StoreFrontBlock className={styles.throbber}>
            <Throbber isLoading={p.isLoading} />
        </StoreFrontBlock>
    </div>
)
