import { csrfFetch } from "./csrf";

const LIST_NOTES = 'notes/LIST';
const LIST_NOTE = 'notes/ONE'
const ADD_NOTE = 'notes/ADD_NOTE';
const UPDATE_NOTE = 'notes/UPDATE_NOTE';
const DELETE_NOTE = 'notes/DELETE_NOTE';

const list = (notes) => ({
  type: LIST_NOTES,
  notes
})

const one = (note) => ({
  type: LIST_NOTE,
  note
})

const add = (note) => ({
  type: ADD_NOTE,
  note
})

const update = (note) => ({
  type: UPDATE_NOTE,
  note
})

const remove = (noteId) => ({
  type: DELETE_NOTE,
  noteId
})

export const listNotes = (userId) => async (dispatch) => {
  const response = await csrfFetch(`/api/notes`, {
    method: "GET",
    headers: { "Content-Type": "application/json", "data": userId }
  });
  const notes = await response.json();
  console.log(notes)
  dispatch(list(notes))
}

// export const noteDetails = (noteId) => async (dispatch) => {
//   // const response = await csrfFetch(`/api/notes/${noteId}`)
//   // const note = await response.json();
//   // console.log("MY NOTE DETAILS", note)
//   // dispatch(one(note))
// }

export const addNote = (payload) => async (dispatch) => {
  const response = await csrfFetch(`/api/notes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload)
  });
  const note = await response.json();

  dispatch(add(note));

  return note;
}

export const updateNote = (payload) => async (dispatch) => {
  const response = await csrfFetch(`/api/notes/${payload.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  const note = await response.json();

  dispatch(update(note));

  return note;
}

export const deleteNote = (noteId) => async (dispatch) => {
  const note = await csrfFetch(`/api/notes/${noteId}`,
    { method: "DELETE" }
  );

  dispatch(remove(noteId));
}

const initialState = {};

const notesReducer = (state = initialState, action) => {
  switch (action.type) {
    case LIST_NOTES:
      const newState = { ...state };
      action.notes.forEach((note) => {
        newState[note.id] = note;
      });
      return newState;
    case LIST_NOTE:
      const oneState = { ...state };
      oneState[action.note.id] = action.note;
      return oneState;
    case ADD_NOTE:
      if (state[action.note.id]) {
        const addState = {
          ...state,
          [action.note.id + 1]: action.note
        };
      }
      const addState = {
        ...state,
        [action.note.id]: action.note
      };
      return addState;
    case UPDATE_NOTE:
      return {
        ...state,
        [action.note.id]: action.note
      }
    case DELETE_NOTE:
      const deleteState = { ...state };
      delete deleteState[action.noteId];
      return deleteState;
    default:
      return state;
  }
}

export default notesReducer;
