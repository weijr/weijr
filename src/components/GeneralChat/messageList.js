import React, { Component } from 'react';
// import './App.css';
// import App from './App'
import { Switch, Route, Link } from 'react-router-dom'
import { db, auth, userById } from '../../fire/firestore'
import { connect } from 'react-redux';
import Message from './message'
import logo from '../../logo.svg'


class messageList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      messages: [],
      currentUser: "",
      wager: this.props.wager
    }
  }

  componentDidMount() {
    let wager = this.state.wager

    if (auth.currentUser) {
      this.setState({ currentUser: auth.currentUser.uid })
    }

    console.log(wager)
    db
      .collection("wagers")
      .doc(wager)
      .collection("wagerChat")
      .orderBy("sentAt")
      .onSnapshot(snapshot => {
        this.setState({
          messages: snapshot.docs.map(doc => {
            const data = doc.data()
            return {
              id: doc.ref.id,
              content: data.content,
              from: data.uid,
              sentAt: data.sentAt
            }
          })
        })
      })
  }

  render() {
    const { messages } = this.state
    // console.log(messages)
    return (

      <div>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Blockchain Bois</h1>
        </header>
        {messages.map(message => <Message key={message.id} message={message} wager={this.state.wager} />
        )}
      </div>


    )
  }


}

export default messageList;
