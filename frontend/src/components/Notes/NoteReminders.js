import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Modal } from "../../context/Modal";
import { listReminders } from "../../store/reminders";
import { listNotes } from "../../store/notes";
import ReminderDetails from "../Reminders/ReminderDetails";
import ReminderCreateModal from "../Reminders/ReminderCreate";

import '../Reminders/Reminders.css'
import './NoteReminders.css'

const NoteReminders = () => {
  const reminders = useSelector(state => state.reminders);
  const session = useSelector(state => state.session);
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);

  const userId = session.user.id;
  const reminderArr = Object.values(reminders);

  useEffect(() => {
    if (userId) {
      dispatch(listReminders(userId))
      dispatch(listNotes(userId))
    }
  }, [dispatch]);

  const handleCancel = (e) => {
    e.preventDefault();
    // setErrors([])
    // setTitle("")
    // setTime(new Date(oneHour))
    setShowModal(false)
  };

  return (
    <>
      <div
        className="reminder-modal-div"
        onClick={() => setShowModal(true)}
      >
        <span className="fas fa-clock" />
        <b>Reminders</b>
      </div>

      {showModal && (
        <Modal onClose={handleCancel}>
          <div >
            <ReminderCreateModal />

            <button
              className="exit-button"
              type="button"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>

          <nav
            className="reminders-on-noteDetails"
          >
            {reminderArr?.map((reminder) => {
              return (
                <div className={
                  +new Date(reminder?.time).getTime() < +new Date().getTime() ?
                    "reminder overdue-reminder" :
                    "reminder"}
                >
                  <div className="reminder-text">
                    <div className="reminder-date">
                      <div className="reminder-time">
                        {new Date(reminder?.time).getHours() < 13
                          ?
                          new Date(reminder?.time).getHours()
                          :
                          (new Date(reminder?.time).getHours() - 12)}
                        :{new Date(reminder?.time).getMinutes() < 10
                          ?
                          `0${(new Date(reminder?.time).getMinutes())}`
                          :
                          new Date(reminder?.time).getMinutes()}
                        {new Date(reminder?.time).getHours() > 12
                          ? "PM" : "AM"}
                      </div>
                      <div className="on-sign">
                        on
                      </div>
                      {new Date(reminder?.time).toDateString().split(" ")[1]} {new Date(reminder?.time).toDateString().split(" ")[2]}
                    </div>
                    <div className="reminder-title">{reminder?.title}</div>
                  </div>

                  <ReminderDetails
                    reminder={reminder}
                  />

                </div>
              )
            })}
          </nav>
        </Modal>
      )}
    </>
  )
}

export default NoteReminders;
