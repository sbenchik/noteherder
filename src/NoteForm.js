import React, { Component } from 'react'
import RichTextEditor from 'react-rte'

import './NoteForm.css'

class NoteForm extends Component {
    constructor(props){
        super(props)
        this.state = {
            editorValue: RichTextEditor.createEmptyValue(),
        }
    }
    
   componentWillReceiveProps = (nextProps) => {
        const note = nextProps.currentNote

        let editorValue = this.state.editorValue
        if(editorValue.toString('html') !== note.body){
            editorValue = RichTextEditor.createValueFromString(note.body, 'html')
        }

        this.setState({ editorValue })
   }

    handleChanges = (ev) => {
        const note = { ...this.props.currentNote }
        note[ev.target.name] = ev.target.value
        this.props.saveNote(note)
    }

    handleEditorChanges = (editorValue) => {
        this.setState({ editorValue })

        const note = {...this.props.currentNote}
        note.body = editorValue.toString('html')
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
                    {/*<p>*/}
                        <RichTextEditor
                            name="body"
                            cols="30"
                            rows="10"
                            placeholder="Just start typing..."
                            onChange={this.handleEditorChanges}
                            value={this.state.editorValue} />
                    {/*</p>*/}
                    <button type="button" onClick={this.handleRemove}>
                        <i className="fa fa-trash-o"></i>
                    </button>
                </form>
            </div>
        )
    }
}

export default NoteForm