import * as React from 'react'
import * as styles from './styles.css'
import * as iconFacebook from './ico_facebook.gif'
import * as iconTwitter from './ico_twitter.gif'
import * as logoValve from './logo_valve.png'
import * as logoSteam from './logo_steam.png'

export const Footer: React.SFC = () => (
    <div className={styles.Footer}>
        <div className={styles.contentWrapper}>
            <div className={styles.content}>
                <img className={styles.logoSteam} src={logoSteam} />
                <a href="https://www.valvesoftware.com" className={styles.logoValve}>
                    <img src={logoValve} />
                </a>
                <p className={styles.text}>
                    <span>&copy; 2018 Valve Corporation.  All rights reserved.
                    All trademarks are property of their respective owners in
                the US and other countries.</span>
                    <span>VAT included in all prices where applicable.
                    &nbsp;
                <a
                            href="https://store.steampowered.com/privacy_agreement/"
                            target="_blank"
                            rel="noreferrer">Privacy Policy</a>
                        &nbsp; | &nbsp;
                <a
                            href="https://store.steampowered.com/legal/"
                            target="_blank"
                            rel="noreferrer">Legal</a>
                        &nbsp; | &nbsp;
                <a
                            href="https://store.steampowered.com/subscriber_agreement/"
                            target="_blank"
                            rel="noreferrer">Steam Subscriber Agreement</a>
                        &nbsp; | &nbsp;
                <a
                            href="https://store.steampowered.com/steam_refunds/"
                            target="_blank"
                            rel="noreferrer">Refunds</a>
                    </span>
                </p>
            </div>
        </div>
        <div className={styles.valveLinks}>
            <a href="http://www.valvesoftware.com/about.html" target="_blank" rel="noreferrer">About Valve</a>
            &nbsp; | &nbsp;
    <a href="http://www.steampowered.com/steamworks/" target="_blank" rel="noreferrer">Steamworks</a>
            &nbsp; | &nbsp;
    <a href="http://www.valvesoftware.com/jobs.html" target="_blank" rel="noreferrer">Jobs</a>
            &nbsp; | &nbsp;
    <a href="https://steamcommunity.com/greenlight" target="_blank" rel="noreferrer">Steam Distribution</a>
            &nbsp; | &nbsp;
    <a href="https://store.steampowered.com/digitalgiftcards/" target="_blank" rel="noreferrer">Gift Cards</a>
            &nbsp; | &nbsp;
    <a href="http://www.facebook.com/Steam" target="_blank" rel="noreferrer"><img src={iconFacebook} /> Steam</a>
            &nbsp; | &nbsp;<a href="http://twitter.com/steam_games" target="_blank" rel="noreferrer"><img src={iconTwitter} /> @steam_games</a>
        </div>
    </div>
)
