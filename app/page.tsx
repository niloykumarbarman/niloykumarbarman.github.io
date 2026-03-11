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

const TESTIMONIAL_NAME_REPLACEMENTS: Record<string, string> = {
  "Biswajit Panday": "Niloy Kumar Barman",
  "Biswajit": "Niloy",
  "Md Aminul Hoque": "Aminul Sujon",
};

const TESTIMONIAL_COMPANY_REPLACEMENTS: Record<string, string> = {
  "Pledge It": "Cyber Bit Bite",
};

function normalizeTestimonials(testimonials: TestimonialData[]): TestimonialData[] {
  return testimonials.map((testimonial) => {
    let quote = testimonial.quote;

    for (const [from, to] of Object.entries(TESTIMONIAL_NAME_REPLACEMENTS)) {
      quote = quote.replaceAll(from, to);
    }

    return {
      ...testimonial,
      author: TESTIMONIAL_NAME_REPLACEMENTS[testimonial.author] ?? testimonial.author,
      company: testimonial.company
        ? (TESTIMONIAL_COMPANY_REPLACEMENTS[testimonial.company] ?? testimonial.company)
        : testimonial.company,
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
