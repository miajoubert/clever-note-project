import React, { useEffect, useState, Route } from "react";
import { useDispatch, useSelector } from "react-redux";

import * as sessionActions from "../../store/session";
import { updateNotebook } from "../../store/notebooks";

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
    history.push(`/notebooks/${updatedNotebook.id}`)
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
          <div className="buttonsForm">
            <button
              className="formButton"
              type="submit"
              onClick={handleSubmit}
            >
              Edit Notebook
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
      </div>
    </>
  )
}

export default NotebookEditForm
