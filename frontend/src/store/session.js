import { csrfFetch } from './csrf';

const START_SESSION = "session/startSession";
const END_SESSION = "session/endSession";
const RESTORE_SESSION = "session/restoreSession"

const startSession = (user) => {
  return {
    type: START_SESSION,
    payload: user
  }
};

const endSession = (user) => {
  return {
    type: END_SESSION,
  }
};


export const login = (user) => async (dispatch) => {
  const { credential, password } = user;
  const res = await csrfFetch('/api/session', {
    method: "POST",
    body: JSON.stringify({
      credential,
      password
    })
  });
  const data = await res.json();
  dispatch(startSession(data.user));
  return res;
};

export const restoreSession = () => async dispatch => {
  const response = await csrfFetch('/api/session');
  const data = await response.json();
  dispatch(startSession(data.user));
  return response;
};

export const signup = (user) => async (dispatch) => {
  const { username, email, password } = user;

  console.log("IN MY THUNK NOW")

  const response = await csrfFetch("/api/users", {
    method: "POST",
    body: JSON.stringify({
      username,
      email,
      password,
    }),
  });

  console.log("THIS IS MYRESPONSE", response)
  const data = await response.json();
  console.log("THIS IS MY THUNK DATA", data)
  dispatch(startSession(data.user));
  return response;
};

export const logout = () => async (dispatch) => {
  const response = await csrfFetch('/api/session', {
    method: 'DELETE',
  });
  dispatch(endSession());
  return response;
};


const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case START_SESSION: {
      const newState = { ...state };
      newState.user = action.payload;
      return newState;
    }
    case END_SESSION: {
      const newState = { ...state };
      newState.user = null;
      return newState;
    }
    default:
      return state;
  }
};

export default sessionReducer;
