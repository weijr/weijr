import React, { Component } from 'react';
import './app.css';
import App from './app'
import { Switch, Route, Link } from 'react-router-dom'
import { db, auth, userById } from '../fire/firestore'
import { connect } from 'react-redux';
import { Button, Icon, Label } from 'semantic-ui-react'

class WagerComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      wager: this.props.wager,
      wagerA: [],
      wagerB: [],
      currentUser: 'anthony'
    }
    this.placeWager = this.placeWager.bind(this)
  }

  componentDidMount() {
    const wager = this.state.wager
    const wagerA = this.state.wager.split('vs')[0];
    const wagerB = this.state.wager.split('vs')[1];
    let wagerACollectionName = "Wagers for " + wagerA
    let wagerBCollectionName = "Wagers for " + wagerB

    console.log("a: ", wagerA)

    // if (auth.currentUser)
    // this.setState({currentUser: auth.currentUser.uid})

    db
      .collection("wagers")
      .doc(wager)
      .collection(wagerACollectionName)
      .onSnapshot(snapshot => {
        this.setState({
          wagerA: snapshot.docs.map(doc => {
            const data = doc.data()
            return {
              userId: data.userId
            }
          })
        })
      })

    db
      .collection("wagers")
      .doc(wager)
      .collection(wagerBCollectionName)
      .onSnapshot(snapshot => {
        this.setState({
          wagerB: snapshot.docs.map(doc => {
            const data = doc.data()
            return {
              userId: data.userId
            }
          })
        })
      })

    }

  placeWager = (event) => {

    const wager = this.state.wager
    const wagerA = this.state.wager.split('vs')[0];
    const wagerB = this.state.wager.split('vs')[1];
    const currentUser = this.state.currentUser
    let wagerCollectionName = "Wagers for " + event.target.value

    // console.log("e: ", event.target.value)
    // let wagerAKeys = Object.keys(this.state.wagerA)
    // let wagerBKeys = Object.keys(this.state.wagerB)



    if(this.state.wagerA.concat(this.state.wagerB).map((name) => { return name.userId}).indexOf(currentUser) > -1) {
      alert("You've already placed a bet")
    } else {
      db
      .collection("wagers")
      .doc(wager)
      .collection(wagerCollectionName)
      .add({
        userId: currentUser
      })
    }
  }

  render() {
    const wagerA = this.state.wager.split('vs')[0];
    const wagerB = this.state.wager.split('vs')[1];
    console.log(this.state.wager)
    const { messages } = this.state
    console.log("wagerAState: ", this.state.wagerA)
    console.log("wagerBState: ", this.state.wagerB)
    console.log("concat: ", this.state.wagerA.concat(this.state.wagerB))

    console.log(this.state.wagerA.concat(this.state.wagerB).indexOf(({'userId': "anthony"})))

    // console.log('auth: ', this.state.currentUser)
    return (
      <div>
    <Button as='div' labelPosition='right'>
      <Button color='red' value={wagerA} onClick={event => this.placeWager(event)}>
        <Icon name='ethereum' />
        { wagerA }
      </Button>
      <Label as='a' basic color='red' pointing='left'>{this.state.wagerA.length}  Bets Placed</Label>
    </Button>
    <Button as='div' labelPosition='right'>
      <Button color='blue' value={wagerB} onClick={event => this.placeWager(event)}>
        <Icon name='ethereum' />
        { wagerB }
      </Button>
      <Label as='a' basic color='blue' pointing='left'>{this.state.wagerB.length}  Bets Placed</Label>
    </Button>
  </div>
    )
  }


}

export default WagerComponent;
