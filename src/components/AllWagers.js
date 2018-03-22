import React, { Component } from "react";
import logo from "../logo.svg";
import "./App.css";
import { Switch, Route, Link, withRouter } from "react-router-dom";
import { db, auth, userById, email } from "../fire/firestore";
import history from "../history";
import store from "../store";
import { browserHistory } from "react-router";
import web3 from "../web3";
import mafiaContract from "../mafiaContract";
import GeneralChat from "./GeneralChat/";
import { definedRole, randomNameGenerator } from "../utils";
import SingleWagerView from "./SingleWagerView";
import basketball from "./basketball.png";
import { Header, Icon, Image, Segment, Grid, Button, Card } from 'semantic-ui-react'
import factory from '../ether/factory'
import { connect } from "react-redux";
import App from './App'

class AllWagers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wager: "",
      listOfWagers: [],
      currentUser: this.props.currentUser
    };
    this.signUp = this.signUp.bind(this);
    this.logout = this.logout.bind(this)
  }
  async componentDidMount() {
    var email;
    auth.onAuthStateChanged(function(user) {
      if (user) {
        email = user.email
      }
    })
    this.setState({listOfWagers: await factory.methods.getDeployedwagers().call()})
  }
  componentWillUnmount() {
    var unsubscribe = auth.onAuthStateChanged(function (user) {
      if (user) {
         // User is signed in.
      }
  });
  unsubscribe()
  }
  signUp = event => {
    event.preventDefault();
    this.props.history.push('/wagers/signup');
  }
  logout = () => {
    auth.signOut()
    .then(() => {
      this.setState({
        currentUser: ""
      })
    })
    .then(() => {
      this.props.history.push('/')
    })
  }
  render() {
    var user = auth.currentUser;
    if (user) {
      console.log("user: ", user)
    } else {
      console.log("else: ", user)
    }
    const wagerList = this.state.listOfWagers;
    console.log("state.currentUser: ", this.state.currentUser )
    if (this.state.currentUser) {
      return (
        <div>
        <Segment inverted>
          <Header inverted as="h2" icon textAlign="center">
            <Icon name="ethereum" circular />
            <Header.Content>
              <h2 className="ui red header">
                Welcome 2 Wagr
            </h2>
            </Header.Content>
            <Header.Content>
              <h2 className="ui red header">
                See a wager that you like? Sign in to see more!
              </h2>
            </Header.Content>
            <Header.Content>
              <Button onClick={this.logout}>
                Logout
              </Button>
            </Header.Content>
          </Header>
        </Segment>
        <Grid columns={5}>
          {wagerList.map(wager => (
            <Grid.Column>
              <Card key={wager} className="ui segment centered">
                <Image src={basketball} />
                <Card.Header />
                <Link to={`/wagers/${wager}`} key={wager.address} value={wager.address}>
                  Click here to bet on {wager}
                </Link>
              </Card>
            </Grid.Column>
          ))}
        </Grid>
        </div>
      )
    } else {
      this.props.history.push('/')
      return null
      }
    }
  }

  const mapStateToProps = function(state, ownProps) {
    return {
      currentUser: state.user
    };
  };

  const mapDispatchToProps = function(dispatch, ownProps) {
    return {
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AllWagers))

