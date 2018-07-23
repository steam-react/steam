import * as React from 'react'
import * as styles from './styles.css'

import { classnames, addClassnames } from '../common/helpers'

type TMenuType = 'vertical' | 'horizontal'

interface IMenuProps {
    type?: TMenuType
    className?: string
    children?: Array<React.ReactElement<any>> | React.ReactElement<any>
}

const menuTypeClassnames: { [t in TMenuType]: string } = {
    'vertical': styles.MenuVertical,
    'horizontal': styles.MenuHorizontal,
}

const getMenuClassnames = (p: IMenuProps) => classnames(
    styles.Menu,
    p.className,
    menuTypeClassnames[p.type || 'vertical'],
)

const addItemClassname = addClassnames.bind(null, [styles.MenuItem])

const addItemKey = (key: any, item: React.ReactElement<any>) => {
    return React.cloneElement(
        item,
        { key },
    )
}

const getItems = (children: Array<React.ReactElement<any>> | React.ReactElement<any>) => {
    children = Array.isArray(children)
        ? children
        : [children]

    return children.map((child, i) => addItemKey(
        i,
        addItemClassname(child)
    ))
}

export const ListView = (p: IMenuProps) => (
    <div className={getMenuClassnames(p)}>
        {
            p.children
                ? getItems(p.children)
                : null
        }
    </div>
)
