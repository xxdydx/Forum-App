import { createSlice } from "@reduxjs/toolkit";
import userService from "../services/users";
import { initializeUsers } from "./userReducer";

const usersSlice = createSlice({
  name: "allUsers",
  initialState: [],
  reducers: {
    setUsers(state, action) {
      return action.payload;
    },
    create(state, action) {
      const user = action.payload;
      state.push(user);
    },
  },
});

export const { setUsers, create } = usersSlice.actions;

export const initializeAllUsers = () => {
  return async (dispatch) => {
    const users = await userService.getAll();
    dispatch(setUsers(users));
  };
};

export const registerUser = (user) => {
  return async (dispatch) => {
    const user1 = await userService.addUser(user);
    dispatch(create(user1));
  };
};

export default usersSlice.reducer;
