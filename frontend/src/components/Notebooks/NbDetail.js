import React, { useEffect, useState, Route } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import NbEditModal from "./NbEditModal";
import NbDeleteModal from "./NbDeleteModal";
import NbNotesPage from "./NbNotesPage";

import { listNotebooks, noteDetails, editNote, deleteNotebook } from "../../store/notebooks";

import './Notebooks.css'

const NbDetail = () => {
  const { notebookId } = useParams();

  const notebooks = useSelector(state => state.notebooks)
  const allNotes = useSelector(state => state.notes)
  const session = useSelector(state => state.session);

  const dispatch = useDispatch();
  const history = useHistory()

  const [hideNotebookDetails, setHideNotebookDetails] = useState(false)

  const userId = session.user.id;

  let notebook = notebooks[notebookId]
  let notesList = Object.values(allNotes)
  let notes = notesList.filter(note => {
    return note?.notebookId === notebook?.id
  })

  useEffect(() => {
    dispatch(listNotebooks(notebooks))
  }, [dispatch])



  return (
    <>
      <div
        className="notebook-buttons-div"
        hidden={hideNotebookDetails}
      >
        <div className="nb-buttons">
          <NbEditModal
            notebook={notebook}
          />
          <NbDeleteModal
            notebook={notebook}
          />
        </div>
      </div>
      <div
        hidden={hideNotebookDetails}
      >
        <NbNotesPage
          hidden={true}
          notebookId={notebookId}
        />
      </div>
    </>
  )
}

export default NbDetail;
