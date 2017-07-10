import React from 'react'
import { Link } from 'react-router-dom'

import SignOut from './SignOut'
import './Sidebar.css'
import quill from './quill.svg'
import newHover from './new-hover.png'
import newImg from './new.png'

const Sidebar = (props) => {
    return (
        <nav className="Sidebar">           
            <div className="logo">
                <img src={quill} alt="Noteherder" />
            </div>
            <Link to="/notes">
                <button className="new-note">
                    <img src={newHover} alt="New note" />
                    <img className="outline" src={newImg} alt="New note" />
                </button>
            </Link>
            <SignOut signOut={props.signOut} /> 
        </nav>
    )
}

export default Sidebar