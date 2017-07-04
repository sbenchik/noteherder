import React from 'react'

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
            <button className="new-note">
                <img src={newHover} alt="New note" />
                <img className="outline" src={newImg} alt="New note" onClick={props.newNote}/>
            </button>
        </nav>
    )
}

export default Sidebar