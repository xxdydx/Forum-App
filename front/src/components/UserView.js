import { Spinner, Footer } from "flowbite-react";
import blogReducer from "../reducers/blogReducer";
import users from "../services/users";
import Blog from "./Blog";

const UserView = ({ userInView }) => {
  if (userInView === undefined) {
    return null;
  }
  const totalVotes = userInView.blogs
    .map((blog) => blog.likes)
    .reduce((accumulator, currentValue) => accumulator + currentValue, 0);

  return (
    <section class="bg-white dark:bg-gray-900 flex flex-col h-screen">
      <div class="py-20 px-0 mx-auto w-2/3	 lg:py-20">
        <h2 class="mb-4 text-5xl font-extrabold text-gray-900 dark:text-white">
          u/{userInView.username}
        </h2>
        <h2 class="mb-8 items-center text-lg font-semibold text-gray-900 dark:text-white">
          {totalVotes} likes
        </h2>
        <h2 class="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
          Posts added by {userInView.name}
        </h2>
        {userInView.blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </div>
    </section>
  );
};

export default UserView;
