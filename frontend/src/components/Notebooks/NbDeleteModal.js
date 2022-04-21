import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from "react-router-dom";

import { Modal } from '../../context/Modal';
import { deleteNotebook } from '../../store/notebooks';

import './NbModals.css'

function NbDeleteModal({ notebook }) {
  const [showModal, setShowModal] = useState(false);
  const { noteId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  async function deleteNbFunc() {
    await dispatch(deleteNotebook(notebook.id))
    history.push("/notebooks")
  }

  return (
    <>
      <button
        className="note-function-button"
        id='nb-delete'
        onClick={() => setShowModal(true)}
      >
        Delete Notebook
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <div className="delete-modal-div">
            <button
              className="form-button"
              onClick={deleteNbFunc}
            >
              Delete
            </button>
            <button
              className="form-button"
              id="cancel-button"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </button>
          </div>
        </Modal>
      )}
    </>
  )
}

export default NbDeleteModal;
