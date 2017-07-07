import React, { Component } from 'react';

import './App.css';
import Main from './Main'
import SignIn from './SignIn'
import base, { auth } from './base'

class App extends Component {
  constructor() {
    super()
    this.state = {
      notes: {},
      uid: null,
      currentNote: this.blankNote(),
    }
  }

  componentWillMount(){
    auth.onAuthStateChanged((user) => {
      if(user){
        // finished signing in
        this.authHandler(user)
      } else {
        // finished signing out
        this.setState({ uid: null, notes: {} })
      }
    })
  }

  blankNote = () => {
        return {
            id: null,
            title: '',
            body: '',
        }
    }

  syncNotes = () => {
    this.ref = base.syncState(
      `notes/${this.state.uid}`, {
        context: this,
        state: 'notes', 
      })
  }

  setCurrentNote = (note) => {
    this.setState({ currentNote: note })
  }

  saveNote = (note) => {
    if (!note.id) {
      note.id = Date.now()
    }
    const notes = { ...this.state.notes }
    notes[note.id] = note
    this.setState({ notes, currentNote: note })
  }

  removeNote = (note) => {
    const notes = {...this.state.notes}
    notes[note.id] = null
    this.setState({ notes }, this.newNote())
  }

  signedIn = () => {
    return this.state.uid
  }

  authHandler = (user) => {
    this.setState(
      { uid: user.uid },
      this.syncNotes
      )
  }

  newNote = (ev) => {
    this.setCurrentNote(this.blankNote())
  }

  signOut = () => {
    auth.signOut()
      .then(() => {
        base.removeBinding(this.ref)
        this.setState({ 
          notes: {}, 
          currentNote: this.blankNote(), 
        })
      })
  }

  renderMain = () => {
    const actions = {
      saveNote: this.saveNote,
      removeNote: this.removeNote,
      setCurrentNote: this.setCurrentNote,
      newNote: this.newNote,
      signOut: this.signOut,
    }

    const noteData = {
      notes: this.state.notes,
      currentNote: this.state.currentNote,
    }

    return(
      <div>
        <Main
          {...noteData}
          {...actions} />
      </div>
    )
  }

  render() {
    return (
      <div className="App">
        { this.signedIn() ? this.renderMain() : <SignIn/> }
      </div>
    );
  }
}

export default App;
