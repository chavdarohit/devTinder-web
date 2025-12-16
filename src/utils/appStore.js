import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";

const appStore = configureStore({
  reducer: {
    user: userReducer
  }
});

//! wherever you subscribe to the store, make sure to in useSelector access state like state.user means the name of the reducer here is user not userReducer

export default appStore;
