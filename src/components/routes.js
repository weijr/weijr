import React, { Component } from 'react';
import { withRouter, Route, Switch } from 'react-router-dom'
//import { render } from 'react-dom';
import { connect, Provider } from 'react-redux';
// import store from './store';
import AllWagers from './allWagers';
import SignUp from './app'
import SingleWagerView from './singleWagerView';
// import SignUp from './signUp'

class Routes extends Component {

  render () {
    return (
      <Switch>
  
        <Route exact path="/" component={ SignUp } />
        <Route exact path="/wagers" component={ AllWagers } />
        <Route exact path="/wagers/:address" component={SingleWagerView} />
      </Switch>
    )
  }
}

const mapState = state => {
  return {
  }
};

const mapDispatch = dispatch => {
  return {
  }
}

export default withRouter(connect(mapState, mapDispatch)(Routes))