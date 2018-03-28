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
import { withAlert } from "react-alert";
import NavBar from "./NavBar";
import {
  Header,
  Icon,
  Image,
  Segment,
  Grid,
  Button,
  Card,
  Form,
  Checkbox
} from "semantic-ui-react";

const LoginForm = props => (
  <Grid>
    <Grid.Row centered>
      <Form onSubmit={props.login} className="signin">
        <label>E-mail</label>
        <input name="email" placeholder="User Name" />
        <label id="password">Password</label>
        <input name="password" placeholder="Password" type="password" />
        <Button type="signUp" onClick={props.goToSignUp}>
          Sign Up
        </Button>
        <Button type="submit">Login</Button>
      </Form>
    </Grid.Row>
  </Grid>
);

class App extends Component {
  constructor(props) {
    super(props);
  }

  login = async event => {
    event.preventDefault();
    try {
      const email = event.target.email.value;
      const password = event.target.password.value;
      const user = await auth.signInWithEmailAndPassword(email, password);

      this.props.setUser(user);
      this.props.history.push("/wagers");
    } catch (error) {
      this.props.alert.show(error.message);
    }
  };

  goToSignUp = event => {
    this.props.history.push("/signup");
    console.log(web3._provider.host);
  };

  noMet;

  render() {
    return web3._provider.host ===
      "https://rinkeby.infura.io/orDImgKRzwNrVCDrAk5Q" ? (
      <div>
        <Segment inverted>
          <NavBar message={""} />
        </Segment>
        <div class="ui one column stackable center aligned page grid">
          <div class="column twelve wide">
            <h2>
              Please install MetaMask chrome extension to view our website!
            </h2>
            <h3>Visit https://metamask.io/ for more info.</h3>
          </div>
        </div>
      </div>
    ) : (
      <div>
        <Segment inverted>
          <NavBar
            message={
              "Please login to continue. Don't Have an account? Sign up for one!"
            }
          />
        </Segment>
        <LoginForm goToSignUp={this.goToSignUp} login={this.login} />
      </div>
    );
  }
}

const mapStateToProps = function(state, ownProps) {
  return {
    currentUser: state.user
  };
};

const mapDispatchToProps = function(dispatch, ownProps) {
  return {
    setUser(user) {
      dispatch(setUser(user));
    }
  };
};

export default withRouter(
  withAlert(connect(mapStateToProps, mapDispatchToProps)(App))
);
