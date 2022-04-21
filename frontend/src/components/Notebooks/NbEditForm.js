import React, { useEffect, useState, Route } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { updateNotebook } from "../../store/notebooks";

const NbEditForm = ({ notebook, hideModal, showDetails }) => {
  const session = useSelector(state => state.session)
  const notebooks = useSelector(state => state.notebooks)
  const dispatch = useDispatch()
  const history = useHistory();

  const [title, setTitle] = useState(notebook.title)
  const [errors, setErrors] = useState([]);

  const userId = session.user.id;

  async function handleSubmit(e) {
    e.preventDefault();

    const payload = {
      ...notebook,
      title
    };

    const updatedNotebook = await dispatch(updateNotebook(payload))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      })
    if (updatedNotebook) {
      history.push(`/notebooks/${updatedNotebook.id}`)
      hideModal()
    }
  }

  const handleCancel = (e) => {
    e.preventDefault();
    hideModal()
  };

  return (
    <>
      <div className="form-title">
        Revise notebook:
      </div>
      <ul className="errorsAuth" id="note-errors">
        {errors.map((error, i) => (
          <li
            className="errorLi"
            key={i}
          >
            {error}
          </li>))}
      </ul>
      <form className="noteForm">
        <label className="form-label">
          Title
          <input
            className="note-form-input"
            type="text"
            placeholder="Title..."
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)} />
        </label>
        <div className="form-buttons-div">
          <button
            className="form-button"
            type="submit"
            onClick={handleSubmit}
          >
            Submit
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
    </>
  )
}

export default NbEditForm
