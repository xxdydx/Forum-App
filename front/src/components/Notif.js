import * as React from "react";
import { Toast } from "flowbite-react";
import DoneIcon from "@mui/icons-material/Done";
import ClearIcon from "@mui/icons-material/Clear";
import { useSelector } from "react-redux";

const Notif = () => {
  const notification = useSelector((state) => state.notifications);
  if (notification === null) {
    return null;
  } else if (notification.type === "success") {
    return (
      <Toast className=" fixed  bottom-5 left-5">
        <div
          className="inline-flex 
h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200 
"
        >
          <DoneIcon />
        </div>
        <div className="ml-3 text-sm font-normal">{notification.message}</div>
        <Toast.Toggle />
      </Toast>
    );
  }

  return (
    <Toast className="fixed bottom-5 left-5">
      <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200">
        <ClearIcon />
      </div>
      <div className="ml-3 text-sm font-normal">{notification.message}</div>
      <Toast.Toggle />
    </Toast>
  );
};

export default Notif;
