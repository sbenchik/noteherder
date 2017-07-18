import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import './App.css'
import Main from './Main'
import SignIn from './SignIn'
import base, { auth } from './base'

class App extends Component {
  constructor() {
    super()
    this.state = {
      notes: {},
      uid: null,
      currentNoteId: null,
      firebaseNotesSynced: false,
    }
  }

  componentWillMount() {
    this.getUserFromLocalStorage()
    auth.onAuthStateChanged((user) => {
      if (user) {
        // finished signing in
        this.authHandler(user)
      } else {
        // finished signing out
        this.setState({ uid: null, notes: {} })
      }
    })
  }

  getUserFromLocalStorage = () => {
    const uid = localStorage.getItem('uid')
    if(!uid) return
    this.setState({ uid })
  }

  syncNotes = () => {
    this.ref = base.syncState(
      `notes/${this.state.uid}`, {
        context: this,
        state: 'notes',
        then: () => this.setState({ firebaseNotesSynced: true })
      })
  }

  stopSynching = () => {
    if(this.ref){
      base.removeBinding(this.ref)
    }
  }

  saveNote = (note) => {
    let shouldRedirect = false
    if (!note.id) {
      note.id = Date.now()
      shouldRedirect = true
    }
    const notes = {...this.state.notes}
    notes[note.id] = note
    this.setState({
      notes,
    })
    if (shouldRedirect) {
      this.props.history.push(`/notes/${note.id}`)
    }
  }

  removeNote = (note) => {
    const notes = { ...this.state.notes }
    notes[note.id] = null
    this.setState({ notes })
    this.props.history.push('/notes')
  }

  signedIn = () => {
    return this.state.uid
  }

  authHandler = (user) => {
    localStorage.setItem('uid', user.uid)
    this.setState(
      { uid: user.uid },
      this.syncNotes
    )
  }

  signOut = () => {
    auth.signOut()
      .then(() => {
        this.stopSynching()
        this.setState({
          notes: {},
        })
      })
  }

  render() {
    const actions = {
      saveNote: this.saveNote,
      removeNote: this.removeNote,
      newNote: this.newNote,
      signOut: this.signOut,
    }

    const noteData = {
      notes: this.state.notes,
      currentNoteId: this.state.currentNoteId,
    }

    return (
      <div className="App">
        <Switch>
          <Route path="/notes" render={() => (
            this.signedIn()
              ? <Main 
                {...noteData} 
                {...actions}
                firebaseNotesSynced={this.state.firebaseNotesSynced} />
              : <Redirect to="/sign-in" />
          )} />
          <Route path="/sign-in" render={() => (
            !this.signedIn()
              ? <SignIn />
              : <Redirect to="/notes" />
          )} />
          <Route render={() => <Redirect to="/notes" />} />
        </Switch>
      </div>
    );
  }
}

export default App;
