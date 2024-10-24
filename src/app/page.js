import LandingPage from "@/components/LandingPage";
import Image from "next/image";

export async function generateMetadata({ params }) {
  let description =
    "LazzyTeacher, Hey you lazy, create your questions on any topic in just one click";

  const metadata = {
    title: `LazzyTeacher`,
    description: description,
    openGraph: {
      title: "LazzyTeacher",
      description: description,
      type: "article",
      url: `https://lazzyteacher.com/`,
      images: ["/opengraph-image.png"],
    },
  };

  return metadata;
}

export default function Home() {
  return (
    <div className="grid grid-cols-3 justify-start items-start w-full">
      <div className="col-span-3 lg:col-span-2 flex flex-col justify-center items-center w-full relative font-epilogue h-screen gap-2">
        <div className="absolute top-0 left-0 w-full z-10 bg-blue-500 text-white text-center py-3">
          <div>
            This is a FREE tool, with a daily limit of up to 10 generations per
            user
          </div>
        </div>
        <div className="text-5xl font-bold text-black">
          Lazzy<span className="text-green-500">Teacher</span>
        </div>
        <div className="font-light font-sans">
          Hey you lazy, create your questions on any topic in just one click
        </div>
        <LandingPage />
      </div>
      <div className="hidden col-span-1 lg:flex w-full h-screen bg-green-500 flex-col justify-center items-center relative">
        <Image
          src="/assets/lazyteacher.png"
          alt="Hero image"
          height={500}
          width={500}
        />
      </div>
    </div>
  );
}
