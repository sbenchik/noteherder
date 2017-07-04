import Rebase from 'rebase'
import firebase from 'firebase-app'
import database from 'firebase/datbase'

const app = firebase.initializeApp({
    apiKey: "YOUR API KEY",
    authDomain: "YOUR-APP.firebaseapp.com",
    databaseURL: "https://YOUR-APP.firebaseio.com",
    projectId: "YOUR-APP",
    storageBucket: "YOUR-APP.appspot.com",
    messagingSenderId: "YOUR MESSAGING SENDER ID"
})

const db = database(app)

export const auth = app.auth()
export const githubProvider = new firebase.auth.GithubAuthProvider();

export default Rebase.createClass(db)