import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Switch, Route } from 'react-router-dom';

import * as sessionActions from './store/session'

import Navigation from './components/Navigation';
import LandingPage from './components/LandingPage';
import SignupModal from './components/SignupForm';
import NotebooksPage from './components/Notebooks'
import NotesPage from './components/Notes';
import RemindersPage from './components/Reminders';
import ResultsPage from './components/SearchResults/Results';
import Errors from './components/Errors';

import './index.css';

function App() {
  const dispatch = useDispatch();

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreSession())
      .then(() => setIsLoaded(true))
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
            <SignupModal />
          </Route>
          <Route path={[
            "/",
            "/notes",
            "/notes/:noteId",
            "/notes/:noteId/edit"
          ]} exact>
            <NotesPage />
          </Route>
          <Route path={[
            "/",
            "/notebooks",
            "/notebooks/:notebookId",
            "/notebooks/:notebookId/edit"
          ]} exact>
            <NotebooksPage />
          </Route>
          <Route path={[
            "/",
            "/reminders",
            "reminders/:reminderId",
            "reminders/:reminderId/edit"
          ]} exact>
            <RemindersPage />
          </Route>
          <Route path={[
            "/",
            "/results",
            "/results/:searchTerm"]} exact>
            <ResultsPage />
          </Route>
          <Route path="/">
            <Errors />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
