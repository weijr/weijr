import React from 'react';
import { Comment } from 'semantic-ui-react'
import image from './adminLogo.png'

export default function Message (props) {

  const message = props.message;

  return (
    <Comment>
      <Comment.Avatar src={image} />
      <Comment.Content>
        <Comment.Author>{message.from}</Comment.Author>
        <Comment.Metadata>
          <div>{message.sentAt}</div>
        </Comment.Metadata>
        <Comment.Text>{message.content}</Comment.Text>
      </Comment.Content>
    </Comment>
  );
}
