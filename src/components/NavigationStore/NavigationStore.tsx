import * as React from 'react'

import * as styles from './styles.css'

import { ListView } from '../ListView'
import { Pulldown } from '../Pulldown'
import { StoreSearch } from '../StoreSearch'

interface INavigationStoreProps {
    userPic?: string
}

interface INavigationItemProps {
    caption: string
    href?: string
}

interface ISeparatorProps {
    caption?: string
}

type TReactElements<T> = React.ReactElement<T> | Array<React.ReactElement<T>>

interface INavigationSubmenuProps extends INavigationItemProps {
    children?: TReactElements<any>
}

const Item = (p: INavigationItemProps) => p.href
    ? (<a href={p.href} className={styles.item}>{p.caption}</a>)
    : (<div className={styles.item}>{p.caption}</div>)

const Submenu = (p: INavigationSubmenuProps) => (
    <Pulldown
        type="hover"
        opens="down"
        align="left"
        className={styles.submenu}
        caption={
            <a href={p.href} className={styles.submenuCaption}>{p.caption}</a>
        }>
        <ListView className={styles.submenuPopup}>
            {p.children}
        </ListView>
    </Pulldown>
)

const ItemSubmenu = (p: INavigationItemProps) => p.href
    ? (<a href={p.href} className={styles.itemSubmenu}>{p.caption}</a>)
    : (<div className={styles.itemSubmenu}>{p.caption}</div>)

const Separator = (p: ISeparatorProps) => (
    <div className={styles.separator}>{p.caption}</div>
)

export const NavigationStore = (p: INavigationStoreProps) => (
    <ListView type="horizontal" className={styles.NavigationStore}>
        <Submenu caption="Your Store" href="#">
            <ItemSubmenu caption="Store Home" href="#" />
            <Separator />
            <ItemSubmenu caption="Popular among friends" href="#" />
            <ItemSubmenu caption="Steam Curators" href="#" />
            <ItemSubmenu caption="Your Queue" href="#" />
            <ItemSubmenu caption="Recently updated" href="#" />
            <ItemSubmenu caption="Followed Games & Software" href="#" />
            <Separator caption="Tags recommended for you:" />
            <ItemSubmenu caption="Action" href="#" />
            <ItemSubmenu caption="FPS" href="#" />
            <ItemSubmenu caption="Gore" href="#" />
            <ItemSubmenu caption="Shooter" href="#" />
            <ItemSubmenu caption="VR" href="#" />
            <Separator />
            <ItemSubmenu caption="Browse all recommended tags" href="#" />
        </Submenu>
        <Submenu caption="Games" href="#">
            <ItemSubmenu href="#" caption="Free to Play" />
            <ItemSubmenu href="#" caption="Early Access" />
            <ItemSubmenu href="#" caption="Demos" />
            <ItemSubmenu href="#" caption="Virtual Reality" />
            <ItemSubmenu href="#" caption="Steam Controller Friendly" />
            <Separator caption="Browse by genre:" />
            <ItemSubmenu href="#" caption="Action" />
            <ItemSubmenu href="#" caption="Adventure" />
            <ItemSubmenu href="#" caption="Casual" />
            <ItemSubmenu href="#" caption="Indie" />
            <ItemSubmenu href="#" caption="Massively Multiplayer" />
            <ItemSubmenu href="#" caption="Racing" />
            <ItemSubmenu href="#" caption="RPG" />
            <ItemSubmenu href="#" caption="Simulation" />
            <ItemSubmenu href="#" caption="Sports" />
            <ItemSubmenu href="#" caption="Strategy" />
            <Separator />
            <ItemSubmenu href="#" caption="See popular tags" />
            <Separator caption="Browse by platform:" />
            <ItemSubmenu href="#" caption="Mac OS X" />
            <ItemSubmenu href="#" caption="SteamOS + Linux" />
        </Submenu>
        <Submenu caption="Software" href="#">
            <ItemSubmenu href="#" caption="Software Hub" />
            <Separator />
            <ItemSubmenu href="#" caption="Animation & Modeling" />
            <ItemSubmenu href="#" caption="Audio Production" />
            <ItemSubmenu href="#" caption="Design & Illustration" />
            <ItemSubmenu href="#" caption="Education" />
            <ItemSubmenu href="#" caption="Game Development" />
            <ItemSubmenu href="#" caption="Photo Editing" />
            <ItemSubmenu href="#" caption="Utilities" />
            <ItemSubmenu href="#" caption="Video Production" />
            <ItemSubmenu href="#" caption="Web Publishing" />
        </Submenu>
        <Submenu caption="Hardware" href="#">
            <ItemSubmenu href="#" caption="Steam Controller" />
            <ItemSubmenu href="#" caption="Steam Link" />
            <ItemSubmenu href="#" caption="HTC Vive" />
        </Submenu>
        <Submenu caption="Videos" href="#">
            <ItemSubmenu href="#" caption="Video Hub" />
            <Separator caption="Browse by type:" />
            <ItemSubmenu href="#" caption="Movie" />
            <ItemSubmenu href="#" caption="Episodic" />
            <ItemSubmenu href="#" caption="Documentary" />
            <ItemSubmenu href="#" caption="Gaming" />
            <ItemSubmenu href="#" caption="Tutorial" />
            <ItemSubmenu href="#" caption="Short" />
            <Separator caption="Browse by genre:" />
            <ItemSubmenu href="#" caption="Action" />
            <ItemSubmenu href="#" caption="Anime" />
            <ItemSubmenu href="#" caption="Comedy" />
            <ItemSubmenu href="#" caption="Drama" />
            <ItemSubmenu href="#" caption="Horror" />
            <ItemSubmenu href="#" caption="Sci-fi" />
        </Submenu>
        <Item caption="News" href="#" />
        <div className={styles.searchBox}>
            <StoreSearch />
        </div>
    </ListView>
)
