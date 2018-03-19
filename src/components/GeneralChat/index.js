import React, { Component } from 'react';
import './App.css';
import App from './App'
import { Switch, Route, Link } from 'react-router-dom'
import { db } from '../fire/firestore'
import { connect } from 'react-redux';
import MessageList from './messageList'
import NewMessageEntry from './newMessageEntry'



class GeneralChat extends Component {
  constructor(props) {
    super(props)
    this.state = {
      messages: []
    }

  }


  render() {

    return (
        <div>
          <MessageList />
          <NewMessageEntry />
        </div>
    )
  }
}

const mapStateToProps = function (state, ownProps) {
  return {
    // newMessageEntry: state.newMessageEntry,
    // name: state.name
  };
};

const mapDispatchToProps = function (dispatch, ownProps) {
  return {
    // handleChange (evt) {
    //   dispatch(writeMessage(evt.target.value));
    // },
    // handleSubmit (name, content, evt) {
    //   evt.preventDefault();

    //   // const { channelId } = ownProps;

    //   dispatch(postMessage({ name, content, evt }));
    //   // dispatch(writeMessage(''));
    }
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GeneralChat);


