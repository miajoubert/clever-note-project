import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Route, useParams } from "react-router-dom";

import { Modal } from "../../context/Modal";
import { reminderDetails, updateReminder, deleteReminder } from "../../store/reminders";
import { listNotes } from "../../store/notes";
import DatePickerPage from "./DatePicker";
import ReminderDeleteModal from "./ReminderDelete";
import ReminderUpdateModal from "./ReminderUpdate";

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

  const handleCancel = (e) => {
    e.preventDefault();
    setShowModal(false)
  };

  return (
    <>
      <button
        className="note-function-button"
        id='rem-det-button'
        onClick={() => setShowModal(true)}
      >
        Details
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <div className="reminder-det-modal">
            <div className="title-div">
              {reminder.title}
            </div>

            <div className="note-title-div">
              On: <a
                className="note-title-div-2"
                href="/notes/noteId"
              >
                {noteList[reminder?.noteId]?.title}
              </a>
            </div>

            <div className="date-div">
              {new Date(reminder?.time).getMonth() + 1}/{new Date(reminder?.time).getDate()}/{new Date(reminder?.time).getFullYear()}
              <div className="at-sign">
                @
              </div>
              <div className="time-div">
                {new Date(reminder?.time).getHours()}:{new Date(reminder?.time).getMinutes()}
              </div>
            </div>


            <div className="rem-det-buttons-div">
              <ReminderUpdateModal
                reminder={reminder}
              />
              <ReminderDeleteModal
                reminder={reminder}
              />
              <button
                className="note-function-button"
                id="cancel-rem-button"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </div>

        </Modal>
      )
      }
    </>
  )
}

export default ReminderDetails;
