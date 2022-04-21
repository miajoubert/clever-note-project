import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Route, useParams } from "react-router-dom";

import { listReminders, updateReminder } from "../../store/reminders";
import { listNotes } from "../../store/notes";
import ReminderDetails from "./ReminderDetails";
import DatePickerPage from "./DatePicker";

import './Reminders.css'
import './Construction.css'

const RemindersPage = () => {
  const reminders = useSelector(state => state.reminders)
  const noteList = useSelector(state => state.notes)
  const session = useSelector(state => state.session)
  const dispatch = useDispatch()

  const [startDate, setStartDate] = useState(new Date())

  const userId = session.user.id;
  let { reminderId } = useParams();
  const reminderArr = Object.values(reminders);

  useEffect(() => {
    if (session.user) {
      dispatch(listReminders(userId))
      dispatch(listNotes(userId))
    }
  }, [dispatch])

  console.log("reminders", reminders)
  console.log("notessssssss", noteList)

  // const handleDateChange = () => {
  //   if (!showMenu) return;
  //   setShowMenu(false);
  // };

  return (
    <main className="main-reminder-div">
      {/* <div className="under-construction">
        <div className="construction1"><b>REMINDERS</b> are currently under construction!</div>
        <div className="tools">
          <span className="fas fa-wrench"></span>
          <div className="construction2">Please check back later.</div>
          <span className="fas fa-screwdriver"></span>
        </div>
      </div> */}

      <DatePickerPage />

      <nav
        className="reminderList">
        {reminderArr?.map((reminder) => {
          return (
            <div className="reminder">
              <div className="prim-text">{reminder?.title}</div>

              <ReminderDetails
                reminder={reminder}
              >
              </ReminderDetails>
            </div>
          )
        }
        )}
      </nav>
    </main >
  )
}

export default RemindersPage;
