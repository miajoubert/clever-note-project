import React from 'react';
import { NavLink, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

import DemoUser from '../../Demo';
import LoginFormModal from '../LoginFormModal';
import ProfileButton from './ProfileButton';
import SearchButton from './SearchButton'

import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <div className="navbar" >
        <NavLink className='notes' to="/notes">Notes</NavLink>
        <NavLink className='notes' to="/notebooks">Notebooks</NavLink>
        <a className='notes' href="https://github.com/miajoubert/clevernote-project" target="_blank">About</a>
        {/* <NavLink className='notes' to="/reminder">Reminders</NavLink> */}
        {/* <SearchButton /> */}
        <ProfileButton user={sessionUser} />
      </div >
    );
  } else {
    sessionLinks = (
      <div className='navbarHome'>
        <DemoUser className='signup' />
        <LoginFormModal className="nav1" />
        <NavLink className='signup' to="/signup">Sign Up</NavLink>
      </div >
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
