import { Navbar, Dropdown, Avatar, Button } from "flowbite-react";
import { useDispatch } from "react-redux";
import { setUser } from "../reducers/userReducer";
import { Add } from "@mui/icons-material";

const NavigationBar = ({ user }) => {
  const dispatch = useDispatch();
  const logout = (event) => {
    event.preventDefault();
    window.localStorage.removeItem("AKAppSessionID");
    dispatch(setUser(null));
  };
  return (
    <Navbar fluid={true}>
      <Navbar.Brand href="/">
        <img
          src="https://flowbite.com/docs/images/logo.svg"
          className="mr-3 h-6 sm:h-9"
          alt="Logo"
        />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Blogger
        </span>
      </Navbar.Brand>
      <div className="flex md:order-last space-x-6 ">
        <div>
          <Button href="/create">
            <Add className="mr-2 h-5 w-5" />
            Create Blog
          </Button>
        </div>

        <Dropdown
          arrowIcon={false}
          inline={true}
          label={
            <Avatar
              alt="User settings"
              img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
              rounded={true}
            />
          }
        >
          <Dropdown.Header>
            <span className="block text-sm">{user.name}</span>
            <span className="block truncate text-sm font-medium">
              Junior Member
            </span>
          </Dropdown.Header>
          <Dropdown.Item>My Blogs</Dropdown.Item>
          <Dropdown.Item>Other Users</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item>
            <div onClick={logout}>Sign out</div>
          </Dropdown.Item>
        </Dropdown>
        <Navbar.Toggle />
      </div>

      <Navbar.Collapse>
        <Navbar.Link href="/about">About</Navbar.Link>
        <Navbar.Link href="/create">Create a Blog</Navbar.Link>
        <Navbar.Link href="/blogs">Other Blogs</Navbar.Link>
        <Navbar.Link href="/contact">Contact</Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavigationBar;
