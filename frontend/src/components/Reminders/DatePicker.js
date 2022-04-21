import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Route, useParams } from "react-router-dom";
import DatePicker from "react-datepicker";

import { listReminders, updateReminder } from "../../store/reminders";

import './DatePicker.css'
import "react-datepicker/dist/react-datepicker.css";

const DatePickerPage = ({ closeForm }) => {
  const reminders = useSelector(state => state.reminders)
  const session = useSelector(state => state.session)
  const dispatch = useDispatch()

  const [startDate, setStartDate] = useState(new Date())

  const userId = session.user.id;
  const reminderArr = Object.values(reminders);

  // useEffect(() => {
  //   if (session.user) {
  //     dispatch(listReminders(userId))
  //   }
  // }, [])

  const submitReminder = () => {
    // if (!showMenu) return;
    closeForm()
  };

  return (
    <div className="datepicker-div">
      <DatePicker
        className="datePicker"
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        showTimeSelect
        dateFormat="Pp"
      />

      <button
        className="submit-reminder-button"
        onClick={submitReminder}>
        Create Reminder
      </button>

    </div >
  )
}

export default DatePickerPage;
