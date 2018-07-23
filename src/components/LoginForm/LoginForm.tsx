import * as React from 'react'

import * as styles from './styles.css'
import * as imgWhyJoin from './why_join_preview.png'
import { Button } from '../Button'

interface ILoginFormProps {
    onSubmit: (login: string, password: string) => any
}

export class LoginForm extends React.Component<ILoginFormProps> {
    private refLogin: React.RefObject<HTMLInputElement>
    private refPassword: React.RefObject<HTMLInputElement>

    constructor(p: ILoginFormProps) {
        super(p)
        this.refLogin = React.createRef()
        this.refPassword = React.createRef()
        this.onSubmit = this.onSubmit.bind(this)
    }

    public render() {
        return (
            <div className={styles.LoginForm}>
                <div className={styles.column}>
                    <div className={styles.wrapper}>
                        <div className={styles.login}>
                            <h2 className={styles.heading}>Sign in</h2>
                            <p>To an existing Steam account</p>
                            <form className={styles.form} onSubmit={this.onSubmit}>
                                <label className={styles.field}>
                                    <span className={styles.description}>
                                        Steam account name
                                    </span>
                                    <input
                                        className={styles.textInput}
                                        name="login"
                                        ref={this.refLogin}
                                        type="text" />
                                </label>
                                <label className={styles.field}>
                                    <span className={styles.description}>Password</span>
                                    <input
                                        ref={this.refPassword}
                                        className={styles.textInput}
                                        name="password"
                                        type="password" />
                                </label>
                                <Button className={styles.btnSubmit} caption="Sign In" />
                            </form>
                        </div>
                        <div className={styles.registration}>
                            <h2 className={styles.heading}>Create</h2>
                            <p>A new free account</p>
                            <p>It's free to join and easy to use. Continue on to create your Steam account and get Steam, the leading digital solution for PC and Mac gamers.</p>
                            <Button className={styles.btnRegister} caption="Join Steam" href="https://store.steampowered.com/join/?&snr=1_60_4__62" />
                        </div>
                    </div>
                </div>
                <div className={styles.column}>
                    <div className={styles.info}>
                        <h2 className={styles.heading}>Why join Steam?</h2>
                        <ul>
                            <li>Buy and download full retail games</li>
                            <li>Join the Steam Community</li>
                            <li>Chat with your friends while gaming</li>
                            <li>Play your games on any supported platform</li>
                            <li>Schedule a game, tournament, or LAN party</li>
                            <li>Receive automatic game updates, and more!</li>
                        </ul>
                        <img width="265" height="176" src={imgWhyJoin} />
                    </div>
                </div>
            </div>
        )
    }

    private onSubmit(e: any) {
        const login = this.refLogin.current
        const password = this.refPassword.current

        if (login && password) {
            if (login.value && password.value) {
                this.props.onSubmit(login.value, password.value)
            }
            e.preventDefault()
        }
    }

}
