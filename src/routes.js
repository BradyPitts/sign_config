import React from 'react';
import {Switch, Route} from 'react-router-dom';
import App from './App';
import User from './Components/User/User';
import Edit from './Components/Edit/Edit';



export default (
  <Switch>
    <Route exact path='/' component={App} />
    <Route path='/User' component={User} />
    <Route path='/Edit' component={Edit} />
  </Switch>
)