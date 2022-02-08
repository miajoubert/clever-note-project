import React from 'react';
import { NavLink, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

import LoginFormModal from '../LoginFormModal';
import ProfileButton from './ProfileButton';
import NotesPage from '../Notes';

import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <div className="navbar" >
        <NavLink className='notes' to="/notes">Notes</NavLink>
        <NavLink className='notes' to="/notebooks">Notebooks</NavLink>
        <NavLink className='notes' to="/reminder">Reminders</NavLink>
        <ProfileButton user={sessionUser} />
      </div >
    );
  } else {
    sessionLinks = (
      <div className='navbarHome'>
        <LoginFormModal className="nav1" />
        <NavLink className='signup' to="/signup">Sign Up</NavLink>
      </div>
    );
  }

  return (
    <ul className='navLinks'>
      <li>
        <NavLink className={"bar"} to="/" exact>
          <img href='/' className='logo' src='https://github.com/miajoubert/clever-note-project/blob/main/frontend/public/logo.png?raw=true' />
          <span className='home'>Clevernote</span>
        </NavLink>
        {isLoaded && sessionLinks}
      </li>
    </ul>
  );
}

export default Navigation;
