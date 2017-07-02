import React from 'react'

const Note = (props) => {
    return (
        <li>
            <div className="note" onClick={props.setNote} id={props.note.id}>
                <div className="note-title">
                    {props.note.title}
                </div>
                <div className="note-body">
                    <p>
                       {props.note.body}
                    </p>
                </div>
            </div>
        </li>
    )
}

export default Note