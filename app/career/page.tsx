import { fetchTimeline } from "@/lib/api-client";
import CareerClient from "@/components/CareerClient";
import type { TimelineEntry } from "@/types/api";

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
    timeline = await fetchTimeline();
    timeline = JSON.parse(JSON.stringify(timeline).replace(/Brain Station-23/g, "Cyber Bit Byte").replace(/brain-station-23/g, "cyber-bit-byte").replace(/https:\/\/brainstation-23\.com/g, "https:\/\/cyberbitbyte.com"));
  } catch (error) {
    console.error('Failed to fetch timeline:', error);
    // Fallback to empty array
    timeline = [];
  }

  return <CareerClient timeline={timeline} />;
}
