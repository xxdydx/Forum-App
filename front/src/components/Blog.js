import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setNotification } from "../reducers/notificationReducer";
import { updateBlog, deleteBlog } from "../reducers/blogReducer";
import { Link } from "react-router-dom";
import { Card } from "flowbite-react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";

const Blog = ({ blog }) => {
  const user = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);
  console.log(blog);
  if (blog === undefined) {
    return null;
  }
  const comments = blog.comments ? blog.comments : [];

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
  var summary = blog.content.substring(0, 130);
  summary =
    summary.length === 130
      ? summary.substr(0, Math.min(summary.length, summary.lastIndexOf(" ")))
      : summary;

  return (
    <Card className="mb-4" href={`/posts/${blog.id}`}>
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {blog.title}
      </h5>
      <p className="font-normal text-gray-700 dark:text-gray-400">{summary}</p>
      <div className="items-center justify-left space-y-4 sm:flex sm:space-y-0 sm:space-x-4">
        <div className="text-gray-900 dark:text-white">
          <FavoriteIcon className="mr-2 fill-red-500" />
          {blog.likes}
        </div>
        <div className="text-gray-900 dark:text-white">
          <CommentIcon className="mr-2" />
          {comments.length}
        </div>
      </div>
    </Card>
  );
};
export default Blog;
