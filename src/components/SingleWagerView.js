import React, { Component } from "react";
import "./App.css";
import App from "./App";
import { Switch, Route, Link, withRouter } from "react-router-dom";
import { db, auth, userName } from "../fire/firestore";
import { connect } from "react-redux";
import { postMssage, writeMessage } from "../store";
import MessageList from "./GeneralChat/MessageList";
import GeneralChat from "./GeneralChat/index";
import WagerComponent from "./WagerComponent";
import {
  Header,
  Icon,
  Image,
  Segment,
  Grid,
  Button,
  Card,
  Label
} from "semantic-ui-react";

import Wager from "../ether/wagers";
import web3 from "../ether/web3";

class SingleWagerView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      address: this.props.match.params.address,
      currentUser: "",
      minimumBet: "",
      pot: "",
      totalUsers: "",
      sideOne: "",
      sideTwo: "",
      manager: "",
      currentUser: this.props.currentUser,
      loading: false,
      errorMessage: ''
    };
    this.onClick = this.onClick.bind(this);
    this.renderCards = this.renderCards.bind(this);
    this.betSideOne = this.betSideOne.bind(this);
    this.betSideTwo = this.betSideTwo.bind(this);
  }

  componentWillMount() {
    var email;

    auth.onAuthStateChanged(function(user) {
      if (user) {
        email = user.email;
      }
    });

    this.setState({
      currentUser: this.props.currentUser
    });
  }

  async componentDidMount() {
    const wager = Wager(this.props.match.params.address);
    const summary = await wager.methods.getWagerSummary().call();
    console.log("SUMMARY HERE", summary);
    this.setState({
      minimumBet: summary[0],
      pot: summary[1],
      totalUsers: summary[2],
      sideOne: summary[3],
      sideTwo: summary[4],
      manager: summary[5]
    });
  }

  onClick = event => {
    event.preventDefault();
    this.props.history.push("/wagers")
  }

  renderCards() {
    const items = [{
      header: this.state.pot,
      thisSide: this.state.sideOne,
      thatSide: this.state.sideTwo,
      totalUsers: this.state.totalUsers,
      description: this.state.manager
    }];
    console.log("ITEMS HERE", items);
    return <Card.Group items={items} />;
  }

  async betSideOne(event) {
    event.preventDefault();
    const wager = Wager(this.props.match.params.address);

    this.setState({ loading: true, errorMessage: '' });

    try {
      const accounts = await web3.eth.getAccounts();
      await wager.methods.joinBet(true).send({
        from: accounts[0],
        value: web3.utils.toWei(this.state.minimumBet, 'ether')
      });
      const summary = await wager.methods.getWagerSummary().call();
      this.setState({
        pot: summary[1],
        totalUsers: summary[2],
        sideOne: summary[3],
        sideTwo: summary[4],
      });
    } catch (err) {
      this.setState({errorMessage: err.message})
    }

  }

  async betSideTwo(event) {
    event.preventDefault();
    const wager = Wager(this.props.match.params.address);

    this.setState({ loading: true, errorMessage: '' });

    try {
      const accounts = await web3.eth.getAccounts();
      await wager.methods.joinBet(false).send({
        from: accounts[0],
        value: web3.utils.toWei(this.state.minimumBet, 'ether')
      });
      const summary = await wager.methods.getWagerSummary().call();
      this.setState({
        pot: summary[1],
        totalUsers: summary[2],
        sideOne: summary[3],
        sideTwo: summary[4],
      });
    } catch (err) {
      this.setState({errorMessage: err.message})
    }

  }

  render() {
    let email;

    

    if (this.state.currentUser) {
    return this.state.manager === "" ? null : (
      <div className="App">
        <Segment inverted>
          <Header inverted as="h2" icon textAlign="center">
            <Grid columns={3}>
              <Grid.Column>
                <Button circular onClick={this.onClick}>
                  <Icon name="home" circular />
                </Button>
              </Grid.Column>
              <Grid.Column>
                <Icon name="users" circular />
              </Grid.Column>
            </Grid>
            <Header.Content>
              {this.state.sideOne} vs. {this.state.sideTwo}
            </Header.Content>
          </Header>
        </Segment>
        <Grid>
          <Grid.Column width={8}>
            <GeneralChat wager={this.state.address} />
          </Grid.Column>
          <Grid.Column width={8}>

          </Grid.Column>
          <Grid.Row>
            <Grid.Column width={10}>{this.renderCards()}</Grid.Column>
            <Button as='div' labelPosition='right'>
            <Button color='red' value={this.state.sideOne} onClick={this.betSideOne}>
              <Icon name='ethereum' />
              { this.state.sideOne }
            </Button>
            <Label as='a' basic color='red' pointing='left'>{this.state.sideOne}  Bets Placed</Label>
          </Button>
          <Button as='div' labelPosition='right'>
            <Button color='blue' value={this.state.sideTwo} onClick={this.state.betSideTwo}>
              <Icon name='ethereum' />
              { this.state.sideTwo }
            </Button>
            <Label as='a' basic color='blue' pointing='left'>{this.state.sideTwo}  Bets Placed</Label>
          </Button>
            <Grid.Column width={6} />
          </Grid.Row>
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

export default withRouter(connect(mapStateToProps, null)(SingleWagerView));
