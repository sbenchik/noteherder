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
      currentNote: this.blankNote(),
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

  blankNote = () => {
    return {
      id: null,
      title: '',
      body: '',
    }
  }

  setNote = (ev) => {
    const title = ev.currentTarget.children[0].textContent
    const body = ev.currentTarget.children[1].textContent
    // console.log(`${title}, ${body}`)
    this.setState({ currentNote: {
      title: title,
      body: body,
    } }, () => {
      //console.log(this.state.currentNote.title)
    })
  }

  saveNote = (note) => {
    if (!note.id) {
      note.id = Date.now()
    }
    const notes = { ...this.state.notes }
    notes[note.id] = note
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
    return(
      <div>
        <SignOut signOut={this.signOut}/>
        <Main 
          notes={this.state.notes}
          currentNote={this.state.currentNote} 
          saveNote={this.saveNote} 
          setNote={this.setNote} />
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
