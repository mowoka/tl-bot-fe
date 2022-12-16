import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import React from "react";

interface SnackbarMessageProps {
  show: boolean;
  message: string;
  status: "error" | "warning" | "info" | "success";
  onClose: () => void;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const SnackbarMessage = (props: SnackbarMessageProps) => {
  const { show, message, status, onClose } = props;
  return (
    <Snackbar
      open={show}
      autoHideDuration={6000}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      onClose={onClose}
    >
      <Alert severity={status}>{message}</Alert>
    </Snackbar>
  );
};

export default SnackbarMessage;
