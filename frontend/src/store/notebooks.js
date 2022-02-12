import { csrfFetch } from "./csrf";

const LIST_NOTEBOOKS = 'notenooks/LIST';
const LIST_NOTEBOOK = 'notebooks/ONE'
const ADD_NOTEBOOK = 'notebooks/ADD_NOTEBOOK';
const UPDATE_NOTEBOOK = 'notebooks/UPDATE_NOTEBOOK';
const DELETE_NOTEBOOK = 'notebooks/DELETE_NOTEBOOK';

const list = (notebooks) => ({
  type: LIST_NOTEBOOKS,
  notebooks
})

const one = (notebook) => ({
  type: LIST_NOTEBOOK,
  notebook
})

const add = (notebook) => ({
  type: ADD_NOTEBOOK,
  notebook
})

const update = (notebook) => ({
  type: UPDATE_NOTEBOOK,
  notebook
})

const remove = (notebookId) => ({
  type: DELETE_NOTEBOOK,
  notebookId
})

export const listNotebooks = (userId) => async (dispatch) => {
  const response = await csrfFetch(`/api/notebooks`, {
    method: "GET",
    headers: { "Content-Type": "application/json", "data": userId }
  });
  const notebooks = await response.json();
  dispatch(list(notebooks))
  // return notebooks
}

export const notebookDetails = (notebookId) => async (dispatch) => {
  const response = await csrfFetch(`/api/notebooks/${notebookId}`)
  const notebook = await response.json();
  dispatch(one(notebook))
}

export const addNotebook = (payload) => async (dispatch) => {
  const response = await csrfFetch(`/api/notebooks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload)
  });
  const notebook = await response.json();

  dispatch(add(notebook));

  return notebook;
}

export const updateNotebook = (payload) => async (dispatch) => {
  const response = await csrfFetch(`/api/notebooks/${payload.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  const notebook = await response.json();

  dispatch(update(notebook));

  return notebook;
}

export const deleteNotebook = (notebookId) => async (dispatch) => {
  const notebook = await csrfFetch(`/api/notebooks/${notebookId}`,
    { method: "DELETE" }
  );

  dispatch(remove(notebookId));
}

const initialState = {};

const notebooksReducer = (state = initialState, action) => {
  switch (action.type) {
    case LIST_NOTEBOOKS:
      const newState = { ...state };
      action.notebooks.forEach((notebook) => {
        newState[notebook.id] = notebook;
      });
      return newState;
    case LIST_NOTEBOOK:
      const oneState = { ...state };
      oneState[action.notebook.id] = action.notebook;
      return oneState;
    case ADD_NOTEBOOK:
      if (state[action.notebook.id]) {
        const addState = {
          ...state,
          [action.notebook.id + 1]: action.notebook
        };
      }
      const addState = {
        ...state,
        [action.notebook.id]: action.notebook
      };
      return addState;
    case UPDATE_NOTEBOOK:
      return {
        ...state,
        [action.notebook.id]: action.notebook
      }
    case DELETE_NOTEBOOK:
      const deleteState = { ...state };
      delete deleteState[action.notebookId];
      return deleteState;
    default:
      return state;
  }
}

export default notebooksReducer;
