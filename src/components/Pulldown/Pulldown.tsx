import * as React from 'react'
import { Component } from 'react'
import * as styles from './styles.css'

import { Button } from '../Button'
import { classnames } from '../common/helpers'
import { ClickableElement } from '../common/types'

type CaptionType = string | ClickableElement
type PulldownType = 'click' | 'hover'
type OpenDirection = 'up' | 'down' | 'left' | 'right'
type Alignment = 'top' | 'bottom' | 'left' | 'right'

const openDirectionClasses: { [d in OpenDirection]: string } = {
    'up': styles.popupOpensUp,
    'down': styles.popupOpensDown,
    'left': styles.popupOpensLeft,
    'right': styles.popupOpensRight,
}

const alignmentClasses: { [a in Alignment]: string } = {
    'top': styles.popupAlignUp,
    'bottom': styles.popupAlignDown,
    'left': styles.popupAlignLeft,
    'right': styles.popupAlignRight,
}

interface IPulldownProps {
    className?: string
    caption: CaptionType
    children?: any
    opened?: boolean
    opens?: OpenDirection
    align?: Alignment
    type?: PulldownType
}

interface IPulldownState {
    isOpened: boolean
}

const getPulldownClassnames = (p: IPulldownProps) => classnames(
    p.className,
    styles.Pulldown,
    p.type && p.type === 'hover' ? styles.typeHover : undefined,
)

export class Pulldown extends Component<IPulldownProps, IPulldownState> {
    protected selfRef: React.RefObject<HTMLDivElement>

    constructor(p: IPulldownProps) {
        super(p)

        this.state = {
            isOpened: Boolean(p.opened),
        }

        this.onTriggerClick = this.onTriggerClick.bind(this)
        this.onBodyClick = this.onBodyClick.bind(this)
        this.selfRef = React.createRef()
    }

    public render() {
        const p = this.props
        return (
            <div className={getPulldownClassnames(p)} ref={this.selfRef}>
                {this.getCaptionComponent()}
                <div className={this.getPopupClassnames()}>
                    {p.children}
                </div>
            </div>
        )
    }

    public componentDidMount() {
        document.body.addEventListener('click', this.onBodyClick)
    }

    public componentWillUnmount() {
        document.body.removeEventListener('click', this.onBodyClick)
    }

    protected onTriggerClick(e: React.MouseEvent<any>) {
        if (this.props.type === 'hover') {
            return
        }

        e.stopPropagation()
        e.preventDefault()
        this.setState(prevState => ({
            isOpened: !prevState.isOpened
        }))
        return false
    }

    protected onBodyClick(e: Event) {
        if (
            this.selfRef
            && this.selfRef.current
            && e.target instanceof HTMLElement
            && this.selfRef.current.contains(e.target)
        ) {
            return
        }

        this.setState(prevState => ({
            isOpened: false
        }))
    }

    protected getPopupClassnames() {
        const s = this.state
        const p = this.props
        return classnames(
            styles.popup,
            s.isOpened ? styles.popupOpened : undefined,
            alignmentClasses[p.align || 'left'],
            openDirectionClasses[p.opens || 'down'],
        )
    }

    protected getCaptionComponent() {
        const p = this.props
        if (typeof p.caption === "string") {
            return (<Button caption={p.caption} onClick={this.onTriggerClick} />)
        }

        return React.cloneElement(p.caption, {
            onClick: this.onTriggerClick
        })
    }

}
