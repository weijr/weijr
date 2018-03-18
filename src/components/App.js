import React, { Component } from 'react';
import logo from '../logo.svg';
import './App.css';
import { Switch, Route, Link, withRouter } from 'react-router-dom';
import { db } from '../fire/firestore';
import history from '../history';
import store from '../store';
import { browserHistory } from 'react-router';

import web3 from '../web3';
import mafiaContract from '../mafiaContract';

class App extends Component {
  constructor(props) {
    super(props)
    this.enterGame = this.enterGame.bind(this)
  }

  state = {
    manager: '',
    numberOfPlayers: '',
    pot: '',
    message: ''

  }

  async componentDidMount() {
    const manager = await mafiaContract.methods.manager().call();
    const numberOfPlayers = await mafiaContract.methods.getPlayersLength().call();
    const pot = await web3.eth.getBalance(mafiaContract.options.address);
    console.log(numberOfPlayers)
    this.setState({ manager, numberOfPlayers, pot });
  }

  enterGame = async (event) => {

    event.preventDefault();
    //random name generator
    let name = ["abandoned", "able", "absolute", "adorable", "adventurous", "academic", "acceptable", "acclaimed"]
    let nameIndex = Math.floor((Math.random() * name.length));
    let name2 = ["people", "history", "way", "art", "world", "information", "map", "family", "government", "health"]
    let name2Index = Math.floor((Math.random() * name2.length));
    let randomName = name[nameIndex] + "  " + name2[name2Index]

    //random number generator for ether
    let randomEtherAmount = Math.floor((Math.random() * 100) + 75);
    let playerRef = db.collection("players")


    const accounts = await web3.eth.getAccounts();
    this.setState({ message: 'Waiting on transaction success...' });

    await mafiaContract.methods.addPlayer(accounts[0], true).send({
      from: accounts[0],
      value: web3.utils.toWei('1', 'ether')
    });
    this.setState({ message: 'Transaction Success! Wait to be redirected to waiting room' });


    playerRef
      .add({
        name: randomName,
        ether: randomEtherAmount,
      })
      .then(() => {
        playerRef
          .collection("inbox")
          .add({
            user: "admin",
            message: randomName + "has entered the game"
          })
      })
      .then(() => {
        this.props.history.push('/game')
      })
      .catch(function (error) {
        console.error("Error adding document: ", error);
      });
  }


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Mafia on da bloc</h1>
          <h2>This game is managed by {this.state.manager}</h2>
        </header>
        <h2>Don't know how to play? Click here for instructions.</h2>
        <h2>There are currently {this.state.numberOfPlayers} players in the game</h2>
        <h3>Click the button below to ante up 1 ether with a chance to win the whole pot</h3>
        <button onClick={this.enterGame}>Click here!</button>
        <h6>The Current pot is {web3.utils.fromWei(this.state.pot, 'ether')} ether</h6>
        <h1>{this.state.message}</h1>
      </div>
    )
  }
}

export default withRouter(App);
