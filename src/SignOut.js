import React from 'react'

const SignOut = ({ signOut }) => {
    return(
        <button 
            className="SignOut"
            onClick={signOut}>
                Sign Out
        </button>
    )
}

export default SignOut