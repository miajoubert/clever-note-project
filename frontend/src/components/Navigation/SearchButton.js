import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from "react-router-dom";

import * as sessionActions from '../../store/session';

import './Search.css'
import './Navigation.css'

function SearchButton() {
  const sessionUser = useSelector(state => state.session.user)
  const dispatch = useDispatch();
  const history = useHistory();

  const [showSearch, setShowSearch] = useState(false);

  const openSearch = () => {
    setShowSearch(!showSearch);
  };

  const search = (e) => {
    e.preventDefault();
    dispatch(sessionActions());
    history.push("/results")
  };

  return (
    <>
      <button
        className={!showSearch ? "searchButton profileButton" : "searchButtonOpen"}
        onClick={openSearch}>
        <i className="fas fa-search" />
      </button>
      {showSearch && (
        <ul className="search-dropdown">
          <li className="username">
            <input className="searchInput" type="search"></input>
          </li>
          <li className="buttonLi">
            <button
              className="searchingButton"
              onClick={search}
            >
              Search
            </button>
          </li>
        </ul>
      )}
    </>
  );
}

export default SearchButton;
