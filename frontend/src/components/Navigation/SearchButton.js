import React, { useState } from "react";

import { Modal } from "../../context/Modal";
import SearchComponent from "../SearchResults";

import './Navigation.css'
import './SearchButton.css'

function SearchButton() {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <div className="dropdown-div">
        <button
          className={
            !showModal ? "searchButton profileButton"
              : "searchButtonOpen"}
          onClick={() => setShowModal(true)}
        >
          <i className="fas fa-search" />
        </button>
      </div>

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <SearchComponent
            hideModal={() => setShowModal(false)}
          />
        </Modal>
      )}
    </>
  );
}

export default SearchButton;
