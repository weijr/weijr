import React, { Component } from "react";
import logo from "../logo.svg";
import "./App.css";
import { Switch, Route, Link, withRouter } from "react-router-dom";
import { db, auth, userById } from "../fire/firestore";
import history from "../history";
import store from "../store";
import { connect } from "react-redux";
import { browserHistory } from "react-router";
import web3 from "../ether/web3";
import GeneralChat from "./GeneralChat/";
import SingleWagerView from "./SingleWagerView";
import { setUser } from "../store";
import { withAlert } from 'react-alert'
import NavBar from './NavBar'
import SignUpForm from './SignUpForm'
import { Header, Icon, Image, Segment, Grid, Button, Card, Form, Checkbox, Message } from 'semantic-ui-react'


class SignUp extends Component {
  constructor(props) {
    super(props);
  }

  signUp = async event => {
    event.preventDefault();
    try {
      const username = event.target.username.value
      const email = event.target.email.value
      const password = event.target.password.value

      const user = await auth.createUserWithEmailAndPassword(email, password)
      await user.updateProfile({ displayName: username })
      this.props.setUser(user)
      this.props.history.push('/wagers');
    } catch (error) {
      this.props.alert.show(error.message)
    }
  }

  render() {
    return (
      <div>
      <Segment inverted>
        <NavBar message={'Sign up for an account!'} />
      </Segment>
        <SignUpForm onSubmit={this.signUp} />
      </div>
    );
  }
}


const mapDispatchToProps = function (dispatch, ownProps) {
  return {
    setUser(user) {
      dispatch(setUser(user))
    }
  };
};

export default withRouter(withAlert(connect(null, mapDispatchToProps)(SignUp)))
