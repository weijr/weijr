import React, { Component } from 'react';
import './App.css';
import App from './App'
import { Switch, Route, Link } from 'react-router-dom'
import { db } from '../fire/firestore'
import { connect } from 'react-redux';
import { postMssage, writeMessage } from '../store';
import MessageList from './GeneralChat/messageList'
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
  constructor(props) {
    super(props)
    this.state = {
      messages: []
    }

    this.submitMessage = this.submitMessage.bind(this)
  }

  submitMessage = (handle, message, evt) => {

    evt.preventDefault()
    let dateTime = Date.now().toString()
    let actionsRef = db.collection("rooms").doc("room1").collection("actions")
    let playersRef = db.collection('/rooms/room1/players')


    
    // playersRef.get()
    //   .then(querySnapshot => {
    //     if (querySnapshot.docs) {
    //       let docs = querySnapshot.docs
    //       for (let doc of docs) {
    //           console.log(doc.ref.path)
    //       }}
    //     })

    // actionsRef
    //   .doc(dateTime)
    //   .set({
    //     handle: handle,
    //     message: message,
    //     type: 'generalMessage'
    //   })

    // console.log('made it here')
  }

  render() {
    const { name, newMessageEntry, handleChange, handleSubmit } = this.props;

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">GAME ROOM BE HERE</h1>
          <Link to="/" className="link-btn">Home</Link>
        </header>
        <MessageList />
      </div>
    )
  }
}

const mapStateToProps = function (state, ownProps) {
  return {
    newMessageEntry: state.newMessageEntry,
    name: state.name
  };
};

const mapDispatchToProps = function (dispatch, ownProps) {
  return {
    handleChange (evt) {
      dispatch(writeMessage(evt.target.value));
    },
    handleSubmit (name, content, evt) {
      evt.preventDefault();

      // const { channelId } = ownProps;

      dispatch(postMessage({ name, content, evt }));
      // dispatch(writeMessage(''));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InitialGameView);


