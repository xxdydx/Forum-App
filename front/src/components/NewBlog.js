import { useState } from "react";
import { createBlog } from "../reducers/blogReducer";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setNotification } from "../reducers/notificationReducer";
import { TextInput, Label, Button, Textarea } from "flowbite-react";
import BlogFooter from "./BlogFooter";

const NewBlog = () => {
  const dispatch = useDispatch();
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [newUrl, setNewUrl] = useState("");

  const navigate = useNavigate();

  const addBlog = (event) => {
    event.preventDefault();
    const blogObject = {
      title: newTitle,
      content: newContent,
      url: newUrl,
    };
    addNewBlog(blogObject);
    setNewContent("");
    setNewTitle("");
    setNewUrl("");
  };

  const addNewBlog = async (blogObject) => {
    try {
      const notif1 = {
        message: `Blog was successfully added`,
        type: "success",
      };
      dispatch(createBlog(blogObject));
      navigate("/");

      dispatch(setNotification(notif1, 2500));
    } catch (exception) {
      const notif2 = {
        message: `Cannot add blog`,
        type: "failure",
      };
      dispatch(setNotification(notif2, 2500));
    }
  };

  return (
    <>
      <div className="dark">
        <main className="pt-8 pb-16 lg:pt-16 lg:pb-24 bg-white dark:bg-gray-900 min-h-screen">
          <div className="flex justify-between px-4 mx-auto max-w-6xl ">
            <article className="mx-auto w-full max-w-6xl	 format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
              <header className="mb-4 lg:mb-6 not-format">
                <h1 className="mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-white">
                  Create a Post
                </h1>
                <address className="flex items-center mb-6 not-italic"></address>
              </header>
              <form onSubmit={addBlog} className="flex flex-col gap-4">
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
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="post-url" value="URL of Post" />
                  </div>
                  <TextInput
                    id="post-url"
                    type="url"
                    required={true}
                    value={newUrl}
                    onChange={({ target }) => setNewUrl(target.value)}
                  />
                </div>

                <Button type="submit">Submit</Button>
              </form>
            </article>
          </div>
        </main>
      </div>

      <BlogFooter />
    </>
  );
};

export default NewBlog;
