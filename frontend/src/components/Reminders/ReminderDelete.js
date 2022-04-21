import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from "react-router-dom";

import { Modal } from '../../context/Modal';
import { deleteReminder } from '../../store/reminders';

import './ReminderDelete.css'

function ReminderDeleteModal({ note }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { reminderParamId } = useParams();

  const [showModal, setShowModal] = useState(false);

  let reminderId
  if (reminder) { reminderId = reminder?.id }
  else { reminderId = reminderParamId }

  async function handleDelete() {
    await dispatch(deleteReminder(reminderId))
    history.push("/reminders")
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
