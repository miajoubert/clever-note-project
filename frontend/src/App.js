import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Switch, Route } from 'react-router-dom';

import * as sessionActions from './store/session'
import Navigation from './components/Navigation';
import LandingPage from './components/LandingPage';
import SignupFormPage from './components/SignupForm';
import NotesPage from './components/Notes';
// import NotebooksPage from './components/Notebooks';
// import RemindersPage from './components/Reminders';
import Errors from './components/Errors';


import './index.css';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreSession()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/" exact>
            <LandingPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path="/notes">
            <NotesPage />
          </Route>
          {/* <Route path="/notebooks">
            <NotesPage />
          </Route> */}
          {/* <Route path="/reminders">
            <NotesPage />
          </Route> */}
          <Route path="/">
            <Errors />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
