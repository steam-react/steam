/* istanbul ignore file */
import { combineReducers } from 'redux'
import { StateType } from './helpers'

import authReducer from './auth'
import cartReducer from './cart'
import wishlistReducer from './wishlist'
import languagesReducer from './languages'
import productsReducer from './products'
import featuredReducer from './featured'
import specialOffersReducer from './specialOffers'
import discoveryQueueReducer from './discoveryQueue'
import recommendationsReducer from './recommendations'
import ownedReducer from './owned'
import ignoredReducer from './ignored'

const rootReducer = combineReducers({
    currentUser: authReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
    languages: languagesReducer,
    products: productsReducer,
    featured: featuredReducer,
    specialOffers: specialOffersReducer,
    discoveryQueue: discoveryQueueReducer,
    recommendations: recommendationsReducer,
    owned: ownedReducer,
    ignored: ignoredReducer,
})

export type TRootState = StateType<typeof rootReducer>
export default rootReducer
