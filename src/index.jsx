import 'babel-polyfill';
import React,{Component} from 'react';
import {render} from 'react-dom';
import { connect,Provider } from 'react-redux';
import { BrowserRouter as Router,Link } from 'react-router-dom';
import { createStore,combineReducers } from 'redux';
// import './index.css';

import routes from './routes';
import * as reducer from './reducer';



// const req = require.context("./components", true, /^\.\/.*\.jsx$/);

// Store
const store = createStore(combineReducers(reducer));
render(
    <Provider store={store}>
      {routes()}
    </Provider>,
    document.getElementById('root')
)




