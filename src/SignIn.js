import React from 'react'

import './SignIn.css'

const SignIn = ({ authHandler }) => {
    const authenticate = () => {
        authHandler({
            uid: 'dstrus',
        })
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