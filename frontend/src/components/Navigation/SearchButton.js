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

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(sessionActions());
    history.push("/results")
  };

  return (
    <>
      <div className="dropdown-div">
        <button
          className={!showSearch ? "searchButton profileButton" : "searchButtonOpen"}
          onClick={openSearch}>
          <i className="fas fa-search" />
        </button>
        {showSearch && (
          <div className="search-dropdown">

            <input
              className="searchInput"
              type="search"
              placeholder="Search..."
              onSubmit={handleSearch}
            ></input>

            <li className="buttonLi">
              <button
                className="searchingButton"
                onClick={handleSearch}
              >
                Search
              </button>
            </li>
          </div>
        )}
      </div>
    </>
  );
}

export default SearchButton;
