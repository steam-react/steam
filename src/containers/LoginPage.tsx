import * as React from 'react'
import { LayoutStore } from '../components/LayoutStore'
import { HeaderStore } from '../components/HeaderStore'
import LoginForm from './LoginForm'

export default () => (
    <LayoutStore header={<HeaderStore />}>
        <LoginForm />
    </LayoutStore>
)
