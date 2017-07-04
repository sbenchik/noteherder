import React from 'react'

import './SignIn.css'
import { auth, googleProvider } from './base'

const SignIn = () => {
    const authenticate = () => {
        auth.signInWithPopup(googleProvider)
    }

    return(
        <button 
            className="SignIn"
            onClick={authenticate}>
            Sign In
        </button>
    )
}

export default SignIn