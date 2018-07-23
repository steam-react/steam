import { flow } from 'lodash/fp'
import { connect } from 'react-redux'
import { IStoreFeaturedProps, StoreFeatured } from '../components/StoreFeatured'
import { getFeaturedItems } from '../reducers/featured'
import { getProduct } from '../reducers/products'
import { preparePiceInfo, isNotFalse } from './helpers'
import { createSelector } from 'reselect'

const mapStateToProps = createSelector(
    getFeaturedItems,
    getProduct,
    (featuredItems, productSelector): IStoreFeaturedProps => ({
        items: featuredItems
            .map(flow(
                productSelector,
                product => product
                    ? {
                        name: product.name,
                        href: product.detailsUrl,
                        pictures: product.pictures.slice(0, 5),
                        reason: {
                            type: 'by_tags' as 'by_tags',
                            tags: ['Action', 'FPS'],
                        },
                        priceInfo: preparePiceInfo(product.priceInfo),
                        platforms: product.platforms,
                    }
                    : false
            ))
            .filter((x => Boolean(x)) as isNotFalse)
    })
)

export default connect(
    mapStateToProps,
)(StoreFeatured)
