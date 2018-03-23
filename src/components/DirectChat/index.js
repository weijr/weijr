import React, { Component } from "react";
import { Switch, Route, Link, withRouter } from "react-router-dom";
import { db } from "../../fire/firestore";
import { connect } from "react-redux";
import logo from "../../logo.svg";
import { Form, Button } from "semantic-ui-react";

class DirectChatCreation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fieldNum: 1,
      user0: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
  }

  handleChange(evt) {
    evt.preventDefault();
    console.log(evt.target)
    const userKey = 'user' + evt.target.key
    this.setState({userKey: evt.target.value})
  }

  handleSubmit(evt) {
    evt.preventDefault();
    let chatName = ''
    for (let j = 0; j < this.state.fieldNum; j++){
      let chatKey = 'user' + j
      chatName.concat(this.state[chatKey])
    }
    db
      .collection("privateChats")
      .doc('privateChats')
      .collection(chatName)
    this.props.history.push("/");
  }

  handleAdd(evt) {
    evt.preventDefault()
    let num = this.state.fieldNum
    this.setState({
      fieldNum: num++
    })
  }

  render() {
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
        {fieldsArr.map((component) => {
          return component
        })}
        <Button label='Add User' onClick={this.handleAdd} />
        <Button label='Submit'/>
        </Form>
      </div>
    );
  }
}

export default withRouter(DirectChatCreation);
