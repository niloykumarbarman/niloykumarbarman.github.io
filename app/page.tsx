import {
  fetchTestimonials,
  fetchCertifications,
  fetchProjects,
  fetchTimeline,
  fetchSkillHierarchy,
  fetchPortfolioMetadata,
  v2Helpers,
} from "@/lib/api-client";
import { transformApiToSkillsData } from "@/lib/skillsDataTransformer";
import HomeClient from "@/components/HomeClient";
import type { TestimonialData, Certification, Project, TimelineEntry } from "@/types/api";

interface SkillNode {
  name: string;
  metadata?: {
    icon: string;
    level?: "Expert" | "Advanced" | "Intermediate" | "Familiar";
    yearsOfExperience?: number;
    lastUsed?: string;
  };
  children?: SkillNode[];
}

const PORTFOLIO_OWNER_NAME = "Niloy Kumar Barman";
const PORTFOLIO_OWNER_FIRST_NAME = "Niloy";

const TESTIMONIAL_AUTHOR_OVERRIDES: Record<string, { author: string; company?: string }> = {
  "Senior Software Engineer::Pledge It": {
    author: "Aminul Sujon",
    company: "Cyber Bit Bite",
  },
};

function normalizeTestimonials(testimonials: TestimonialData[]): TestimonialData[] {
  return testimonials.map((testimonial) => {
    const overrideKey = `${testimonial.role}::${testimonial.company ?? ""}`;
    const authorOverride = TESTIMONIAL_AUTHOR_OVERRIDES[overrideKey];
    const usePortfolioOwnerName = testimonial.author.endsWith("Panday");
    let quote = testimonial.quote;

    if (usePortfolioOwnerName) {
      const originalFirstName = testimonial.author.split(" ")[0];
      quote = quote.replaceAll(testimonial.author, PORTFOLIO_OWNER_NAME);
      quote = quote.replaceAll(originalFirstName, PORTFOLIO_OWNER_FIRST_NAME);
    }

    return {
      ...testimonial,
      author: authorOverride?.author ?? (usePortfolioOwnerName ? PORTFOLIO_OWNER_NAME : testimonial.author),
      company: authorOverride?.company ?? testimonial.company,
      quote,
    };
  });
}

/**
 * Homepage - Server Component
 *
 * Fetches testimonials, certifications, projects, timeline, and skills from portfolio-admin API at build time (SSG).
 * Transforms skills data to match SkillNode format for proper technology counting.
 * Passes data to client component for interactive features.
 */
export default async function HomePage() {
  let testimonials: TestimonialData[] = [];
  let featuredCertification: Certification | null = null;
  let projects: Project[] = [];
  let certifications: Certification[] = [];
  let timeline: TimelineEntry[] = [];
  let skills1: SkillNode = { name: "Skills", children: [] };
  let skills2: SkillNode = { name: "Skills", children: [] };
  let portfolioMetadata: any = { displaySettings: { showLookingForSection: false } };

  try {
    // Fetch all data from admin API in parallel
    const [testimonialData, certificationData, projectData, timelineData, skillsData, metadataData] = await Promise.all([
      fetchTestimonials(),
      fetchCertifications(),
      fetchProjects(),
      fetchTimeline(),
      fetchSkillHierarchy(),
      fetchPortfolioMetadata(),
    ]);

    portfolioMetadata = metadataData;

    testimonials = normalizeTestimonials(testimonialData);
    certifications = certificationData;
    projects = projectData;
    timeline = timelineData;

    // Transform skills API data to SkillNode format (same as Skills page)
    const transformedSkills = transformApiToSkillsData(skillsData);
    skills1 = transformedSkills.skills1;
    skills2 = transformedSkills.skills2;

    // V2: Sort testimonials by order field (lower order = higher priority)
    testimonials = testimonials.sort((a, b) => {
      const aOrder = v2Helpers.getTestimonialOrder(a);
      const bOrder = v2Helpers.getTestimonialOrder(b);
      return aOrder - bOrder;
    });

    // Get the most recent featured certification
    const featuredCerts = certifications
      .filter(cert => cert.featured && !cert.isUpcoming)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    featuredCertification = featuredCerts[0] || null;
  } catch (error) {
    console.error('Failed to fetch homepage data:', error);
    // Fallback to defaults
    testimonials = [];
    featuredCertification = null;
    projects = [];
    certifications = [];
    timeline = [];
    skills1 = { name: "Skills", children: [] };
    skills2 = { name: "Skills", children: [] };
  }

  return (
    <HomeClient
      testimonials={testimonials}
      featuredCertification={featuredCertification}
      projects={projects}
      certifications={certifications}
      timeline={timeline}
      skills1={skills1}
      skills2={skills2}
      portfolioMetadata={portfolioMetadata}
    />
  );
}
