import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link, useHistory } from "react-router-dom";

import { listNotebooks } from "../../store/notebooks";
import { listNotes } from "../../store/notes";
import { listReminders } from "../../store/reminders";

import './SearchResults.css'

const ResultsPage = () => {
  const session = useSelector(state => state.session);
  const notebooks = useSelector(state => state.notebooks);
  const notes = useSelector(state => state.notes);
  const reminders = useSelector(state => state.reminders);
  const dispatch = useDispatch();
  const history = useHistory();

  const searchTerm = useParams().searchTerm;
  const userId = session.user.id;

  const allItems = [
    Object.values(notebooks)
      .filter((item) => {
        return item?.title.toLowerCase().includes(searchTerm.toLowerCase())
      }),
    Object.values(notes)
      .filter((item) => {
        return item?.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item?.content.toLowerCase().includes(searchTerm.toLowerCase())
      }),
    Object.values(reminders)
      .filter((item) => {
        return item?.title.toLowerCase().includes(searchTerm.toLowerCase())
      })
  ];

  const resultCount = allItems[0].length + allItems[1].length + allItems[2].length;

  useEffect(() => {
    if (userId) {
      dispatch(listNotebooks(userId))
      dispatch(listNotes(userId))
      dispatch(listReminders(userId))
    }
  }, [dispatch, userId]);

  const handleSelectReminder = async (e, noteId) => {
    e.preventDefault();
    await history.push(`/notes/${noteId}`);
    document.getElementById('open-reminder-modal').click()
  };


  return (
    <>
      <div className="main-search-div">
        <nav
          className="resultsList">
          <ul className="search-list">
            {!resultCount ?
              <li>No results for this search</li> :
              allItems[0].map((item) => {
                return (
                  <Link
                    to={`/notebooks/${item.id}`}
                    className="search-item-link"
                  >
                    <li
                      className="search-item"
                      key={item.id}
                    >
                      <span className="fas fa-book-open" />
                      {item.title}
                    </li>
                  </Link>)
              })}
            {allItems[1].map((item) => {
              return (
                <Link
                  to={`/notes/${item.id}`}
                  className="search-item-link"
                >
                  <li
                    className="search-item"
                    key={item.id}
                  >
                    <span className="far fa-sticky-note" />
                    {item.title}
                  </li>
                </Link>)
            })}
            {allItems[2].map((item) => {
              return (
                <Link
                  // to={`/notes/${item.noteId}`}
                  onClick={(e) => handleSelectReminder(e, item.noteId)}
                  className="search-item-link"
                >
                  <li
                    className="search-item"
                    key={item.id}
                  >
                    <span className="fas fa-clock" />
                    {item.title}
                  </li>
                </Link>)
            })}
          </ul>
        </nav>
      </div >
    </>
  )
}

export default ResultsPage;
