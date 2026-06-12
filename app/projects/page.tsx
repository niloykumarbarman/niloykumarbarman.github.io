import { getProjectsWithFallback } from "@/lib/projectsWithFallback";
import ProjectsClient from "@/components/ProjectsClient";
import type { Project } from "@/types/api";

/**
 * Projects Page - Server Component
 *
 * Fetches projects from portfolio-admin API at build time (SSG) and merges
 * with the local fallback in `data/localProjects.ts`. API entries win on
 * `_id` collision.
 */
export default async function ProjectsPage() {
  const projects: Project[] = await getProjectsWithFallback();
  return <ProjectsClient projects={projects} />;
}
