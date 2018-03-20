import React, { Component } from 'react';
import logo from '../logo.svg';
import './App.css';
import { Switch, Route, Link, withRouter } from 'react-router-dom';
import { db, auth, userById } from '../fire/firestore';
import history from '../history';
import store from '../store';
import { browserHistory } from 'react-router';

import web3 from '../web3';
import mafiaContract from '../mafiaContract';

class App extends Component {
  constructor(props) {
    super(props)

    this.pay = this.pay.bind(this)
    this.enterGame = this.enterGame.bind(this)
  }

  state = {
    manager: '',
    numberOfPlayers: '',
    pot: '',
    message: '',
    paid: false

  }

  async componentDidMount() {
    const manager = await mafiaContract.methods.manager().call();
    const numberOfPlayers = await mafiaContract.methods.getPlayersLength().call();
    const pot = await web3.eth.getBalance(mafiaContract.options.address);

    this.setState({ manager, numberOfPlayers, pot });
  }

  pay = async (event) => {

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

    let accounts;
    try {
      accounts = await web3.eth.getAccounts();
    } catch (error) {
      this.setState({ message: 'Go Set Up A MetaMask Account!' })
    }

    const alreadyInGame = await mafiaContract.methods.checkIfAlreadyInGame(accounts[0]).call();

    if (alreadyInGame) {
      this.setState({ message: "You're already in the game! No cheating! ", paid: true })
    } else {
      this.setState({ message: 'Waiting on transaction success...' });
      await mafiaContract.methods.addPlayer(accounts[0], true).send({
        from: accounts[0],
        value: web3.utils.toWei('1', 'ether')
      });
      this.unsubscribe = auth.onAuthStateChanged((user) => {
        if (!user) {
          auth.signInAnonymously()
          return
        }
        console.log(user.uid)
        userById(accounts[0]).set({ metamaskId: accounts[0], uid: user.uid, fakeName: randomName }, { merge: true })
      })
      userById
      console.log("auth.currentuser: ", auth.currentUser)
      userById(auth.currentUser.uid).set({metamaskId: accounts[0], uid: auth.currentUser.uid, fakeName: 'anthony' }, { merge: true })
      this.setState({ message: 'Transaction Success! Click the link below to enter!', paid: true });
    }
    history.push('/game')
    console.log("account", accounts[0])
  }

  enterGame = () => {
    history.push('/game')
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  render() {
    if (!this.state.paid) {
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
          <button onClick={this.pay}>Click here!</button>
          <h6>The Current pot is {web3.utils.fromWei(this.state.pot, 'ether')} ether</h6>
          <h1>{this.state.message}</h1>
        </div>
      )
    } else {
      return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to Mafia on da bloc</h1>
            <h2>This game is managed by {this.state.manager}</h2>
          </header>
          <h2>Don't know how to play? Click here for instructions.</h2>
          <h2>There are currently {this.state.numberOfPlayers} players in the game</h2>
          <h6>The Current pot is {web3.utils.fromWei(this.state.pot, 'ether')} ether</h6>
          <h1>{this.state.message}</h1>
          <Link to={'/game'}>Enter Game</Link>
        </div>
      )
    }
    
  }
}

export default withRouter(App);
