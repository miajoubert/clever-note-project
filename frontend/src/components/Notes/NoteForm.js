import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { listNotebooks } from "../../store/notebooks";

import { addNote, listNotes, noteDetails, updateNote } from "../../store/notes";

import './NoteForm.css'

const NoteForm = ({ hideForm }) => {
  const notebookList = useSelector(state => state.notebooks)
  const notebooks = Object.values(notebookList)

  const session = useSelector(state => state.session)
  const dispatch = useDispatch()
  const history = useHistory();

  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [notebookId, setNotebookId] = useState(notebooks[0]?.id)
  const [errors, setErrors] = useState([]);

  const userId = session.user.id;

  useEffect(() => {
    if (userId) {
      dispatch(listNotebooks(userId))
    }
  }, [userId])

  async function handleSubmit(e) {
    e.preventDefault();

    const payload = {
      userId,
      title,
      notebookId,
      content
    };

    setErrors([]);
    let newNote = await dispatch(addNote(payload))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      })

    if (newNote) {
      hideForm();
      history.push(`/notes/${newNote?.id}`);
    }
  }

  const handleCancel = (e) => {
    e.preventDefault();
    hideForm()
  };

  return (
    <>
      <div className="note-form-div">
        <div className="form-title-header">
          <div className="form-title">Take Note...</div>
          <ul className="errorsAuth" id="note-errors">
            {errors.map((error, i) => (
              <li
                className="errorLi"
                key={i}
              >
                {error}
              </li>))}
          </ul>
        </div>

        <form className="noteForm">
          <label className="form-label">
            Title
            <input
              className="note-form-input"
              id="create-form"
              type="text"
              placeholder="Title..."
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)} />
          </label>
          <label className="form-label">
            Content
            <textarea
              className="note-form-text"
              id="create-form"
              type="text"
              placeholder="Content..."
              required
              value={content}
              onChange={(e) => setContent(e.target.value)} />
          </label>
          <label className="form-label">
            Notebook
            <select
              className="note-form-select"
              id="create-form"
              value={notebookId}
              onChange={(e) => setNotebookId(e.target.value)}
            >
              {notebooks.map(notebook =>
                <option key={notebook?.id}
                  value={notebook?.id}
                >
                  {notebook?.title}
                </option>)}
            </select>
          </label>
          <div className="form-buttons-div" id="create-buttons">
            <button
              className="form-button create"
              type="submit"
              onClick={handleSubmit}
            >
              Create
            </button>
            <button
              className="form-button create"
              id="cancel-button"
              type="button"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default NoteForm;
