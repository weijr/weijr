import React, { Component } from 'react';
import './App.css';
import App from './App'
import { Switch, Route, Link } from 'react-router-dom'
import { db } from '../fire/firestore'
import { connect } from 'react-redux';


class WagerBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      wager: this.props.wager
    }
  }



  render() {
    let wagerA = this.state.wager.split("vs")[0]
    let wagerB = this.state.wager.split("vs")[1]

    return (
      <div id="WagerBar">
        <button>Bet on {wagerA}!</button>
        <button>Bet on {wagerB}!</button>
      </div>
    )
  }
}


export default WagerBar

