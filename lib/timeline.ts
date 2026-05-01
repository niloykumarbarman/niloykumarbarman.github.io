import type { TimelineEntry } from "@/types/api";

type TimelineOverride = Partial<TimelineEntry> & {
  exclude?: boolean;
};

const TIMELINE_OVERRIDES: Record<string, TimelineOverride> = {
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
  "Kaz Software::Senior Software Engineer": {
    exclude: true,
  },
};

const getTimelineEntryKey = (entry: Pick<TimelineEntry, "company" | "position">) =>
  `${entry.company}::${entry.position}`;

export function normalizeTimelineEntries(timeline: TimelineEntry[]): TimelineEntry[] {
  return timeline.flatMap((entry) => {
    const override = TIMELINE_OVERRIDES[getTimelineEntryKey(entry)];

    if (override?.exclude) {
      return [];
    }

    return [
      {
        ...entry,
        ...override,
      },
    ];
  });
}

