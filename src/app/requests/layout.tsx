import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Requests | Regarm.uk",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
