import { useState } from "react";
import { updateBlog } from "../reducers/blogReducer";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setNotification } from "../reducers/notificationReducer";
import { TextInput, Label, Button, Textarea, Spinner } from "flowbite-react";
import BlogFooter from "./BlogFooter";

const BlogEdit = ({ blog }) => {
  const dispatch = useDispatch();
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");

  const navigate = useNavigate();
  if (blog === undefined) {
    return <Spinner />;
  }
  if (blog && newTitle === "") {
    setNewTitle(blog.title);
    setNewContent(blog.content);
  }

  const editBlog = (event) => {
    event.preventDefault();
    const blogObject = {
      ...blog,
      title: newTitle,
      content: newContent,
      dateCreated: new Date(),
    };
    editNewBlog(blogObject);
    setNewContent("");
    setNewTitle("");
  };

  const editNewBlog = async (blogObject) => {
    try {
      const notif1 = {
        message: `Post was successfully edited`,
        type: "success",
      };
      await dispatch(updateBlog(blogObject));
      navigate(`/posts/${blog.id}`);

      dispatch(setNotification(notif1, 2500));
    } catch (exception) {
      const notif2 = {
        message: `Cannot edit post`,
        type: "failure",
      };
      dispatch(setNotification(notif2, 2500));
    }
  };

  return (
    <>
      <div className="">
        <main className="pt-8 pb-16 lg:pt-16 lg:pb-12 bg-white dark:bg-gray-900 min-h-screen">
          <div className="flex justify-between px-4 mx-auto max-w-6xl ">
            <article className="mx-auto w-full max-w-6xl	 format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
              <header className="mb-4 lg:mb-6 not-format">
                <h1 className="mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-white">
                  Edit Post
                </h1>
                <address className="flex items-center mb-6 not-italic"></address>
              </header>
              <form onSubmit={editBlog} className="flex flex-col gap-4">
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="post-title" value="Title of Post" />
                  </div>
                  <TextInput
                    id="post-title"
                    type="text"
                    placeholder="An Amazing Post"
                    required={true}
                    value={newTitle}
                    onChange={({ target }) => setNewTitle(target.value)}
                  />
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="post-content" value="Content of Post" />
                  </div>
                  <Textarea
                    required={true}
                    value={newContent}
                    placeholder="Text"
                    onChange={({ target }) => setNewContent(target.value)}
                    rows={10}
                  />
                </div>

                <Button className="mt-4 w-24" type="submit">
                  Submit
                </Button>
              </form>
            </article>
          </div>
        </main>
      </div>

      <BlogFooter />
    </>
  );
};

export default BlogEdit;
