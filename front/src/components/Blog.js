import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setNotification } from "../reducers/notificationReducer";
import { updateBlog, deleteBlog } from "../reducers/blogReducer";
import { Link } from "react-router-dom";

const Blog = ({ blog }) => {
  const user = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);
  const [view, setView] = useState(false);
  const buttonText = view ? "hide" : "view";
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const handleUpdateBlog = async (blogObject) => {
    try {
      await dispatch(updateBlog(blogObject));
    } catch (error) {
      const notif = {
        message: error.response.data.error,
        type: "error",
      };
      dispatch(setNotification(notif, 2500));
    }
  };
  const handleDeleteBlog = async (id) => {
    const blog1 = blogs.filter((b) => b.id === id);
    const title = blog1[0].title;
    if (window.confirm(`Do you want to delete ${title}?`)) {
      try {
        await dispatch(deleteBlog(id));
        const notif = {
          message: "Successfully deleted",
          type: "success",
        };
        dispatch(setNotification(notif, 2500));
      } catch (error) {
        const notif = {
          message: error.message,
          type: "error",
        };
        dispatch(setNotification(notif, 2500));
      }
    }
  };

  return (
    <div style={blogStyle}>
      <Link to={`/blogs/${blog.id}`}>{blog.title}</Link> {blog.content}{" "}
      <button onClick={() => setView(!view)}>{buttonText}</button>
      {view ? (
        <div>
          <a href={`//${blog.url}`} target="_blank">
            link
          </a>{" "}
          <br />
          likes {blog.likes}{" "}
          <button onClick={() => handleUpdateBlog(blog)}>like</button> <br />
          {user && (user.id === blog.user.id || user.id === blog.user) ? (
            <button onClick={() => handleDeleteBlog(blog.id)}>remove</button>
          ) : null}
        </div>
      ) : null}
    </div>
  );
};
export default Blog;
