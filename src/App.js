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
    
  }

  syncNotes = () => {
    base.syncState(
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
    console.log(`${title}, ${body}`)
    this.setState({ currentNote: {
      title: title,
      body: body,
    } })
    console.log(this.state.currentNote.title)
    //document.querySelector('input').value = this.state.currentNote.title
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
      .then(this.setState({ uid: null }))
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
        { this.signedIn() ? this.renderMain() : <SignIn authHandler={this.authHandler}/> }
      </div>
    );
  }
}

export default App;
