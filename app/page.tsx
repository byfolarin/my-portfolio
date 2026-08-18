import type { Metadata } from "next";
import { projects } from "./projects/projects";
import ProjectBrowser from "./projects/project-browser";

export const metadata: Metadata = {
  title: "Folarin Folarin — Product Designer",
  description: "Selected work across fintech, design systems, and brand.",
};

export default function Home() {
  return (
    <main className="projects-page">
      <figure className="projects-headshot">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/folarin-headshot.jpg" alt="Folarin Folarin" />
      </figure>
      <header className="projects-intro">
        <p>Selected work</p>
        <h1>
          I shape products, systems, and brands with clarity from first idea
          to final detail.
        </h1>
      </header>
      <ProjectBrowser projects={projects} />
    </main>
  );
}
