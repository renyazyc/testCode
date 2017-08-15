import React from 'react'
import {Route, IndexRoute,Redirect} from 'react-router'
import Counter from './components/increase'

export default ()=>(
    <Route path="/" component={Counter}/>
)