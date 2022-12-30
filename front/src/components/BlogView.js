import { Spinner, Footer, Button } from "flowbite-react";
import { useSelector, useDispatch } from "react-redux";
import FavoriteIcon from "@mui/icons-material/Favorite";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { setNotification } from "../reducers/notificationReducer";
import { updateBlog, deleteBlog, commentBlog } from "../reducers/blogReducer";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BlogFooter from "./BlogFooter";
import Comment from "./Comment";

const BlogView = ({ blog }) => {
  console.log(blog);
  const user = useSelector((state) => state.users);
  const allUsers = useSelector((state) => state.allUsers);
  const [newComment, setNewComment] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const blogs = useSelector((state) => state.blogs);
  if (blog === undefined) {
    return <Spinner />;
  }

  const comments = blog.comments ? blog.comments : [];
  const user1 = allUsers.find((user) => user.id === blog.user);

  const handleUpdateBlog = async (blogObject) => {
    if (!user) {
      navigate("/login");
    }
    try {
      const updatedBlog = {
        ...blogObject,
        likes: blog.likes + 1,
      };
      await dispatch(updateBlog(updatedBlog));
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
    if (!user) {
      navigate("/login");
    }
    if (window.confirm(`Do you want to delete this post?`)) {
      try {
        await dispatch(deleteBlog(id));
        const notif = {
          message: "Successfully deleted post",
          type: "success",
        };
        dispatch(setNotification(notif, 2500));
        navigate("/");
      } catch (error) {
        const notif = {
          message: error.message,
          type: "error",
        };
        dispatch(setNotification(notif, 2500));
      }
    }
  };

  const commentFormSubmit = (event) => {
    event.preventDefault();
    setNewComment("");
    handleComment(newComment, blog.id);
  };

  const handleComment = async (comment, id) => {
    if (!user) {
      navigate("/login");
    }
    try {
      await dispatch(commentBlog(comment, id));
      const notif1 = {
        message: "Comment added successfully",
        type: "success",
      };
      dispatch(setNotification(notif1, 2500));
    } catch (error) {
      const notif2 = {
        message: error.message,
        type: "failure",
      };
      dispatch(setNotification(notif2, 2500));
    }
  };

  return (
    <div className="">
      <main className="pt-8 pb-16 lg:pt-16 lg:pb-24 bg-white dark:bg-gray-900">
        <div className="flex justify-between px-4 mx-auto max-w-screen-xl ">
          <article className="mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
            <header className="mb-4 lg:mb-6 not-format">
              <h1 className="mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-white">
                {blog.title}
              </h1>
              <address className="flex items-center mb-6 not-italic">
                <div className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                  <div>
                    <a
                      href={
                        `/users/${blog.user.username}` ||
                        `/users/${user1.username}`
                      }
                      rel="author"
                      className="text-lg font-bold text-gray-900 dark:text-white"
                    >
                      u/
                      {blog.user.username || user1.username}
                    </a>
                    <p className="text-base font-light text-gray-500 dark:text-gray-400">
                      Posted on{" "}
                      {new Date(blog.dateCreated).toLocaleDateString("en-GB")}
                    </p>
                    <p className="inline mr-2 text-sm font-light text-gray-500 dark:text-gray-400">
                      {blog.likes} {blog.likes === 1 ? "like" : "likes"}
                    </p>{" "}
                    <p className="inline  text-sm font-light text-gray-500 dark:text-gray-400">
                      {comments.length}{" "}
                      {comments.length === 1 ? "comment" : "comments"}
                    </p>
                    <div className="flex flex-wrap items-center gap-2 mt-6">
                      <Button onClick={() => handleUpdateBlog(blog)}>
                        <FavoriteIcon className="h-6 w-6" />
                      </Button>
                      {user &&
                      (user.id === blog.user.id || user.id === blog.user) ? (
                        <>
                          <Button
                            href={`/posts/edit/${blog.id}`}
                            color="warning"
                          >
                            <EditIcon className="h-6 w-6" />
                          </Button>
                          <Button
                            onClick={() => handleDeleteBlog(blog.id)}
                            color="failure"
                          >
                            <DeleteIcon className="h-6 w-6" />
                          </Button>
                        </>
                      ) : null}
                    </div>
                  </div>
                </div>
              </address>
            </header>
            <p
              className="text-gray-500 text-lg dark:text-gray-400"
              align="justify"
            >
              {blog.content}
            </p>

            <section className="not-format">
              <div className="flex justify-between items-center mt-8 mb-6">
                <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
                  Discussion
                </h2>
              </div>
              <form className="mb-8" onSubmit={commentFormSubmit}>
                <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                  <label htmlFor="comment" className="sr-only">
                    Your comment
                  </label>
                  <textarea
                    id="comment"
                    rows="6"
                    className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                    placeholder="Write a comment..."
                    value={newComment}
                    onChange={({ target }) => setNewComment(target.value)}
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
                >
                  Post comment
                </button>
              </form>

              {comments.length > 0 ? (
                comments.map((comment) => (
                  <Comment key={comment.id} comment={comment} />
                ))
              ) : (
                <article className="p-6 text-base bg-white border-t border-gray-200 dark:border-gray-700 dark:bg-gray-900">
                  <footer className="flex justify-between items-center"></footer>
                  <p className="text-gray-500 dark:text-gray-400">
                    No Comments Yet
                  </p>
                </article>
              )}
            </section>
          </article>
        </div>
      </main>

      <BlogFooter />
    </div>
  );
};

export default BlogView;
