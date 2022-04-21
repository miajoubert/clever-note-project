import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { updateNote } from "../../store/notes";
import { listNotebooks } from "../../store/notebooks";

import './NoteForm.css'
import { useHistory } from "react-router-dom";

const NoteEditForm = ({ note, hideModal, onClose }) => {
  const session = useSelector(state => state.session)
  const notebookList = useSelector(state => state.notebooks)
  const notebooks = Object.values(notebookList)

  const dispatch = useDispatch()
  const history = useHistory();

  const [title, setTitle] = useState(note?.title)
  const [content, setContent] = useState(note?.content)
  const [notebookId, setNotebookId] = useState(notebookList[note?.notebookId]?.id)
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
      ...note,
      title,
      notebookId,
      content
    };

    setErrors([]);
    let updatedNote = await dispatch(updateNote(payload))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      })
    if (updatedNote) {
      history.push(`/notes/${updatedNote?.id}`)
      hideModal()
      onClose()
    }
  }


  const handleCancel = (e) => {
    e.preventDefault();
    hideModal()
    onClose()
  };

  return (
    <>
      <div className="noteFormDiv">
        <div className="form-title">Revise your note:</div>
        <ul className="errorsAuth">
          {errors.map((error, i) => (
            <li
              className="errorLi"
              key={i}
            >
              {error}
            </li>))}
        </ul>
        <form className="noteForm">
          <label
            className="form-label"
          >
            Title
            <input
              className="note-form-input"
              type="text"
              placeholder="Title..."
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)} />
          </label>
          <label
            className="form-label"
          >
            Content
            <textarea
              className="note-form-text"
              type="text"
              placeholder="Content..."
              required
              value={content}
              onChange={(e) => setContent(e.target.value)} />
          </label>
          <label
            className="form-label"
          >
            Notebook
            <select
              className="note-form-select"
              value={notebookId}
              onChange={(e) => setNotebookId(e.target.value)}
              default={notebookList[note.notebookId].title}
            >
              {notebooks?.map(notebook => (
                <option key={notebook?.id}
                  value={notebook?.id}
                >
                  {notebook?.title}
                </option>
              ))}
            </select>
          </label>
          <div className="form-buttons-div">
            <button
              className="form-button"
              type="submit"
              onClick={handleSubmit}
            >
              Edit Note
            </button>
            <button
              className="form-button"
              id="cancel-button"
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
