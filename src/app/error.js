"use client"; // Error boundaries must be Client Components

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Error({ error, reset }) {
  const [errorMsg, setErrorMsg] = useState(
    "Something went wrong!. Please try again."
  );
  useEffect(() => {
    console.error(error.message);
    if (error.message.includes("429")) {
      setErrorMsg(
        "You have exceeded the 5 requests in 1 hour limit! Please try again after sometime."
      );
    }
  }, [error]);

  return (
    <div className="flex w-full h-full flex-col justify-start items-start relative">
      <div className="flex justify-between items-center w-full relative px-8 py-6 border-b border-gray-300">
        <Link href={"/"} className="text-xl font-bold text-black">
          Lazzy<span className="text-green-500">Teacher</span>
        </Link>
      </div>
      <div className="flex flex-col justify-center items-center w-full pt-20 gap-6">
        <h2>{errorMsg}</h2>
        <button
          className="bg-blue-500 text-white rounded-md p-2 text-sm font-medium"
          onClick={() => reset()}
        >
          Try again
        </button>
      </div>
    </div>
  );
}
