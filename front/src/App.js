import { useState, useEffect, useRef } from "react";
import Notif from "./components/Notif";
import SignIn from "./components/LoginForm";
import { useSelector, useDispatch } from "react-redux";
import { initializeBlogs } from "./reducers/blogReducer";
import { initializeUsers, setUser } from "./reducers/userReducer";
import BlogList from "./components/BlogList";
import { Spinner } from "flowbite-react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useMatch,
  useParams,
  useNavigate,
} from "react-router-dom";
import NewBlog from "./components/NewBlog";
import NavigationBar from "./components/NavigationBar";

const App = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.users);
  const blogs = useSelector((state) => state.blogs);
  const padding = {
    padding: 5,
  };

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  useEffect(() => {
    dispatch(initializeUsers());
  }, [dispatch]);

  const match = useMatch("/blogs/:id");
  const blog = match ? blogs.find((blog) => blog.id === match.params.id) : null;

  const BlogView = ({ blog }) => {
    console.log(blog);
    if (blog === undefined) {
      return <Spinner aria-label="Default status example" />;
    }
    return (
      <div>
        <h1>{blog.title}</h1>
        <a href={`//${blog.url}`}>link</a>
        <p>added by {blog.author}</p>
        <p> {blog.likes} likes</p>
      </div>
    );
  };

  return (
    <div className="dark">
      {user === null ? (
        <SignIn />
      ) : (
        <div>
          <NavigationBar user={user} />

          <Routes>
            <Route path="/create" element={<NewBlog />} />
            <Route
              path="/"
              element={<BlogList user={user} setUser={setUser} />}
            />
            <Route path="/blogs/:id" element={<BlogView blog={blog} />} />
          </Routes>
        </div>
      )}
      <Notif />
    </div>
  );
};

export default App;
