import * as React from 'react'

import * as styles from './styles.css'
import { Button, IButtonProps } from '../Button'
import { classnames } from '../common/helpers'
import { NavigationStore } from '../NavigationStore'

interface IHeaderStoreProps {
    className?: string
}

const ButtonWishlist = (p: IButtonProps) => (
    <Button
        className={styles.buttonWishlist}
        caption={`Wishlist (${p.caption || 0})`}
        uppercase={true}
        size="s"
        {...p}
    />
)

export const HeaderStore = (p: IHeaderStoreProps) => (
    <div className={styles.HeaderStore}>
        <div className={classnames(
            p.className,
            styles.content,
        )}>
            <ButtonWishlist />
            <NavigationStore />
        </div>
    </div>
)
