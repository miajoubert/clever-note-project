import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Route, useParams } from "react-router-dom";

import FloatingButton from "../FloatingButton";
import NoteDetail from "../Notes/NoteDetail";
import NotesPerNotebookNewForm from "./NotesPerForm";
import { listNotes } from "../../store/notes";


import './NotesPerNotebook.css'

const NotesPerNotebook = ({ notebookId }) => {
  const notes = useSelector(state => state.notes)
  const session = useSelector(state => state.session)
  const dispatch = useDispatch()

  const [showForm, setShowForm] = useState(false);

  const userId = session.user.id;
  let { noteId } = useParams();
  const notesArr = Object.values(notes);
  const notesList = notesArr.filter((note) => {
    return (note.notebookId === +notebookId)
  })

  useEffect(() => {
    if (session.user) {
      dispatch(listNotes(userId))

    }
  }, [])

  return (
    <main className="mainNotesList">
      <nav
        className="noteList">
        {notesList?.map((note) => {
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
                  {new Date(note?.updatedAt).getMonth() + 1}/{new Date(note?.updatedAt).getDate()}/{new Date(note?.updatedAt).getFullYear()}
                </div>
              </div>
            </NavLink>
          )
        }
        )}
      </nav>

      <FloatingButton
        hidden={showForm}
        onClick={() => setShowForm(true)}
      />

      {
        showForm ? (
          <NotesPerNotebookNewForm
            hidden={!showForm}
            hideForm={() => setShowForm(false)}
            currNotebookId={notebookId} />
        ) : (
          <>
            <Route path="/notes/:noteId">
              <NoteDetail
                hidden={!showForm}
                setShowForm={() => setShowForm(false)}
              />
            </Route>
          </>
        )
      }
    </main>
  )
}

export default NotesPerNotebook;
