import * as React from 'react'
import { Component, ReactElement } from 'react'

import * as styles from './styles.css'
import { classnames } from '../common/helpers'

interface ICarouselProps {
    className?: string
    children: React.ReactElement<any> | Array<React.ReactElement<any>>
    autoAdvance?: boolean
}

interface ICarouselState {
    count: number
    currentIndex: number
    mouseOver: boolean
}

const range = (n: number) => Array.from(Array(n).keys())

export class Carousel extends Component<ICarouselProps, ICarouselState> {
    private interval: any

    constructor(p: ICarouselProps) {
        super(p)

        this.state = {
            count: Array.isArray(p.children) ? p.children.length : 1,
            currentIndex: 0,
            mouseOver: false,
        }

        this.previousThumb = this.previousThumb.bind(this)
        this.nextThumb = this.nextThumb.bind(this)
        this.mouseEnter = this.mouseEnter.bind(this)
        this.mouseLeave = this.mouseLeave.bind(this)

    }

    public componentDidMount() {
        if (this.props.autoAdvance) {
            this.interval = setInterval(() => {
                if (!this.state.mouseOver) {
                    this.nextThumb()
                }
            }, 5000)
        }
    }

    public componentWillUnmount() {
        if (this.interval) {
            clearInterval(this.interval)
            this.interval = null
        }
    }

    public render() {
        return (
            <div
                onMouseEnter={this.mouseEnter}
                onMouseLeave={this.mouseLeave}
                className={classnames(this.props.className, styles.Carousel)}>
                <div className={styles.items}>
                    {this.renderChildren()}
                    <div className={styles.arrowLeft} onClick={this.previousThumb} />
                    <div className={styles.arrowRight} onClick={this.nextThumb} />
                </div>
                <div className={styles.thumbs}>
                    {this.renderThumbs()}
                </div>
            </div>
        )
    }

    private renderChildren() {
        const children: Array<ReactElement<any>> =
            Array.isArray(this.props.children)
                ? this.props.children as Array<ReactElement<any>>
                : [this.props.children]

        return children.map((x, i) => (
            <div key={i} className={classnames(
                styles.item,
                (i === this.state.currentIndex) ? styles.itemFocused : undefined,
            )}>
                {x}
            </div>
        ))
    }

    private renderThumbs() {
        return range(this.state.count).map((x, i) => (
            <div
                key={i}
                className={classnames(
                    styles.thumb,
                    this.state.currentIndex === i ? styles.thumbFocused : undefined
                )}
                onClick={this.onThumbClick(i)}
            />
        ))
    }

    private mouseEnter() {
        this.setState(prevState => ({
            mouseOver: true,
        }))
    }

    private mouseLeave() {
        this.setState(prevState => ({
            mouseOver: false,
        }))
    }

    private onThumbClick(index: number) {
        return () => {
            this.setState(prevState => ({
                currentIndex: index
            }))
        }
    }

    private nextThumb() {
        this.setState(prevState => ({
            currentIndex: (prevState.currentIndex + 1) % prevState.count
        }))
    }

    private previousThumb() {
        this.setState(prevState => ({
            currentIndex: (prevState.currentIndex + prevState.count - 1) % prevState.count
        }))
    }
}
