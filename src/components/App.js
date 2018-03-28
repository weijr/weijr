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
import { Header, Icon, Image, Segment, Grid, Button, Card, Form, Checkbox, Message } from 'semantic-ui-react'

const LoginForm = (props) => (
  <div className='login-form'>
    <style>{`
      body > div,
      body > div > div,
      body > div > div > div.login-form {
        height: 100%;
      }
    `}</style>
    <Grid
      textAlign='center'
      style={{ height: '100%' }}

    >
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as='h2' color='black' textAlign='center'>
          Log in Below
        </Header>
        <Form onSubmit={props.login} size='large'>
          <Segment stacked>
            <Form.Input
              fluid
              icon='user'
              iconPosition='left'
              placeholder='E-mail address'
              name="email"
            />
            <Form.Input
              fluid
              icon='lock'
              iconPosition='left'
              placeholder='Password'
              type='password'
              name="password"
            />

            <Button type='submit' color='black' fluid size='large'>Login</Button>
          </Segment>
        </Form>
        <Message>
          New to us? <Link to='/signup'>Sign Up</Link>
        </Message>
      </Grid.Column>
    </Grid>
  </div>
)

class App extends Component {
  constructor(props) {
    super(props);
  }

  login = async event => {
    event.preventDefault();
    try {
      const email = event.target.email.value
      const password = event.target.password.value
      const user = await auth.signInWithEmailAndPassword(email, password)

      this.props.setUser(user)
      this.props.history.push('/wagers');
    } catch (error) {
      this.props.alert.show(error.message)
    }
  }

  goToSignUp = event => {
    this.props.history.push('/signup')
  }

  render() {
    return (
      <div>
      <Segment inverted>
        <NavBar message={"Please Login to Enter Weijr"} />
      </Segment>
        <LoginForm goToSignUp={this.goToSignUp} login={this.login} />
      </div>
    )
  }
}

const mapStateToProps = function (state, ownProps) {
  return {
    currentUser: state.user
  };
};

const mapDispatchToProps = function (dispatch, ownProps) {
  return {
    setUser(user) {
      dispatch(setUser(user))
    }
  };
};

export default withRouter(withAlert(connect(mapStateToProps, mapDispatchToProps)(App)))
