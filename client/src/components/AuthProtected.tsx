import React from 'react'
import { useAppSelector } from '../app/hooks'

function AuthProtected() {
    const user = useAppSelector((state) => state.user);

    return (
        <h1>hello</h1>       
    )
}

export default AuthProtected