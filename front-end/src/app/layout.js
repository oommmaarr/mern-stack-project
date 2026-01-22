import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Notch from "./components/notch/notch";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Ali Badr Services",
  description: "TOP-UP GAMES AND SOCIAL MEDIA",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#D9D9D9]`}
      >
        <div className="fixed top-0 left-0 right-0 flex items-center justify-center xl:w-full  z-50">
          <Notch />
        </div>
        <div>
          {children}
        </div>
      </body>
    </html>
  );
}
