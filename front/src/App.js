import { useState, useEffect, useRef } from "react";
import Notif from "./components/Notif";
import blogService from "./services/blogs";
import SignIn from "./components/LoginForm";
import { useSelector, useDispatch } from "react-redux";
import { initializeBlogs } from "./reducers/blogReducer";
import { initializeUsers, setUser } from "./reducers/userReducer";
import BlogList from "./components/BlogList";

const App = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  useEffect(() => {
    dispatch(initializeUsers());
  }, [dispatch]);

  const getInitialTheme = () => {
    if (typeof window !== "undefined" && window.localStorage) {
      const storedPrefs = window.localStorage.getItem("color-theme");
      if (typeof storedPrefs === "string") {
        return storedPrefs;
      }

      const userMedia = window.matchMedia("(prefers-color-scheme: dark)");
      if (userMedia.matches) {
        return "dark";
      }
    }

    return "light"; // light theme as the default;
  };

  return (
    <div class="dark">
      {user === null ? (
        SignIn()
      ) : (
        <div>
          <p>{user.username} logged-in</p>
          <BlogList user={user} setUser={setUser} />
        </div>
      )}
      <Notif />
    </div>
  );
};

export default App;
