import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up Free",
  description:
    "Create a free QuoteFlow account and write your first AI-powered freelance proposal in 60 seconds.",
  alternates: { canonical: "/signup" },
  robots: { index: true, follow: false },
};

export default function SignupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
