import { ToastifyNotification } from "@/components/NotificationComponent";
import "./globals.css";
import "react-toastify/ReactToastify.css";

export const metadata = {
  title: "LazzyTeacher",
  description: "Create your questions in just one click",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
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
