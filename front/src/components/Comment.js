import { useSelector } from "react-redux";
import { Spinner } from "flowbite-react";

const Comment = ({ comment }) => {
  const allUsers = useSelector((state) => state.allUsers);
  const user = allUsers.find((user) => user.id === comment.user);
  if (user === undefined) {
    return <Spinner aria-label="Default status example" />;
  }

  return (
    <article className="p-6 mb-6 text-base bg-white border-t border-gray-200 dark:border-gray-700 dark:bg-gray-900">
      <footer className="flex justify-between items-center mb-2">
        <div className="flex items-center">
          <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
            u/{user.username}
          </p>
        </div>
      </footer>
      <p className="text-gray-500 dark:text-gray-400">{comment.content}</p>
    </article>
  );
};

export default Comment;
