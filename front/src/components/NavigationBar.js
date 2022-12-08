import React from "react";
import { useState } from "react";
import {
  Navbar,
  Dropdown,
  Avatar,
  Button,
  Modal,
  Label,
  Textarea,
  TextInput,
  Checkbox,
} from "flowbite-react";
import { useDispatch } from "react-redux";
import { setUser } from "../reducers/userReducer";
import { Add } from "@mui/icons-material";
import LoginModal from "./LoginModal";
import { useNavigate } from "react-router-dom";
import ForumIcon from "@mui/icons-material/Forum";

const NavigationBar = ({ user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logout = (event) => {
    event.preventDefault();
    window.localStorage.removeItem("AKAppSessionID");
    dispatch(setUser(null));
    navigate("/");
  };

  return (
    <Navbar
      className="px-2 bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700"
      fluid={true}
    >
      <Navbar.Brand href="/">
        <ForumIcon className="mr-3 h-6 sm:h-9 dark:fill-white	" />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Forum App
        </span>
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Navbar.Link href="/posts">Posts</Navbar.Link>

        {user === null && <Navbar.Link href="/login">Create Post</Navbar.Link>}
        {user && <Navbar.Link href="/create">Create Post</Navbar.Link>}

        {user === null && (
          <Navbar.Link className="font-bold dark:text-sky-400" href="/login">
            Log In
          </Navbar.Link>
        )}
        {user && (
          <div style={{ color: "#38BDF8" }}>
            <Navbar.Link className="font-medium dark:text-sky-400">
              <Dropdown label={`u/${user.username}`} inline={true}>
                <a href={`/users/${user.username}`}>
                  <div>
                    <Dropdown.Item>My Profile</Dropdown.Item>
                  </div>
                </a>
                <div onClick={logout}>
                  <Dropdown.Item>Sign out</Dropdown.Item>
                </div>
              </Dropdown>
            </Navbar.Link>
          </div>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavigationBar;
