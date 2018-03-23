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
      const listOfWagers = await Promise.all(listOfWagersAddresses.map(address => {
        const wager = Wager(address)
        return wager.methods.getWagerSummary().call()
      }))
      this.setState({
        listOfWagers
      })
    } catch (err) {
      console.error(err)
    }
  }

  // componentDidMount() {
  //   let listOfWagersInfo = []
  //   factory.methods.getDeployedwagers().call()
  //     .then(listOfAddress => {
  //       return Promise.all(listOfAddress.map(address => {
  //         let wager = Wager(address)
  //         wager.methods.getWagerSummary().call()
  //           .then(info => {
  //             console.log('info: ', info)
  //             return listOfWagersInfo.push(info)
  //           })
  //       }))
  //         .then(values => {
  //           this.setState({
  //             listOfWagers: values
  //           })
  //         })
  //     })
  // }


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
            {wagerList.map(wager => (
              <Grid.Column>
                <Card key={wager[5]} className="ui segment centered">
                  <Image src={basketball} />
                  <Card.Header />
                  <Link to={`/wagers/${wager[5]}`} key={wager[5]} value={wager[5]}>
                    Click here to bet on
                    <br></br>
                    {wager[6]}
                  </Link>
                  Ante: {wager[0]} Ether
                  <br></br>
                  Current Pot Size: {wager[1]}
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

