import * as React from 'react'

import * as styles from './styles.css'
import { Footer } from '../Footer'

interface ILayoutStoreFrontProps {
    className?: string
    header: React.ReactNode
    children: React.ReactNode | React.ReactNode[]
}

export const LayoutStore = (p: ILayoutStoreFrontProps) => (
    <div className={styles.body}>
        <div className={styles.header}>
            {p.header}
        </div>
        <div className={styles.content}>
            {p.children}
        </div>
        <Footer />
    </div>
)
