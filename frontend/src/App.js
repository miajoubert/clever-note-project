import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Switch, Route } from 'react-router-dom';

import * as sessionActions from './store/session'
import Navigation from './components/Navigation';
import SignupFormPage from './components/SignupForm';

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
          <Route path="/signup">
            <SignupFormPage />
          </Route>
        </Switch>
      )}
      <img
        className='homePic'
        src="https://txcatholic.org/wp-content/uploads/2019/03/Notebook-pen-and-coffee-for-web-white-background-300x200.jpg"
      ></img>
    </>
  );
}

export default App;
