import { Spinner, Footer } from "flowbite-react";
import { useSelector } from "react-redux";

const BlogView = ({ blog }) => {
  const user = useSelector((state) => state.users);
  if (blog === undefined) {
    return <Spinner aria-label="Default status example" />;
  }
  return (
    <div>
      <section class="bg-white dark:bg-gray-900 flex flex-col h-screen">
        <div class="py-20 px-0 mx-auto w-2/3	 lg:py-20">
          <h2 class="mb-4 text-5xl font-extrabold text-gray-900 dark:text-white">
            {blog.title}
          </h2>
          <h2 class="mb-1 items-center text-lg font-semibold text-gray-900 dark:text-white">
            added by {blog.user.name ? blog.user.name : user.name}
          </h2>
          <h2 class="mb-8 text-lg font-semibold text-gray-900 dark:text-white">
            {blog.likes} likes
          </h2>

          <p class="lead text-gray-500 dark:text-gray-400">{blog.content}</p>
        </div>
      </section>
    </div>
  );
};

export default BlogView;
