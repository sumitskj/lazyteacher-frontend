"use client";

import React from "react";
import InsertLinkRoundedIcon from "@mui/icons-material/InsertLinkRounded";
import { sendSucessNotification } from "./NotificationComponent";

function CopyShareLink() {
  const copyShareUrl = () => {
    let t = `${window.location.href}`;
    navigator.clipboard.writeText(t);
    sendSucessNotification({ message: `Share link copied to clipboard` });
  };

  return (
    <div
      onClick={copyShareUrl}
      className="flex justify-center items-center px-2 py-2 bg-blue-500 text-white rounded-md gap-1 cursor-pointer"
    >
      <InsertLinkRoundedIcon fontSize="small" />
      <div className="text-sm">Share Test Link</div>
    </div>
  );
}

export default CopyShareLink;
