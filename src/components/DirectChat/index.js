import React, { Component } from "react";
import { Switch, Route, Link, withRouter } from "react-router-dom";
import firebase, { db, auth } from "../../fire/firestore";
import { connect } from "react-redux";
import logo from "../../logo.svg";
import { Form, Button, Segment } from "semantic-ui-react";
import MessageList from "../GeneralChat/MessageList";
import NewMessageEntry from "../GeneralChat/NewMessageEntry";
import { addRecipient } from "../../store";
import NavBar from "../NavBar";
import HomeButton from "../HomeButton";

window.db = db

class DirectChatCreation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipientName: "",
      showChat: false,
      chats: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onClick = this.onClick.bind(this)
  }

  componentDidMount() {
    db.collection("privateChats")
      .onSnapshot(chats => {
        let arr = []
        chats.docs.forEach((room) => {
          if (room.id.indexOf(auth.currentUser.displayName + '|?|') > -1 || room.id.indexOf('|?|' + auth.currentUser.displayName) > -1){
            arr.push(room)
          }
        })
        this.setState({
          chats: arr
        })
    }, console.error);
  }

  handleChange(evt) {
    evt.preventDefault();
    this.props.includeRecipient(evt.target.value);
  }

  goHome = event => {
    event.preventDefault();
    this.props.history.push("/wagers");
  };

  handleSubmit(event) {
    event.preventDefault();
    const recipientName = event.target.recipient.value;
    let chatName;
    if (recipientName > auth.currentUser.displayName) {
      chatName = recipientName + "|?|" + auth.currentUser.displayName;
    } else {
      chatName = auth.currentUser.displayName + "|?|" + recipientName;
    }

    this.props.includeRecipient(chatName);
    const room = db
      .collection("privateChats")
      .doc(chatName)

    room.set({updatedAt: firebase.firestore.FieldValue.serverTimestamp()}, {merge: true})

    room
      .collection("messages")
      .add({
        uid: "DM Bot",
        content:
          "You have logged into your private message with " + recipientName,
        sentAt: Date(Date.now()).toString()
      });

    this.props.history.push("/privateChat");
  }

  onClick(event) {
    event.preventDefault()
    this.props.includeRecipient(event.target.value);
    this.props.history.push("/privateChat");
  }

  render() {
    return (
      <div>
        <Segment inverted textAlign="center">
          <NavBar message={"Messages for " + auth.currentUser.displayName} />
          <HomeButton goHome={this.goHome} />
        </Segment>
        <Form onSubmit={this.handleSubmit}>
          <Form.Input name="recipient" label="Enter User Name" />
          <Button type="submit" label="Submit" />
        </Form>
        {this.state.chats.map((chat) => {
          const findName = chat.id.split('|?|')
          let name = ''
          if (findName[0] === auth.currentUser.displayName){
            name = findName[1]
          }
          else {
            name = findName[0]
          }
          return (
          <Button value={chat.id} key={chat.id} onClick={this.onClick}>
          Enter Room with {name}
          </Button>
          )
        })}
      </div>
    );
  }
}

const mapStateToProps = function(state, ownProps) {
  return {
    userName: state.userName
  };
};

const mapDispatchToProps = function(dispatch, ownProps) {
  return {
    includeRecipient(name) {
      dispatch(addRecipient(name));
    }
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DirectChatCreation)
);
