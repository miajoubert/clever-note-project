import React, { useEffect, useState, Route } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import NotebookEditModal from "./NotebookEditModal";
import * as sessionActions from "../../store/session";

import { listNotebooks, noteDetails, editNote, deleteNotebook } from "../../store/notebooks";

import './Notebooks.css'

const NotebookDetail = () => {
  const { notebookId } = useParams();

  const notebooks = useSelector(state => state.notebooks)
  const notes = useSelector(state => state.notes)
  const session = useSelector(state => state.session);

  const dispatch = useDispatch();
  const history = useHistory()

  const [hideNotebookDetails, setHideNotebookDetails] = useState(false)

  let notebook = notebooks[notebookId]

  useEffect(() => {
    dispatch(listNotebooks(notes))
  }, [dispatch])

  async function deleteNotebookFunc() {
    await dispatch(deleteNotebook(notebookId))
    history.push("/notebooks")
  }

  const userId = session.user.id;

  if (!notebook) {
    return (
      <div
        className="noteDetailBackground"
        hidden={hideNotebookDetails}
      >
        <div className="title" style={{ color: "red" }}>Notebook not found!</div>
        <div className="content" style={{ color: "red" }}>
          <b>
            This notebook has been deleted. Please select another note...
          </b>
        </div>
      </div >
    )
  } else return (
    <>
      <div
        className="noteDetailBackground"
        hidden={hideNotebookDetails}>
        <div className="title">{notebook?.title}</div>
        <div className="bottomNoteDetails">
          <NotebookEditModal
            notebook={notebook}
          />
          <button
            className="deleteButton"
            onClick={deleteNotebookFunc}
          >
            Delete Notebook
          </button>
          <div className="timestamp">
            {new Date(notebook?.updatedAt).toDateString()} {new Date(notebook?.updatedAt).getHours()}:{new Date(notebook?.updatedAt).getMinutes()}
          </div>
        </div>
      </div>
      {/* )
      } */}
    </>
  )
}

export default NotebookDetail;
