import React, { useEffect, useState, Route } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useParams } from "react-router-dom";

import * as sessionActions from "../../store/session";
import FloatingButton from "../FloatingButton";
import { listNotes, noteDetails, editNote, deleteNote } from "../../store/notes";

import './Notes.css'

const NoteDetail = () => {
  const { noteId } = useParams();

  const note = useSelector(state => state.notes[noteId]);
  const session = useSelector(state => state.session);
  const dispatch = useDispatch();

  useEffect((noteId) => {
    dispatch(noteDetails(noteId))
  }, [dispatch, noteId])

  async function deleteNoteFunc() {
    await dispatch(deleteNote(noteId))
    return <Redirect to="/notes" />
  }


  const userId = session.user.id;

  return (
    <>
      <div className="noteDetailBackground" >
        <div className="title">{note.title}</div>
        <div className="content">{note.content}</div>
        <div className="bottomNoteDetails">
          <button className="editButton">Edit Note</button>
          <button
            className="deleteButton"
            onClick={deleteNoteFunc}
          >
            Delete Note</button>
          <div className="timestamp">
            {new Date(note.updatedAt).toDateString()} {new Date(note.updatedAt).getHours()}:{new Date(note.updatedAt).getMinutes()}
          </div>
        </div>
      </div>

    </>
  )
}

export default NoteDetail;
