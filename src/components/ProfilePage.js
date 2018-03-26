import React, { Component } from "react";
import logo from "../logo.svg";
import "./App.css";
import { Switch, Route, Link, withRouter } from "react-router-dom";
import { db, auth } from "../fire/firestore";
import history from "../history";
import store from "../store";
import { browserHistory } from "react-router";
import basketball from "./basketball.png";
import { Header, Icon, Image, Segment, Grid, Button, Card, Dropdown } from 'semantic-ui-react'
import { connect } from "react-redux";
import Wager from "../ether/wagers";
import web3 from "../ether/web3";


class ProfilePage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      wager: this.props.wager,
      metamask: "",
      listOfWagers: []
    }
    this.goHome = this.goHome.bind(this)
  }

  async componentDidMount() {
    try {
      const acccounts = await web3.eth.getAccounts()
      const addresses = await db
        .collection("userAddresses")
        .doc(acccounts[0])
        .collection("contracts")
        .get()
      console.log("addresses: ", addresses.docs[0].id)
      const listOfWagers = await Promise.all(addresses.docs.map(async address => {
        const wager = Wager(address.id)
        const wagerObj = await wager.methods.getWagerSummary().call()
        const wagerInfo = {
          title: wagerObj[6],
          ante: wagerObj[0],
          address: address,
          pot: wagerObj[1],
          complete: wagerObj[7],
          description: wagerObj[8]
        }
        return wagerInfo
      }))
      this.setState({
        listOfWagers
      })
    } catch (err) {
      console.log(err)
    }
  }

  goHome = (event) => {
    this.props.history.push('/wagers')
  }

  render() {
    console.log("metamask: ", this.state.metamask)
    console.log("props: ", this.props.listOfWagers)

    const wagerList = this.state.listOfWagers

    return (
      <div>
        <Segment inverted>
          <Header inverted as="h2" icon textAlign="center">
            <Icon name="ethereum" circular />
            <Header.Content>
              <h2 className="ui red header">
                Hello {auth.currentUser.displayName}
              </h2>
            </Header.Content>
            <Header.Content>
              <Button circular onClick={this.goHome}>
                <Icon name="home" circular />
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
                  <br />
                    Current Pot Size: {web3.utils.fromWei(wager.pot, 'ether')} Ether
                </Card>
                </Grid.Column>
              ))}
        </Grid>
      </div>
    )
  }
}

const mapStateToProps = function (state, ownProps) {
  return {
    currentUser: state.user,
    listOfWagers: state.messages
  };
};

export default withRouter(connect(mapStateToProps, null)(ProfilePage))


