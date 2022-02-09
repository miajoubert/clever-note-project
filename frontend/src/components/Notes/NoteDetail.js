import React, { useEffect, useState, Route } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import * as sessionActions from "../../store/session";
import FloatingButton from "../FloatingButton";
import { listNotes, noteDetails, editNote, deleteNote } from "../../store/notes";

import './Notes.css'

const NoteDetail = () => {
  const { noteId } = useParams();

  const note = useSelector(state => state.notes[noteId]);
  const session = useSelector(state => state.session);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(noteDetails(noteId))
  }, [noteId])

  const userId = session.user.id;

  return (
    <>
      <div className="noteDetailBackground" >
        <div className="title">{note.title}</div>
        <div className="content">{note.content}</div>
        <div className="centered">
          {new Date(note.updatedAt).toDateString()} {new Date(note.updatedAt).getHours()}:{new Date(note.updatedAt).getMinutes()}
        </div>
      </div>
      <div>
        <button>Edit</button>
        <button onClick={() => dispatch(deleteNote(noteId))}>Delete</button>
      </div>
    </>
  )
}

export default NoteDetail;
