import { fetchTimeline } from "@/lib/api-client";
import CareerClient from "@/components/CareerClient";
import type { TimelineEntry } from "@/types/api";

const CAREER_TIMELINE_OVERRIDES: Record<string, Partial<TimelineEntry>> = {
  "Chorki Limited::Software Engineer": {
    company: "Cyber Bit Byte",
    icon: "/assets/company-icon/svg/cyber-bit-byte.svg",
    startDate: "2025-01-01",
    endDate: "2025-12-31",
    url: "https://cyberbitbyte.com",
  },
  "Brain Station-23::Intern": {
    company: "Cyber Bit Byte",
    icon: "/assets/company-icon/svg/cyber-bit-byte.svg",
    startDate: "2024-09-01",
    endDate: "2024-12-31",
    url: "https://cyberbitbyte.com",
  },
};

function normalizeCareerTimeline(timeline: TimelineEntry[]): TimelineEntry[] {
  return timeline.map((entry) => {
    const overrideKey = `${entry.company}::${entry.position}`;
    return {
      ...entry,
      ...CAREER_TIMELINE_OVERRIDES[overrideKey],
    };
  });
}

/**
 * Career/Timeline Page - Server Component
 *
 * Fetches timeline/experience data from portfolio-admin API at build time (SSG).
 * Passes data to client component for interactive timeline.
 */
export default async function CareerPage() {
  let timeline: TimelineEntry[] = [];

  try {
    // Fetch timeline from admin API at build time
    timeline = normalizeCareerTimeline(await fetchTimeline());
  } catch (error) {
    console.error('Failed to fetch timeline:', error);
    // Fallback to empty array
    timeline = [];
  }

  return <CareerClient timeline={timeline} />;
}
