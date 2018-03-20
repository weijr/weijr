import React from 'react';

export default function Message (props) {

  const message = props.message;

  return (
    <li className="media">
      <div className="media-left">
          <img className="media-object" src={require('./adminLogo.png')} alt="image" />
      </div>
      <div className="media-body">
        <h4 className="media-heading">{ message.data().handle }</h4>
        { message.data().message }
      </div>
    </li>
  );
}
