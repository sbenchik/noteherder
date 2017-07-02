import React from 'react'

import './Main.css'
import Sidebar from './Sidebar'
import NoteList from './NoteList'
import NoteForm from './NoteForm'

const Main = (props) => {
    return (
        <div className="Main">
            <Sidebar />
            <NoteList 
                notes={props.notes} 
                setCurrentNoteID={props.setCurrentNoteID}/>
            <NoteForm {...props}/>
        </div>
    )
}

export default Main;