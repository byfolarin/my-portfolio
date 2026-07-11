import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Nav from "./nav";
import ScrollPlayer from "./scroll-player";
import AskWidget from "./ask-widget";
import ThemeToggle from "./theme-toggle";
import { books } from "./reading/books";
import { projects } from "./projects/projects";
import { writings } from "./writing/writings";
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
    <html
      lang="en"
      className={`${inter.variable} antialiased`}
      suppressHydrationWarning
    >
      <body>
        <script
          dangerouslySetInnerHTML={{
            __html:
              '(function(){try{var p=new URLSearchParams(location.search).get("theme");var t=p||localStorage.getItem("theme");if(t==="dark"||t==="light")document.documentElement.dataset.theme=t}catch(e){}})()',
          }}
        />
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
