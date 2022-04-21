import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Route, useParams } from "react-router-dom";

import { listReminders, updateReminder } from "../../store/reminders";
import { listNotes } from "../../store/notes";
import ReminderFloatingButton from "./ReminderFAB";
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
  const [showForm, setShowForm] = useState(false);

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

      <ReminderFloatingButton
        hidden={showForm}
        onClick={() => setShowForm(true)}
      />

      <nav
        className="reminderList">
        {reminderArr?.map((reminder) => {
          return (
            <NavLink
              key={reminder?.id}
              to={`/reminders/${reminder?.id}`}
              onClick={() => setShowForm(false)}
            >
              <div
                className={
                  Number.parseInt(reminderId) === reminder?.id
                    ? "reminder rem-selected"
                    : "reminder"
                }
              >
                <div className="primary-text">{reminder?.title}</div>
                <div className="secondary-text">
                  {new Date(reminder?.time).getMonth() + 1}/{new Date(reminder?.time).getDate()}/{new Date(reminder?.time).getFullYear()}
                  --
                  {new Date(reminder?.time).getHours()}:{new Date(reminder?.time).getMinutes()}
                </div>
                <div className="secondary-text">
                  {noteList[reminder?.noteId]?.title}
                </div>
              </div>
            </NavLink>
          )
        }
        )}
      </nav>


      {
        showForm ? (
          <DatePickerPage
            hidden={!showForm}
            closeForm={() => setShowForm(false)} />
          // className="datePicker"
          // selected={startDate}
          // onChange={(date) => setStartDate(date)}
          // showTimeSelect
          // dateFormat="Pp"
        ) :
          (
            <>
              SOMETHING HERE THAT'S NOT THE FORM
            </>
          )
      }

    </main >
  )
}

export default RemindersPage;
