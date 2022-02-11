import React, { useEffect, useState, Route } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams, useHistory, Redirect } from "react-router-dom";

import * as sessionActions from "../../store/session";
import { addNote, listNotes, noteDetails, updateNote } from "../../store/notes";

import './NoteForm.css'

const NoteForm = ({ hideForm }) => {
  const notes = useSelector(state => state.notes)
  const notebooksList = useSelector(state => state.notebooks)
  console.log("MY NOTES", notebooksList)
  // const notebooksList = {
  //   1: {
  //     id: 1,
  //     title: "My Notebook",
  //     userId: 1,
  //   },
  //   2: {
  //     id: 2,
  //     title: "New Notebook",
  //     userId: 1,
  //   }
  // }
  const notebooks = Object.values(notebooksList)

  const session = useSelector(state => state.session)
  const dispatch = useDispatch()
  const history = useHistory();

  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [notebookId, setNotebookId] = useState(notebooks[0])

  const userId = session.user.id;

  async function handleSubmit(e) {
    e.preventDefault();

    const payload = {
      userId,
      title,
      notebookId,
      content
    };

    console.log(payload)

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
                value={notebook.id}
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

export default NoteForm;
