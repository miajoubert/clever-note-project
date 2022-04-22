import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DatePicker from "react-datepicker";

import { Modal } from '../../context/Modal';
import { listReminders, addReminder } from '../../store/reminders';
import { listNotes } from '../../store/notes';
import ReminderFloatingButton from "./ReminderFAB";

import './ReminderModals.css'
import './DatePicker.css'
import "react-datepicker/dist/react-datepicker.css";

function ReminderCreateModal({ currNoteId }) {
  const session = useSelector(state => state.session)
  const noteList = useSelector(state => state.notes)
  const notes = Object.values(noteList)

  const dispatch = useDispatch();

  let now = new Date()
  let oneHour = new Date()
  oneHour.setTime(now.getTime() + 3600000)

  if (!currNoteId) {
    currNoteId = 1
  }


  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('')
  const [noteId, setNoteId] = useState(currNoteId)
  const [time, setTime] = useState(new Date(oneHour))
  const [errors, setErrors] = useState([]);

  const userId = session.user.id;

  useEffect(() => {
    if (userId) {
      dispatch(listReminders(userId))
      dispatch(listNotes(userId))
    }
  }, [dispatch, userId])

  useEffect(() => {
    setNoteId(currNoteId)
  }, [currNoteId])

  async function handleSubmit(e) {
    e.preventDefault();
    setErrors([]);

    const payload = {
      title,
      userId,
      noteId,
      time
    };

    if (time.getTime() - new Date().getTime() < 0) {
      setErrors(['Please choose a future time.'])
      return errors

    } else {
      let newReminder = await dispatch(addReminder(payload))
        .catch(async (res) => {
          const data = await res.json();

          if (data && data.errors) setErrors(data.errors);
        })

      if (newReminder) {
        setTitle("")
        setTime(new Date(oneHour))
        setShowModal(false)
      }
    }
  }


  const handleCancel = (e) => {
    e.preventDefault();
    setErrors([])
    setTitle("")
    setTime(new Date(oneHour))
    setShowModal(false)
  };

  console.log(noteList)
  console.log(noteId)
  console.log(noteList[+noteId])

  return (
    <>
      <ReminderFloatingButton
        onClick={() => setShowModal(true)}
      />

      {showModal && (
        <Modal onClose={handleCancel}>
          <div className="noteFormDiv">
            <div className="form-title">Remember:</div>
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
                  default={noteList[noteId]?.title}
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
                  Create
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

export default ReminderCreateModal;
