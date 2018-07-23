import * as React from 'react'
import { classnames } from '../common/helpers'
import { ComponentSize } from '../common/types'
import * as icons from '../Icons/styles.css'
import * as styles from './styles.css'

export type ButtonType = 'normal' | 'secondary' | 'action' | 'minor'

export interface IButtonProps {
    type?: ButtonType
    size?: ComponentSize
    caption?: string
    className?: string
    onClick?: React.MouseEventHandler<HTMLButtonElement>
    href?: string
    uppercase?: boolean
    icon?: string
}

const buttonSizeClasses: { [s in ComponentSize]: string } = {
    's': styles.sizeS,
    'm': styles.sizeM,
    'l': styles.sizeL,
}

const buttonTypeClasses: { [s in ButtonType]: string } = {
    'normal': styles.Button,
    'secondary': styles.ButtonSecondary,
    'action': styles.ButtonAction,
    'minor': styles.ButtonMinor,
}

const ButtonCaption = (p: { caption?: string }) => p.caption ? (
    <span className={styles.caption}>{p.caption}</span>
) : null

const getButtonStyles = (p: IButtonProps) => classnames(
    p.className,
    buttonTypeClasses[p.type || 'normal'],
    p.uppercase ? styles.ButtonUppercase : undefined,
    buttonSizeClasses[p.size || 'm'],
    p.icon ? icons[p.icon] : undefined,
    (p.icon && !p.caption) ? styles.ButtonIcon : undefined,
)

const ButtonNormal = (p: IButtonProps) => (
    <button className={getButtonStyles(p)} onClick={p.onClick}>
        <ButtonCaption caption={p.caption} />
    </button>
)

const ButtonLink = (p: IButtonProps) => (
    <a className={getButtonStyles(p)} href={p.href}>
        <ButtonCaption caption={p.caption} />
    </a >
)

export const Button = (p: IButtonProps) => p.href
    ? ButtonLink(p)
    : ButtonNormal(p)
