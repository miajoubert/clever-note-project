import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from "react-router-dom";

import * as sessionActions from '../../store/session';

import './Search.css'

function SearchButton() {
  const sessionUser = useSelector(state => state.session.user)
  const dispatch = useDispatch();
  const history = useHistory();

  const [showSearch, setShowSearch] = useState(false);

  const changeSearch = () => {
    setShowSearch(!showSearch);
  };

  const search = (e) => {
    e.preventDefault();
    dispatch(sessionActions());
    // history.push("/results")
  };

  return (
    <>
      <button
        className="searchDDButton"
        onClick={changeSearch}>
        <i className="fas fa-search" />
      </button>
      {showSearch && (
        <ul className="search-dropdown">
          <li className="buttonLi">
            <button
              className="searchButton"
              onClick={search}
            >
              Search
            </button>
          </li>
          <li className="username">
            <input className="search" type="search"></input>
          </li>
        </ul>
      )}
    </>
  );
}

export default SearchButton;
