import type { Project } from "@/types/api";

/**
 * Local project fallback layer.
 *
 * Entries here are merged into the API-fetched project list by
 * `lib/projectsWithFallback.ts`. API entries win on `_id` OR title collision
 * (case-insensitive), so a local entry automatically goes dormant once the
 * same project lands in portfolio-admin.
 *
 * Currently empty — DevSpace was migrated into portfolio-admin (2026-05-02).
 * Add entries here only for projects that must render before they can be
 * entered in the admin DB (e.g., a freshly-launched product on launch day).
 */

export const LOCAL_PROJECTS: Project[] = [];
