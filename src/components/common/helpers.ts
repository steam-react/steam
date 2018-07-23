import * as React from 'react'

export const classnames = (...names: Array<string | null | undefined>): string =>
    Array.from(new Set(names.filter(Boolean))).join(' ')

export const addClassnames = (
    classNames: Array<string | undefined>,
    elem: React.ReactElement<any>
): React.ReactElement<any> => React.cloneElement(
    elem,
    {
        className: classnames(...classNames.concat(elem.props.className))
    }
)

export const splitArray = (maxLength: number, arr: any[]) => {
    if (arr.length < 1) {
        return [[]]
    }
    const result = Array(Math.ceil(arr.length / maxLength)).fill(0)
    return result.map(
        (x, i) => arr.slice(i * maxLength, i * maxLength + maxLength)
    )
}
