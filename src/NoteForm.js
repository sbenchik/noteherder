import React, { Component } from 'react'

import './NoteForm.css'

class NoteForm extends Component{
    constructor(props){
        super(props)
        
        this.state = {
            note: this.blankNote(),
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
        const note = {...this.state.note}
        note[ev.target.name] = ev.target.value
        this.setState({ note }, () => {
            this.props.saveNote(this.state.note)
        })
    }

    render(){
        return(
            <div className="NoteForm">
                <form>
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
                </form>
            </div>
        )
    }
}

export default NoteForm