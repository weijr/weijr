import React, { Component } from 'react';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom'
//import { render } from 'react-dom';
import { connect, Provider } from 'react-redux';
// import store from './store';
import App from './App';
import InitialGameView from './InitialGameView';
import { BrowserRouter } from 'react-router-dom'

class Routes extends Component {
  componentDidMount () {
  
  }
  render () {
    return (
      // <Switch>
      <div>
      
      <Route exact path="/" component={ App } />  
      <Route exact path="/game" component={InitialGameView} />  
      
        </div>
      // </Switch>
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