import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: {
    default: "Krish's Blog - Developer Insights & Tech Journey",
    template: "%s | Krish's Blog"
  },
  description: "Join me on my development journey as I share insights about web development, Next.js, React, and modern tech stacks. Discover tutorials, project breakdowns, and developer experiences.",
  icons: {
    icon: [
      { url: '/K.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.ico', sizes: '16x16', type: 'image/x-icon' },
    ],
    apple: '/K.png',
    shortcut: '/K.png',
  },
  keywords: [
    "web development",
    "Next.js",
    "React",
    "TypeScript",
    "JavaScript",
    "Tailwind CSS",
    "developer blog",
    "programming tutorials",
    "tech insights",
    "Krish developer"
  ],
  authors: [{ name: "Krish" }],
  creator: "Krish",
  publisher: "Krish",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
