import React from "react";
import { useDispatch } from "react-redux";

import * as sessionActions from '../store/session'

function DemoUser() {
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(sessionActions.demo());
  };

  return (
    <button
      className="signup"
      onClick={handleSubmit}
    >
      Demo
    </button>
  );
}

export default DemoUser;
