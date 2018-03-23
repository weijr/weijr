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
import { Header, Icon, Image, Segment, Grid, Button, Card, Dropdown } from 'semantic-ui-react'
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
    this.onClickSort = this.onClickSort.bind(this)
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
          potSize: wagerObj[1]
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

  onClickSort = (event, data) => {
    console.log(data.value)
    event.preventDefault()
    let listOfWagersSorted = this.state.listOfWagers.slice()
    if (data.value === 'low-high') {
      var sortedList = listOfWagersSorted.sort(function (a, b) {
        return parseInt(a.ante) - parseFloat(b.ante)
      })
    } else {
      var sortedList = listOfWagersSorted.sort(function (a, b) {
        return parseInt(b.ante) - parseFloat(a.ante)
      })
    }
    this.setState({
      listOfWagers: sortedList
    })
  }


  render() {
    var user = auth.currentUser;
    const wagerList = this.state.listOfWagers;

    // const languageOptions = [ { key: 'Arabic', text: 'Arabic', value: 'Arabic' }]

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
          <Grid.Column></Grid.Column><Grid.Column></Grid.Column><Grid.Column></Grid.Column><Grid.Column></Grid.Column>
          <Grid.Column>

          <Dropdown text='Filter' icon='filter' floating labeled button className='icon'>
          <Dropdown.Menu>
            <Dropdown.Header icon='tags' content='Filter by tag' />
            <Dropdown.Divider />
            <Dropdown.Item label={{ color: 'red', empty: true, circular: true }} text='Ante: Low-High' value="low-high" onClick={this.onClickSort}/>
            <Dropdown.Item label={{ color: 'blue', empty: true, circular: true }} text='Ante: High-Low' value="high-low" onClick={this.onClickSort}/>
          </Dropdown.Menu>
        </Dropdown>
          
          </Grid.Column>
          </Grid>
          <Grid columns={5}>
            {wagerList.map(wager => (
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
                  Current Pot Size: {wager.potSize} Ether
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

