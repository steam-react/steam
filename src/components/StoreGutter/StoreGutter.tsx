import * as React from 'react'
import * as styles from './styles.css'
import { classnames } from '../common/helpers'

interface IGutterSectionProps {
    title?: string
    items?: IGutterItemProps[]
}

interface IGutterItemProps {
    href: string
    text: string
    icon?: string
}

interface IStoreGutterProps {
    className?: string
    tags?: IGutterItemProps[]
    recentlyViewed?: IGutterItemProps[]
}

const GutterSection = (p: IGutterSectionProps) => {
    if (!p.items || p.items.length < 1) {
        return null
    }

    return (
        <nav className={styles.section}>
            <header className={styles.sectionHeader}>{p.title}</header>
            <ul className={styles.sectionItems}>
                {p.items.map(GutterItem)}
            </ul>
        </nav>
    )
}

const GutterItem = (p: IGutterItemProps, i: any) => (
    <li key={i} className={styles.sectionItem}>
        <a className={styles.sectionLink} href={p.href}>{p.text}</a>
    </li>
)

export const StoreGutter = (p: IStoreGutterProps) => (
    <div className={classnames(styles.StoreGutter, p.className)}>
        <a className={styles.cardsPromoLink} href="#" />
        <GutterSection title="Gift Cards" items={[
            { text: "Now Available on Steam", href: "#" },
        ]} />
        <GutterSection title="Recommended" items={[
            { text: "By Friends", href: "#" },
            { text: "By Curators", href: "#" },
            { text: "Tags", href: "#" },
        ]} />
        <GutterSection title="Discovery Queues" items={[
            { text: "Recommendations", href: "#" },
            { text: "New Releases", href: "#" },
        ]} />
        <GutterSection title="Browse Categories" items={[
            { text: "Top Sellers", href: "#" },
            { text: "Recently Updated", href: "#" },
            { text: "New Releases", href: "#" },
            { text: "Upcoming", href: "#" },
            { text: "Specials", href: "#" },
            { text: "Virtual Reality", href: "#" },
            { text: "Steam Controller Friendly", href: "#" },
        ]} />
        <GutterSection title="Browse by Genre" items={[
            { text: "Free to Play", href: "#" },
            { text: "Early Access", href: "#" },
            { text: "Action", href: "#" },
            { text: "Adventure", href: "#" },
            { text: "Casual", href: "#" },
            { text: "Indie", href: "#" },
            { text: "Massively Multiplayer", href: "#" },
            { text: "Racing", href: "#" },
            { text: "RPG", href: "#" },
            { text: "Simulation", href: "#" },
            { text: "Sports", href: "#" },
            { text: "Strategy", href: "#" },
        ]} />
        <GutterSection title="Your Tags" items={p.tags} />
        <GutterSection title="Recently viewed" items={p.recentlyViewed} />
    </div>
)
