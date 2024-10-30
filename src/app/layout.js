import { ToastifyNotification } from "@/components/NotificationComponent";
import "./globals.css";
import "react-toastify/ReactToastify.css";
import { GoogleAnalytics } from '@next/third-parties/google'
import GoogleAdsense from "@/components/GoogleAdsense";

export const metadata = {
  title: "LazzyTeacher",
  description: "Create your questions in just one click",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <GoogleAdsense pId={"1674144837923693"} />
        <GoogleAnalytics gaId="G-CKWXG12Z1C" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body>
        <>
          {children}
          <ToastifyNotification />
        </>
      </body>
    </html>
  );
}
