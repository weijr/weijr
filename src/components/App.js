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
import { Card, Image, Button, Grid } from "semantic-ui-react";
import basketball from "./basketball.png";

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
        <h1 className="App-title">Welcome to Blockchain Bois</h1>
        <h3>Click the button below to ante up 1 to enter this wager</h3>
        <Grid columns={3}>
        {wagerList.map(wager => (
          <Grid.Column>
          <Card key={wager.id}>
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
