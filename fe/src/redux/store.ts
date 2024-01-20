import { configureStore } from "@reduxjs/toolkit";
import { attemptSlice } from "./attempts";
import { modalSlice } from "./modal";

export default configureStore({
 reducer: {
    attempts: attemptSlice.reducer,
    modal: modalSlice.reducer
  },
})