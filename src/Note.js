import React from 'react'
import DOMPurify from 'dompurify'


const Note = (props) => {
    
    const sanitizeNote = (noteBody) => {
         return {
            __html: DOMPurify.sanitize(noteBody),
         }
    }

    return (
        <li>
            <div className="note" onClick={() => props.setCurrentNote(props.note)}>
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
    )
}

export default Note