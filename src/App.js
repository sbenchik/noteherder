import React, { Component } from 'react';

import './App.css';
import Main from './Main'

class App extends Component {
  state = {
    notes: {
      'note-1':{
        title: 'Note 1!',
        body: 'Body of note 1!',
      },
      'note-2':{
        title: 'Note 2!',
        body: 'Body of note 2!',
      },
    },
  }

  addNote = (ev) => {
    ev.preventDefault()
    const noteTitle = ev.target.querySelector('input').value
    const noteBody = ev.target.querySelector('textarea').value
    const notes = {...this.state.notes}
    const id = Date.now()
    notes[id] = {
      id: id,
      title: noteTitle,
      body: noteBody,
    }
    this.setState({ notes })
    ev.target.reset()
  }

  deleteNote = (ev) => {
    return
  }

  render() {
    return (
      <div className="App">
        <Main notes={this.state.notes} addNote={this.addNote} />
      </div>
    );
  }
}

export default App;
