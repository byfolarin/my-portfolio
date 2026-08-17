import type { Metadata } from "next";
import { projects } from "./projects";
import ProjectBrowser from "./project-browser";

export const metadata: Metadata = {
  title: "Projects — Folarin Folarin",
  description: "Selected work across fintech, design systems, and brand.",
};

export default function Projects() {
  return (
    <main className="projects-page">
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
