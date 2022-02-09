import React, { useEffect, useState, Route } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";

import * as sessionActions from "../../store/session";
import FloatingButton from "../FloatingButton";
import { listNotes, addNote, updateNote, deleteNote } from "../../store/notes";

import './Notes.css'

const CreateNoteForm = () => {
  const notes = useSelector(state => state.notes)
  const session = useSelector(state => state.session)
  const dispatch = useDispatch()

  const [showForm, setShowForm] = useState(false);

  const userId = session.user.id;

  return (
    <>
      <div>NEW NOTE FORM</div>
    </>
  )
}

export default CreateNoteForm;
