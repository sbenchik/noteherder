import React from 'react'

import './SignIn.css'
import { auth, githubProvider, googleProvider } from './base'

const SignIn = () => {
    const authenticate = (provider) => {
        auth.signInWithPopup(provider)
    }

    return (
        <div>
            <button
                className="SignInGithub"
                onClick={() => authenticate(githubProvider)}>
                <i className="fa fa-github"></i> Sign In With Github
            </button>
            <button
                className="SignInGoogle"
                onClick={() => authenticate(googleProvider)}>
                <i className="fa fa-google"></i> Sign In With Google
            </button>
        </div>
    )
}

export default SignIn