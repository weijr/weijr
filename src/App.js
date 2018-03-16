import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Switch, Route, Link } from 'react-router-dom'
const firebase = require("firebase");
require("firebase/firestore");


var config = {
  apiKey: "AIzaSyD-SRNhQPjUTiCCFjb8miJPkvaNwaEIvxA",
  authDomain: "mafia-blockchain.firebaseapp.com",
  databaseURL: "https://mafia-blockchain.firebaseio.com",
  projectId: "mafia-blockchain",
  storageBucket: "mafia-blockchain.appspot.com",
  messagingSenderId: "291156435310"
};

firebase.initializeApp(config);

var db = firebase.firestore();


class App extends Component {

  // enterGame = () => {
  //   //random name generator
  //   let name = ["abandoned","able","absolute","adorable","adventurous","academic","acceptable","acclaimed"]
  //   let nameIndex = Math.floor((Math.random() * name.length));
  //   let name2 = ["people","history","way","art","world","information","map","family","government","health"]
  //   let name2Index = Math.floor((Math.random() * name2.length));
  //   let randomName = name[nameIndex] + "  " + name2[name2Index]

  //   //random number generator for ether
  //   let randomEtherAmount = Math.floor((Math.random() * 100) + 75);

  //   db.collection("gameRoom1").add({
  //     name: randomName,
  //     ether: randomEtherAmount,
  //     role: 'mafia'
  //   })
  //     .then(function (docRef) {
  //       console.log("Document written with ID: ", docRef.id);
  //     })
  //     .catch(function (error) {
  //       console.error("Error adding document: ", error);
  //     });

  //   this.setState({
  //     home: false
  //   })
  // }


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Mafia on da bloc</h1>
        </header>
        <h2>Don't know how to play? Click here for instructions.</h2>
        <h2>To join a game:</h2>
        <Link to={'/game'} className="link-btn">Click Here</Link>
      </div>
    )
  }
}

export default App;
