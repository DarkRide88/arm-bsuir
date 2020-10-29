import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter} from 'react-router-dom'
import * as firebase from 'firebase'
import {createStore, compose, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'
import rootReducer from './store/reducers/rootReducer'

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;

const store = createStore(
    rootReducer, 
    composeEnhancers(
      applyMiddleware(thunk)
    ))

firebase.initializeApp({
  apiKey: "AIzaSyAZZpOKmwiWcyMK9GjpODM4TwuSTQDDB9w",
  authDomain: "arm-bsuir-2.firebaseapp.com",
  databaseURL: "https://arm-bsuir-2.firebaseio.com",
  projectId: "arm-bsuir-2",
  storageBucket: "arm-bsuir-2.appspot.com",
  messagingSenderId: "2294988295",
  appId: "1:2294988295:web:1e3007c3fa7da77bfff4a2",
  measurementId: "G-QBCYQHTX6Z"
})



const app = (
  <Provider store = {store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
  </Provider>
)

ReactDOM.render(app,document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
