import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "DevSpace — Developer Productivity for Windows",
  description:
    "DevSpace is a free Windows desktop app that centralizes every developer project — auto-discovers installed tools, encrypts per-project credentials with Windows DPAPI, and bundles a full git workflow. Built with Electron + .NET 9.",
  keywords: [
    "DevSpace",
    "Developer Productivity",
    "Windows Desktop App",
    "Electron",
    ".NET 9",
    "Clean Architecture",
    "Developer Tools",
    "Project Management",
    "Git Workflow",
    "Encrypted Credentials",
    "DPAPI",
  ],
  openGraph: {
    title: "DevSpace — Centralize every developer project",
    description:
      "Free Windows desktop app: auto-discovers tools, encrypts credentials, bundles a full git workflow. Built over 18 months.",
    url: "https://niloykumarbarman.github.io/devspace",
    images: [
      {
        url: "https://niloykumarbarman.github.io/assets/devspace/hero.png",
        width: 1920,
        height: 1080,
        alt: "DevSpace dashboard — every project at a glance",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DevSpace — Developer Productivity for Windows",
    description:
      "Free Windows desktop app: one dashboard for every project. Tools, credentials, git, terminals.",
    images: ["https://niloykumarbarman.github.io/assets/devspace/hero.png"],
  },
  alternates: {
    canonical: "https://niloykumarbarman.github.io/devspace",
  },
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "DevSpace",
  description:
    "Free Windows desktop app that centralizes every developer project — auto-discovers installed tools, encrypts per-project credentials with Windows DPAPI, and bundles a full git workflow.",
  applicationCategory: "DeveloperApplication",
  applicationSubCategory: "Productivity",
  operatingSystem: "Windows 10, Windows 11",
  softwareVersion: "2.2.0-preview",
  releaseNotes:
    "Public preview release: dynamic tool discovery (100+ apps in <3s), encrypted credential vault, full git workflow (commit graph, hunk staging, blame, conflict resolver), tool templates, personalized quick links.",
  downloadUrl:
    "https://github.com/niloykumarbarman/Devspace-Releases/releases/latest",
  installUrl:
    "https://github.com/niloykumarbarman/Devspace-Releases/releases/latest",
  url: "https://niloykumarbarman.github.io/devspace",
  image: "https://niloykumarbarman.github.io/assets/devspace/hero.png",
  screenshot: [
    "https://niloykumarbarman.github.io/assets/devspace/hero.png",
    "https://niloykumarbarman.github.io/assets/devspace/tool-discovery.png",
    "https://niloykumarbarman.github.io/assets/devspace/git-view.png",
    "https://niloykumarbarman.github.io/assets/devspace/single-project-card.png",
  ],
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
  },
  author: {
    "@type": "Person",
    name: "Niloy Kumar Barman",
    url: "https://niloykumarbarman.github.io",
  },
  contributor: {
    "@type": "Person",
    name: "Abdullah Saleh Robin",
  },
  license:
    "https://github.com/niloykumarbarman/Devspace-Releases/blob/main/PRIVACY.md",
};

export default function DevSpaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(softwareApplicationSchema),
        }}
      />
      {children}
    </>
  );
}
