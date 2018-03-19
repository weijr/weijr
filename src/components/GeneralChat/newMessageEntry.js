import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom'
import { db, auth } from '../../fire/firestore'
import { connect } from 'react-redux';
import { writeMessage } from '../../store'

const sendMessage = (roomId) => {

  

  return (evt) => {
    evt.preventDefault()
    db 
    .collection("rooms")
    .doc("room1")
    .collection("generalChat")
    .add({
      uid: auth.currentUser.uid,

    })
  }
}



const NewMessageEntry = (props) => {
  // console.log(auth.currentUser.uid)
  const { name, newMessageEntry, handleChange, handleSubmit } = props;
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

const mapDispatchToProps = function (dispatch, ownProps) {
  return {
    handleChange (evt) {
      dispatch(writeMessage(evt.target.value));
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
  null,
  mapDispatchToProps
)(NewMessageEntry);