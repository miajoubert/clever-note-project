import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from "react-router-dom";

import { Modal } from '../../context/Modal';
import { listReminders, updateReminder } from '../../store/reminders';
import DatePickerPage from './DatePicker';

import './ReminderModals.css'

function ReminderUpdateModal({ reminder }) {
  const session = useSelector(state => state.session)
  const noteList = useSelector(state => state.notes)
  const notes = Object.values(noteList)

  const dispatch = useDispatch();
  const history = useHistory();
  const { reminderParamId } = useParams();

  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState(reminder?.title)
  const [noteId, setNoteId] = useState(noteList[reminder?.noteId]?.id)
  const [time, setTime] = useState(reminder?.time)
  const [errors, setErrors] = useState([]);

  let reminderId
  if (reminder) { reminderId = reminder?.id }
  else { reminderId = reminderParamId }

  const userId = session.user.id;

  useEffect(() => {
    if (userId) {
      dispatch(listReminders(userId))
    }
  }, [userId])

  async function handleSubmit(e) {
    e.preventDefault();

    const payload = {
      ...reminder,
      title,
      noteId,
      time
    };

    setErrors([]);
    let updatedReminder = await dispatch(updateReminder(payload))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      })
    if (updatedReminder) {
      history.push(`/reminders/${updatedReminder?.id}`)
      setShowModal(false)
    }
  }


  const handleCancel = (e) => {
    e.preventDefault();
    setShowModal(false)
  };

  return (
    <>
      <button
        className="note-function-button"
        id='rem-update-button'
        onClick={() => setShowModal(true)}
      >
        Update
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <div className="noteFormDiv">
            <div className="form-title">Revise your reminder:</div>
            <ul className="errorsAuth">
              {errors.map((error, i) => (
                <li
                  className="errorLi"
                  key={i}
                >
                  {error}
                </li>))}
            </ul>
            <form className="noteForm">
              <label
                className="form-label"
              >
                Title
                <input
                  className="note-form-input"
                  type="text"
                  placeholder="Title..."
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)} />
              </label>
              <label
                className="form-label"
              >
                Time
                <DatePickerPage />
              </label>
              <label
                className="form-label"
              >
                Note
                <select
                  className="note-form-select"
                  value={noteId}
                  onChange={(e) => setNoteId(e.target.value)}
                  default={noteList[reminder.noteId].title}
                >
                  {notes?.map(note => (
                    <option key={note?.id}
                      value={note?.id}
                    >
                      {note?.title}
                    </option>
                  ))}
                </select>
              </label>
              <div className="form-buttons-div">
                <button
                  className="form-button"
                  type="submit"
                  onClick={handleSubmit}
                >
                  Update
                </button>
                <button
                  className="form-button"
                  id="cancel-button"
                  type="button"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div >
        </Modal>
      )}
    </>
  )
}

export default ReminderUpdateModal;
