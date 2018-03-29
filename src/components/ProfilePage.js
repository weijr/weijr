import React, { Component } from "react";
import logo from "../logo.svg";
import "./App.css";
import { Switch, Route, Link, withRouter } from "react-router-dom";
import { db, auth } from "../fire/firestore";
import history from "../history";
import store from "../store";
import { browserHistory } from "react-router";
import basketball from "./basketball.png";
import {
  Header,
  Icon,
  Image,
  Segment,
  Grid,
  Button,
  Card,
  Dropdown,
  Message
} from "semantic-ui-react";
import { connect } from "react-redux";
import Wager from "../ether/wagers";
import web3 from "../ether/web3";
import NavBar from "./NavBar";
import HomeButton from "./HomeButton";
import RenderWagers from "./RenderWagers";

class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wager: this.props.wager,
      metamask: "",
      listOfWagers: []
    };
    this.goHome = this.goHome.bind(this);
  }

  goHome = event => {
    this.props.history.push("/wagers");
  };

  async componentDidMount() {
    try {
      const accounts = await web3.eth.getAccounts();
      this.setState({
        metamask: accounts[0]
      });
    } catch (err) {
      console.error(err);
    }
  }

  render() {
    const wagerList = this.props.listOfWagers;

    const managedWagers = wagerList.filter(wager => {
      return wager.manager === this.state.metamask && !wager.complete;
    });

    const inTheseWagers = wagerList.filter(wager => {
      return wager.joined.indexOf(this.state.metamask) > -1;
    });
    if (this.props.currentUser) {
      return (
        <div>
          <Segment inverted textAlign="center">
            <NavBar message={"Hello " + auth.currentUser.displayName} />
            <HomeButton goHome={this.goHome} />
          </Segment>

          <Grid columns={3}>
            <Grid.Column />
            <Grid.Column>
              <Header as="h1" icon textAlign="center">
                <Icon name="hourglass half" circular />
                <Header.Content>Wager Status</Header.Content>
              </Header>
            </Grid.Column>
            <Grid.Column textAlign="right" floated="right">
              <Button
                onClick={() => {
                  this.props.history.push("/privateMessages");
                }}
              >
                View / Create Message
              </Button>
            </Grid.Column>
          </Grid>
          <Grid columns={2} celled>
            <Grid.Column>
              <Header as="h2" textAlign="centered">
                Wagers you are currently managing:
              </Header>
              {managedWagers.length ? (
                <RenderWagers wagerList={managedWagers} columns={3} />
              ) : (
                <div>
                  <Grid.Column />
                  <Grid.Column>
                    <br />
                    <br />
                    <Header as="h3" textAlign="centered">
                      You are not currently managing any wagers.
                    </Header>
                  </Grid.Column>
                </div>
              )}
            </Grid.Column>
            <Grid.Column>
              <Header as="h2" textAlign="centered">
                Wagers you are currently participating in:
              </Header>
              {inTheseWagers.length ? (
                <RenderWagers wagerList={inTheseWagers} columns={3} />
              ) : (
                <div>
                  <Grid.Column />
                  <Grid.Column>
                    <br />
                    <br />
                    <Message warning>
                      <Message.Header textAlign="centered">
                        You are not currently participating in any wagers.
                      </Message.Header>
                    </Message>
                  </Grid.Column>
                </div>
              )}
            </Grid.Column>
          </Grid>
        </div>
      );
    } else {
      this.props.history.push("/");
      return null;
    }
  }
}

const mapStateToProps = function(state, ownProps) {
  return {
    currentUser: state.user,
    listOfWagers: state.wagers
  };
};

export default withRouter(connect(mapStateToProps, null)(ProfilePage));
