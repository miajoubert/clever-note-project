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
  const response = await fetch(`/api/notes`, {
    method: "GET",
    headers: { "Content-Type": "application/json", "data": userId }
  });
  const notes = await response.json();
  dispatch(list(notes))
}

export const noteDetails = (noteId) => async (dispatch) => {
  const response = await fetch(`/api/notes/${noteId}`)
  const note = await response.json();
  dispatch(one(note))
}

export const addNote = (payload, userId) => async (dispatch) => {
  const response = await fetch(`/api/notes/add`, {
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
    case LIST_NOTES:
      const newState = { ...state };
      // console.log("ACTION dot NOTES!!!!!", action.notes)
      action.notes.forEach((note) => {
        newState[note.id] = note;
      });
      // console.log("NEW STATE!!!!!!!!!!!!", newState)
      return newState;
    case LIST_NOTE:
      const oneState = { ...state };
      oneState[action.notes.id] = action.notes;
      return oneState;
    case ADD_NOTE:
      const addState = { ...state };
      addState[action.noteId] = action.note;
      return addState;
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
