import React, { useEffect, useState, Route } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams, useHistory } from "react-router-dom";

import { addNotebook } from "../../store/notebooks";

import './NbForm.css'

const NbForm = ({ hideForm }) => {
  const notebooks = useSelector(state => state.notebooks)
  const session = useSelector(state => state.session)
  const dispatch = useDispatch()
  const history = useHistory();

  const [title, setTitle] = useState("")
  const [errors, setErrors] = useState([]);

  const userId = session.user.id;

  async function handleSubmit(e) {
    e.preventDefault();

    const payload = {
      userId,
      title
    };

    let newNotebook = await dispatch(addNotebook(payload))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      })
    if (newNotebook) {
      hideForm();
      history.push(`/notebooks/${newNotebook.id}`);
    }
  };

  const handleCancel = (e) => {
    e.preventDefault();
    hideForm()
  };

  return (
    <>
      <div className="note-form-div" id="nb-form-div">
        <div className="form-title-header">
          <div className="form-title">
            Start from scratch...
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

export default NbForm;
