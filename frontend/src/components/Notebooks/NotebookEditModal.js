import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import NoteEditForm from './NoteEditForm';

import './Notes.css'

function NoteEditModal({ note, showDetails }) {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <button
        className="editButton"
        onClick={() => setShowModal(true)}
      >
        Edit
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <NoteEditForm
            hideModal={() => setShowModal(false)}
            note={note} />
        </Modal>
      )}
    </>
  )
}

export default NoteEditModal;
