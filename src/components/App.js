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
import CreateWager from "./CreateWager";
import ShowAllContracts from "./ShowAllContracts";
import factory from "../ether/factory";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      wager: "",
      listOfWagers: []
    };

    //this.enterGame = this.enterGame.bind(this);
  }

  async componentDidMount() {
    // db.collection("wagers").onSnapshot(snapshot => {
    //   this.setState({
    //     listOfWagers: snapshot.docs.map(doc => {
    //       const data = doc.data();
    //       return {
    //         id: doc.ref.id
    //       };
    //     })
    //   });
    // });
    this.setState({listOfWagers: await factory.methods.getDeployedwagers().call()})
    console.log(this.state.listOfWagers)
  }

  // enterGame = event => {
  //   event.preventDefault();

  //   userById(auth.currentUser.uid).set({ id: auth.currentUser.uid });

  //   let wager = event.target.value;

  //   var data = {
  //     wager: wager
  //   };

  //   var setDoc = db
  //     .collection("wagers")
  //     .doc(wager)
  //     .set(data);
  //   this.setState({
  //     wager: event.target.value
  //   });
  //   this.props.history.push(`/game/${wager}`);
  // };

  render() {

    const first = "KnicksvsWarriors";
    const second = "ThundervsNets";
    const wagerList = this.state.listOfWagers;
    console.log(wagerList)
    return (
      <div>
        <h1 className="App-title">Welcome to Blockchain Bois</h1>
        <h3>Click the button below to ante up 1 to enter this wager</h3>
        <Grid columns={3}>
        {wagerList.map(address => {
          const title = db
            .collection("wagers")
            .doc(address)
            .get()
          (
          <Grid.Column>
          <Card key={address}>
            <Image src={basketball} />
            <label>{title}</label>
            <Card.Header />
          </Card>
          </Grid.Column>
        )})}
        <Button onClick={() => this.props.history.push(`/new-wager`)}>Create Your Own Contract!</Button>
        </Grid>
      </div>
    );
  }
}

export default withRouter(App);
