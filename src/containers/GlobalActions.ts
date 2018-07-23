import { connect } from 'react-redux'
import { GlobalActions } from '../components/GlobalActions'
import { getLanguages } from '../reducers/languages'
import { isLoggedIn } from '../reducers/auth'
import { TRootState } from '../reducers'
import {
    actions as authActions,
    getUserPic,
    getUserLogin,
} from '../reducers/auth'

const mapStateToProps = (state: TRootState) => isLoggedIn(state)
    ? {
        languages: getLanguages(state),
        userId: getUserLogin(state),
        userPic: getUserPic(state),
        notifications: {},
    }
    : {
        languages: getLanguages(state),
        loginHref: '/login'
    }

const mapDispatchToProps = (dispatch: any) => ({
    onLogoutClick: () => {
        dispatch(authActions.logout())
    }
})

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(GlobalActions)
