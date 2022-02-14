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
      <div className="noteFormDiv">
        <div>Take Note...</div>
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
          <label className="formTitle">
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
          <div className="buttonsForm">
            <button className="formButton" type="submit" onClick={handleSubmit}>Create Note</button>
            <button className="formButton" type="button" onClick={handleCancel}>Cancel</button>
          </div>
        </form>
      </div>
    </>
  )
}

export default NoteForm;
