import { csrfFetch } from "./csrf";

const LIST_REMINDERS = 'reminders/LIST';
const LIST_REMINDER = 'reminders/ONE'
const ADD_REMINDER = 'reminders/ADD_REMINDER';
const UPDATE_REMINDER = 'reminders/UPDATE_REMINDER';
const DELETE_REMINDER = 'reminders/DELETE_REMINDER';

const list = (reminders) => ({
  type: LIST_REMINDERS,
  reminders
})

const one = (reminder) => ({
  type: LIST_REMINDER,
  reminder
})

const add = (reminder) => ({
  type: ADD_REMINDER,
  reminder
})

const update = (reminder) => ({
  type: UPDATE_REMINDER,
  reminder
})

const remove = (reminderId) => ({
  type: DELETE_REMINDER,
  reminderId
})

export const listReminders = (userId) => async (dispatch) => {
  const response = await csrfFetch(`/api/reminders`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "data": userId
    }
  });
  const reminders = await response.json();
  dispatch(list(reminders))
}

export const reminderDetails = (reminderId) => async (dispatch) => {
  const response = await csrfFetch(`/api/reminders/${reminderId}`)
  const reminder = await response.json();
  dispatch(one(reminder))
}

export const addReminder = (payload) => async (dispatch) => {
  const response = await csrfFetch(`/api/reminders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload)
  });
  const reminder = await response.json();

  dispatch(add(reminder));

  return reminder;
}

export const updateReminder = (payload) => async (dispatch) => {
  const response = await csrfFetch(`/api/reminders/${payload.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  const reminder = await response.json();

  dispatch(update(reminder));

  return reminder;
}

export const deleteReminder = (reminderId) => async (dispatch) => {
  const reminder = await csrfFetch(`/api/reminders/${reminderId}`,
    { method: "DELETE" }
  );

  console.log("Made it into my delete")

  dispatch(remove(reminderId));
}

const initialState = {};

const remindersReducer = (state = initialState, action) => {
  switch (action.type) {
    case LIST_REMINDERS:
      const newState = { ...state };
      action.reminders.forEach((reminder) => {
        newState[reminder.id] = reminder;
      });
      return newState;
    case LIST_REMINDER:
      const oneState = { ...state };
      oneState[action.reminder.id] = action.reminder;
      return oneState;
    case ADD_REMINDER:
      const addState = { ...state }
      addState[action.reminder?.id] = action.reminder
      return addState;
    case UPDATE_REMINDER:
      return {
        ...state,
        [action.reminder.id]: action.reminder
      }
    case DELETE_REMINDER:
      const deleteState = { ...state };
      delete deleteState[action.reminderId];
      return deleteState;
    default:
      return state;
  }
}

export default remindersReducer;
