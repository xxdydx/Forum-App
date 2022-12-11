import Blog from "../components/Blog";
import { useRef } from "react";
import { setUser } from "../reducers/userReducer";
import { useSelector, useDispatch } from "react-redux";
import Togglable from "./Togglable";
import NewBlog from "./NewBlog";
import BlogFooter from "./BlogFooter";
import { Card } from "flowbite-react";

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs);
  const blogs1 = [...blogs];

  return (
    <div className="">
      <main className="pt-8 pb-16 lg:pt-16 lg:pb-24 bg-white dark:bg-gray-900 min-h-screen">
        <div className="flex justify-between px-4 mx-auto max-w-6xl ">
          <article className="mx-auto w-full max-w-6xl	 format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
            <header className="mb-4 lg:mb-6 not-format">
              <h1 class="mb-4 text-4xl tracking-tight font-bold text-gray-900 dark:text-white">
                Posts
              </h1>
              <address className="flex items-center mb-6 not-italic"></address>
            </header>
            {blogs1.length > 0 ? (
              blogs1
                .sort((a, b) => (a.likes > b.likes ? -1 : 1))
                .map((blog) => <Blog key={blog.id} blog={blog} />)
            ) : (
              <article className="p-6 text-base bg-white border-t border-gray-200 dark:border-gray-700 dark:bg-gray-900">
                <footer className="flex justify-between items-center"></footer>
                <p className="text-gray-500 dark:text-gray-400">
                  No posts yet... Create one!
                </p>
              </article>
            )}
          </article>
        </div>
      </main>

      <BlogFooter />
    </div>
  );
};

export default BlogList;
