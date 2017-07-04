import React from 'react'

import './Main.css'
import Sidebar from './Sidebar'
import NoteList from './NoteList'
import NoteForm from './NoteForm'

const Main = (props) => {
    return (
        <div className="Main">
            <Sidebar newNote={props.newNote}/>
            <NoteList 
                notes={props.notes} 
                setCurrentNote={props.setCurrentNote}/>
            <NoteForm {...props}/>
        </div>
    )
}

export default Main;