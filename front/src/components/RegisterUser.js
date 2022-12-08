import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { registerUser } from "../reducers/allUsersReducer";
import { useNavigate } from "react-router-dom";
import { setNotification } from "../reducers/notificationReducer";
import BlogFooter from "./BlogFooter";
import Forum from "@mui/icons-material/Forum";

const RegisterUser = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const allUsers = useSelector((state) => state.allUsers);
  const allUsernames = allUsers.map((user) => user.username);

  const addUser = async (event) => {
    event.preventDefault();
    const newUser = {
      username: username,
      password: password,
    };
    try {
      await dispatch(registerUser(newUser));
      if (allUsernames.find((user1) => user1 === username)) {
        setUsername("");
        setPassword("");
        const notif = {
          message: `Username already taken. Try another.`,
          type: "success",
        };
        dispatch(setNotification(notif, 4000));
      }
      const notif1 = {
        message: `Account registered. You may login now.`,
        type: "success",
      };
      setUsername("");
      setPassword("");
      dispatch(setNotification(notif1, 4000));
      navigate("/login");
    } catch (error) {
      const notif2 = {
        message: `Unable to add account due to server issues. Try again later!`,
        type: "failure",
      };
      dispatch(setNotification(notif2, 4000));
    }
  };

  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center pt-36 pb-56">
          <a
            href="#"
            className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
          >
            <Forum className="mr-3 h-6 sm:h-9 dark:fill-white	" />
            Forum App
          </a>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Create an account
              </h1>
              <form class="space-y-4 md:space-y-6" onSubmit={addUser}>
                <div>
                  <label
                    for="username"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your username
                  </label>
                  <input
                    type="text"
                    name="username"
                    value={username}
                    onChange={({ target }) => setUsername(target.value)}
                    id="username"
                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder=""
                    required={true}
                  />
                </div>
                <div>
                  <label
                    for="password"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={({ target }) => setPassword(target.value)}
                    id="password"
                    placeholder="••••••••"
                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required={true}
                  />
                </div>
                <button
                  type="submit"
                  class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Create an account
                </button>
                <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                  Already have an account?{" "}
                  <a
                    href="/login"
                    class="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Login here
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
      <BlogFooter />
    </>
  );
};

export default RegisterUser;
