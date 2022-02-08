import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";

import * as sessionActions from "../../store/session";
import notesReducer, { listNotes, addNote, updateNote, deleteNote } from "../../store/notes";

import './Notes.css'

const NotesPage = () => {
  const dispatch = useDispatch();
  const notes = useSelector((state) => state.notes)
  const userId = useSelector((state) => state.session.user.id);

  const [showForm, setShowForm] = useState(false);
  const [editNoteId, setEditNoteId] = useState(null);

  const Fab = props => {
    return (
      <div className={props.hidden ? 'fab is-hidden' : 'fab'} onClick={props.onClick}>
        <span aria-label="add" role="img" className="fab-symbol">➕</span>
      </div>
    );
  };

  const payload = {
    ...notes,
    title: "TESTING TITLE",
    notebookId: "1",
    content: "TESTING CONTENT",
  }

  useEffect(() => {
    dispatch(listNotes(userId));
    dispatch(addNote(payload, userId))
    dispatch(updateNote(payload))
    // dispatch(deleteNote(note.id))
  })

  return notes.map((note) => (
    <>
      <tr key={note.id}>
        <td>
          <img
            className="note-img"
            src={"https://www.pngitem.com/pimgs/m/8-82343_clip-art-notepad-background-transparent-background-sticky-note.png"}
          />
        </td>
        <td>{note.title}</td>
        <td className="centered">{note.content}</td>
        <td className="centered">{note.updatedAt}</td>
      </tr>
    </>
  ))
}

export default NotesPage;
