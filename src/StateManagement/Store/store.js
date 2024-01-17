// src/store.js
import { configureStore } from "@reduxjs/toolkit";

const initialState = {
  viewMode:
    localStorage.getItem("lastView") === undefined
      ? "documentation"
      : localStorage.getItem("lastView"),
  refetch: false
};

function appReducer(state = initialState, action) {
  switch (action.type) {
    case "TOGGLE_VIEW":
      return {
        ...state,
        viewMode: action.payload,
      };
    case "TOGGLE_REFETCH":
      return {
        ...state,
        refetch: action.payload
      }
    default:
      return state;
  }
}

const store = configureStore({
  reducer: {
    app: appReducer, // Wrap your reducer in an object
  },
});

export default store;
