import React from 'react'

import quill from './quill.svg'
import newHover from './new-hover.png'
import newImg from './new.png'

const Sidebar = () => {
    return (
    <nav class="Sidebar">
        <div class="logo">
            <img src={quill} alt="Noteherder" />
        </div>
        <button class="new-note">
            <img src={newHover} alt="New note" />
            <img class="outline" src={newImg} alt="New note" />
        </button>
    </nav>
    )
}

export default Sidebar