import type { Project } from "@/types/api";
import { fetchProjects } from "@/lib/api-client";
import { LOCAL_PROJECTS } from "@/data/localProjects";

/**
 * Fetch projects from the portfolio-admin API and merge with the local fallback.
 *
 * - API entries win on `_id` OR title collision (case-insensitive). The title
 *   match is what makes the local fallback automatically dormant once the same
 *   project is added to the admin DB, since admin assigns a real ObjectId
 *   (different from the local `local-*` sentinel `_id`).
 * - If the API call fails, returns LOCAL_PROJECTS so critical entries
 *   (e.g., a freshly-launched product) still render.
 */
export async function getProjectsWithFallback(): Promise<Project[]> {
  try {
    const apiProjects = await fetchProjects();
    const apiIds = new Set(apiProjects.map((p) => p._id));
    const apiTitles = new Set(
      apiProjects.map((p) => p.title.toLowerCase().trim())
    );
    const localOnly = LOCAL_PROJECTS.filter(
      (p) =>
        !apiIds.has(p._id) && !apiTitles.has(p.title.toLowerCase().trim())
    );
    return [...apiProjects, ...localOnly];
  } catch (error) {
    console.error("Failed to fetch projects, using local fallback:", error);
    return LOCAL_PROJECTS;
  }
}
