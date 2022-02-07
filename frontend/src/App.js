import React from 'react';
import { Switch, Route } from 'react-router-dom';

import LoginFormPage from './components/LoginFormPage'

import './index.css';

function App() {
  return (
    <Switch>
      {/* <nav>
        <a className='bar' >
          <img href='/' className='logo' src='https://github.com/miajoubert/clever-note-project/blob/main/frontend/public/logo.png?raw=true' />
          <span>Clevernote</span>
        </a>
      </nav> */}

      <Route path='/login'>
        <LoginFormPage />
      </Route>
    </Switch>
  );
}

export default App;
