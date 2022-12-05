import { useState } from "react";
import { createBlog } from "../reducers/blogReducer";
import { useDispatch } from "react-redux";
import { setNotification } from "../reducers/notificationReducer";
import { TextInput, Label, Button, Textarea } from "flowbite-react";

const NewBlog = () => {
  const dispatch = useDispatch();
  const [newTitle, setNewTitle] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [newUrl, setNewUrl] = useState("");

  const addBlog = (event) => {
    event.preventDefault();
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    };
    addNewBlog(blogObject);
    setNewAuthor("");
    setNewTitle("");
    setNewUrl("");
  };

  const addNewBlog = async (blogObject) => {
    try {
      const notif1 = {
        message: `Blog ${blogObject.title} was successfully added`,
        type: "success",
      };
      dispatch(createBlog(blogObject));
      dispatch(setNotification(notif1, 2500));
    } catch (exception) {
      const notif2 = {
        message: `Cannot add blog ${blogObject.title}`,
        type: "success",
      };
      dispatch(setNotification(notif2, 2500));
    }
  };

  return (
    <section class="bg-white dark:bg-gray-900 h-screen">
      <div class="py-8 px-4 mx-auto max-w-2xl lg:py-16">
        <h2 class="mb-4 text-3xl font-extrabold	text-gray-900 dark:text-white ">
          Create New Blog
        </h2>
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
              <Label htmlFor="post-content" value="Content of post" />
            </div>
            <Textarea
              required={true}
              value={newAuthor}
              onChange={({ target }) => setNewAuthor(target.value)}
              rows={10}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="post-url" value="URL of post" />
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
      </div>
    </section>
  );
};

export default NewBlog;
