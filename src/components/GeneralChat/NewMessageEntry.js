import React, { Component } from "react";
import { Switch, Route, Link, withRouter } from "react-router-dom";
import { db, auth } from "../../fire/firestore";
import { connect } from "react-redux";
import { writeMessage } from "../../store";
import { Form, Button } from "semantic-ui-react";

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

  sendMessage = (evt, message) => {
    const date = Date(Date.now())
    if (this.state.chatType === 'wager'){
    let wager = this.state.wager;
    evt.preventDefault();

    db
      .collection("wagers")
      .doc(wager)
      .collection("wagerChat")
      .add({
        uid: auth.currentUser.displayName,
        content: message,
        sentAt: date
      });
    this.props.clearForm();
    }
    else if (this.state.chatType === 'general') {
      evt.preventDefault();
      db
        .collection('generalChat')
        .add({
          uid: auth.currentUser.displayName,
          content: message,
          sentAt: date
        });
      this.props.clearForm();
    }
    else {
      evt.preventDefault()
      let name
      if (this.state.userName > this.state.recipientName){
        name = this.state.userName.concat(this.state.recipientName)
      }
      else {
        name = this.state.recipientName.concat(this.state.userName)
      }
      db
        .collection("privateChats")
        .doc("privateChats")
        .collection(name)
        .add({
          uid: auth.currentUser.displayName,
          content: message,
          sentAt: date
        })
        this.props.clearForm();
    }
  };

  render() {
    console.log(this.props)
    const { name, newMessageEntry, handleChange, handleSubmit } = this.props;
    return (
      <Form reply onSubmit={evt => this.sendMessage(evt, newMessageEntry)}>
        <Form.TextArea
          type="text"
          value={newMessageEntry}
          onChange={handleChange}
          placeholder="Say something nice..."
          />
        <Button content="Add Reply" labelPosition="left" icon="edit" primary />
      </Form>
    );
  }
}

const mapStateToProps = function(state, ownProps) {
  return {
    newMessageEntry: state.newMessageEntry,
    userName: ownProps.match.params.userName,
    recipientName: ownProps.match.params.recipientName,
  };
};

const mapDispatchToProps = function(dispatch, ownProps) {
  return {
    handleChange(evt) {
      dispatch(writeMessage(evt.target.value));
    },
    clearForm() {
      dispatch(writeMessage(""));
    }
  };
};

export default connect(withRouter(mapStateToProps, mapDispatchToProps))(NewMessageEntry);
