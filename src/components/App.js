import React, { Component } from 'react';
import logo from '../logo.svg';
import './App.css';
import { Switch, Route, Link, withRouter } from 'react-router-dom';
import { db, auth, userById } from '../fire/firestore';
import history from '../history';
import store from '../store';
import { browserHistory } from 'react-router';

import web3 from '../web3';
import wagerContract from '../wagerContract';

import {definedRole, randomNameGenerator} from '../utils';

class App extends Component {
  constructor(props) {
    super(props)

    // this.pay = this.pay.bind(this)
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
    //setting a random array of roles, if one does not exist already
    this.unsubscribeCreateRoles = db.collection("rooms").doc("room1").collection("roles").onSnapshot(snap =>  {
      if (!snap.docs.length) {
         definedRole();
      }
    })

    const manager = await wagerContract.methods.manager().call();
    const numberOfPlayers = await wagerContract.methods.getUsersLength().call();
    const pot = await web3.eth.getBalance(wagerContract.options.address);

    this.setState({ manager, numberOfPlayers, pot });
  }

  componentWillUnmount(){
    this.unsubscribe()
    this.unsubscribeCreateRoles();
  }

  enterBet = async (event) => {

    event.preventDefault();

    //random name generator
    let randomName = randomNameGenerator();


    // const setRolesForGame = await db.collection("rooms").doc("room1").collection("roles").doc("roles").get()

    let accounts;
    try {
      accounts = await web3.eth.getAccounts();
    } catch (error) {
      this.setState({ message: 'Go Set Up A MetaMask Account!' })
    }


    const alreadyInBet = await wagerContract.methods.checkIfAlreadyInBet(accounts[0]).call();


    // if(alreadyInBet){
    //   this.setState({message: "You're already in the game! No cheating! "})
    // }
    //else {

      //checks currentrandom arrays index to see if its mafia or not
      let chooseFirstSide;


      this.setState({ message: 'Waiting on transaction success...' });

      //await the transaction to contract for adding a player
      await wagerContract.methods.joinBet(chooseFirtSide).send({
        from: accounts[0],
        value: web3.utils.toWei('.0000000000001', 'ether')
      });

      //push the new player to the firestore
      this.unsubscribe = auth.onAuthStateChanged((user)=> {
        if (!user) {
          auth.signInAnonymously()
          return;
        }
        userById(accounts[0]).set({metamaskId:accounts[0], id: user.uid, fakeName: randomName, role: setRolesForGame.data().roles[Number(this.state.numberOfPlayers)], isMafia: isMafia},{merge: true})
      })

      this.setState({numberOfPlayers: await wagerContract.methods.getPlayersLength().call()})
      this.setState({pot: await web3.eth.getBalance(wagerContract.options.address)})
      this.setState({ message: 'Transaction Success! Click on the link below to enter', paid: true });
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
          <button onClick={this.enterGame}>Click here!</button>
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
