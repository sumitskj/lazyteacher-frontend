"use client";

import { ToastContainer, toast } from "react-toastify";

export const sendErrorNotification = ({ message }) => {
  toast.error(message, {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });
};

export const sendSucessNotification = ({ message }) => {
  console.log(message);
  toast.success(message, {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });
};

export const ToastifyNotification = () => {
  return <ToastContainer />;
};
