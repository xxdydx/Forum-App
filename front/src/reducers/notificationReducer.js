import { createSlice } from "@reduxjs/toolkit";

const notifSlice = createSlice({
  name: "notifications",
  initialState: null,
  reducers: {
    createNotification(state, action) {
      const notification = action.payload;
      return notification;
    },
  },
});

export const { createNotification } = notifSlice.actions;

let timeoutId = null;

export const setNotification = (message, time) => {
  return async (dispatch) => {
    dispatch(createNotification(message));

    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => dispatch(createNotification(null)), time);
  };
};

export default notifSlice.reducer;
