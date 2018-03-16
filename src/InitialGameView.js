import React, { Component } from 'react';
import './App.css';
import App from './App'
import { Switch, Route, Link } from 'react-router-dom'
// const firebase = require("firebase");
// require("firebase/firestore");


// var config = {
//   apiKey: "AIzaSyD-SRNhQPjUTiCCFjb8miJPkvaNwaEIvxA",
//   authDomain: "mafia-blockchain.firebaseapp.com",
//   databaseURL: "https://mafia-blockchain.firebaseio.com",
//   projectId: "mafia-blockchain",
//   storageBucket: "mafia-blockchain.appspot.com",
//   messagingSenderId: "291156435310"
// };

// firebase.initializeApp(config);

// var db = firebase.firestore();


class InitialGameView extends Component {

  render() {
      return (
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">GAME ROOM BE HERE</h1>
            <Link to="/" className="link-btn">Home</Link>
          </header>
        </div>
      )
    }
  }

export default InitialGameView;
