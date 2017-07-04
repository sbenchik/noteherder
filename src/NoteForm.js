import React, { Component } from 'react'

import './NoteForm.css'

class NoteForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            note: this.blankNote(),
        }
    }

    componentWillReceiveProps = (nextProps) => {
        console.log(nextProps)
        const newId = nextProps.currentNoteID
        if(newId !== this.state.note.id){
            this.setState({ note: nextProps.notes[newId] })
        }
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
        this.setState({ note }, () => {
            this.props.saveNote(this.state.note)
        })
    }

    handleSubmit = (ev) => {
        ev.preventDefault()
        this.setState({ note: this.blankNote() })
    }

    handleRemove = (ev) => {
        this.props.removeNote(this.state.note)
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
                    <p>
                        <textarea
                            name="body"
                            cols="30"
                            rows="10"
                            placeholder="Just start typing..."
                            onChange={this.handleChanges}
                            value={this.state.note.body} />
                    </p>
                    <button type="submit">
                        Save and new
                    </button>
                    <button onClick={this.handleRemove}>
                        <i className="fa fa-trash-o"></i>
                    </button>
                </form>
            </div>
        )
    }
}

export default NoteForm