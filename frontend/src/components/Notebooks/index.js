import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, NavLink, Route, useParams } from "react-router-dom";

import NbFloatingButton from "./NbFAB";
import NbDetail from "./NbDetail";
import NbForm from "./NbForm";
import { listNotebooks } from "../../store/notebooks";
import { listNotes } from "../../store/notes";

import './Notebooks.css'

const NotesPage = () => {
  const notebooks = useSelector(state => state.notebooks)
  const notes = useSelector(state => state.notes)
  const session = useSelector(state => state.session)
  const dispatch = useDispatch()

  const [showForm, setShowForm] = useState(false);

  const userId = session.user.id;
  const { notebookId } = useParams();
  const notebooksArr = Object.values(notebooks);

  useEffect(() => {
    if (userId) {
      dispatch(listNotebooks(userId))
      dispatch(listNotes(notebookId))
    }
  }, [userId])

  return (
    <main>
      <nav
        className="notebookList">
        {notebooksArr.map((notebook) => {
          return (
            <NavLink
              key={notebook?.id}
              to={`/notebooks/${notebook?.id}`}
              onClick={() => setShowForm(false)}
            >
              <div
                className={
                  Number.parseInt(notebookId) === notebook?.id
                    ? "notebook nb-selected"
                    : "notebook"
                }
              >
                <div className="nb-primary-text">
                  <span className="fas fa-book"></span>
                  {notebook?.title}
                </div>
                <div className="notebookInfo">
                  <div className="nb-secondary-text">
                    {new Date(notebook?.updatedAt).getMonth() + 1}/{new Date(notebook?.updatedAt).getDate()}/{new Date(notebook?.updatedAt).getFullYear()}
                  </div>
                  <div className="notebookImage">
                  </div>
                </div>
              </div>
            </NavLink>
          )
        }
        )}
      </nav>

      <div className="nb-buttons-details">
        <div className="nb-buttons">
          <NbFloatingButton
            hidden={showForm}
            onClick={() => setShowForm(true)}
          />

          {
            showForm ? (
              <NbForm
                hidden={!showForm}
                hideForm={() => setShowForm(false)} />
            ) : (
              <>
                <div className="nb-buttons-details">
                  <Route path="/notebooks/:notebookId">
                    <NbDetail
                      hidden={!showForm}
                      setShowForm={() => setShowForm(false)}
                    />
                  </Route>
                </div>
              </>
            )
          }
        </div>
      </div>
    </main >
  )
}

export default NotesPage;
