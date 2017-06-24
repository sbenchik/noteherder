import React, { Component } from 'react'

import './NoteForm.css'

class NoteForm extends Component{
    render(){
        return(
            <div className="NoteForm">
                <form onSubmit={this.props.addNote}>
                    <p>
                        <input type="text" name="title" placeholder="New Note"/>
                    </p>
                    <p>
                        <textarea name="body" cols="30" rows="10" placeholder="Just start typing..."></textarea>
                    </p>
                </form>
            </div>
        )
    }
}

export default NoteForm