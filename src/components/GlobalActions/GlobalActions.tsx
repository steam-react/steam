import * as React from 'react'

import * as styles from './styles.css'
import * as icons from '../Icons/styles.css'

import { Button } from '../Button'
import { ILanguageInfo, LanguagesList } from '../LanguagesList'
import { MenuProfile } from '../MenuProfile'
import { INotificationsListProps, NotificationsList } from '../NotificationsList'
import { Pulldown } from '../Pulldown'
import { UserAvatar } from '../UserAvatar'

import { classnames } from '../common/helpers'
import { IClickableProps } from '../common/types'

export interface IGlobalActionLoggedOutProps {
    className?: string
    languages: ILanguageInfo[]
    loginHref?: string
}

export interface IGlobalActionLoggedInProps {
    className?: string
    languages: ILanguageInfo[]
    userId: string
    userPic: string
    notifications: INotificationsListProps
    onLogoutClick?: React.MouseEventHandler<any>
}

export type TGlobalActionProps =
    IGlobalActionLoggedOutProps | IGlobalActionLoggedInProps

interface IButtonUserProfileProps extends IClickableProps {
    userId: string
}

interface IButtonNotificationsProps extends IClickableProps {
    notifications: INotificationsListProps
}

const ButtonInstallSteam = (p: { action?: boolean }) => (
    <Button
        className={styles.buttonInstallSteam}
        type={p.action ? 'action' : 'secondary'}
        href="https://store.steampowered.com/about/"
        size="s"
        icon="DownloadBefore"
        caption="Install Steam" />
)

const getNotificationsCount = (n: INotificationsListProps) => (
    n.comments + n.gifts + n.invites + n.items + n.messages
)

const ButtonNotifications = (p: IButtonNotificationsProps) => (
    <Button
        className={classnames(
            styles.buttonNotifications,
            getNotificationsCount(p.notifications) > 0
                ? styles.buttonNotificationsActive
                : undefined,
        )}
        type="secondary"
        icon="EnvelopeAfter"
        caption={
            getNotificationsCount(p.notifications) > 0
                ? getNotificationsCount(p.notifications).toString()
                : ""
        }
        size="s"
        {...p} />
)

const ButtonLanguage = (p: IClickableProps) => (
    <span
        className={styles.buttonLanguage}
        onClick={p.onClick}
    >Language</span>
)

const ButtonLogin = ({ href }: { href?: string }) => (
    <a
        className={classnames(styles.action, styles.buttonLogin)}
        href={href || '#'}
    >Login</a>
)

const ButtonUserProfile = (p: IButtonUserProfileProps) => (
    <span className={classnames(styles.buttonUserProfile, icons.TriangleDownAfter)} onClick={p.onClick}>{p.userId}</span>
)

const PulldownLanguage = (p: IGlobalActionLoggedOutProps) => (
    <Pulldown caption={<ButtonLanguage />} opens="down" align="right">
        <LanguagesList languages={p.languages} />
    </Pulldown>
)

const PulldownNotifications = (p: IGlobalActionLoggedInProps) => (
    <Pulldown
        className={styles.action}
        caption={<ButtonNotifications notifications={p.notifications} />}
        opens="down"
        align="right">
        <NotificationsList {...p.notifications} />
    </Pulldown>
)

const PulldownUserProfile = (p: IGlobalActionLoggedInProps) => (
    <Pulldown
        className={styles.action}
        caption={<ButtonUserProfile userId={p.userId} />}
        opens="down"
        align="right">
        <MenuProfile
            languages={p.languages}
            onLogoutClick={p.onLogoutClick}
        />
    </Pulldown>
)

const GlobalActionsLoggedOut = (p: IGlobalActionLoggedOutProps) => (
    <div className={classnames(styles.globalActions, p.className)}>
        <div className={styles.globalActionsContainer}>
            <ButtonInstallSteam action={true} />
            <ButtonLogin href={p.loginHref} />
            <span className={styles.separator}>|</span>
            <PulldownLanguage {...p} />
        </div>
    </div>
)

const GlobalActionsLoggedIn = (p: IGlobalActionLoggedInProps) => (
    <div className={classnames(styles.globalActions, p.className)}>
        <div className={styles.globalActionsContainer}>
            <ButtonInstallSteam />
            <PulldownNotifications {...p} />
            <PulldownUserProfile {...p} />
            <UserAvatar
                className={styles.userAvatar}
                userId={p.userId}
                size="s"
                userPic={p.userPic} />
        </div>
    </div >
)

function isLoggedIn(p: TGlobalActionProps): p is IGlobalActionLoggedInProps {
    return (p as IGlobalActionLoggedInProps).userId !== undefined
}

export function GlobalActions(p: TGlobalActionProps): React.ReactElement<any> {
    return isLoggedIn(p)
        ? (<GlobalActionsLoggedIn {...p} />)
        : (<GlobalActionsLoggedOut {...p} />)
}
