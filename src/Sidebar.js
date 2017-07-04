import React from 'react'

import SignOut from './SignOut'
import './Sidebar.css'
import quill from './quill.svg'
import newHover from './new-hover.png'
import newImg from './new.png'

const Sidebar = (props) => {
    return (
        <nav className="Sidebar">
            <SignOut signOut={props.signOut} />            
            <div className="logo">
                <img src={quill} alt="Noteherder" />
            </div>
            <button className="new-note">
                <img src={newHover} alt="New note" />
                <img className="outline" src={newImg} alt="New note" onClick={props.newNote}/>
            </button>
        </nav>
    )
}

export default Sidebar