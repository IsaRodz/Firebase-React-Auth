import React, { Component, Fragment } from 'react';
import * as firebase from 'firebase'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'

firebase.initializeApp({
  apiKey: /* API_KEY */,
  authDomain: /*AUTH_DOMAIN*/,
  // The information above in found in the app configuration provide bt Firebase...
})

class App extends Component {

  state = {
    isSignIn: false
  }

  uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      signInSuccess: () => false
    }
  }

  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ isSignIn: !!user })
      console.log('user', user)
    })
  }

  render() {
    return (
      <div className="container">
        <h1>React Firebase Auth</h1>
        {
          this.state.isSignIn ?
            (
              <Fragment>
                <h2>Welcome, {firebase.auth().currentUser.displayName}! </h2>
                <img className="user_pic"
                  alt={firebase.auth().currentUser.displayName}
                  src={firebase.auth().currentUser.photoURL}
                />
                <button onClick={() => firebase.auth().signOut()}>Sign out</button>
              </Fragment>
            ) : (
              <Fragment>
                <h2>Sign in </h2>
                <StyledFirebaseAuth
                  uiConfig={this.uiConfig}
                  firebaseAuth={firebase.auth()}
                />
              </Fragment>
            )
        }
      </div>
    );
  }
}

export default App;
