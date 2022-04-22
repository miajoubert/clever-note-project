import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from "react-router-dom";
import DatePicker from "react-datepicker";

import { Modal } from '../../context/Modal';
import { updateReminder } from '../../store/reminders';
import { listNotes } from '../../store/notes';

import './ReminderModals.css';
import './DatePicker.css';
import "react-datepicker/dist/react-datepicker.css";

function ReminderUpdateModal({ reminder }) {
  const session = useSelector(state => state.session);
  const noteList = useSelector(state => state.notes);
  const notes = Object.values(noteList);

  const dispatch = useDispatch();
  const history = useHistory();

  let now = new Date()
  let oneHour = new Date()
  oneHour.setTime(now.getTime() + 3600000)

  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState(reminder?.title);
  const [noteId, setNoteId] = useState(noteList[reminder?.noteId]?.id)
  const [time, setTime] = useState(new Date(oneHour))
  const [errors, setErrors] = useState([]);

  const userId = session.user.id;

  useEffect(() => {
    if (userId) {
      dispatch(listNotes(userId))
    }
  }, [dispatch, userId])

  async function handleSubmit(e) {
    e.preventDefault();
    setErrors([]);

    const payload = {
      ...reminder,
      title,
      noteId,
      time
    };

    if (time.getTime() - new Date().getTime() < 0) {
      setErrors(['Please choose a future time.'])
      return errors

    } else {
      let updatedReminder = await dispatch(updateReminder(payload))
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        })
      if (updatedReminder) {
        setShowModal(false)
      }
    }
  }

  const handleCancel = (e) => {
    e.preventDefault();
    setErrors([])
    setTitle(reminder?.title)
    setTime(new Date(oneHour))
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
        <Modal onClose={handleCancel}>
          <div className="noteFormDiv">
            <div className="form-title">Revise your reminder:</div>
            <ul className="errorsAuth"
              id="reminder-errors"
            >
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
                <div>
                  <DatePicker
                    className="datePicker"
                    selected={time}
                    onChange={(date) => setTime(date)}
                    showTimeSelect
                    dateFormat="Pp"
                  />
                </div>
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
