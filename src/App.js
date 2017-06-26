import React, { Component } from 'react';

import './App.css';
import Main from './Main'

class App extends Component {
  constructor() {
    super()
    this.state = {
      notes: {
        'note-1': {
          title: 'Note 1',
          body: 'Note 1!',
        },
      },
      currentNote: this.blankNote(),
    }
  }

  blankNote = () => {
    return {
      id: null,
      title: '',
      body: '',
    }
  }

  setNote = (ev) => {
    console.log(ev.currentTarget.dataset.value)
  }

  saveNote = (note) => {
    if (!note.id) {
      note.id = Date.now()
    }
    const notes = { ...this.state.notes }
    notes[note.id] = note
    this.setState({ notes })
  }

  render() {
    return (
      <div className="App">
        <Main notes={this.state.notes} saveNote={this.saveNote} setNote={this.setNote} />
      </div>
    );
  }
}

export default App;
