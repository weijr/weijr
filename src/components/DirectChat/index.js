import React, { Component } from "react";
import { Switch, Route, Link, withRouter } from "react-router-dom";
import { db } from "../../fire/firestore";
import { connect } from "react-redux";
import MessageList from "./MessageList";
import NewMessageEntry from "./NewMessageEntry";
import logo from "../../logo.svg";
import { Form } from "semantic-ui-react";

class DirectChat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      wager: this.props.wager,
      chatType: this.props.chatType,
      fieldNum: 1
    };
    this.onClick = this.onClick.bind(this);
  }

  handleSubmit(evt) {
    evt.preventDefault();
    db
      .collection("privateChats")
      .add()
    this.props.history.push("/");
  }

  render() {
    let fieldsArr = []
    for(let i = 0; i < fieldNum; i++) {
      fieldsArr.push(<Form.Field key={i} label='User Email' type='email' placeholder='UserEmail' />)
    }
    return (
      <div>
        <Form onSubmit={this.onSubmit}>
        {fieldsArr}
        <Button label='Add User' onClick={(() => this.setState({fieldNum: fieldNum++}))} />
        <Button label='Submit' onClick={this.handleSubmit} />
        </Form>
      </div>
    );
  }
}

export default withRouter(GeneralChat);
