import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const stackSans = localFont({
  src: [
    {
      path: "../../public/fonts/StackSans/StackSansHeadline-Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/StackSans/StackSansHeadline-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/StackSans/StackSansHeadline-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/StackSans/StackSansHeadline-SemiBold.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/StackSans/StackSansHeadline-Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-stack-sans",
  display: "swap",
});

const geistPixel = localFont({
  src: "../../public/fonts/GeistPixel/GeistPixel-Square.otf",
  variable: "--font-geist-pixel",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Shravani Sutar — Product Designer",
  description: "Product | UI/UX | Visual Designer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${stackSans.variable} ${geistPixel.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
