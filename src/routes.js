import React from 'react'
import {BrowserRouter as Router} from 'react-router-dom'
import {Switch, Route} from 'react-router';
import Counter from './components/increase'
import Test from './test';

export default ()=>(
  <Router>
    <Switch>
      <Route exact path="/"  component={Counter} />
      <Route path="/abc" component={Test} />
    </Switch>
  </Router>
)