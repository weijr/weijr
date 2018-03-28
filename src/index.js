import React from 'react';
import ReactDOM from 'react-dom';
import { Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import Routes from './components/routes'
import { Provider } from 'react-redux'
import { Router } from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker';
import createHistory from 'history/createBrowserHistory'
import createMemoryHistory from 'history/createMemoryHistory'
import store,{setUser} from './store'
import 'semantic-ui-css/semantic.min.css';
import {auth} from './fire/firestore'
import {connect} from 'react-redux'

const history = process.env.NODE_ENV === 'test' ? createMemoryHistory() : createHistory()

class Gate extends React.Component {
  componentDidMount() {
    this.unsubscribe = auth.onAuthStateChanged(user => this.setState({user}))
  }
  componentWillUnmount() {
    this.unsubscribe()
  }
  render() {
    if (!this.state) return null;
    this.props.setUser(this.state.user)
    return this.props.children;
  }
}
const mapDispatchToProps = function(dispatch, ownProps) {
  return {
    setUser(user) {
      dispatch(setUser(user));
    }
  };
};

const ConnectedGate = connect(null,mapDispatchToProps)(Gate)
const options = {
  position: 'top center',
  timeout: 3000,
  offset: '30px',
  transition: 'scale'
}

ReactDOM.render(
  <Provider store={store}>
  <ConnectedGate>
    <AlertProvider template={AlertTemplate} {...options}>
      <Router history={history}>
        <Routes />
      </Router>
      </AlertProvider>
    </ConnectedGate>
  </Provider>,
    document.getElementById('root'));
registerServiceWorker();
