import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom'
import { db, auth } from '../../fire/firestore'
import { connect } from 'react-redux';
import { 
  Button,
  Comment,
  Form, 
  Header
} from 'semantic-ui-react'

// const Message = ({ message }) => {
//   // console.log(typeof message.sentAt)
//   console.log('auth: ', auth)
//   return(
//     <li className = "media" >
//     <div className="media-body">
//       <h4 className="media-heading">{message.from}</h4>
//       <p>{message.content}</p>
//       <p>{message.sentAt}</p>
//     </div>
//     </li>

//   )
// }

const Message = ({ message }) => {
  return (
    
  )
}
export default Message;