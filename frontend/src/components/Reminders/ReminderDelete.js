import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from "react-router-dom";

import { Modal } from '../../context/Modal';
import { deleteReminder } from '../../store/reminders';

import './ReminderModals.css'

function ReminderDeleteModal({ reminder, onClose }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const [showModal, setShowModal] = useState(false);

  async function handleDelete() {
    await dispatch(deleteReminder(reminder.id))
    setShowModal(false)
    onClose()
  }

  return (
    <>
      <button
        className="note-function-button"
        id='rem-delete-button'
        onClick={() => setShowModal(true)}
      >
        Delete
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <div className="delete-modal-div">
            <button
              className="form-button"
              onClick={handleDelete}
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

export default ReminderDeleteModal;
