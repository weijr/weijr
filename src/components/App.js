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
import LoginForm from './LoginForm'
import { Header, Icon, Image, Segment, Grid, Button, Card, Form, Checkbox, Message } from 'semantic-ui-react'


class App extends Component {
  constructor(props) {
    super(props);
  }

  noMetamask = () => {
    return (
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
    )
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

  render() {
    return web3._provider.host ===
      "https://rinkeby.infura.io/orDImgKRzwNrVCDrAk5Q" ? (
        <div>
          { this.noMetamask() }
        </div>
      ) : (
        <div>
          <Segment inverted>
            <NavBar message={"Please Login to Enter Weijr"} />
          </Segment>
          <LoginForm login={this.login} />
        </div>
      );
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
      dispatch(setUser(user));
    }
  };
};

export default withRouter(
  withAlert(connect(mapStateToProps, mapDispatchToProps)(App))
);
