import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Navbar from "./components/Navbar";
import LangDirSync from "./components/LangDirSync";
import { AppSettingsProvider } from "./components/AppSettingsProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "My Clothing Store",
  description: "Online clothing store",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AppSettingsProvider>
          <LangDirSync />
          <Navbar />

          <div className="min-h-[80vh]">{children}</div>

          {/* Footer */}
          <footer className="mt-12 border-t py-6 text-center text-sm text-gray-600">
            Contact us at{" "}
            <a
              href="mailto:info@regarm.uk"
              className="font-medium text-black underline"
            >
              info@regarm.uk
            </a>
          </footer>
        </AppSettingsProvider>
      </body>
    </html>
  );
}
