import React, { useEffect, useState, Route } from "react";
import { useDispatch, useSelector } from "react-redux";

import * as sessionActions from "../../store/session";
import { addNote, listNotes, noteDetails, updateNotebook } from "../../store/notebooks";

import './NotebookForm.css'
import { useHistory } from "react-router-dom";

const NotebookEditForm = ({ notebook, hideModal, showDetails }) => {
  const session = useSelector(state => state.session)
  const notebooks = useSelector(state => state.notebooks)
  const dispatch = useDispatch()
  const history = useHistory();

  const [title, setTitle] = useState(notebook.title)

  const userId = session.user.id;

  async function handleSubmit(e) {
    e.preventDefault();

    const payload = {
      ...notebook,
      title
    };

    const updatedNotebook = await dispatch(updateNotebook(payload))
    history.push(`/notes/${updatedNotebook.id}`)
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
        <button
          type="submit"
          onClick={handleSubmit}
        >
          Edit Notebook
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

export default NotebookEditForm
