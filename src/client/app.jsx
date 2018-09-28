import React from 'react'
import { render } from 'react-dom'
import { Router, browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import $ from 'jquery'
import './assets/styles/app.less'
import routes from './routes'
import createStore from './store/createStore';
import './styles.css';

// Initialize application
global.$ = $
$.ajaxSetup({cache: false})

// Grab the state from a global variable injected into the server-generated HTML
const preloadedState = window.__APP_INITIAL_STATE__

// Allow the passed state to be garbage-collected
delete window.__APP_INITIAL_STATE__

// Create Redux store with initial state
const store = createStore(preloadedState)

render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>,
  document.getElementById('react-app')
)
