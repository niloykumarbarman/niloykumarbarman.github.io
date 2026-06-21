import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { PersonSchema, WebSiteSchema, OrganizationSchema } from "@/components/StructuredData";
import RootLayoutClient from "@/components/RootLayoutClient";
import { fetchProjects, fetchCertificationsLight, fetchSkillHierarchy } from "@/lib/api-client";
import type { Project, Certification } from "@/types/api";

interface SkillHierarchyNode {
  name: string;
  metadata?: {
    icon?: string;
    level?: string;
    yearsOfExperience?: number;
    lastUsed?: string;
  };
  children?: SkillHierarchyNode[];
}

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "Niloy Kumar Barman - Senior .NET Developer & AI Solutions Engineer",
    template: "%s | Niloy Kumar Barman"
  },
  description: "10+ years of experience supporting 20+ enterprise clients. Creator of DevSpace, a free Windows desktop app for centralizing developer projects. Specialized in architecting scalable solutions and practical AI tools — including SpireWiz, achieving 80% time reduction. Expert in full-stack development and automation.",
  keywords: [
    "Niloy Kumar Barman",
    ".NET Architect",
    "Senior .NET Developer",
    "AI Solutions Engineer",
    "Enterprise Architecture",
    "Cloud Migration Expert",
    "Microservices Architecture",
    "Azure Architect",
    "AWS Solutions Architect",
    "DevOps Engineer",
    "Microsoft Certified",
    "Legacy System Modernization",
    "AI Integration",
    "Fortune 500 Experience",
    "C# Expert",
    "React Developer",
    "TypeScript",
    "Full-Stack Developer",
    "Software Architecture",
    "Dhaka Bangladesh",
    "ASP.NET Core",
    "Cloud Solutions",
    "System Modernization",
    "Next.js Developer",
    "API Development",
    "Docker",
    "CI/CD",
  ],
  authors: [{ name: "Niloy Kumar Barman" }],
  creator: "Niloy Kumar Barman",
  publisher: "Niloy Kumar Barman",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://niloykumarbarman.github.io"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Niloy Kumar Barman - Senior .NET Developer & AI Solutions Engineer",
    description: "10+ years of experience supporting 20+ enterprise clients. Creator of DevSpace, a free Windows desktop app for centralizing developer projects. Specialized in architecting scalable solutions and practical AI tools — including SpireWiz, achieving 80% time reduction. Expert in full-stack development and automation.",
    url: "https://niloykumarbarman.github.io",
    siteName: "Niloy Kumar Barman Portfolio",
    images: [
      {
        url: "https://niloykumarbarman.github.io/assets/social-preview.webp",
        width: 1200,
        height: 630,
        alt: "Niloy Kumar Barman - Senior .NET Developer & AI Solutions Engineer | 10+ years supporting 20+ enterprise clients",
        type: "image/png",
      },
    ],
    locale: "en_US",
    type: "website",
    countryName: "Bangladesh",
  },
  twitter: {
    card: "summary_large_image",
    site: "@niloykumarbarman",
    creator: "@niloykumarbarman",
    title: "Niloy Kumar Barman - Senior .NET Developer & AI Solutions Engineer",
    description: "Creator of DevSpace (free Windows dev project app) and SpireWiz (AI tool, 80% time reduction). Senior .NET Architect with 10+ years supporting 20+ enterprise clients. Microsoft Certified.",
    images: {
      url: "https://niloykumarbarman.github.io/assets/social-preview.webp",
      alt: "Niloy Kumar Barman - Senior .NET Developer & AI Solutions Engineer",
      width: 1200,
      height: 630,
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "6KDQC-2OeS6NjVA21G1MJ-svIYpHNBhnsWBS0LG85a4",
  },
  category: "technology",
  classification: "Business",
  other: {
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'application-name': 'Niloy Kumar Barman Portfolio',
    'apple-mobile-web-app-title': 'Niloy Kumar Barman',
    'og:image:secure_url': 'https://niloykumarbarman.github.io/assets/social-preview.webp',
    'article:author': 'Niloy Kumar Barman',
    'profile:first_name': 'Niloy Kumar',
    'profile:last_name': 'Barman',
    'profile:gender': 'male',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Fetch data for GlobalSearch at build time
  let projects: Project[] = [];
  let certifications: Certification[] = [];
  let skillsHierarchy: SkillHierarchyNode[] = [];

  try {
    [projects, certifications, skillsHierarchy] = await Promise.all([
      fetchProjects(),
      fetchCertificationsLight(),
      fetchSkillHierarchy(),
    ]);
  } catch (error) {
    console.error('Failed to fetch layout data:', error);
    // Fallback to empty arrays
    projects = [];
    certifications = [];
    skillsHierarchy = [];
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <PersonSchema />
        <WebSiteSchema />
        <OrganizationSchema />
        <link rel="sitemap" href="/sitemap.xml" />

        {/* Only prefetch critical external resources */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />

        <meta name="theme-color" content="#00ff99" />
        <meta name="msapplication-TileColor" content="#00ff99" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body className={jetBrainsMono.variable}>
        <RootLayoutClient
          projects={projects}
          certifications={certifications}
          skillsHierarchy={skillsHierarchy}
        >
          {children}
        </RootLayoutClient>
      </body>
    </html>
  );
}
