import React, { useEffect, useState, Route } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useParams } from "react-router-dom";

import * as sessionActions from "../../store/session";
import FloatingButton from "../FloatingButton";
import { listNotes, noteDetails, editNote, deleteNote } from "../../store/notes";

import './Notes.css'

const NoteDetail = ({ showDetails }) => {
  const { noteId } = useParams();

  const notes = useSelector(state => state.notes)
  const session = useSelector(state => state.session);
  const dispatch = useDispatch();

  let note = notes[noteId]

  useEffect(() => {
    dispatch(listNotes(notes))
  }, [dispatch])

  async function deleteNoteFunc() {
    await dispatch(deleteNote(noteId))
    await (showDetails())
  }

  const userId = session.user.id;

  if (!note) {
    return (
      <div
        className="noteDetailBackground"
        hidden={noteDetails}
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
        hidden={noteDetails}>
        <div className="title">{note?.title}</div>
        <div className="content">{note?.content}</div>
        <div className="bottomNoteDetails">
          <button
            className="editButton"
          >
            Edit Note
          </button>
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
    </>
  )
}

export default NoteDetail;
