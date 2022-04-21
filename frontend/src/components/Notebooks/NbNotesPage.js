import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import NoteFloatingButton from "../Notes/NoteFAB";
import NoteDetail from "../Notes/NoteDetail";
import NoteForm from "../Notes/NoteForm";
import { listNotes } from "../../store/notes";

import './NbNotesPage.css'

const NbNotesPage = ({ notebookId }) => {
  const notes = useSelector(state => state.notes)
  const session = useSelector(state => state.session)
  const dispatch = useDispatch()

  const [showForm, setShowForm] = useState(false);
  const [noteDetail, setNoteDetail] = useState()

  const userId = session.user.id;

  const notesArr = Object.values(notes);
  const selectNotes = notesArr.filter((note) => {
    return (note.notebookId === +notebookId)
  })

  useEffect(() => {
    if (session.user) {
      dispatch(listNotes(userId))
    }
  }, [])

  return (
    <div className="nb-note-div">
      <nav
        className={selectNotes.length < 2 ? "nb-noteList-short" : "nb-noteList"}
      >
        {selectNotes?.map((note) => {
          return (
            <div
              key={note?.id}
              onClick={() => setNoteDetail(note)}
            >
              <div
                className={
                  Number.parseInt(noteDetail?.id) === note?.id
                    ? "note selected"
                    : "note"
                }
              >
                <div className="primary-text"> {note?.title}</div>
                <div className="secondary-text">
                  {new Date(note?.createdAt).getMonth() + 1}/{new Date(note?.createdAt).getDate()}/{new Date(note?.createdAt).getFullYear()}
                </div>
              </div>
            </div>
          )
        }
        )}
      </nav>

      <NoteFloatingButton
        hidden={showForm}
        onClick={() => setShowForm(true)}
      />

      {
        showForm ? (
          <NoteForm
            hidden={!showForm}
            hideForm={() => setShowForm(false)} />
        ) : (
          <>
            <NoteDetail
              hidden={!showForm}
              setShowForm={() => setShowForm(false)}
              note={noteDetail}
            />
          </>
        )
      }
    </div>
  )
}

export default NbNotesPage;
