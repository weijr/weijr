import React, { Component } from "react";
import logo from "../logo.svg";
import "./App.css";
import { Switch, Route, Link, withRouter } from "react-router-dom";
import { db, auth, userById } from "../fire/firestore";
import history from "../history";
import store from "../store";
import { browserHistory } from "react-router";
import web3 from "../web3";
import mafiaContract from "../mafiaContract";
import GeneralChat from "./GeneralChat/index";
import { definedRole, randomNameGenerator } from "../utils";
import InitialGameView from "./InitialGameView";
import basketball from "./basketball.png";
import { Header, Icon, Image, Segment, Grid, Button, Card } from 'semantic-ui-react'

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      wager: "",
      listOfWagers: []
    };

    this.enterGame = this.enterGame.bind(this);
  }

  componentDidMount() {
    db.collection("wagers").onSnapshot(snapshot => {
      this.setState({
        listOfWagers: snapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.ref.id
          };
        })
      });
    });
  }

  enterGame = event => {
    event.preventDefault();

    userById(auth.currentUser.uid).set({ id: auth.currentUser.uid });

    let wager = event.target.value;

    var data = {
      wager: wager
    };

    var setDoc = db
      .collection("wagers")
      .doc(wager)
      .set(data);
    this.setState({
      wager: event.target.value
    });
    this.props.history.push(`/game/${wager}`);
  };

  render() {
    console.log("list: ", this.state.listOfWagers);
    console.log(auth);
    const first = "KnicksvsWarriors";
    const second = "ThundervsNets";
    const wagerList = this.state.listOfWagers;
    return (
      <div>
        <Segment inverted>
          <Header inverted as="h2" icon textAlign="center">
            <Icon name="ethereum" circular />
            <Header.Content>
              <h2 class="ui red header">
                Welcome 2 Wagr
            </h2>
            </Header.Content>
            <Header.Content>
              <h2 class="ui red header">
                See a wager that you like? Click on it to ante up!
              </h2>
            </Header.Content>
          </Header>
        </Segment>
        <Grid columns={4}>
          {wagerList.map(wager => (
            <Grid.Column>
              <Card key={wager.id} className="ui segment centered">
                <Image src={basketball} />
                <Card.Header />
                <Button key={wager.id} value={wager.id} onClick={this.enterGame}>
                  Click here to bet on {wager.id.split("vs").join(" vs. ")}
                </Button>
              </Card>
            </Grid.Column>
          ))}
        </Grid>
      </div>
    );
  }
}

export default withRouter(App);
