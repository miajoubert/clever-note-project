import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";

import './Navigation.css'
import './DevButton.css'

function DevButton() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  return (
    <>
      <button
        className={!showMenu ? "profileButton" : "profileButtonOpen"}
        onClick={openMenu}>
        <i className="fas fa-laptop-code" />
      </button>
      {showMenu && (
        <ul className="dev-dropdown">
          <li className="username">
            <a
              href='https://github.com/miajoubert'
              target='_blank'
              rel='noopener noreferrer'
              className="tooltip devLi"
            >
              {/* <span className='tooltiptext'>Developer GitHub</span> */}
              <span className="fab fa-github" />
              Mia Joubert
            </a>
          </li>
          <li className="username">
            <a
              href='https://www.linkedin.com/in/miajoubert/'
              target='_blank'
              rel='noopener noreferrer'
              className="tooltip devLi"
            >
              {/* <span className='tooltiptext'>Developer Linked In</span> */}
              <span className="fab fa-linkedin" />
              Mia Joubert
            </a>
          </li>
          <li className="username">
            <a
              href='https://github.com/miajoubert/clevernote-project'
              target='_blank'
              rel='noopener noreferrer'
              className="tooltip devLi"
            >
              {/* <span className='tooltiptext'>Application GitHub</span> */}
              <span className="fab fa-github tooltip" />
              Clevernote
            </a>
          </li>
        </ul>
      )}
    </>
  );
}

export default DevButton;
