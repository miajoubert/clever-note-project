import React from 'react';
import { Switch, Route } from 'react-router-dom';

import logo from '../public'
import LoginFormPage from './components/LoginFormPage'

function App() {
  return (
    <nav>
      <a>
        <img src='logo'
      </a>
      <div>Welcome to Clever Note!</div> {/*remember to remove*/}
      <Switch>
        <Route path='/login'>
          <LoginFormPage />
        </Route>
      </Switch>
    </nav>
  );
}

export default App;
