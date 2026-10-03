import type { Metadata } from "next";
import { projects } from "./projects/projects";
import ProjectBrowser from "./projects/project-browser";

export const metadata: Metadata = {
  title: "Folarin Folarin — Product Designer",
  description: "Selected work across fintech, design systems, and brand.",
};

export default function Home() {
  return (
    <main className="home">
      <ProjectBrowser projects={projects} />
    </main>
  );
}
