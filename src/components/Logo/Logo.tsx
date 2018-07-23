import * as React from 'react'
import * as logo from './logo.png'

export const Logo = ({ mainLink = '/', className = '' }) => (
    <a href={mainLink} className={[className].join(' ')}>
        <img src={logo} alt="Steam" />
    </a>
)
