const LIST_NOTE = 'notes/LIST';
const ADD_NOTE = 'notes/ADD_NOTE';
const UPDATE_NOTE = 'notes/UPDATE_NOTE';
const DELETE_NOTE = 'notes/DELETE_NOTE';

const list = (notes, userId) => ({
  type: LIST_NOTE,
  notes,
  userId
})

const add = (payload, userId) => ({
  type: ADD_NOTE,
  payload,
  userId
})

const update = (payload) => ({
  type: UPDATE_NOTE,
  payload
})

const remove = (noteId) => ({
  type: DELETE_NOTE,
  noteId
})

export const listNotes = (userId) => async (dispatch) => {
  const response = await fetch(`/api/notes`)
  const notes = await response.json();
  dispatch(list(notes, userId))
}

export const addNote = (payload, userId) => async (dispatch) => {
  const response = await fetch(`/api/notes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  const note = response.json();
  dispatch(add(payload, userId));
}

export const updateNote = (payload) => async (dispatch) => {
  const response = await fetch(`/api/notes/${payload.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  const note = response.json();
  dispatch(update(payload));
}

export const deleteNote = (noteId) => async (dispatch) => {
  const response = await fetch(`/api/notes/${noteId}`,
    { method: "DELETE" }
  );
  dispatch(remove(noteId));
}


const initialState = {};

const notesReducer = (state = initialState, action) => {
  switch (action.type) {
    case LIST_NOTE:
      const newNotes = ["note1", "note2"];
      console.log('NEWNOTES in REDUCER', newNotes)
      action.items.forEach((note) => {
        newNotes[note.id] = note;
      });
      return {
        ...state,
        newNotes
      };
    case ADD_NOTE:
      const newState = { ...state };
      newState[action.noteId] = action.note;
      return newState;
    case UPDATE_NOTE:
      return {
        ...state,
        [action.noteId]: action.note
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
