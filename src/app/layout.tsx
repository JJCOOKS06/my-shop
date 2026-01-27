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
  title: "Regarm.uk",
  description: "All your favourite products, at a fraction of the price.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AppSettingsProvider>
          <LangDirSync />
          <Navbar />

          <main className="mx-auto max-w-5xl p-6">{children}</main>

          <footer className="border-t">
            <div className="mx-auto max-w-5xl p-4 text-center text-sm text-gray-600">
              Contact us at{" "}
              <a
                href="mailto:info@regarm.uk"
                className="font-medium text-black underline"
              >
                info@regarm.uk
              </a>
            </div>
          </footer>
        </AppSettingsProvider>
      </body>
    </html>
  );
}
