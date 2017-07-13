import React from 'react'

import quill from './quill.svg'
import './SignIn.css'
import { auth, githubProvider, googleProvider } from './base'

const SignIn = () => {
    const authenticate = (provider) => {
        auth.signInWithPopup(provider)
    }

    return (
        <div className="SignIn">
            <header className="Header">
                <img src={quill} alt="" />
                <span className="title">Noteherder</span>
            </header>
            <main>
                <h3>Hey, Nerd! You Like Notes?</h3>
                <p>You never know when you'll need to write crap down. In fact, you should probably be taking notes right now.</p>
                <button
                    className="github"
                    onClick={() => authenticate(githubProvider)}>
                    <i className="fa fa-github"></i> Sign In With Github
                </button>
                <button
                    className="google"
                    onClick={() => authenticate(googleProvider)}>
                    <i className="fa fa-google"></i> Sign In With Google
                </button>
            </main>
        </div>
    )
}

export default SignIn