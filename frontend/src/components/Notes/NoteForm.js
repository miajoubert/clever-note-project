import React, { useEffect, useState, Route } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams, useHistory } from "react-router-dom";

import * as sessionActions from "../../store/session";
import { addNote, updateNote } from "../../store/notes";

import './Notes.css'

const NoteForm = ({ hideForm }) => {
  const notes = useSelector(state => state.notes)
  const session = useSelector(state => state.session)
  const dispatch = useDispatch()
  const history = useHistory();

  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [notebookId, setNotebookId] = useState(1)

  const userId = session.user.id;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      userId,
      title,
      notebookId,
      content
    };

    let newNote = dispatch(addNote(payload, userId));
    console.log("MY NEW NOTE!!!!!", newNote)
    if (newNote) {
      history.push(`/notes/${newNote.id}`);
      hideForm()
    }
  };

  const handleCancelClick = (e) => {
    e.preventDefault();
    hideForm()
  };

  return (
    <>
      <div>Take Note...</div>
      <div>
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
        <button type="submit" onClick={handleSubmit}>Create Note</button>
        <button type="button" onClick={handleCancelClick}>Cancel</button>
      </div>
      {/* <section className="newForm">
        <form className="noteForm" onSubmit={handleSubmit}>

        </form>
      </section> */}
    </>
  )
}

export default NoteForm;
