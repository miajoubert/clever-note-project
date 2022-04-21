import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import NbEditForm from './NbEditForm';

import './NbModals.css'

function NbEditModal({ notebook, showDetails }) {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <button
        className="note-function-button"
        id='nb-edit'
        onClick={() => setShowModal(true)}
      >
        Edit Notebook
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <NbEditForm
            hideModal={() => setShowModal(false)}
            notebook={notebook} />
        </Modal>
      )}
    </>
  )
}

export default NbEditModal;
