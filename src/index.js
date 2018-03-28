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
import store from './store'
import 'semantic-ui-css/semantic.min.css';



const history = process.env.NODE_ENV === 'test' ? createMemoryHistory() : createHistory()

const options = {
  position: 'top center',
  timeout: 3000,
  offset: '30px',
  transition: 'scale'
}

ReactDOM.render(
  <Provider store={store}>
  <AlertProvider template={AlertTemplate} {...options}>
    <Router history={history}>
      <Routes />
    </Router>
    </AlertProvider>
  </Provider>,
    document.getElementById('root'));
registerServiceWorker();
