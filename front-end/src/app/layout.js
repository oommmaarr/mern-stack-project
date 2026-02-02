import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClientWrapper } from "./components/ClientLayout/ClientLayout";

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
        <ClientWrapper>
            {children}
        </ClientWrapper>
      </body>
    </html>
  );
}
