import * as React from 'react'
import { Component } from 'react'

import * as styles from './styles.css'
import { UserAvatar } from '../UserAvatar'
import { classnames } from '../common/helpers'

import { TStorePriceInfoProps, StorePriceInfo } from '../StorePriceInfo'

type TPlatform = 'windows' | 'macos' | 'linux'

export interface IStoreCapsuleLProps {
    name: string
    href: string
    pictures: string[]
    reason: TReasonProps
    priceInfo: TStorePriceInfoProps
    platforms: TPlatform[]

}

interface IStoreCapsuleLState {
    pictureIndex: number
}

type TReasonProps = IReasonByTagsProps | IReasonByCuratorProps

interface IReasonByTagsProps {
    type: 'by_tags'
    tags: string[]
}

interface IReasonByCuratorProps {
    type: 'by_curator'
    name: string
    avatarUrl: string
}

const ReasonByTag = (p: IReasonByTagsProps) => (
    <div className={classnames(styles.reason, styles.reasonByTags)}>
        <div className={styles.reasonText}>
            <strong>Recommended</strong>
            because you played games tagged with
                </div>
        <div className={styles.reasonTags}>
            {p.tags.map(x => (
                <span key={x} className={styles.tag}>{x}</span>
            ))}
        </div>
    </div>
)

const ReasonByCurator = (p: IReasonByCuratorProps) => (
    <div className={classnames(styles.reason, styles.reasonByCurator)}>
        <UserAvatar
            className={styles.reasonAvatar}
            size="m"
            userPic={p.avatarUrl} />
        <div className={styles.reasonText}>
            <strong>Recommended</strong> by <br />
            {p.name}
        </div>
    </div>
)

const Reason = (p: TReasonProps) => {
    switch (p.type) {
        case 'by_tags':
            return ReasonByTag(p as IReasonByTagsProps)

        case 'by_curator':
            return ReasonByCurator(p as IReasonByCuratorProps)

        default:
            throw new Error(`Unknown reason`)
    }
}

const getPlatformIcon = (platformId: string) => {
    if (platformId.length === 0) {
        return null
    }

    const platformClass = platformId[0].toUpperCase()
        + platformId.substr(1).toLowerCase()

    return (
        <span key={platformId} className={styles[`platform${platformClass}`]} />
    )
}

export class StoreCapsuleL
    extends Component<IStoreCapsuleLProps, IStoreCapsuleLState> {

    public static defaultProps: Partial<IStoreCapsuleLProps> = {
        pictures: []
    }

    constructor(p: IStoreCapsuleLProps) {
        super(p)

        this.state = {
            pictureIndex: 0
        }

        this.showPicture = this.showPicture.bind(this)
    }

    public render() {
        const p = this.props

        const infoBlockClassname = classnames(
            styles.info,
            p.pictures.length < 2
                ? styles.infoNoPictures
                : null
        )

        const platforms = p.platforms && p.platforms.length > 0
            ? (<div className={styles.platforms}>{
                p.platforms.map(getPlatformIcon)
            }</div>)
            : null

        return (
            <a href={p.href} className={styles.StoreCapsule}>
                {this.getPicturesMain()}
                <div className={infoBlockClassname}>
                    <div className={styles.infoBody}>
                        <div className={styles.productName}>
                            {p.name}
                        </div>
                        <div
                            className={styles.pictures}
                            onMouseOut={this.showPicture(0)}>
                            {this.getPicturesSecondary()}
                        </div>
                        <Reason {...p.reason} />
                    </div>
                    <div className={styles.infoFooter}>
                        <StorePriceInfo size="s" {...p.priceInfo} />
                        {platforms}
                    </div>
                </div>
            </a>
        )
    }

    private showPicture(i: number) {
        return (e: React.MouseEvent<any>) => {
            this.setState(prevState => ({
                pictureIndex: i
            }))
        }
    }

    private getPicturesMain() {
        return this.props.pictures.map((picture, i) => (
            <div
                key={i}
                className={classnames(
                    styles.pictureMain,
                    i === this.state.pictureIndex
                        ? styles.pictureMainCurrent
                        : null
                )}
                style={{
                    backgroundImage: `url('${picture}')`
                }}
            />
        ))
    }

    private getPicturesSecondary() {
        if (this.props.pictures.length < 2) {
            return null
        }
        return this.props.pictures.slice(1).map((picture, i) => (
            <div
                key={i + 1}
                onMouseOver={this.showPicture(i + 1)}
                className={styles.pictureSecondaryWrapper}
            >
                <div
                    className={styles.pictureSecondary}
                    style={{ backgroundImage: `url('${picture}')` }}
                />
            </div>
        ))
    }
}
