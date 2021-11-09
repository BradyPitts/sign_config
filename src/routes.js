import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Landing from './Components/Landing/Landing';
import Signin from './Components/Signin/Signin';
import User from './Components/User/User';
import Edit from './Components/Edit/Edit';



export default (
  <Switch>
    <Route exact path='/' component={User} />
    <Route path='/Sample' component={Landing} />
    <Route path='/Signin' component={Signin} />
    <Route path='/Edit' component={Edit} />
  </Switch>
)