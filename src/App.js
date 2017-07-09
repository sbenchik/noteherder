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
      currentNote: this.blankNote(),
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

  stopSynching = () => {
    if(this.ref){
      base.removeBinding(this.ref)
    }
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
    const notes = { ...this.state.notes }
    notes[note.id] = null
    this.setState({ notes }, this.newNote())
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
    this.setCurrentNote(this.blankNote())
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

  // renderMain = () => {

  //   return (
  //     <div>

  //     </div>
  //   )
  // }

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
      currentNote: this.state.currentNote,
    }

    return (
      <div className="App">
        <Switch>
          <Route path="/notes" render={() => (
            this.signedIn() 
              ? <Main
                  {...noteData}
                  {...actions} 
                />
              : <Redirect to="/sign-in" />
          )} />
          <Route path="/sign-in" render={() => (
            !this.signedIn()
              ? <SignIn />
              : <Redirect to="/notes" />
          )}/>
          <Route path="/" render={() => <Redirect to="/notes" />} />
        </Switch>
      </div>
    );
  }
}

export default App;
