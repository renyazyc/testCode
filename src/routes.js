import React from 'react'
import {Route, IndexRoute,Redirect} from 'react-router'
import App from './components/increase'

export default ()=>(
    <Route path="/" component={App}></Route>
)