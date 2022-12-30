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
import { useNavigate } from "react-router-dom";
import ForumIcon from "@mui/icons-material/Forum";
import { DarkThemeToggle } from "flowbite-react";
import { DarkMode } from "@mui/icons-material";
import { LightMode } from "@mui/icons-material";

const NavigationBar = ({ user, handleThemeSwitch, theme }) => {
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
      fluid={true}
      class="px-4 pt-4 bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700"
    >
      <Navbar.Brand href="/">
        <ForumIcon className="mr-3 h-6 sm:h-9 dark:fill-white	" />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Forum App
        </span>
      </Navbar.Brand>
      <Navbar.Toggle className="justify-left" />
      <Navbar.Collapse>
        <Navbar.Link href="/about">About this App</Navbar.Link>

        {user === null && <Navbar.Link href="/login">Create Post</Navbar.Link>}
        {user && <Navbar.Link href="/create">Create Post</Navbar.Link>}

        {user === null && (
          <Navbar.Link className="font-bold text-sky-400" href="/login">
            Log In
          </Navbar.Link>
        )}
        {user && (
          <div style={{ color: "#38BDF8" }}>
            <Navbar.Link className="font-medium text-violet-800	dark:text-sky-400">
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
        <Navbar.Link>
          <div>
            <button
              className={theme ? "dark" : ""}
              data-testid="dark-theme-toggle"
              onClick={handleThemeSwitch}
              type="button"
              aria-label="Toggle dark mode"
            >
              {theme ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#9CA3AF"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="#9CA3AF"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#6B7280"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="#6B7280"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
                  />
                </svg>
              )}
            </button>
          </div>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavigationBar;
