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
      <div className="dropdown-div">
        <button
          className={!showMenu ? "profileButton" : "profileButtonOpen"}
          onClick={openMenu}>
          <i className="fas fa-laptop-code" />
        </button>
        {showMenu && (
          <ul className="dev-dropdown">
            <li className="devLi">
              <a
                href='https://github.com/miajoubert'
                target='_blank'
                rel='noopener noreferrer'
              >
                {/* <span className='tooltiptext'>Developer GitHub</span> */}
                <span className="fab fa-github" />
                Mia's GitHub
              </a>
            </li>
            <li className="devLi">
              <a
                href='https://www.linkedin.com/in/miajoubert/'
                target='_blank'
                rel='noopener noreferrer'

              >
                {/* <span className='tooltiptext'>Developer Linked In</span> */}
                <span className="fab fa-linkedin" />
                Mia's LinkedIn
              </a>
            </li>
            <li className="devLi">
              <a
                href='https://github.com/miajoubert/clevernote-project'
                target='_blank'
                rel='noopener noreferrer'
              >
                {/* <span className='tooltiptext'>Application GitHub</span> */}
                <span className="fab fa-github tooltip" />
                Clevernote
              </a>
            </li>
          </ul>
        )}
      </div>
    </>
  );
}

export default DevButton;
