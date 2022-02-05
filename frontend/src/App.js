import React from 'react';
import { Switch, Route } from 'react-router-dom';

import LoginFormPage from './components/LoginFormPage'

function App() {
  return (
    <nav>
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
