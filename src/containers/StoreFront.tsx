import * as React from 'react'
import { LayoutStoreFront } from '../components/LayoutStoreFront'
import { HeaderStore } from '../components/HeaderStore'
import { StoreGutter } from '../components/StoreGutter'
import StoreFeatured from './StoreFeatured'
import StoreSpecialOffers from './StoreSpecialOffers'
import StoreDiscoveryQueue from './StoreDiscoveryQueue'
import StoreAdditionalRecommendations from './StoreAdditionalRecommendations'

export default () => (
    <LayoutStoreFront
        header={<HeaderStore />}
        gutter={<StoreGutter />}
        moreContent={<StoreAdditionalRecommendations />}
    >
        <StoreFeatured />
        <StoreSpecialOffers />
        <StoreDiscoveryQueue />
    </LayoutStoreFront>
)
