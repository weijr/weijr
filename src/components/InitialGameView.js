import React, { Component } from 'react';
import './App.css';
import App from './App'
import { Switch, Route, Link } from 'react-router-dom'
import { db } from '../fire/firestore'
import { connect } from 'react-redux';
import { postMssage, writeMessage } from '../store';
import MessageList from './GeneralChat/messageList'
import GeneralChat from './GeneralChat/index'
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
      messages: [],
      wager: this.props.match.params.id
    }
  }



  render() {

    return (
      <div className="App">
        <GeneralChat wager={this.state.wager}/>
      </div>
    )
  }
}

// const mapStateToProps = function (state, ownProps) {
//   return {
//     newMessageEntry: state.newMessageEntry,
//     name: state.name
//   };
// };

// const mapDispatchToProps = function (dispatch, ownProps) {
//   return {
//     handleChange (evt) {
//       dispatch(writeMessage(evt.target.value));
//     },
//     handleSubmit (name, content, evt) {
//       evt.preventDefault();

//       // const { channelId } = ownProps;

//       dispatch(postMessage({ name, content, evt }));
//       // dispatch(writeMessage(''));
//     }
//   };
// };

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(InitialGameView);

export default InitialGameView

