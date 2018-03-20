import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom'
import { db, auth } from '../../fire/firestore'
import { connect } from 'react-redux';
import { writeMessage } from '../../store'



class NewMessageEntry extends Component {
  constructor(props) {
    super(props)
    this.state = {
      wager: this.props.wager
    }
    this.sendMessage = this.sendMessage.bind(this)
  }

  sendMessage = (evt, message) => {
    let wager = this.state.wager
    evt.preventDefault()
    console.log('wager: ', wager)
    // console.log('evt.t.v :', evt.target.value)
    console.log('message: ', message)
    
    db
      .collection("wagers")
      .doc(wager)
      .collection("wagerChat")
      .add({
        uid: auth.currentUser.uid,
        content: message,
        sentAt: Date(Date.now()).toString()
      })
    this.props.clearForm()
  }

  render() {
    console.log('auth: ', auth)
    const { name, newMessageEntry, handleChange, handleSubmit } = this.props;
    console.log(this.props.newMessageEntry)
    return (
      <form id="new-message-form" onSubmit={evt => this.sendMessage(evt, newMessageEntry)}>
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
    newMessageEntry: state.newMessageEntry,
  };
};

const mapDispatchToProps = function (dispatch, ownProps) {
  return {
    handleChange(evt) {
      dispatch(writeMessage(evt.target.value));
    },
    clearForm() {
      dispatch(writeMessage(''))
    }
    //   handleSubmit (name, content, evt) {
    //     evt.preventDefault();

    //     const { channelId } = ownProps;

    //     dispatch(postMessage({ name, content, channelId }));
    //     dispatch(writeMessage(''));
    //   }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewMessageEntry);