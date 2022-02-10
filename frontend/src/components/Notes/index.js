import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, NavLink, Route, useParams } from "react-router-dom";

import * as sessionActions from "../../store/session";
import FloatingButton from "../FloatingButton";
import NoteDetail from "./NoteDetail";
import NoteForm from "./NoteForm";
import { listNotes, addNote, updateNote, deleteNote, noteDetails } from "../../store/notes";


import './Notes.css'

const NotesPage = () => {
  const notes = useSelector(state => state.notes)
  const session = useSelector(state => state.session)
  const dispatch = useDispatch()

  const [isLoaded, setIsLoaded] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const userId = session.user.id;
  const { noteId } = useParams();
  const notesArr = Object.values(notes);

  useEffect(() => {
    dispatch(listNotes(userId))
      .then(() => setIsLoaded(true));
    dispatch(noteDetails(noteId))
  }, [])

  return (
    <main>
      <nav className="noteList">
        {notesArr.map((note) => {
          return (
            <NavLink
              key={note.id}
              to={`/notes/${note.id}`}
              onClick={() => setShowForm(false)}
            >
              <div
                className={
                  Number.parseInt(noteId) === note.id
                    ? "note selected"
                    : "note"
                }
              >
                <div className="primary-text">{note.title}</div>
                <div className="secondary-text">
                  {new Date(note.updatedAt).getMonth() + 1}/{new Date(note.updatedAt).getDate()}/{new Date(note.updatedAt).getFullYear()}
                </div>
              </div>
            </NavLink>
          )
        }
        )}
      </nav>

      <NavLink
        to="/notes/new">
        <FloatingButton hidden={showForm} onClick={() => setShowForm(true)} />
      </NavLink>


      {
        showForm ? (
          <NoteForm hidden={!showForm} hideForm={() => setShowForm(false)} />
        ) : (
          <>
            <Route path="/notes/:noteId">
              <NoteDetail showDetails={() => setShowForm(true)} />
            </Route>
          </>
        )
      }
    </main>
  )
}

export default NotesPage;
