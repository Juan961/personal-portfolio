import type { Metadata } from "next";
import "./globals.css";

import { Plus_Jakarta_Sans } from 'next/font/google'; 

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--jakarta',
  display: 'swap',
}) 

export const metadata: Metadata = {
  title: "Portfolio | Juan Garcia",
  description: "Juan Garcia is a Software Developer and Mechatronics Engineer specializing in serverless cloud architecture (AWS, Azure), full-stack web development (Nuxt.js, Python), and AI solutions. Building scalable applications, IoT systems and control systems.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${plusJakartaSans.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
