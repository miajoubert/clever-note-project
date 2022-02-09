import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Route, useParams } from "react-router-dom";

import * as sessionActions from "../../store/session";
import FloatingButton from "../FloatingButton";
import NoteDetail from "./NoteDetail";
import CreateNoteForm from "./NoteCreate";
import { listNotes, addNote, updateNote, deleteNote, noteDetails } from "../../store/notes";


import './Notes.css'

const NotesPage = () => {
  const { noteId } = useParams();
  const notes = useSelector(state => state.notes)
  const session = useSelector(state => state.session)
  const dispatch = useDispatch()

  const [showForm, setShowForm] = useState(false);

  const userId = session.user.id;
  const notesArr = Object.values(notes);


  useEffect(() => {
    dispatch(listNotes(userId))
  }, [])

  console.log("USE PARAMS!!!!!!!!!!!!!!!!!!", useParams())

  return (
    <main>
      <FloatingButton hidden={showForm} onClick={() => setShowForm(true)} />
      <nav>
        {notesArr.map((note) => {
          return (
            <NavLink key={note.id} to={`/notes/${note.id}`}>
              <div
                className={
                  Number.parseInt(noteId) === note.id
                    ? "noteSelected"
                    : "note"
                }
              >
                <div className="primary-text">{note.title}</div>
                <div className="secondary-text">
                  ({new Date(note.updatedAt).getMonth() + 1}/{new Date(note.updatedAt).getDate()}/{new Date(note.updatedAt).getFullYear()})
                </div>
                <div> --- </div>
              </div>
            </NavLink>
          )
        }
        )}
      </nav>

      {
        showForm ? (
          <CreateNoteForm hideForm={() => setShowForm(false)} />
        ) : (
          <Route path="/notes/:noteId">
            <NoteDetail />
          </Route>
        )
      }
    </main>
  )
}

export default NotesPage;
