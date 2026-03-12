import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Niloy Kumar Barman - Full-Stack .NET Developer",
  description: "Professional portfolio of Niloy Kumar Barman, a Full-Stack .NET Developer building modern web applications, cloud solutions, and practical AI tools.",
  keywords: [
    "Niloy Kumar Barman",
    "Full-Stack Developer", 
    ".NET Developer",
    "React Developer",
    "Azure Developer",
    "AWS Developer",
    "DevOps Engineer",
    "Software Engineer",
    "Microsoft Certified",
    "Azure Certification",
    "Projects",
    "Software Development",
    "Web Development",
    "Cloud Solutions",
    "Dhaka Bangladesh"
  ],
  openGraph: {
    title: "Niloy Kumar Barman - Full-Stack .NET Developer",
    description: "Professional portfolio showcasing modern .NET, React, and cloud-focused engineering work",
    url: "https://niloykumarbarman.github.io",
  },
  twitter: {
    title: "Niloy Kumar Barman - Full-Stack .NET Developer",
    description: "Professional portfolio showcasing modern .NET, React, and cloud-focused engineering work",
  },
};

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 

