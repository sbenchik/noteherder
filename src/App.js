import React, { Component } from 'react';

import './App.css';
import Main from './Main'

class App extends Component {
  state = {
    notes: {},
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
