import * as React from 'react'
import { Component, ReactElement } from 'react'

export type ComponentSize = 's' | 'm' | 'l'

export interface IClickableProps {
    onClick?: React.MouseEventHandler<any>
}

export type ClickableElement = ReactElement<IClickableProps>
export type ClickableComponent = Component<IClickableProps>
