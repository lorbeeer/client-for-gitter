import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { Provider } from 'react-redux'
import App from './containers/App'
import counterApp from './reducers/index'


const preloadedState = window.__PRELOADED_STATE__
console.log('Client! preloadedState is ', JSON.stringify(preloadedState));
delete window.__PRELOADED_STATE__

const store = createStore(
   counterApp,
   {token: preloadedState.token, isFetching: false},
   applyMiddleware(thunkMiddleware))

console.log('store CLIENT is ', store.getState());

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)