import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { db, auth } from "../../fire/firestore";
import { connect } from "react-redux";
import { Form, Button } from "semantic-ui-react";
import "../App.css"

class NewMessageEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wager: this.props.wager,
      chatType: this.props.chatType,
      userName: '',
      recipientName: ''
    };
    this.sendMessage = this.sendMessage.bind(this);
  }

  sendMessage = event => {
    const date = Date(Date.now())
    const message = event.target.message.value
    if (this.state.chatType === 'wager'){
    const wager = this.state.wager;
    event.preventDefault();

    db
      .collection("wagers")
      .doc(wager)
      .collection("wagerChat")
      .add({
        uid: auth.currentUser.displayName,
        content: message,
        sentAt: date
      });
      event.target.message.value =""
    }
    else if (this.state.chatType === 'general') {
      event.preventDefault();
      db
        .collection('generalChat')
        .add({
          uid: auth.currentUser.displayName,
          content: message,
          sentAt: date
        });
        event.target.message.value = ""
    }
    else {
      event.preventDefault()
      db
        .collection("privateChats")
        .doc("privateChats")
        .collection(this.props.recipientName)
        .add({
          uid: auth.currentUser.displayName,
          content: message,
          sentAt: date
        })
    }
  };

  render() {
    return (
      <Form onSubmit={this.sendMessage}>
        <input name="message" placeholder="Your reply" />
        <Button type="submit" content="Add Reply" labelPosition="left" icon="edit" primary />
      </Form>
    );
  }
}

const mapStateToProps = function(state, ownProps) {
  return {
    recipientName: state.DirectChat,
  };
};

export default withRouter(connect(mapStateToProps, null)(NewMessageEntry))
