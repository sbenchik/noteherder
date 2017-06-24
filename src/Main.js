import React from 'react'

import './Main.css'
import Sidebar from './Sidebar'
import NoteList from './NoteList'
import NoteForm from './NoteForm'

const Main = (props) => {
    return (
        <div className="Main">
            <Sidebar />
            <NoteList />
            <NoteForm addNote={props.addNote.bind(this)}/>
        </div>
    )
}

export default Main;