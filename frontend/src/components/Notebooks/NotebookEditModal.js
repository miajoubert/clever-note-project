import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import NotebookEditForm from './NotebookEditForm';

import './index.css'

function NotebookEditModal({ notebook, showDetails }) {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <button
        className="editButton"
        onClick={() => setShowModal(true)}
      >
        Edit Notebook
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <NotebookEditForm
            hideModal={() => setShowModal(false)}
            notebook={notebook} />
        </Modal>
      )}
    </>
  )
}

export default NotebookEditModal;
