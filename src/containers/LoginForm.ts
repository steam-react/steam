import { connect } from 'react-redux'
import { LoginForm } from '../components/LoginForm'
import { actions as authActions } from '../reducers/auth'

const mapDispatchToProps = (dispatch: any) => ({
    onSubmit(login: string, password: string) {
        dispatch(authActions.login({
            type: 'password',
            login,
            password
        }))
    }
})

export default connect(null, mapDispatchToProps)(LoginForm)
