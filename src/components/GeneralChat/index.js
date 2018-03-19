import React, { Component } from 'react';
import './App.css';
import App from './App'
import { Switch, Route, Link } from 'react-router-dom'
import { db } from '../fire/firestore'
import { connect } from 'react-redux';
import { postMssage, writeMessage } from '../store


class GeneralChat extends Component {
  constructor(props) {
    super(props)
    this.state = {
      messages: []
    }

    this.submitMessage = this.submitMessage.bind(this)
  }

  submitMessage = (handle, message, evt) => {

    evt.preventDefault()
    let dateTime = Date.now().toString()
    let actionsRef = db.collection("rooms").doc("room1").collection("actions")
    let playersRef = db.collection('/rooms/room1/players')

  }

  render() {

    return (
        <form id="new-message-form" onSubmit={evt => this.submitMessage("defaultHandle", newMessageEntry, evt)}>
          <div className="input-group input-group-lg">
            <input
              className="form-control"
              type="text"
              value={newMessageEntry}
              onChange={handleChange}
              placeholder="Say something nice..."
            />
            <span className="input-group-btn">
              <button className="btn btn-default" type="submit">Chat!</button>
            </span>
          </div>
        </form>
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


