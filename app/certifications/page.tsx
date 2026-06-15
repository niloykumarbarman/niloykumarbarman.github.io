import CertificationsClient from "@/components/CertificationsClient";
import type { Certification } from "@/types/api";

export default async function CertificationsPage() {
  const certifications: Certification[] = [
    {
      _id: "aws-csaa-examprep",
      name: "Exam Prep: AWS Certified Solutions Architect - Associate",
      issuer: "Amazon Web Services",
      date: "2026-06-15",
      credentialId: "HMY0BPJMROUB",
      link: "https://coursera.org/verify/HMY0BPJMROUB",
      image: "/assets/certificates/webp/Coursera HG80LDK3GVBH_page-0001 (1).jpg",
      skills: ["AWS", "Cloud Architecture", "Solutions Architecture"],
      featured: true,
      showByDefault: true,
      status: "active",
      isUpcoming: false,
      order: 1,
    },
    {
      _id: "ibm-devops",
      name: "Introduction to DevOps",
      issuer: "IBM",
      date: "2026-04-11",
      credentialId: "GU2OVTLZZE81",
      link: "https://coursera.org/verify/GU2OVTLZZE81",
      image: "/assets/certificates/webp/Coursera Y33L3EFSQ904_page-0001.jpg",
      skills: ["DevOps", "CI/CD", "Agile"],
      featured: true,
      showByDefault: true,
      status: "active",
      isUpcoming: false,
      order: 2
    },
    {
      _id: "ibm-software-eng",
      name: "Introduction to Software Engineering",
      issuer: "IBM",
      date: "2026-04-14",
      credentialId: "Y33L3EFSQ904",
      link: "https://coursera.org/verify/Y33L3EFSQ904",
      image: "/assets/certificates/webp/Coursera Y33L3EFSQ904_page-0001.jpg",
      skills: ["Software Engineering", "IBM", "Coursera"],
      featured: true,
      showByDefault: true,
      status: "active",
      isUpcoming: false,
      order: 2
    },
    {
      _id: "learnkarts-cicd",
      name: "Continuous Integration & Continuous Deployment with Jenkins",
      issuer: "LearnkartS",
      date: "2026-04-16",
      credentialId: "HG80LDK3GVBH",
      link: "https://coursera.org/verify/HG80LDK3GVBH",
      image: "/assets/certificates/webp/Coursera HG80LDK3GVBH_page-0001 (1).jpg",
      skills: ["Jenkins", "CI/CD", "Docker", "DevOps", "Apache Maven", "Shell Script", "Apache Tomcat", "Containerization"],
      featured: true,
      showByDefault: true,
      status: "active",
      isUpcoming: false,
      order: 3
    },
    {
      _id: "vanderbilt-genai",
      name: "Software Engineering with Generative AI Agents",
      issuer: "Vanderbilt University",
      date: "2026-04-14",
      credentialId: "Y33L3EFSQ904",
      link: "https://www.coursera.org/verify/16ZGY3ART0GI",
      image: "/assets/certificates/webp/bestconverter_page_1.jpg",
      skills: ["Software Quality Assurance", "Generative AI","Software Architecture","AI Orchestration","Software Development","Artificial Intelligence","Generative AI","Code Reusability", "Software Testing"],
      featured: true,
      showByDefault: true,
      status: "active",
      isUpcoming: false,
      order: 4
    }



  ];

  return <CertificationsClient certifications={certifications} />;
}
