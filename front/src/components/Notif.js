import * as React from "react";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { useSelector, useDispatch } from "react-redux";
import { createNotification } from "../reducers/notificationReducer";

const Notif = () => {
  const notification = useSelector((state) => state.notifications);
  const dispatch = useDispatch();
  if (notification === null) {
    return null;
  } else if (notification.type === "success") {
    return (
      <Stack sx={{ width: "100%" }} spacing={2}>
        <Alert
          onClose={() => {
            dispatch(createNotification(null));
          }}
          severity="success"
        >
          {notification.message}
        </Alert>
      </Stack>
    );
  }

  return (
    <Stack sx={{ width: "100%" }} spacing={2}>
      <Alert
        onClose={() => {
          dispatch(createNotification(null));
        }}
        severity="error"
      >
        {notification.message}
      </Alert>
    </Stack>
  );
};

export default Notif;
