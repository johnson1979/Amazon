import React from 'react';
import { Switch, Route } from 'react-router-dom';
import LoginPage from './login';
import SignUpPage from './SignUp';
import HomePage from './HomePage';

const Routes = () => (
    <routes>
      <Switch>
        <Route exact path='/' component={HomePage}/>
        <Route path='/login' component={LoginPage}/>
        <Route path='/signup' component={SignUpPage}/>
      </Switch>
    </routes>
  )
  
  export default Routes