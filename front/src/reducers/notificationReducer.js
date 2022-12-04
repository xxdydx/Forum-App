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

export const setNotification = (message, time) => {
  return async (dispatch) => {
    dispatch(createNotification(message));
    setTimeout(() => {
      dispatch(createNotification(null));
    }, time);
  };
};

export default notifSlice.reducer;
