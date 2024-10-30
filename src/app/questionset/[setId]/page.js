const { fetchBackendApiWrapper } = require("@/utils/apiWrapper");
import CopyShareLink from "@/components/CopyShareLink";
import ShowAnswer from "@/components/ShowAnswer";
import Link from "next/link";

const getTestData = async (testId) => {
  try {
    const res = await fetchBackendApiWrapper(
      `/test/${testId}`,
      {
        method: "GET",
        cache: "no-store",
      },
      null
    );
    if (res && res.ok) {
      const testData = await res.json();
      return testData;
    } else if (res.status === 429) {
      throw new Error("429: Rate Limit Error");
    } else {
      throw new Error("");
    }
  } catch (err) {
    throw err;
  }
};

export async function generateMetadata({ params }) {
  // Fetch post data
  const { setId } = await params;
  const testData = await getTestData(setId);
  let description = `Questions for practice on topic: ${testData[0].topic} ${
    testData[0].bookName ? " from " + testData[0].bookName : ""
  }`;

  const metadata = {
    title: `LazzyTeacher | ${testData[0].topic} ${
      testData[0].bookName ? " from " + testData[0].bookName : ""
    }`,
    description: description,
    openGraph: {
      title: testData[0].topic,
      description: description,
      type: "article",
      url: `https://lazzyteacher.com/questionset/${setId}`,
      images: ["/opengraph-image.png"],
    },
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: `LazzyTeacher | ${testData[0].topic} ${
      testData[0].bookName ? " from " + testData[0].bookName : ""
    }`,
    datePublished: testData[0].updatedAt,
    dateModified: testData[0].createdAt,
    description: description,
    author: {
      "@type": "Person",
      name: "Anon",
    },
  };

  metadata.structuredData = structuredData;
  return metadata;
}

const QuestionSetPage = async ({ params }) => {
  const { setId } = await params;
  const testData = await getTestData(setId);

  return (
    <div className="flex w-full h-full flex-col justify-start items-start relative">
      <div className="flex justify-between items-center w-full relative px-8 py-6 border-b border-gray-300">
        <Link href={"/"} className="text-xl font-bold text-black">
          Lazzy<span className="text-green-500">Teacher</span>
        </Link>
        <div className="flex justify-end items-center gap-4">
          <CopyShareLink />
        </div>
      </div>
      <div className="grid grid-cols-4 justify-start items-start w-full pt-6">
        <div className="col-span-1 w-full"></div>
        <div className="col-span-2 flex flex-col justify-start items-start gap-8 w-full">
          {testData && testData.length > 0 && (
            <div className="w-full justify-center items-center flex flex-col gap-6">
              <h1 className="text-justify font-bold text-3xl">{`Questions on topic ${
                testData[0].topic
              } ${
                testData[0].bookName ? " from " + testData[0].bookName : ""
              }`}</h1>
            </div>
          )}
          <h4 className="text-sm text-gray-600 border-b border-gray-600 pb-8 text-justify">
            Hey Lovely, thanks for using LazzyTeacher. Our AI creates each
            multiple-choice question with precision, focusing on a thorough
            understanding of the topic given by you. Designed to engage and
            challenge learners, ensuring a strong grasp on the topics. <br />
            These questions will really help letting you know whether you have a
            good grasp on topics or not, as they are not just made by humans who
            try to make same type of questions every time, its our AI that covers
            every corner of the topic and tests you thoroughly and is
            unpredictable as to what questions it can make, something that no
            one has uncovered until now.
          </h4>
          {testData &&
            testData.map((q, ind) => {
              return (
                <>
                  <div
                    key={ind}
                    className="w-full flex flex-col justify-start items-start gap-2"
                  >
                    <div className="w-full">{`Q${ind + 1}. ${q.question}`}</div>
                    <div className="w-full flex flex-col justify-start items-start gap-1">
                      {q.option.map((o, v) => {
                        return (
                          <div
                            key={`${q.id}-${v}`}
                            className="w-full flex justify-start items-center gap-2"
                          >
                            <input
                              type="radio"
                              id={`option-${v}-${q.id}`}
                              name={`option-${q.id}`}
                              className="accent-green-500"
                            />
                            {o}
                          </div>
                        );
                      })}
                    </div>
                    <ShowAnswer testData={q} />
                  </div>
                </>
              );
            })}
          <div className="py-8"></div>
        </div>
        <div className="col-span-1 w-full"></div>
      </div>
    </div>
  );
};

export default QuestionSetPage;
