import React, { useEffect, useState, Route } from "react";
import { useDispatch, useSelector } from "react-redux";

import * as sessionActions from "../../store/session";
import { updateNote } from "../../store/notes";
import { listNotebooks } from "../../store/notebooks";

import './NoteForm.css'
import { useHistory } from "react-router-dom";

const NoteEditForm = ({ note, hideModal, showDetails }) => {
  const session = useSelector(state => state.session)
  const notebookList = useSelector(state => state.notebooks)
  const notebooks = Object.values(notebookList)

  const dispatch = useDispatch()
  const history = useHistory();

  const [title, setTitle] = useState(note.title)
  const [content, setContent] = useState(note.content)
  const [notebookId, setNotebookId] = useState(notebooks[note.notebookId])

  const userId = session.user.id;

  useEffect(() => {
    if (userId) {
      dispatch(listNotebooks(userId))
    }
  }, [userId])


  async function handleSubmit(e) {
    e.preventDefault();

    const payload = {
      ...note,
      title,
      notebookId,
      content
    };

    const updatedNote = await dispatch(updateNote(payload))
    history.push(`/notes/${updatedNote?.id}`)
    hideModal()
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
          <textarea
            type="text"
            placeholder="Content..."
            required
            value={content}
            onChange={(e) => setContent(e.target.value)} />
        </label>
        <label>
          Notebook
          <select
            value={notebookId.id}
            onChange={(e) => setNotebookId(e.target.value)}
          >
            {notebooks.map(notebook =>
              <option key={notebook.id}
                value={notebook.id}
              >
                {notebook.title}
              </option>)}
          </select>
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
