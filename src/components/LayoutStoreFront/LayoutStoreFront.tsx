import * as React from 'react'

import * as styles from './styles.css'
import { Footer } from '../Footer'
import { classnames } from '../common/helpers'

interface ILayoutStoreFrontProps {
    className?: string
    hasTakeover?: boolean
    takeoverHref?: string
    takeoverPic?: string
    header: React.ReactNode
    gutter: React.ReactNode
    children: React.ReactNode | React.ReactNode[]
    moreContent?: React.ReactNode | React.ReactNode[]
}

const getTakeOverStyle = (url?: string) => url
    ? { backgroundImage: `url('${url}')` }
    : {}

const getHeaderClassnames = (p: ILayoutStoreFrontProps) => p.hasTakeover
    ? classnames(p.className,
        styles.header,
        styles.hasTakeover,
    )
    : classnames(p.className, styles.header)

const getGutterClassnames = (p: ILayoutStoreFrontProps) => p.hasTakeover
    ? classnames(styles.hasTakeover, styles.gutter)
    : styles.gutter

const Header = (p: ILayoutStoreFrontProps) => (
    <div className={getHeaderClassnames(p)} style={getTakeOverStyle(p.takeoverPic)}>
        <div className={styles.headerWrapper}>
            {p.header}
        </div>
        {
            p.hasTakeover
                ? <a className={styles.takeoverLink} href={p.takeoverHref}>&nbsp;</a>
                : null
        }
    </div>
)

export const LayoutStoreFront = (p: ILayoutStoreFrontProps) => (
    <div className={styles.body}>
        <Header {...p} />
        <div className={styles.content}>
            <div className={getGutterClassnames(p)}>
                {p.gutter}
            </div>
            {p.children}
        </div>
        <Footer />
        {p.moreContent}
    </div>
)
