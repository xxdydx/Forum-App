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
          alt="Flowbite Logo"
        />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Blogger
        </span>
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Navbar.Link href="/about">About</Navbar.Link>
        <Navbar.Link href="/create">Create a Blog</Navbar.Link>
        <Navbar.Link href="/blogs">Other Blogs</Navbar.Link>
        {user === null && (
          <Navbar.Link className="font-bold dark:text-white" href="/login">
            Log In
          </Navbar.Link>
        )}
        {user && (
          <Navbar.Link
            className="font-bold dark:text-sky-400"
            onClick={logout}
            href=""
          >
            Log Out
          </Navbar.Link>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavigationBar;
