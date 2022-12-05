import Blog from "../components/Blog";
import { useRef } from "react";
import { setUser } from "../reducers/userReducer";
import { useSelector, useDispatch } from "react-redux";
import Togglable from "./Togglable";
import NewBlog from "./NewBlog";

const BlogList = (user) => {
  const blogs = useSelector((state) => state.blogs);
  const blogs1 = [...blogs];

  console.log(blogs1);

  return (
    <div>
      <h2>blogs</h2>

      <br />

      {blogs1
        .sort((a, b) => (a.likes > b.likes ? -1 : 1))
        .map((blog) => (
          <Blog key={blog.id} blog={blog} blogs={blogs} user={user} />
        ))}
    </div>
  );
};

export default BlogList;
