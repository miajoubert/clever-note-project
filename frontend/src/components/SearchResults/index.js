import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";

import { listNotebooks } from "../../store/notebooks";
import { listNotes } from "../../store/notes";
import { listReminders } from "../../store/reminders";

import './SearchComponent.css'

const SearchComponent = ({ hideModal }) => {
  const session = useSelector(state => state.session);
  const notebooks = useSelector(state => state.notebooks);
  const notes = useSelector(state => state.notes);
  const reminders = useSelector(state => state.reminders);
  const dispatch = useDispatch();
  const history = useHistory();
  const inputRef = useRef();

  const [search, setSearch] = useState('');
  const userId = session.user.id;

  const allItems = [
    Object.values(notebooks)
      .filter((item) => {
        return item?.title.toLowerCase().includes(search.toLowerCase())
      }),
    Object.values(notes)
      .filter((item) => {
        return item?.title.toLowerCase().includes(search.toLowerCase()) ||
          item?.content.toLowerCase().includes(search.toLowerCase())
      }),
    Object.values(reminders)
      .filter((item) => {
        return item?.title.toLowerCase().includes(search.toLowerCase())
      })
  ]

  const resultCount = allItems[0].length + allItems[1].length + allItems[2].length

  useEffect(() => {
    inputRef.current?.focus()
  }, [search]);

  useEffect(() => {
    if (userId) {
      dispatch(listNotebooks(userId))
      dispatch(listNotes(userId))
      dispatch(listReminders(userId))
    }
  }, [dispatch, userId])

  const handleSearch = (e) => {
    e.preventDefault();
    history.push(`/results/${search}`);
    setSearch('');
    hideModal();
  };

  const handleSelectReminder = async (e, noteId) => {
    e.preventDefault();
    await history.push(`/notes/${noteId}`);
    await setSearch('');
    await hideModal();
    document.getElementById('open-reminder-modal').click()
  };

  return (
    <>
      <div className="search-dropdown">
        <form>
          <input
            className="searchInput"
            type="search"
            onChange={e => setSearch(e.target.value)}
            onSubmit={handleSearch}
            ref={inputRef}
            autoComplete="off"
            required
            placeholder="Search your Clevernote"
          ></input>

          <button
            type="submit"
            className="searchingButton"
            onClick={handleSearch}
          >
            Search
          </button>
        </form>
      </div>

      <div
        hidden={!search}
        className='search-results-div'
      >
        <ul className="search-list">
          {!resultCount ?
            <li className="search-item">No results found</li> :
            allItems[0].map((item) => {
              return (
                <Link
                  to={`/notebooks/${item.id}`}
                  onClick={hideModal}
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
                onClick={hideModal}
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
                // onClick={hideModal}
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
      </div>

    </>
  )
}

export default SearchComponent;
