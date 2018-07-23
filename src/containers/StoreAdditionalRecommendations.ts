import { connect } from 'react-redux'
import { flow } from 'lodash/fp'
import { createSelector } from 'reselect'

import { StoreAdditional, IStoreAdditionalProps, IStoreAdditionalPage } from '../components/StoreAdditional'
import { getProduct, TProductId } from '../reducers/products'
import { getIsLoading, getPages, ISimilarProduct, IRecommendationsPage } from '../reducers/recommendations'
import { IProductInfo } from '../reducers/products'
import { preparePiceInfo, isNotFalse } from './helpers'
import { IStoreRecommendationSimilarProps } from '../components/StoreRecommendationSimilar'

const getTagItemProps = (product: IProductInfo) => ({
    name: product.name,
    picture: product.pictures[0],
    href: product.detailsUrl,
    priceInfo: preparePiceInfo(product.priceInfo),
})

const getSimilarItemProps = (
    product: IProductInfo,
    similarProduct: IProductInfo
): IStoreRecommendationSimilarProps => {
    return {
        name: product.name,
        href: product.detailsUrl,
        lookalikeHref: similarProduct.detailsUrl,
        reason: "Since you recently played",
        reasonItem: similarProduct.name,
        reasonHref: similarProduct.detailsUrl,
        priceInfo: preparePiceInfo(product.priceInfo),
        pictures: product.pictures.slice(0, 4).map(pic => ({
            url: pic,
            href: product.detailsUrl,
        })),
    }
}

const formatPage =
    (productSelector: (id: TProductId) => IProductInfo | undefined) =>
        (page: IRecommendationsPage): IStoreAdditionalPage => ({
            tagPrimary: {
                title: `${page.primary.tag} games`,
                description: `Due to your recent playtime in other ${page.primary.tag} games`,
                href: `https://store.steampowered.com/tag/en/${page.primary.tag}/`,
                items: page.primary.items.map(flow(
                    productSelector,
                    getTagItemProps,
                ))
            },
            tagSecondary: {
                title: `${page.secondary.tag} games`,
                description: `Due to your recent playtime in other ${page.secondary.tag} games`,
                href: `https://store.steampowered.com/tag/en/${page.secondary.tag}/`,
                items: page.secondary.items.map(flow(
                    productSelector,
                    getTagItemProps,
                ))
            },
            similar: page.similar.map(flow(
                (x: ISimilarProduct) => [
                    productSelector(x.id),
                    productSelector(x.similarTo)
                ],
                ([product, similarProduct]) =>
                    product != null && similarProduct != null
                        ? getSimilarItemProps(product, similarProduct)
                        : false,
            )).filter((x => Boolean(x)) as isNotFalse)
        })

const mapStateToProps = createSelector(
    getIsLoading,
    getPages,
    getProduct,
    (isLoading: boolean, pages: IRecommendationsPage[], productSelector): IStoreAdditionalProps => ({
        isLoading,
        pages: pages.map(formatPage(productSelector))
    })
)

export default connect(mapStateToProps)(StoreAdditional)
