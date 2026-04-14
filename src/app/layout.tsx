import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "TalentOne — AI-Powered Talent Intelligence",
  description:
    "Quantify Semantic Match. Eliminate False Positives. Capture Alpha in Global Talent. The institutional-grade hiring intelligence layer.",
  openGraph: {
    title: "TalentOne — AI-Powered Talent Intelligence",
    description:
      "Quantify Semantic Match. Eliminate False Positives. Capture Alpha in Global Talent.",
    type: "website",
  },
};

import SmoothScroll from "./components/SmoothScroll";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <body>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
