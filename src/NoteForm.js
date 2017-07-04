import React, { Component } from 'react'

import './NoteForm.css'

class NoteForm extends Component {

    handleChanges = (ev) => {
        const note = { ...this.props.currentNote }
        note[ev.target.name] = ev.target.value
        this.props.saveNote(note)
    }

    handleRemove = (ev) => {
        this.props.removeNote(this.props.currentNote)
    }

    render() {
        return (
            <div className="NoteForm">
                <form onSubmit={this.handleSubmit}>
                    <p>
                        <input
                            type="text"
                            name="title"
                            placeholder="New Note"
                            onChange={this.handleChanges}
                            value={this.props.currentNote.title} />
                    </p>
                    <p>
                        <textarea
                            name="body"
                            cols="30"
                            rows="10"
                            placeholder="Just start typing..."
                            onChange={this.handleChanges}
                            value={this.props.currentNote.body} />
                    </p>
                    <button type="button" onClick={this.handleRemove}>
                        <i className="fa fa-trash-o"></i>
                    </button>
                </form>
            </div>
        )
    }
}

export default NoteForm