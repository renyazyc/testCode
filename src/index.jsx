import React,{Component} from 'react';
import {render} from 'react-dom';
import { connect,Provider } from 'react-redux';
import { Router,Route,browserHistory,Link } from 'react-router';
import { createStore,combineReducers } from 'redux';
import './index.css';

import routes from './routes';
import * as reducer from './reducer'

// Store
const store = createStore(combineReducers(reducer));



render(
    <Provider store={store}>
        <Router history={ browserHistory }>
            {routes()}
        </Router>
    </Provider>,
    document.getElementById('root')
)




