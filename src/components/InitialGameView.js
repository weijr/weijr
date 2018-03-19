import React, { Component } from 'react';
import './App.css';
import App from './App'
import { Switch, Route, Link } from 'react-router-dom'
import { db } from '../fire/firestore'
import { connect } from 'react-redux';
import { postMssage, writeMessage } from '../store';
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

  // componentDidMount() {
  //   let messages = db.collection('game').doc('gameRoom1')
  //                 .collection('messages')
  //   messages.get()
  //     .then((doc) => {
  //       console.log(doc.data)
  //     })
  //   console.log(messages.data)  
  // }

  submitMessage = (handle, message, evt) => {

    evt.preventDefault()
    let dateTime = Date.now().toString()
    let actionsRef = db.collection("rooms").doc("room1").collection("actions")
    
    actionsRef
      .doc(dateTime)
      .set({
        handle: handle,
        message: message,
      })

    console.log('made it here')
  }

  render() {
    const { name, newMessageEntry, handleChange, handleSubmit } = this.props;

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">GAME ROOM BE HERE</h1>
          <Link to="/" className="link-btn">Home</Link>
        </header>
        <form id="new-message-form" onSubmit={evt => this.submitMessage("defaultHandle", newMessageEntry, evt)}>
          <div className="input-group input-group-lg">
            <input
              className="form-control"
              type="text"
              value={newMessageEntry}
              onChange={handleChange}
              placeholder="Say something nice..."
            />
            <span className="input-group-btn">
              <button className="btn btn-default" type="submit">Chat!</button>
            </span>
          </div>
        </form>
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


