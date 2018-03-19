import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom'
import { db, auth } from '../../fire/firestore'
import { connect } from 'react-redux';

const sendMessage = (roomId) => {
  return (evt) => {
    evt.preventDefault()
    db 
    .collection("rooms")
    .doc("room1")
    .collection("generalChat")
    .add({
      uid: auth
    })
  }
}

const NewMessageEntry = () => {

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


  export default NewMessageEntry;