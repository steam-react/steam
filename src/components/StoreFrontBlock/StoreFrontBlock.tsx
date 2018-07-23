import * as React from 'react'
import * as styles from './styles.css'
import { classnames } from '../common/helpers'

export interface IStoreFrontBlockProps {
    className?: string
    children: React.ReactNode | React.ReactNode[]
}

export const StoreFrontBlock = (p: IStoreFrontBlockProps) => (
    <div className={classnames(p.className, styles.StoreFrontBlock)}>
        {p.children}
    </div>
)
