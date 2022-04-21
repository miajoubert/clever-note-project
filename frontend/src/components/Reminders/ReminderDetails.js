import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Route, useParams } from "react-router-dom";

import { Modal } from "../../context/Modal";
import { reminderDetails, updateReminder, deleteReminder } from "../../store/reminders";
import { listNotes } from "../../store/notes";
import DatePickerPage from "./DatePicker";

import './ReminderDetails.css'

const ReminderDetails = ({ reminder }) => {
  const reminders = useSelector(state => state.reminders)
  const noteList = useSelector(state => state.notes)
  const session = useSelector(state => state.session)
  const dispatch = useDispatch()

  const [showModal, setShowModal] = useState(false);

  const userId = session.user.id;
  let { reminderId } = useParams();

  useEffect(() => {
    if (session.user) {
      dispatch(reminderDetails(reminderId))
      dispatch(listNotes(userId))
    }
  }, [dispatch])

  console.log("reminders", reminders)
  console.log("notessssssss", noteList)

  const handleDelete = async () => {
    await dispatch(deleteReminder(reminder?.id));
    setShowModal(false);
  };
  const handleUpdate = async () => {
    await dispatch(updateReminder(reminder?.id));
    setShowModal(false);
  };

  return (
    <>
      <button
        className="note-function-button" id='note-delete'
        onClick={() => setShowModal(true)}
      >
        Details
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>

          <div className="reminder-det-modal">
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

export default ReminderDetails;
