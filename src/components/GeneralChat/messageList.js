import React, { Component } from 'react';
// import './App.css';
// import App from './App'
import { Switch, Route, Link } from 'react-router-dom'
import { db, auth, userById } from '../../fire/firestore'
import { connect } from 'react-redux';
import Message from './message'
import logo from '../../logo.svg'
import { Comment } from 'semantic-ui-react'
import { ScrollBox } from 'react-scroll-box'


class messageList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      messages: [],
      currentUser: "",
      wager: this.props.wager,
      wagerA: [],
      wagerB: []
    }
  }

  componentDidMount() {
    let wager = this.state.wager

    if (auth.currentUser) {
      this.setState({ currentUser: auth.currentUser.uid })
    }

    console.log(auth.currentUser)
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
    // console.log(auth)
    const { messages } = this.state
    // console.log(messages)
    return (
      <Comment.Group className='overflow'>
        {messages.map(message => <Message key={message.id} message={message} wager={this.state.wager} sentAt={this.state.sentAt}/>
        )}
      </Comment.Group>
    )
  }


}

export default messageList;
