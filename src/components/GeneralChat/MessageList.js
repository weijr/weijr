import React, { Component } from "react";
<<<<<<< HEAD
import { withRouter } from "react-router-dom";
import { db } from "../../fire/firestore";
=======
import { Switch, Route, Link, withRouter } from "react-router-dom";
import { db, auth, userById } from "../../fire/firestore";
>>>>>>> 806332caf30eabd62a3f23768460eac044650d43
import { connect } from "react-redux";
import Message from "./Message";
import { Comment } from "semantic-ui-react";

class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      currentUser: "",
      userName: '',
      recipientName: '',
      wager: this.props.wager,
      wagerA: [],
      wagerB: [],
      chatType: this.props.chatType
    };
  }

  componentDidMount() {
    if (this.props.recipientName) this.setState({recipientName: this.props.recipientName})
    if (this.state.chatType === "wager") {
      let wager = this.state.wager;

      db
        .collection("wagers")
        .doc(wager)
        .collection("wagerChat")
        .orderBy("sentAt")
        .onSnapshot(snapshot => {
          this.setState({
            messages: snapshot.docs.map(doc => {
              const data = doc.data();
              return {
                id: doc.ref.id,
                content: data.content,
                from: data.uid,
                sentAt: (data.sentAt).toString()
              };
            })
          });
        });
    } else if (this.state.chatType === 'general') {
      db
        .collection("generalChat")
        .orderBy("sentAt")
        .onSnapshot(snapshot => {
          this.setState({
            messages: snapshot.docs.map(doc => {
              const data = doc.data();
              return {
                id: doc.ref.id,
                content: data.content,
                from: data.uid,
                sentAt: (data.sentAt).toString()
              };
            })
          });
        });
    }
    else {
      db
        .collection("privateChats")
        .doc("privateChats")
        .collection(this.props.recipientName)
        .orderBy("sentAt")
        .onSnapshot(snapshot => {
          this.setState({
            messages: snapshot.docs.map(doc => {
              const data = doc.data();
              return {
                id: doc.ref.id,
                content: data.content,
                from: data.uid,
                sentAt: (data.sentAt).toString()
              };
            })
          });
        });
      }
  }

  render() {
    const { messages } = this.state;
    return (
      <div className="overflow" id='chatbox'>
        <Comment.Group>
          {messages.map(message => (
            <Message
              key={message.id}
              message={message}
              wager={this.state.wager}
              sentAt={this.state.sentAt}
            />
          ))}
          <div
            style={{ float: "left", clear: "both" }}
            ref={el => {
              this.messagesEnd = el;
            }}
          />
        </Comment.Group>
      </div>
    );
  }
}

const mapStateToProps = function(state, ownProps) {
  return {
    recipientName: state.DirectChat,
    userName: state.userName
  }
}

export default withRouter(connect(mapStateToProps, null)(MessageList));
