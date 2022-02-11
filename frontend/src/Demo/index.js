import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import * as sessionActions from '../store/session'

function DemoUser() {
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    return dispatch(sessionActions.login({
      credential: "Demo",
      password: "Pass@1"
    }));
  };

  return (
    <button
      className="loginButton"
      onClick={handleSubmit}
    >
      Demo
    </button>
  );
}

export default DemoUser;
