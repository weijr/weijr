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

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      enter: false,
      wager: ""
    };

    this.enterGame = this.enterGame.bind(this);
  }

  // componentDidMount() {
  //   this.setState({enter: false})
  // }

  enterGame = event => {
    event.preventDefault();

    let wager = event.target.value;

    var data = {
      wager: wager
    };

    var setDoc = db
      .collection("wagers")
      .doc(wager)
      .set(data);
    this.setState({
      enter: true,
      wager: event.target.value
    });
    this.props.history.push(`/game/${wager}`);
  };

  render() {
    const first = "KnicksvsWarriors";
    const second = "ThundervsNets";
    return (
      <div>
        {!this.state.enter (
          <div className="App">
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <h1 className="App-title">Welcome to Blockchain Bois</h1>
            </header>
            <h3>Click the button below to ante up 1 to enter this wager</h3>
            <div>
              <button value={first} onClick={this.enterGame}>
                Knicks vs Warriors
              </button>
            </div>
            <div>
              <button value={second} onClick={this.enterGame}>
                Thunder vs Nets
              </button>
            </div>
            <h1>{this.state.message}</h1>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(App);
