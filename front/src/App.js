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

  return (
    <div>
      <Notif />
      {user === null ? (
        SignIn()
      ) : (
        <div>
          <p>{user.username} logged-in</p>
          <BlogList user={user} setUser={setUser} />
        </div>
      )}
    </div>
  );
};

export default App;
