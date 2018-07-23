import * as React from 'react'

import * as styles from './styles.css'
import { ILanguageInfo, LanguagesList } from '../LanguagesList'
import { ListView } from '../ListView'
import { Pulldown } from '../Pulldown'
import { IClickableProps } from '../common/types'

interface IMenuProfileProps {
    languages: ILanguageInfo[]
    onLogoutClick?: React.MouseEventHandler<any>
}

interface IUserProfileLinkProps {
    href?: string
    caption: string
    onClick?: React.MouseEventHandler<any>
}

const MenuItem = (p: IUserProfileLinkProps) => (
    <a className={styles.userProfileMenuItem} href={p.href} onClick={p.onClick}>{p.caption}</a>
)

const LanguageSelectButton = (p: IClickableProps) => (
    <a href="#" className={styles.userProfileMenuItem} {...p}>Change language</a>
)

export const MenuProfile = (p: IMenuProfileProps) => (
    <ListView className={styles.userProfileMenu}>
        <MenuItem onClick={p.onLogoutClick} caption="Logout" />
        <MenuItem href="#" caption="Account details" />
        <MenuItem href="#" caption="Preferences" />
        <Pulldown type="hover" caption={<LanguageSelectButton />} opens="left" align="top">
            <LanguagesList languages={p.languages} />
        </Pulldown>
        <MenuItem href="#" caption="View profile" />
    </ListView>
)
