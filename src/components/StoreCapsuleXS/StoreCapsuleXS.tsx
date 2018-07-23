import * as React from 'react'
import * as styles from './styles.css'
import { classnames } from '../common/helpers'
import { TStorePriceInfoProps, StorePriceInfo } from '../StorePriceInfo'
import { IUserAvatarProps, UserAvatar } from '../UserAvatar'

export interface IStoreCapsuleXSProps {
    className?: string
    href: string
    picture: string
    priceInfo: TStorePriceInfoProps
    friends?: IUserAvatarProps[]
}

const getFriendsList = (friends?: IUserAvatarProps[]) =>
    friends
        ? (
            <ul className={styles.friends}>
                {
                    friends.map(friendInfo => (
                        <li className={styles.friend}>
                            <UserAvatar size="s" key={friendInfo.userId} {...friendInfo} />
                        </li>
                    ))
                }
            </ul>
        )
        : null

export const StoreCapsuleXS = (p: IStoreCapsuleXSProps) => (
    <a href={p.href} className={classnames(p.className, styles.StoreCapsuleXS)}>
        <img className={styles.picture} src={p.picture} />
        <div className={styles.info}>
            <StorePriceInfo {...p.priceInfo} />
        </div>
        {getFriendsList(p.friends)}
    </a>
)
