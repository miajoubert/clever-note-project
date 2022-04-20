import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import NoteEditForm from './NoteEditForm';

import './NoteModals.css'

function NoteEditModal({ note, onClose }) {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <button
        className="note-function-button" id='note-edit'
        onClick={() => {
          setShowModal(true)
        }}
      >
        Edit
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <NoteEditForm
            hideModal={() => setShowModal(false)}
            note={note}
            onClose={onClose} />
        </Modal>
      )}
    </>
  )
}

export default NoteEditModal;
