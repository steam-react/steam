import * as React from 'react'
import * as styles from './styles.css'

import { ListView } from '../ListView'
import { Pulldown } from '../Pulldown'

import { classnames } from '../common/helpers'

interface INavigationItemProps {
    caption: any,
    url?: string,
    children?: any
}

interface INavigationItemPersonalProps {
    userDisplayName?: string,
    userId?: string
}

interface INavigationGlobalProps {
    className?: string,
    userDisplayName?: string,
    userId?: string,
}

const ItemTopLevel = ({ caption, url, children }: INavigationItemProps) => (
    <a href={url} className={styles.simpleLinkTopLevel}>
        {caption}
    </a>
)

const Submenu = (p: INavigationItemProps) => (
    <Pulldown opens="down" align="left" type="hover" caption={
        <a href={p.url} className={styles.linkTopLevel}>{p.caption}</a>
    } className={styles.itemTopLevel}>
        <ListView className={styles.submenu}>
            {Array.isArray(p.children) && p.children || undefined}
        </ListView>
    </Pulldown>
)

const ItemSubmenu = (p: INavigationItemProps) => (
    <a href={p.url} className={styles.simpleLinkSubmenu}>
        {p.caption}
    </a>
)

const NavigationItemPersonal = (p: INavigationItemPersonalProps) =>
    (p.userDisplayName == null || p.userId == null)
        ? null
        : (
            <Submenu caption={p.userDisplayName} url={['https://steamcommunity/id', p.userId, 'home/'].join('/')}>
                <ItemSubmenu caption="Activity" url="#" />
                <ItemSubmenu caption="Profile" url="#" />
                <ItemSubmenu caption="Friends" url="#" />
                <ItemSubmenu caption="Groups" url="#" />
                <ItemSubmenu caption="Content" url="#" />
                <ItemSubmenu caption="Badges" url="#" />
                <ItemSubmenu caption="Inventory" url="#" />
            </Submenu>
        )

export const NavigationGlobal = (p: INavigationGlobalProps) => (
    <div className={classnames(styles.NavigationGlobal, p.className)}>
        <Submenu caption="Store" url="https://store.steampowered.com/">
            <ItemSubmenu caption="Featured" url="#" />
            <ItemSubmenu caption="Explore" url="#" />
            <ItemSubmenu caption="Curators" url="#" />
            <ItemSubmenu caption="Wishlist" url="#" />
            <ItemSubmenu caption="News" url="#" />
            <ItemSubmenu caption="Stats" url="#" />
        </Submenu>
        <Submenu caption="Community" url="https://steamcommunity.com/">
            <ItemSubmenu caption="Home" url="#" />
            <ItemSubmenu caption="Discussions" url="#" />
            <ItemSubmenu caption="Workshop" url="#" />
            <ItemSubmenu caption="Market" url="#" />
            <ItemSubmenu caption="Broadcasts" url="#" />
        </Submenu>
        <NavigationItemPersonal userDisplayName={p.userDisplayName} userId={p.userId} />
        <ItemTopLevel caption="About" url="http://store.steampowered.com/about/" />
        <ItemTopLevel caption="Support" url="https://help.steampowered.com/en/" />
    </div>
)
