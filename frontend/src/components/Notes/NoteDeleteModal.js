import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import { deleteNote } from '../../store/notes';

import './Notes.css'

function NoteDeleteModal({ note }) {
  const [showModal, setShowModal] = useState(false)

  async function deleteNoteFunc() {
    await dispatch(deleteNote(noteId))
    history.push("/notes")
  }

  return (
    <>
      <button
        className="editButton"
        onClick={() => setShowModal(true)}
      >
        Delete
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <div>
            <button
              onClick={deleteNoteFunc}
            >
              Confirm Delete
            </button>
            <button
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
