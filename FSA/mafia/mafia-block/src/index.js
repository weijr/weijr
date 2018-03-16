import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Routes from './routes'
import { Provider } from 'react-redux'
// import { Router } from 'react-router-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker';
import history from './history'
import store from './store'


ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Routes />
    </Router>
  </Provider>,
    document.getElementById('root'));
registerServiceWorker();
