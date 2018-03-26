import React, { Component } from "react";
import { Switch, Route, Link, withRouter } from "react-router-dom";
import { db, auth } from "../../fire/firestore";
import { connect } from "react-redux";
import logo from "../../logo.svg";
import { Form, Button } from "semantic-ui-react";
import MessageList from '../GeneralChat/MessageList'
import NewMessageEntry from '../GeneralChat/NewMessageEntry'

class DirectChatCreation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipientName: '',
      showChat: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(evt) {
    evt.preventDefault();
    console.log(evt.target)
    this.setState({recipientName: evt.target.value})
  }

  handleSubmit(evt) {
    evt.preventDefault();
    let chatName
    if (this.state.recipientName > this.props.user){
      chatName = this.state.recipientName + this.props.user
    }
    else{
      chatName = this.props.user + this.state.recipientName
    }
    db
      .collection("privateChats")
      .doc('privateChats')
      .collection(chatName)
      .add({
        uid: "DM Bot",
        content: 'You have logged into your private message with ' + this.props.user,
        sentAt: Date(Date.now()).toString()
      })
      this.setState({
        showChat: true
      })
  }

  render() {
    return !this.state.showChat ? (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <Form.Input onChange={this.handleChange} label="Enter User Name" default="Enter User Name" value={this.state.recipientName} />
        <Button label='Submit'/>
        </Form>
      </div>
    ) : (
      <MessageList userName={this.props.userName} recipientName={this.state.recipientName} />
    )
  }
}

const mapStateToProps = function(state, ownProps) {
  return {
    user: state.userName
  };
};

export default withRouter(connect(mapStateToProps, null)(DirectChatCreation))
