import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { listNotebooks } from "../../store/notebooks";

import { addNote, listNotes, noteDetails, updateNote } from "../../store/notes";

import './NotesPerForm.css'

const NotesPerNotebookNewForm = ({ hideForm, currNotebookId }) => {
  const notes = useSelector(state => state.notes)
  const notebookList = useSelector(state => state.notebooks)
  const notebooks = Object.values(notebookList)
  console.log(notebooks)

  const session = useSelector(state => state.session)
  const dispatch = useDispatch()
  const history = useHistory();

  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [notebookId, setNotebookId] = useState(notebooks[+currNotebookId])

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

    let newNote = await dispatch(addNote(payload));
    hideForm();
    history.push(`/notes/${newNote.id}`);
  };

  const handleCancel = (e) => {
    e.preventDefault();
    hideForm()
  };

  return (
    <>
      <div>Take Note...</div>
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
            value={notebookId}
            onChange={(e) => setNotebookId(e.target.value)}
          >
            {notebooks.map(notebook =>
              <option key={notebook.id}
                value={notebookId.id}
              >
                {notebook.title}
              </option>)}
          </select>
        </label>
        <button type="submit" onClick={handleSubmit}>Create Note</button>
        <button type="button" onClick={handleCancel}>Cancel</button>
      </form>
    </>
  )
}

export default NotesPerNotebookNewForm;
