import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Nav from "./nav";
import NowPlayingWidget from "./now-playing-widget";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Folarin Folarin",
  description: "Product designer. Based in Lagos, Nigeria.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <body>
        <Nav />
        <NowPlayingWidget />
        <div className="page">{children}</div>
      </body>
    </html>
  );
}
