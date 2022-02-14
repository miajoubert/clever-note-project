import React, { useEffect, useState } from "react";
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

  const [title, setTitle] = useState(note?.title)
  const [content, setContent] = useState(note?.content)
  const [notebookId, setNotebookId] = useState(notebooks[note?.notebookId])
  const [errors, setErrors] = useState([]);

  const userId = session.user.id;

  useEffect(() => {
    if (userId) {
      dispatch(listNotebooks(userId))
    }
  }, [userId])


  function handleSubmit(e) {
    e.preventDefault();

    const payload = {
      ...note,
      title,
      notebookId,
      content
    };

    setErrors([]);
    const updatedNote = dispatch(updateNote(payload))
    history.push(`/notes/${updatedNote?.id}`)
    hideModal()

  }


  const handleCancel = (e) => {
    e.preventDefault();
    hideModal()
  };

  return (
    <>
      <div className="noteFormDiv">
        <div>Revise:</div>
        <ul className="errorsAuthSignup">
          {errors.map((error, i) => (
            <li
              className="errorLi"
              key={i}
            >
              {error}
            </li>))}
        </ul>
        <form className="noteForm">
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
          <div className="buttonsForm">
            <button
              className="formButton"
              type="submit"
              onClick={handleSubmit}
            >
              Edit Note
            </button>
            <button
              className="formButton"
              type="button"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      </div >
    </>
  )
}

export default NoteEditForm
