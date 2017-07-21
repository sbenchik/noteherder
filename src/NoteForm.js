import React, { Component } from 'react'
import RichTextEditor from 'react-rte'

import './NoteForm.css'

class NoteForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            note: this.blankNote(),
            editorValue: RichTextEditor.createEmptyValue(),
        }
    }

    componentWillReceiveProps = (nextProps) => {
        const idFromUrl = nextProps.match.params.id
        const note = nextProps.notes[idFromUrl] || this.blankNote()

        const noteNotFound = idFromUrl && !note.id
        if (noteNotFound && nextProps.firebaseNotesSynced) {
            this.props.history.replace('/notes')
        }

        let editorValue = this.state.editorValue
        if (editorValue.toString('html') !== note.body) {
            editorValue = RichTextEditor.createValueFromString(note.body, 'html')
        }

        this.setState({ note, editorValue })
    }

    blankNote = () => {
        return {
            id: null,
            title: '',
            body: '',
            date: Date.now(),
        }
    }

    handleChanges = (ev) => {
        const note = { ...this.state.note }
        note[ev.target.name] = ev.target.value
        this.setState(
            { note },
            () => this.props.saveNote(note)
        )
    }

    handleEditorChanges = (editorValue) => {
        const note = { ...this.state.note }
        note.body = editorValue.toString('html')
        this.setState(
            { note, editorValue },
            () => this.props.saveNote(note)
        )
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
                            value={this.state.note.title} />
                    </p>
                    <RichTextEditor
                        className="editor"
                        name="body"
                        cols="30"
                        rows="10"
                        placeholder="Just start typing..."
                        onChange={this.handleEditorChanges}
                        value={this.state.editorValue} />
                    <button type="button" onClick={() => this.props.removeNote(this.state.note)}>
                        <i className="fa fa-trash-o"></i>
                    </button>
                </form>
            </div>
        )
    }
}

export default NoteForm