import React, { Component } from 'react';
// import './App.css';
// import App from './App'
import { Switch, Route, Link } from 'react-router-dom'
import { db, auth, userById} from '../../fire/firestore'
import { connect } from 'react-redux';
import Message from './message'


class messageList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      messages: [],
      currentUser: ""
    }
  }

  componentDidMount() {
    if(auth.currentUser){
      this.setState({currentUser: auth.currentUser.uid})
    }
    db
    .collection("rooms")
    .doc("room1")
    .collection("generalChat")
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
        {messages.map(message => <Message key={message.id} message={message} />
        )}
      </div>


    )
  }


}

export default messageList;
