import * as React from 'react'
import * as styles from './styles.css'

import { classnames } from '../common/helpers'
import { ListView } from '../ListView'

export interface INotificationsListProps {
    comments: number
    items: number
    invites: number
    gifts: number
    messages: number
}

interface INotificationProps {
    icon: string
    caption: string
    counter: number
    url: string
}

interface INotificationDescription {
    icon: string
    caption: string
    url: string
    code: string
}

const notifications: INotificationDescription[] = [
    { code: 'comments', icon: 'comment', caption: 'new comments', url: '' },
    { code: 'items', icon: 'inventory', caption: 'new items in your inventory', url: '' },
    { code: 'invites', icon: 'invite', caption: 'new invites', url: '' },
    { code: 'gifts', icon: 'giftbox', caption: 'new gifts', url: '' },
    { code: 'messages', icon: 'chat', caption: 'unread chat messages', url: '' },
]

const Notification = (p: INotificationProps) => (
    <a href={p.url} className={classnames(
        styles.notification,
        p.counter > 0 ? styles.active : undefined,
    )}>
        {p.counter || 0} {p.caption}
    </a>
)

const getNotification = (p: INotificationsListProps) =>
    (x: INotificationDescription) => (
        <Notification key={x.code} counter={p[x.code]} {...x} />
    )

export const NotificationsList = (p: INotificationsListProps) => (
    <ListView className={styles.notifications}>
        {notifications.map(getNotification(p))}
    </ListView>
)
