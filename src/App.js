import React, { Component } from 'react';

import './App.css';
import Main from './Main'
import SignIn from './SignIn'
import SignOut from './SignOut'
import base, { auth } from './base'

class App extends Component {
  constructor() {
    super()
    this.state = {
      notes: {},
      currentNoteId: null,
      uid: null,
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

  syncNotes = () => {
    this.ref = base.syncState(
      `${this.state.uid}/notes`, {
        context: this,
        state: 'notes', 
      }
    )
  }

  setCurrentNoteID = (noteId) => {
    this.setState({ currentNoteId: noteId })
  }

  saveNote = (note) => {
    if (!note.id) {
      note.id = Date.now()
    }
    const notes = { ...this.state.notes }
    notes[note.id] = note
    this.setState({ notes })
  }

  removeNote = (note) => {
    const notes = {...this.state.notes}
    notes[note.id] = null
    this.setState({ notes })
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

  signOut = () => {
    auth
      .signOut()
      .then(() => {
        base.removeBinding(this.ref)
        this.setState({ notes: {} })
      })
  }

  renderMain = () => {
    const actions = {
      saveNote: this.saveNote,
      removeNote: this.removeNote,
      setNote: this.setNote,
      setCurrentNoteID: this.setCurrentNoteID,
    }
    return(
      <div>
        <SignOut signOut={this.signOut}/>
        <Main 
          notes={this.state.notes}
          currentNote={this.state.currentNote} 
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
