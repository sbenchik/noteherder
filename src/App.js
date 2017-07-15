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
      })
  }

  stopSynching = () => {
    if(this.ref){
      base.removeBinding(this.ref)
    }
  }

  setCurrentNote = (note) => {
    this.setState({ currentNoteId: note.id })
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
      currentNote: note,
    })
    if (shouldRedirect) {
      this.props.history.push(`/notes/${note.id}`)
    }
  }

  removeNote = () => {
    const notes = { ...this.state.notes }
    notes[this.state.currentNoteId] = null
    this.setState({ notes }, this.blankNote())
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

  newNote = (ev) => {
    this.setCurrentNote({ id: null })
  }

  signOut = () => {
    auth.signOut()
      .then(() => {
        this.stopSynching()
        this.setState({
          notes: {},
          currentNote: this.blankNote(),
        })
      })
  }

  render() {
    const actions = {
      saveNote: this.saveNote,
      removeNote: this.removeNote,
      setCurrentNote: this.setCurrentNote,
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
              ? <Main {...noteData} {...actions} />
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
