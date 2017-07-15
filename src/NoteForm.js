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
            const nextId = nextProps.currentNoteId
            const note = nextProps.notes[nextId] || this.blankNote()

            let editorValue = this.state.editorValue
            if(editorValue.toString('html') !== note.body){
                editorValue = RichTextEditor.createValueFromString(note.body, 'html')
            }

            this.setState({ note, editorValue })
       }

    blankNote = () => {
        return {
            id: null,
            title: '',
            body: '',
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
                            value={this.state.note.title} />
                    </p>
                    <RichTextEditor
                        name="body"
                        cols="30"
                        rows="10"
                        placeholder="Just start typing..."
                        onChange={this.handleEditorChanges}
                        value={this.state.editorValue} />
                    <button type="button" onClick={this.handleRemove}>
                        <i className="fa fa-trash-o"></i>
                    </button>
                </form>
            </div>
        )
    }
}

export default NoteForm