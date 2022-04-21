import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Route, useParams } from "react-router-dom";

import { listNotes } from "../../store/notes";

import './Reminders.css'

const RemindersPage = () => {
  const notes = useSelector(state => state.notes)
  const session = useSelector(state => state.session)
  const dispatch = useDispatch()

  const [showForm, setShowForm] = useState(false);

  const userId = session.user.id;
  let { noteId } = useParams();
  const notesArr = Object.values(notes);

  useEffect(() => {
    if (session.user) {
      dispatch(listNotes(userId))
    }
  }, [])

  return (
    <main>
      <nav
        className="noteList">
        {notesArr?.map((note) => {
          return (
            <NavLink
              key={note?.id}
              to={`/notes/${note?.id}`}
              onClick={() => setShowForm(false)}
            >
              <div
                className={
                  Number.parseInt(noteId) === note?.id
                    ? "note selected"
                    : "note"
                }
              >
                <div className="primary-text">{note?.title}</div>
                <div className="secondary-text">
                  {new Date(note?.createdAt).getMonth() + 1}/{new Date(note?.createdAt).getDate()}/{new Date(note?.createdAt).getFullYear()}
                </div>
              </div>
            </NavLink>
          )
        }
        )}
      </nav>

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
    </main>
  )
}

export default RemindersPage;
