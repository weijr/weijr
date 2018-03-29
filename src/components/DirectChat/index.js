import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { db, auth } from "../../fire/firestore";
import { connect } from "react-redux";
import { Form, Button } from "semantic-ui-react";
import { addRecipient } from "../../store";

class DirectChatCreation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipientName: "",
      showChat: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(evt) {
    evt.preventDefault();
    this.props.includeRecipient(evt.target.value);
  }

  handleSubmit(event) {
    event.preventDefault();
    const recipientName = event.target.recipient.value;
    let chatName;
    if (recipientName > auth.currentUser.displayName) {
      chatName = recipientName + auth.currentUser.displayName;
    } else {
      chatName = auth.currentUser.displayName + recipientName;
    }
    this.props.includeRecipient(chatName);
    db
      .collection("privateChats")
      .doc("privateChats")
      .collection(chatName)
      .add({
        uid: "DM Bot",
        content:
          "You have logged into your private message with " +
          recipientName,
        sentAt: Date(Date.now()).toString()
      });
    this.setState({
      showChat: true
    });
    this.props.history.push('/privateChat')
  }

  render() {
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <Form.Input name="recipient" label="Enter User Name" />
          <Button type="submit" label="Submit" />
        </Form>
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
