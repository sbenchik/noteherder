import React, { Component } from 'react';

import './App.css';
import Main from './Main'

class App extends Component {
  state = {
    notes: [],
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

  render() {
    return (
      <div className="App">
        <Main addNote={this.addNote} />
      </div>
    );
  }
}

export default App;
