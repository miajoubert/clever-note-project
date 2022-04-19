import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import FloatingButton from "../FloatingButton";
import NoteEditModal from "./NoteEditModal";
import { listNotes, editNote, deleteNote } from "../../store/notes";

import './Notes.css'
import { listNotebooks } from "../../store/notebooks";

const NoteDetail = () => {
  const { noteId } = useParams();

  const session = useSelector(state => state.session);
  const notes = useSelector(state => state.notes)
  const notebookList = useSelector(state => state.notebooks)
  const notebooks = Object.values(notebookList)

  const dispatch = useDispatch();
  const history = useHistory()

  const [hideNoteDetails, setHideNoteDetails] = useState(false)

  const userId = session.user.id
  let note = notes[noteId]
  let notebook = notebooks[note?.notebookId]

  useEffect(() => {
    dispatch(listNotes(userId))
      .then(() => dispatch(listNotebooks(userId)))
  }, [userId])

  async function deleteNoteFunc() {
    await dispatch(deleteNote(noteId))
    history.push("/notes")
  }

  return (
    <>
      <div
        className="noteDetailBackground"
        hidden={hideNoteDetails}>
        <div className="note-title">{note?.title}</div>
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
            {/* <div><b>{notebook?.title}</b></div> */}
            <div>{new Date(note?.updatedAt).toDateString()} {new Date(note?.updatedAt).getHours()}:{new Date(note?.updatedAt).getMinutes()}</div>
          </div>
        </div>
      </div>
    </>
  )
}

export default NoteDetail;
