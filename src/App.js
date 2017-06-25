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

  saveNote = (note) => {
    if(!note.id){
      note.id = Date.now()
    }
    const notes = {...this.state.notes}
    notes[note.id] = note
    this.setState({ notes })
  }

  render() {
    return (
      <div className="App">
        <Main notes={this.state.notes} saveNote={this.saveNote} />
      </div>
    );
  }
}

export default App;
