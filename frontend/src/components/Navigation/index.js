import React from 'react';
import { NavLink, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

import DemoUser from '../../Demo';
import LoginFormModal from '../LoginFormModal';
import SignupModal from '../SignupForm';
import ProfileButton from './ProfileButton';
import SearchButton from './SearchButton'
import DevButton from './DevButton';

import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <div className="navbar" >
        <NavLink className='notes' to="/notebooks">Notebooks</NavLink>
        <NavLink className='notes' to="/notes">Notes</NavLink>
        <NavLink className='notes' to="/reminders">Reminders</NavLink>
        <SearchButton />
        <ProfileButton user={sessionUser} />
        <DevButton />
      </div >
    );
  } else {
    sessionLinks = (
      <div className='navbar'>
        <DemoUser className='signup' />
        <LoginFormModal className="signup" />
        <SignupModal className='signup' />
      </div >
    );
  }

  return (
    <ul className='navLinks'>
      <NavLink className={"bar"} to="/" exact>
        <img href='/' className='logo' src='https://github.com/miajoubert/clever-note-project/blob/main/frontend/public/logo.png?raw=true' />
        <span className='home'>Clevernote</span>
      </NavLink>
      {isLoaded && sessionLinks}
    </ul>
  );
}

export default Navigation;
