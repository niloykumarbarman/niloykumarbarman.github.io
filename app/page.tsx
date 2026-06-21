import {
  fetchTestimonials,
  fetchCertifications,
  fetchTimeline,
  fetchSkillHierarchy,
  fetchPortfolioMetadata,
  v2Helpers,
} from "@/lib/api-client";
import { getProjectsWithFallback } from "@/lib/projectsWithFallback";
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

export default async function HomePage() {
  let testimonials: TestimonialData[] = [];
  let featuredCertification: Certification | null = null;
  let projects: Project[] = [];
  let certifications: Certification[] = [];
  let timeline: TimelineEntry[] = [];
  let skills1: SkillNode = { name: "Skills", children: [] };
  let skills2: SkillNode = { name: "Skills", children: [] };
  let portfolioMetadata: any = { displaySettings: { showLookingForSection: false } };

  projects = await getProjectsWithFallback();

  try {
    const [testimonialData, certificationData, timelineData, skillsData, metadataData] = await Promise.all([
      fetchTestimonials(),
      fetchCertifications(),
      fetchTimeline(),
      fetchSkillHierarchy(),
      fetchPortfolioMetadata(),
    ]);

    portfolioMetadata = metadataData;
    certifications = certificationData;
    testimonials = testimonialData;
    timeline = timelineData;

    const transformedSkills = transformApiToSkillsData(skillsData);
    skills1 = transformedSkills.skills1;
    skills2 = transformedSkills.skills2;

    testimonials = testimonials.sort((a, b) => {
      const aOrder = v2Helpers.getTestimonialOrder(a);
      const bOrder = v2Helpers.getTestimonialOrder(b);
      return aOrder - bOrder;
    });

    const featuredCerts = featuredCertData
      .filter(cert => !cert.isUpcoming)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    featuredCertification = featuredCerts[0] || null;
  } catch (error) {
    console.error('Failed to fetch homepage data:', error);
    testimonials = [];
    featuredCertification = null;
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
