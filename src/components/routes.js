import React, { Component } from 'react';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom'
//import { render } from 'react-dom';
import { connect, Provider } from 'react-redux';
// import store from './store';
import AllWagers from './AllWagers';
import App from './App'
import SingleWagerView from './SingleWagerView';
// import SignUp from './signUp'
import CreateWager from './CreateWager';
import ProfilePage from './ProfilePage'
import DirectChatCreation from './DirectChat/index'
import GeneralChat from './GeneralChat'


class Routes extends Component {

  render () {
    return (
      <Switch>
        <Route exact path="/" component={ App } />
        <Route exact path='/new-wager' component={ CreateWager } />
        <Route exact path="/wagers" component={ AllWagers } />
        <Route exact path="/wagers/:address" component={SingleWagerView} />
        <Route exact path="/your-profile" component={ProfilePage} />
        <Route exact path='/newPrivateMessage' component={DirectChatCreation} />
        <Route exact path='/profile/:userName/:recipientName' component={ GeneralChat } />
        <Redirect from="*" to="/" />
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
