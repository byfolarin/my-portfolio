import type { Metadata } from "next";
import { Caveat, Inter } from "next/font/google";
import Nav from "./nav";
import NowPlayingWidget from "./now-playing-widget";
import AskWidget from "./ask-widget";
import Splash from "./splash";
import { books } from "./reading/books";
import { projects } from "./projects/projects";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const caveat = Caveat({
  variable: "--font-script",
  subsets: ["latin"],
  weight: ["600"],
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
    <html lang="en" className={`${inter.variable} ${caveat.variable} antialiased`}>
      <body>
        <Splash />
        <Nav readingCount={books.length} projectsCount={projects.length} />
        <NowPlayingWidget />
        <AskWidget />
        <div className="page">{children}</div>
      </body>
    </html>
  );
}
