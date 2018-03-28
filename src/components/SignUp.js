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




const SignUpForm = (props) => (
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
          Sign Up Below
        </Header>
        <Form onSubmit={props.onSubmit} size='large'>
          <Segment stacked>
          <Form.Input
              fluid
              icon='globe'
              iconPosition='left'
              placeholder='User Name'
              name="username"
            />
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

            <Button type='submit' color='black' fluid size='large'>Sign Up</Button>
          </Segment>
        </Form>
        <Message>
          Already Have An Account? <Link to='/'>Login</Link>
        </Message>
      </Grid.Column>
    </Grid>
  </div>
)



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
