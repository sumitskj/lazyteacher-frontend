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


const TestPage = async ({ params }) => {
  const { testId } = await params;
  const testData = await getTestData(testId);


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
              <div className="text-justify font-bold text-3xl">{`Questions on topic ${
                testData[0].topic
              } ${
                testData[0].bookName ? " from " + testData[0].bookName : ""
              }`}</div>
            </div>
          )}
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

export default TestPage;
