import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import NoteEditModal from "./NoteEditModal";
import NoteDeleteModal from "./NoteDeleteModal";
import { listNotes, editNote, deleteNote } from "../../store/notes";

import './NoteDetail.css'
import { listNotebooks } from "../../store/notebooks";

const NoteDetail = () => {
  const session = useSelector(state => state.session);
  const notes = useSelector(state => state.notes)
  const notebookList = useSelector(state => state.notebooks)
  const notebooks = Object.values(notebookList)

  const { noteId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory()

  const userId = session.user.id
  let note = notes[noteId]
  let notebook = notebooks[note?.notebookId]

  const [hideNoteDetails, setHideNoteDetails] = useState(false)
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    dispatch(listNotes(userId))
      .then(() => dispatch(listNotebooks(userId)))
  }, [userId])

  const onClose = () => {
    if (!showMenu) return;
    setShowMenu(false);
  };

  return (
    <>
      <div
        className="noteDetailBackground"
        hidden={hideNoteDetails}>
        <div className="note-container">
          <div className="note-content">
            <div className="note-header">
              <div className="note-title">{note?.title}</div>
              <i className={!showMenu ? "fas fa-bars" : "fas fa-bars bars-open"}
                onClick={() => setShowMenu(!showMenu)}
              ></i>
              {showMenu && (
                <div className="note-buttons-dropdown">
                  <li>
                    <NoteEditModal
                      note={note}
                      onClose={onClose}
                    />
                  </li>
                  <li>
                    <NoteDeleteModal
                      note={note}
                    />
                  </li>
                </div>
              )}
            </div>
            <div className="content">{note?.content}</div>
          </div>

          <div className="bottomNoteDetails">
            <div><b>{notebook?.title}</b></div>
            <div className="note-timestamp">
              <div className="note-date">
                {new Date(note?.updatedAt).toDateString().split(" ")[1]} {new Date(note?.updatedAt).toDateString().split(" ")[2]}
              </div>
              <div className="note-time">
                {new Date(note?.updatedAt).getHours()}:{new Date(note?.updatedAt).getMinutes()}
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}

export default NoteDetail;
