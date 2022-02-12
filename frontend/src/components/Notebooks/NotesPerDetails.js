import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams, Route } from "react-router-dom";

import { listNotes, editNote, deleteNote } from "../../store/notes";

import { listNotebooks } from "../../store/notebooks";

const NotesPerDetail = ({ note }) => {
  const { notebookId } = useParams()

  const session = useSelector(state => state.session);
  const notes = useSelector(state => state.notes)
  const notebookList = useSelector(state => state.notebooks)
  const notebooks = Object.values(notebookList)

  const dispatch = useDispatch();
  const history = useHistory()

  const [hideNoteDetails, setHideNoteDetails] = useState(false)

  const userId = session.user.id
  let notebook = notebooks[notebookId]

  useEffect(() => {
    dispatch(listNotes(userId))
      .then(() => dispatch(listNotebooks(userId)))
  }, [userId])

  function goToFunc() {
    history.push(`/notes/${note.id}`)
  }

  async function deleteNoteFunc() {
    await dispatch(deleteNote(note?.id))
    history.push(`/notebooks/${notebookId}`)
  }

  return (
    <>
      <div
        className="noteDetailBackground"
        hidden={hideNoteDetails}>
        <div className="title">{note?.title}</div>
        <div className="content">{note?.content}</div>
        <div className="bottomNoteDetails">
          <button
            className="editButton"
            onClick={goToFunc}
          >
            Go to Note
          </button>
          <button
            className="deleteButton"
            onClick={deleteNoteFunc}
          >
            Delete Note
          </button>
          <div className="timestamp">
            <div><b>{notebook?.title}</b></div>
            <div>{new Date(note?.updatedAt).toDateString()} {new Date(note?.updatedAt).getHours()}:{new Date(note?.updatedAt).getMinutes()}</div>
          </div>
        </div>
      </div>
    </>
  )
}

export default NotesPerDetail;
