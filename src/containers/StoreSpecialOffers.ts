import { flow } from 'lodash/fp'
import { connect } from 'react-redux'
import { IStoreSpecialOffersProps, StoreSpecialOffers } from '../components/StoreSpecialOffers'
import { getProduct, IProductInfo } from '../reducers/products'
import { getSpotlightIds, getNormalIds } from '../reducers/specialOffers'
import { isNotFalse, preparePiceInfo } from './helpers'
import { createSelector } from 'reselect'

const formatSpotlightItem = (product?: IProductInfo) => product ? {
    type: 'spotlight',
    href: product.detailsUrl,
    picture: product.pictures[0],
    priceInfo: preparePiceInfo(product.priceInfo),
    body: product.name,
    name: product.name,
} : null

const formatNormalItem = (product?: IProductInfo) => product ? {
    type: 'normal',
    href: product.detailsUrl,
    picture: product.pictures[0],
    priceInfo: preparePiceInfo(product.priceInfo),
} : null

const mapStateToProps = createSelector(
    getSpotlightIds,
    getNormalIds,
    getProduct,
    (spotlightIds, normalIds, productSelector) => ({
        items: [
            ...spotlightIds
                .map(flow(productSelector, formatSpotlightItem))
                .filter(Boolean as any as isNotFalse),

            ...normalIds
                .map(flow(productSelector, formatNormalItem))
                .filter(Boolean as any as isNotFalse),
        ]
    } as IStoreSpecialOffersProps)
)

export default connect(
    mapStateToProps,
)(StoreSpecialOffers)
