import React, { useEffect, useState, Route } from "react";
import { useDispatch, useSelector } from "react-redux";

import * as sessionActions from "../../store/session";
import { addNote, listNotes, noteDetails, updateNote } from "../../store/notes";

import './Notes.css'

const NoteEditForm = ({ note, hideModal, showDetails }) => {
  const session = useSelector(state => state.session)
  const notes = useSelector(state => state.notes)
  const dispatch = useDispatch()

  const [title, setTitle] = useState(note.title)
  const [content, setContent] = useState(note.content)
  const [notebookId, setNotebookId] = useState(note.notebookId)

  const userId = session.user.id;

  async function handleSubmit(e) {
    e.preventDefault();

    const payload = {
      ...note,
      title,
      notebookId,
      content
    };

    const updatedNote = await dispatch(updateNote(payload))
    if (updatedNote) {
      hideModal()
      await dispatch(listNotes(notes))
    }
  }

  const handleCancel = (e) => {
    e.preventDefault();
    hideModal()
  };

  return (
    <>
      <div>Revise:</div>
      <form>
        <label>
          Title
          <input
            type="text"
            placeholder="Title..."
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)} />
        </label>
        <label>
          Content
          <input
            type="text"
            placeholder="Content..."
            required
            value={content}
            onChange={(e) => setContent(e.target.value)} />
        </label>
        <label>
          Select Notebook
          <input
            type="number"
            placeholder="NotebookId..."
            required
            value={notebookId}
            onChange={(e) => setNotebookId(e.target.value)} />
        </label>
        <button
          type="submit"
          onClick={handleSubmit}
        >
          Edit Note
        </button>
        <button
          type="button"
          onClick={handleCancel}
        >
          Cancel
        </button>
      </form>
    </>
    // )
  )
}

export default NoteEditForm
