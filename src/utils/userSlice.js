import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    data: null,
    loading: true,
    error: null
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    addUser: (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.error = null;
    },
    removeUser: (state) => {
      state.data = null;
      state.loading = false;
      state.error = null;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    }
  }
});

export const { addUser, removeUser, setLoading, setError } = userSlice.actions;
export default userSlice.reducer;
