import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Route, useParams } from "react-router-dom";

import { listReminders } from "../../store/reminders";

import './Reminders.css'

const RemindersPage = () => {
  const reminders = useSelector(state => state.reminders)
  const session = useSelector(state => state.session)
  const dispatch = useDispatch()

  const [showForm, setShowForm] = useState(false);

  const userId = session.user.id;
  let { reminderId } = useParams();
  const reminderArr = Object.values(reminders);

  useEffect(() => {
    if (session.user) {
      dispatch(listReminders(userId))
    }
  }, [])

  // reminderArr = ["nothing here"]

  return (
    <main>
      <nav
        className="noteList">
        {/* {reminderArr?.map((reminder) => {
          return (
            <NavLink
              key={reminder?.id}
              to={`/notes/${reminder?.id}`}
              onClick={() => setShowForm(false)}
            >
              <div
                className={
                  Number.parseInt(reminderId) === reminder?.id
                    ? "reminder selected"
                    : "reminder"
                }
              >
                <div className="primary-text">{reminder?.title}</div>
                <div className="secondary-text">
                  {new Date(reminder?.createdAt).getMonth() + 1}/{new Date(reminder?.createdAt).getDate()}/{new Date(reminder?.createdAt).getFullYear()}
                </div>
              </div>
            </NavLink>
          )
        }
        )} */}
      </nav>

      <div className="under-construction">
        <div className="construction1"><b>REMINDERS</b> are currently under construction!</div>
        <div className="tools">
          <span className="fas fa-wrench"></span>
          <div className="construction2">Please check back later.</div>
          <span className="fas fa-screwdriver"></span>
        </div>
      </div>

      {/* <NoteFloatingButton
        hidden={showForm}
        onClick={() => setShowForm(true)}
      /> */}

      {
        // showForm ? (
        //   <NoteForm
        //     hidden={!showForm}
        //     hideForm={() => setShowForm(false)} />
        // ) :
        //  (
        //   <>
        //     <Route path="/notes/:noteId">
        //       <NoteDetail
        //         hidden={!showForm}
        //         setShowForm={() => setShowForm(false)}
        //       />
        //     </Route>
        //   </>
        // )
      }
    </main >
  )
}

export default RemindersPage;
