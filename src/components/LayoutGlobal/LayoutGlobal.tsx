import * as React from 'react'
import * as styles from './styles.css'

import { addClassnames } from '../common/helpers'
import { Logo } from '../Logo'

export interface ILayoutGlobalProps {
    navigation: React.ReactElement<any>
    actions: React.ReactElement<any>
    children: React.ReactNode
}

export const LayoutGlobal = (p: ILayoutGlobalProps) => (
    <>
        <header className={styles.header}>
            <div className={styles.headerContent}>
                <Logo className={styles.logo} />
                {addClassnames([styles.navigation], p.navigation)}
                {addClassnames([styles.actions], p.actions)}
            </div>
        </header>
        <div className={styles.content}>
            {p.children}
        </div>

    </>
)
