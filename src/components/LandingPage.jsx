"use client";
import { fetchBackendApiWrapper } from "@/utils/apiWrapper";
import { CircularProgress } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { sendErrorNotification } from "./NotificationComponent";

function LandingPage() {
  const router = useRouter();
  const [topic, setTopic] = useState("");
  const [topicError, setTopicError] = useState(true);
  const [chapterName, setChapterName] = useState("");
  const [generatingQuestionsLoader, setGeneratingQuestionsLoader] =
    useState(false);

  const generateQuestions = async () => {
    try {
      if (topicError) {
        sendErrorNotification({ message: "Please fill all the details" });
        return;
      }
      if (generatingQuestionsLoader) return;
      setGeneratingQuestionsLoader(true);
      const payload = {
        topic: topic,
        bookName: chapterName,
      };
      const res = await fetchBackendApiWrapper(
        `/generateQuestions`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        },
        null
      );
      if (res && res.ok) {
        const testData = await res.json();
        router.push(`/test/${testData.testId}`);
      } else if (res.status === 429) {
        console.error("Error in generatingQuestions ", res.status);
        sendErrorNotification({
          message:
            "You have exceeded the 5 requests in 1 hour limit! Please try again after sometime.",
        });
      } else {
        console.error("Error in generatingQuestions ", res.status);
        sendErrorNotification({
          message: "Something went wrong. Please try again.",
        });
      }
    } catch (err) {
      console.error("Error in generatingQuestions ", err);
      sendErrorNotification({
        message: "Something went wrong. Please try again.",
      });
    }
    setGeneratingQuestionsLoader(false);
  };

  return (
    <>
      <div className="flex flex-col justify-start items-start gap-2 w-full sm:w-2/3 py-8 px-8 md:px-0 ">
        <div className="flex flex-col justify-start items-start gap-2 w-full">
          <div className="font-light">
            ➪ <span className="font-medium">Topic</span> for which you want to
            create questions on *
          </div>
          <input
            className={`border px-2 py-1 rounded-md focus:outline-none focus:ring-0 focus:border-black ${
              topicError ? "border-red-500" : ""
            } w-full`}
            placeholder="Electromagnetic Induction"
            value={topic}
            onChange={(e) => {
              setTopic(e.target.value);
              setTopicError(e.target.value.length > 0 ? false : true);
            }}
          />
        </div>
        <div className="flex flex-col justify-start items-start gap-2 w-full">
          <div className="font-light">
            ➪ <span className="font-medium">Class, Book or chapter name</span>{" "}
            from which you want to take reference from
          </div>
          <input
            className="border px-2 py-1 rounded-md focus:outline-none focus:ring-0 focus:border-black w-full"
            placeholder="Class 12 CBSE Physics book, chapter electromagnetic induction"
            value={chapterName}
            onChange={(e) => setChapterName(e.target.value)}
          />
        </div>
      </div>
      <div className="flex justify-center items-center w-full sm:w-2/3 px-8 lg:px-0">
        <button
          onClick={generateQuestions}
          className="w-full text-center bg-green-500 font-medium text-white px-10 py-2 rounded-lg border border-green-500 hover:bg-white hover:text-green-500 hover:border hover:border-black"
        >
          {generatingQuestionsLoader ? (
            <div className="text-sm flex justify-center items-center gap-4">
              <CircularProgress size={"1.2rem"} color="white" /> Generating
              Questions. Please wait...
            </div>
          ) : (
            "Generate Questions"
          )}
        </button>
      </div>
    </>
  );
}

export default LandingPage;
