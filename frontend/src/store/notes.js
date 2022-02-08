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

let testNotes = [
  {
    id: 1,
    title: "my note",
    userId: 1,
    notebookId: 1,
    content: "this is my note!",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 2,
    title: "my OTHER note",
    userId: 1,
    notebookId: 1,
    content: "this is my note!",
    createdAt: new Date(),
    updatedAt: new Date()
  }
]


const initialState = {};

const notesReducer = (state = initialState, action) => {
  switch (action.type) {
    case LIST_NOTE:
      const newState = {
        1: {
          id: 1,
          title: "my note",
          userId: 1,
          notebookId: 1,
          content: "this is my note!",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        2: {
          id: 2,
          title: "my OTHER note",
          userId: 1,
          notebookId: 1,
          content: "this is my note!",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      };
      // testNotes.forEach(note => {
      //   newState[note.id] = note
      // });
      console.log("MY CURRENT STATE", newState)
      return newState
    // const newNotes = { ...testNotes };
    // console.log('NEWNOTES in REDUCER', newNotes)
    // action.items.forEach((note) => {
    //   newNotes[note.id] = note;
    // });
    // return {
    //   ...state,
    //   newNotes
    // };
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
