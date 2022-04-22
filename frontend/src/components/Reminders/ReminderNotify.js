import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { listReminders } from "../../store/reminders";
import { listNotes } from "../../store/notes";
import ReminderDetails from "./ReminderDetails";
import ReminderCreateModal from "./ReminderCreate";

import './ReminderNotify.css'

const RemindersNotify = () => {
  const reminders = useSelector(state => state.reminders)
  const session = useSelector(state => state.session)
  const dispatch = useDispatch()

  const userId = session.user.id;
  const reminderArr = Object.values(reminders);
  reminderArr.sort(function (a, b) {
    return new Date(a.time).getTime() - new Date(b.time).getTime()
  })

  useEffect(() => {
    if (userId) {
      dispatch(listReminders(userId))
      dispatch(listNotes(userId))
    }
  }, [dispatch, userId])

  console.log("THIS IS MY SESSION INFO", session)

  return (
    <div className="reminder-notification-div">
      <nav
        className="reminderList">
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
              >
              </ReminderDetails>
            </div>
          )
        }
        )}
      </nav>
    </div >
  )
}

export default RemindersNotify;
