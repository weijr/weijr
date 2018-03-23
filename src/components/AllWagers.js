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
import Wager from "../ether/wagers";

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
    try {
      const listOfWagersAddresses = await factory.methods.getDeployedwagers().call()
      const listOfWagers = await Promise.all(listOfWagersAddresses.map(async address => {
        const wager = Wager(address)
        const wagerObj = await wager.methods.getWagerSummary().call()
        const wagerInfo = {
          title: wagerObj[6],
          ante: wagerObj[0],
          address: address,
          potSize: wagerObj[1],
          complete: wagerObj[7]
        }
        return wagerInfo
      }))
      this.setState({
        listOfWagers
      })
    } catch (err) {
      console.error(err)
    }
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

  createContract = (event) => {
    event.preventDefault()
    this.props.history.push('/new-wager')
  }

  render() {
    var user = auth.currentUser;
    if (user) {
      console.log("user: ", user)
    } else {
      console.log("else: ", user)
    }
    const wagerList = this.state.listOfWagers;
    // console.log("state.currentUser: ", this.state.currentUser )
    console.log("list of wagers length: ", this.state.listOfWagers.length)
    console.log("list of wagers: ", this.state.listOfWagers)
    if (this.state.currentUser && this.state.listOfWagers) {
      return (
        // this.state.listOfWagers.length === 0 ? null :
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
              <Header.Content>
                <Button onClick={this.createContract}>
                  Create a new Contract
              </Button>
              </Header.Content>
            </Header>
          </Segment>
          <Grid columns={5}>
            {wagerList.map(wager => 
              wager.complete ? null :
              (
              <Grid.Column>
                <Card key={wager.address} className="ui segment centered">
                  <Image src={basketball} />
                  <Card.Header />
                  <Link to={`/wagers/${wager.address}`} key={wager.address} value={wager.address}>
                    Click here to bet on
                    <br></br>
                    {wager.title}
                  </Link>
                  Ante: {wager.ante} Ether
                  <br></br>
                  Current Pot Size: {wager.potSize}
                </Card>
              </Grid.Column>
            ))}
          </Grid>
        </div>
      )
    } else if (this.state.currentUser) {
      return (
        <div>Loading...</div>
      )
    } else {
      this.props.history.push('/')
      return null
    }
  }
}

const mapStateToProps = function (state, ownProps) {
  return {
    currentUser: state.user
  };
};

const mapDispatchToProps = function (dispatch, ownProps) {
  return {
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AllWagers))

