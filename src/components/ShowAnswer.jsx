"use client";

import React, { useState } from "react";
import FormatListNumberedRoundedIcon from "@mui/icons-material/FormatListNumberedRounded";

function ShowAnswer({ testData }) {
  const [showAnswers, setShowAnswers] = useState(false);
  return (
    <div className="flex justify-start items-center gap-4">
      <button
        onClick={() => setShowAnswers(!showAnswers)}
        className="border border-gray-400 rounded-md flex justify-center items-center px-2 py-2 text-black text-sm gap-1 cursor-pointer"
      >
        <FormatListNumberedRoundedIcon fontSize="small" />
        <div className="text-sm">{`${
          showAnswers ? "Hide Answer" : "Show Answer"
        }`}</div>
      </button>
      {showAnswers && <div className="text-green-500">{testData.answer}</div>}
    </div>
  );
}

export default ShowAnswer;
