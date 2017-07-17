import React from 'react'
import DOMPurify from 'dompurify'
import { NavLink } from 'react-router-dom'


const Note = (props) => {
    
    const sanitizeNote = (noteBody) => {
         return {
            __html: DOMPurify.sanitize(noteBody),
         }
    }

    return (
        <NavLink to={`/notes/${props.note.id}`}>
            <li>
                <div className="note">
                    <div className="note-title">
                        {props.note.title}
                    </div>
                    <div 
                        className="note-body"
                        dangerouslySetInnerHTML={sanitizeNote(props.note.body)}
                    >
                    </div>
                </div>
            </li>
        </NavLink>
    )
}

export default Note