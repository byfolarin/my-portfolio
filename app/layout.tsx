import type { Metadata } from "next";
import { Caveat, Inter, Newsreader } from "next/font/google";
import Nav from "./nav";
import ScrollPlayer from "./scroll-player";
import AskWidget from "./ask-widget";
import Splash from "./splash";
import ThemeToggle from "./theme-toggle";
import { books } from "./reading/books";
import { projects } from "./projects/projects";
import { writings } from "./writing/writings";
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

const newsreader = Newsreader({
  variable: "--font-serif",
  subsets: ["latin"],
  style: ["normal", "italic"],
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
    <html
      lang="en"
      className={`${inter.variable} ${caveat.variable} ${newsreader.variable} antialiased`}
      suppressHydrationWarning
    >
      <body>
        <script
          dangerouslySetInnerHTML={{
            __html:
              '(function(){try{var p=new URLSearchParams(location.search).get("theme");var t=p||localStorage.getItem("theme");if(t==="dark"||t==="light")document.documentElement.dataset.theme=t}catch(e){}})()',
          }}
        />
        <Splash />
        <Nav
          readingCount={books.length}
          projectsCount={projects.length}
          writingCount={writings.length}
        />
        <ScrollPlayer />
        <AskWidget />
        <ThemeToggle />
        <div className="page">{children}</div>
      </body>
    </html>
  );
}
