import React, { useEffect, useState, Route } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import NoteEditModal from "./NoteEditModal";
import * as sessionActions from "../../store/session";

import FloatingButton from "../FloatingButton";
import NoteEditForm from "./NoteEditModal";
import { listNotes, noteDetails, editNote, deleteNote } from "../../store/notes";

import './Notes.css'

const NoteDetail = () => {
  const { noteId } = useParams();

  const notes = useSelector(state => state.notes)
  const session = useSelector(state => state.session);
  const dispatch = useDispatch();
  const history = useHistory()

  const [hideNoteDetails, setHideNoteDetails] = useState(false)

  let note = notes[noteId]

  useEffect(() => {
    dispatch(listNotes(notes))
  }, [dispatch])

  async function deleteNoteFunc() {
    await dispatch(deleteNote(noteId))
    history.push("/notes")
  }

  const userId = session.user.id;

  if (!note) {
    return (
      <div
        className="noteDetailBackground"
        hidden={hideNoteDetails}
      >
        <div className="title" style={{ color: "red" }}>Note not found!</div>
        <div className="content" style={{ color: "red" }}>
          <b>
            This note has been deleted. Please select another note...
          </b>
        </div>
      </div >
    )
  } else return (
    <>
      <div
        className="noteDetailBackground"
        hidden={hideNoteDetails}>
        <div className="title">{note?.title}</div>
        <div className="content">{note?.content}</div>
        <div className="bottomNoteDetails">
          <NoteEditModal
            note={note}
          />
          <button
            className="deleteButton"
            onClick={deleteNoteFunc}
          >
            Delete Note
          </button>
          <div className="timestamp">
            {new Date(note?.updatedAt).toDateString()} {new Date(note?.updatedAt).getHours()}:{new Date(note?.updatedAt).getMinutes()}
          </div>
        </div>
      </div>
      {/* )
      } */}
    </>
  )
}

export default NoteDetail;
