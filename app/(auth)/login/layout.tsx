import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In",
  description:
    "Sign in to your QuoteFlow account and start generating professional freelance proposals.",
  alternates: { canonical: "/login" },
  robots: { index: true, follow: false },
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
