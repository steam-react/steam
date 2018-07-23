import * as React from 'react'

import * as styles from './styles.css'

import { ListView } from '../ListView'

export interface ILanguageInfo {
    id: string
    caption: string
    isActive?: boolean
}

interface ILanguageListProps {
    languages: ILanguageInfo[]
}

const getLanguageItem = (lang: ILanguageInfo) => (
    <a key={lang.id} className={styles.language} href={`#lang=${lang.id}`}>{lang.caption}</a>
)

export const LanguagesList = (p: ILanguageListProps) => (
    <ListView className={styles.LanguagesList}>
        {p.languages.filter(x => !Boolean(x.isActive)).map(getLanguageItem)}
    </ListView>
)
