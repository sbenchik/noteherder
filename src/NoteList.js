import React from 'react'

import './NoteList.css'
import Note from './Note'

const NoteList = ({ notes }) => {
  const sortNotes = (a, b) => {
    return notes[b].lastEdited - notes[a].lastEdited
  }
  
  const sortedNoteIds = Object.keys(notes).sort(sortNotes)

  return (
    <div className="NoteList">
      <h3>Notes</h3>
      <ul id="notes">
        {sortedNoteIds.map((noteId) => {
          return <Note
                   note={notes[noteId]}
                   key={noteId}
                 />
        })}
      </ul>
    </div>
  )
}

export default NoteList