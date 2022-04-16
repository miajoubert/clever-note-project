import React, { useEffect, useState, Route } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams, useHistory } from "react-router-dom";

import * as sessionActions from "../../store/session";
import { addNotebook } from "../../store/notebooks";

import './NotebookForm.css'

const NotebookForm = ({ hideForm }) => {
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
      <div className="noteFormDiv">
        <div>Start from scratch...</div>
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
          <div className="buttonsForm">
            <button
              className="formButton"
              type="submit"
              onClick={handleSubmit}
            >
              Create Notebook
            </button>
            <button className="formButton" type="button" onClick={handleCancel}>Cancel</button>
          </div>
        </form>
      </div>
    </>
  )
}

export default NotebookForm;
