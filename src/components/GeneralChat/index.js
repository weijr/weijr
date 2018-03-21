import React, { Component } from "react";
// import '../App.css';
// import App from '../App'
import { Switch, Route, Link, withRouter } from "react-router-dom";
import { db } from "../../fire/firestore";
import { connect } from "react-redux";
import MessageList from "./messageList";
import NewMessageEntry from "./newMessageEntry";
import logo from "../../logo.svg";
import { Header, Icon, Image, Segment, Grid, Button } from 'semantic-ui-react'

class GeneralChat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      wager: this.props.wager
    };
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.props.history.push('/')
  }

  render() {
    const wagerA = this.state.wager.split('vs')[0];
    const wagerB = this.state.wager.split('vs')[1];
    return (
      <div>
        <MessageList wager={this.state.wager} />
        <NewMessageEntry wager={this.state.wager} />
      </div>
    );
  }
}

const mapStateToProps = function(state, ownProps) {
  return {
    // newMessageEntry: state.newMessageEntry,
    // name: state.name
  };
};

const mapDispatchToProps = function(dispatch, ownProps) {
  return {
    // handleChange (evt) {
    //   dispatch(writeMessage(evt.target.value));
    // },
    // handleSubmit (name, content, evt) {
    //   evt.preventDefault();
    //   // const { channelId } = ownProps;
    //   dispatch(postMessage({ name, content, evt }));
    //   // dispatch(writeMessage(''));
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GeneralChat));
