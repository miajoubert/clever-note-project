import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import NoteEditModal from "./NoteEditModal";
import NoteDeleteModal from "./NoteDeleteModal";
import NoteReminders from "./NoteReminders";
import { listNotes } from "../../store/notes";
import { listNotebooks } from "../../store/notebooks";

import './NoteDetail.css'

const NoteDetail = ({ note }) => {
  const session = useSelector(state => state.session);
  const notes = useSelector(state => state.notes)
  const notebooks = useSelector(state => state.notebooks)

  const { noteId } = useParams();
  const dispatch = useDispatch();

  const userId = session.user.id

  const [hideNoteDetails, setHideNoteDetails] = useState(false)
  const [showMenu, setShowMenu] = useState(false);

  useEffect(async () => {
    await dispatch(listNotes(userId))
    await dispatch(listNotebooks(userId))
  }, [dispatch])

  const onClose = () => {
    if (!showMenu) return;
    setShowMenu(false);
  };

  if (!note) note = notes[noteId]
  let notebook = notebooks[note?.notebookId]

  if (note) {
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
              <a
                className="nb-title-div"
                href={`/notebooks/${notebook?.id}`}
              >
                <div >
                  <span className="fas fa-book-open" />
                  <b>{notebook?.title}</b>
                </div>
              </a>

              <div className="note-reminder-div">
                <NoteReminders
                  note={note}
                />
              </div>

              <div className="note-timestamp">
                <div className="updated-at-text">
                  <span className="fas fa-history" />
                </div>
                <div className="note-date">
                  {new Date(note?.updatedAt).toDateString().split(" ")[1]} {new Date(note?.updatedAt).toDateString().split(" ")[2]}, {new Date(note?.updatedAt).toDateString().split(" ")[3]}
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
  } else {
    return (
      <div className="select-note-message">
        <span className="fas fa-map-pin"></span>
        <div className="select-note-text">Select a note or add one!</div>
        <div className="select-button-div"> Click on
          <span
            className="fas fa-plus"
            id="add-note-note"
          ></span>
          to begin.
        </div>
      </div>
    )
  }
}

export default NoteDetail;
