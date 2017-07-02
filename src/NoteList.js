import React from 'react'

import './NoteList.css'
import Note from './Note'

const NoteList = ({ notes, setCurrentNoteID }) => {
  return (
    <div className="NoteList">
      <h3>Notes</h3>
      <ul id="notes">
        {Object.keys(notes).map((noteId) => {
          return <Note
                   note={notes[noteId]}
                   key={noteId}
                   setCurrentNoteID={setCurrentNoteID}
                 />
        })}
      </ul>
    </div>
  )
}

export default NoteList