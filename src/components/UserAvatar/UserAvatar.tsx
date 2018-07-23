import * as React from 'react'
import * as styles from './styles.css'

import { classnames } from '../common/helpers'

type UserAvatarSize = 'xs' | 's' | 'm' | 'l'

export interface IUserAvatarProps {
    className?: string,
    userId?: string,
    userPic: string,
    size?: UserAvatarSize,
}

const avatarSizeClasses: { [s in UserAvatarSize]: string } = {
    'xs': styles.sizeXS,
    's': styles.sizeS,
    'm': styles.sizeM,
    'l': styles.sizeL,
}

const getAvatarClassnames = (p: IUserAvatarProps): string => (classnames(
    p.className,
    avatarSizeClasses[p.size || 'm'],
    styles.UserAvatar,
))

export const UserAvatar = (p: IUserAvatarProps) => p.userId
    ? (
        <a href={`https://steamcommunity.com/id/${p.userId}/`} className={getAvatarClassnames(p)}>
            <img className={styles.userPic} src={p.userPic} />
        </a>
    )
    : (
        <div className={getAvatarClassnames(p)}>
            <img className={styles.userPic} src={p.userPic} />
        </div>
    )
