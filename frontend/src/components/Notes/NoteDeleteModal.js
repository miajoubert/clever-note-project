import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from "react-router-dom";

import { Modal } from '../../context/Modal';
import { deleteNote } from '../../store/notes';

import './NoteModals.css'

function NoteDeleteModal({ note }) {
  const [showModal, setShowModal] = useState(false);
  const { noteId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  async function deleteNoteFunc() {
    await dispatch(deleteNote(noteId))
    history.push("/notes")
  }

  return (
    <>
      <button
        className="note-function-button" id='note-delete'
        onClick={() => setShowModal(true)}
      >
        Delete
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <div className="delete-modal-div">
            <button
              className="form-button"
              onClick={deleteNoteFunc}
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

export default NoteDeleteModal;
