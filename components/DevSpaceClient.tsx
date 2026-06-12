"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import Badge from "@/components/Badge";
import BackgroundElements from "@/components/BackgroundElements";
import {
  FaDownload,
  FaGithub,
  FaTools,
  FaServer,
  FaLock,
  FaGitAlt,
  FaCode,
  FaCogs,
  FaCodeBranch,
  FaChartLine,
  FaCheckCircle,
  FaProjectDiagram,
  FaStar,
  FiArrowRight,
  FiZap,
  SiReact,
  SiDotnet,
  SiTypescript,
  SiTailwindcss,
  SiSqlite,
} from "@/lib/icons";

const MermaidDiagram = dynamic(() => import("@/components/MermaidDiagram"), {
  loading: () => (
    <div className="flex items-center justify-center h-48 bg-white/5 rounded-lg">
      <div className="text-white/40 text-sm">Loading diagram…</div>
    </div>
  ),
  ssr: false,
});

const Lightbox = dynamic(() => import("yet-another-react-lightbox"), {
  ssr: false,
  loading: () => (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">
      <div className="text-white/60 text-sm">Loading image viewer…</div>
    </div>
  ),
});

const importLightboxStyles = () => {
  if (typeof window !== "undefined") {
    import("yet-another-react-lightbox/styles.css");
  }
};

const ARCHITECTURE_DIAGRAM = `graph TB
    User([👤 You])
    subgraph Desktop["💻 Your Windows machine"]
        Electron["🖼️ Electron + React UI"]
        API["⚙️ .NET 9 WebAPI<br/>(local, port 7003)"]
        DB[("🗄️ SQLite<br/>(encrypted credentials)")]
        Git[".git CLI"]
        WinAPIs["🪟 Registry / Start Menu / PATH"]
    end
    User -->|clicks| Electron
    Electron <-->|HTTP + SignalR| API
    API --> DB
    API --> Git
    API --> WinAPIs`;

const DOWNLOAD_URL =
  "https://github.com/niloykumarbarman/Devspace-Releases/releases/latest";
const REPO_URL = "https://github.com/niloykumarbarman/Devspace-Releases";
const PRIVACY_URL =
  "https://github.com/niloykumarbarman/Devspace-Releases/blob/main/PRIVACY.md";

const PROBLEMS = [
  "30+ minutes a day lost to switching between projects",
  "Credentials scattered across sticky notes, password managers, and .env files",
  "Every project has its own ritual: which IDE, which terminal, which folder, which DB tool",
];

type Feature = {
  image?: string;
  alt?: string;
  title: string;
  body: string;
  icon: React.ReactNode;
};

const FEATURES: Feature[] = [
  {
    image: "/assets/devspace/tool-discovery.png",
    alt: "Auto-discovered tools",
    title: "Auto-discovers your tools",
    body:
      "Finds 100+ developer apps installed on your machine in under 3 seconds. Three sources running in parallel: Registry ARP, Start Menu shortcuts, and PATH scanning. No config, no patterns to maintain — new tools appear automatically. Smart classification across 16 categories: IDEs, runtimes, SCM, containers, databases, terminals, browsers, build tools, cloud CLIs, and more.",
    icon: <FaTools className="text-emerald-400" aria-hidden="true" />,
  },
  {
    image: "/assets/devspace/scan-tools.png",
    alt: "Manual scan",
    title: "Manual rescan with live progress",
    body:
      "Just installed a new tool? Click Scan Tools and each source reports back in real time via SignalR. See what's new vs already-known. Skip or undo individual results before saving.",
    icon: <FiZap className="text-cyan-400" aria-hidden="true" />,
  },
  {
    image: "/assets/devspace/tools-templates.png",
    alt: "Tool templates",
    title: "Tool Templates — reusable tool collections",
    body:
      "Save your most-used tool sets (\".NET API\", \"React Frontend\", \"Data Pipeline\") and apply them to any project in one click. Bulk-import tools into existing projects too — no more adding them one by one.",
    icon: <FaCogs className="text-purple-400" aria-hidden="true" />,
  },
  {
    image: "/assets/devspace/single-project-card.png",
    alt: "Project card with quick actions and credentials",
    title: "Multiple encrypted credentials per project",
    body:
      "Dev DB password, staging DB, API tokens, SSH keys — all encrypted with Windows DPAPI, tied to your user account. Drag to reorder, copy with one click. Custom labels per credential.",
    icon: <FaLock className="text-pink-400" aria-hidden="true" />,
  },
  {
    image: "/assets/devspace/add-project-wizard.png",
    alt: "Add project wizard",
    title: "Add or edit projects in 3 steps",
    body:
      "Basic info → directories → credentials. Auto-detects git on directory selection. Apply a Tool Template during creation to bulk-add tools. Same wizard, Edit mode for any field.",
    icon: <FaCheckCircle className="text-emerald-400" aria-hidden="true" />,
  },
  {
    image: "/assets/devspace/bulk-import.png",
    alt: "Bulk import found projects",
    title: "Bulk-import existing repos",
    body:
      "Point DevSpace at a directory tree and it scans for every .git repo, deduplicates, and imports them all in one click. Onboarding to a colleague's machine — or your own old projects folder — goes from a 30-minute setup ritual to a single scan.",
    icon: <FaCodeBranch className="text-pink-400" aria-hidden="true" />,
  },
  {
    image: "/assets/devspace/git-view.png",
    alt: "Git view",
    title: "Full git workflow built in",
    body:
      "Visual commit graph, 4-panel layout, 6-tab sidebar (Commit, Branch Explorer, History, Remotes, Tags, Stashes). Cherry-pick, rebase, merge, conflict resolver, branch comparison. 27-language syntax highlighting.",
    icon: <FaGitAlt className="text-orange-400" aria-hidden="true" />,
  },
  {
    image: "/assets/devspace/git-branch-ops.png",
    alt: "Branch operations from the visual graph",
    title: "One-click ops from the visual graph",
    body:
      "Right-click any commit on the graph for the full operation menu — branch from commit, checkout, tag, merge, cherry-pick, reset, push, pull, fetch. The operations live where the context does, not three menus away.",
    icon: <FaCodeBranch className="text-emerald-400" aria-hidden="true" />,
  },
  {
    image: "/assets/devspace/git-commit-panel.png",
    alt: "Commit panel",
    title: "Commit panel with hunk-level staging",
    body:
      "Stage individual hunks or whole files using real git add / git restore --staged. Live diff preview, inline commit message, command palette (Ctrl+K). 13 input dialogs, 10+ keyboard shortcuts.",
    icon: <FaCodeBranch className="text-cyan-400" aria-hidden="true" />,
  },
  {
    image: "/assets/devspace/git-commit-histories.png",
    alt: "Commit history",
    title: "Commit history with smart filters",
    body:
      "Filter by branch, author, or date. Click any commit for full details + diff. Per-file history view, blame view, branch comparison. Manual refresh — no disk-thrashing auto-poll.",
    icon: <FaChartLine className="text-purple-400" aria-hidden="true" />,
  },
  {
    image: "/assets/devspace/personalized-links.png",
    alt: "Personalized links",
    title: "Personalized quick links",
    body:
      "Pin web URLs, terminal commands, or apps to the dashboard. Three types: web link, terminal command, application. Always one click away — no project context needed.",
    icon: <FaCode className="text-emerald-400" aria-hidden="true" />,
  },
];

const METRICS = [
  {
    value: "30+ min",
    label: "The morning ritual",
    sub: "Built to reclaim what project-switching costs you each day",
    color: "purple",
  },
  {
    value: "<3 sec",
    label: "Tool discovery",
    sub: "100+ apps auto-found on your machine — no config",
    color: "emerald",
  },
  {
    value: "0 plain text",
    label: "Credentials on disk",
    sub: "Encrypted per project with Windows DPAPI",
    color: "cyan",
  },
  {
    value: "1 click",
    label: "Project launch",
    sub: "IDE + terminals + browser tabs + DB client",
    color: "pink",
  },
] as const;

const ROADMAP = [
  { label: "v2.2.0-preview — public preview", status: "shipped" as const, when: "April 2026" },
  { label: "Cloud sync (Supabase, opt-in)", status: "in-progress" as const, when: "next" },
  { label: "macOS support", status: "planned" as const, when: "later" },
];

const TECH = [
  { text: "Electron 27", icon: null },
  { text: "React 18", icon: <SiReact className="text-cyan-400" /> },
  { text: "TypeScript", icon: <SiTypescript className="text-blue-400" /> },
  { text: "Tailwind CSS", icon: <SiTailwindcss className="text-cyan-400" /> },
  { text: ".NET 9", icon: <SiDotnet className="text-purple-400" /> },
  { text: "EF Core", icon: null },
  { text: "SignalR", icon: null },
  { text: "SQLite", icon: <SiSqlite className="text-blue-400" /> },
  { text: "Supabase (planned)", icon: null },
  { text: "Clean Architecture", icon: null },
  { text: "CQRS", icon: null },
  { text: "DDD", icon: null },
];

const metricColorClasses: Record<
  string,
  { border: string; gradient: string; text: string }
> = {
  purple: {
    border: "border-purple-500/30 hover:border-purple-500/50",
    gradient: "from-purple-500/10 to-transparent",
    text: "text-purple-400",
  },
  emerald: {
    border: "border-emerald-500/30 hover:border-emerald-500/50",
    gradient: "from-emerald-500/10 to-transparent",
    text: "text-emerald-400",
  },
  cyan: {
    border: "border-cyan-500/30 hover:border-cyan-500/50",
    gradient: "from-cyan-500/10 to-transparent",
    text: "text-cyan-400",
  },
  pink: {
    border: "border-pink-500/30 hover:border-pink-500/50",
    gradient: "from-pink-500/10 to-transparent",
    text: "text-pink-400",
  },
};

const HERO_IMAGE = {
  src: "/assets/devspace/hero.png",
  alt: "DevSpace dashboard — every project at a glance",
};

const DevSpaceClient = () => {
  const [lightboxIndex, setLightboxIndex] = useState(-1);

  useEffect(() => {
    importLightboxStyles();
  }, []);

  const featureImages = FEATURES.filter((f): f is Feature & { image: string } => Boolean(f.image));
  const slides = [
    { src: HERO_IMAGE.src, alt: HERO_IMAGE.alt },
    ...featureImages.map((f) => ({ src: f.image, alt: f.alt ?? f.title })),
  ];

  const openLightboxForFeature = (image: string) => {
    const featureIdx = featureImages.findIndex((f) => f.image === image);
    if (featureIdx >= 0) setLightboxIndex(featureIdx + 1);
  };

  return (
    <main className="relative min-h-[calc(100vh-136px)] overflow-hidden">
      <BackgroundElements
        floatingDots={[
          { size: "md", color: "secondary", animation: "ping", position: { top: "5rem", right: "2.5rem" }, opacity: 60 },
          { size: "sm", color: "blue", animation: "pulse", position: { bottom: "8rem", left: "16rem" }, opacity: 40 },
          { size: "md", color: "secondary", animation: "bounce", position: { top: "33%", left: "2rem" }, opacity: 50 },
        ]}
      />
      <div className="absolute top-20 left-1/4 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-20 right-1/4 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />
      {/* Hero accent blurs — anchor the centered text column visually on wide screens */}
      <div className="absolute top-32 left-0 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl pointer-events-none hidden xl:block" aria-hidden="true" />
      <div className="absolute top-32 right-0 w-72 h-72 bg-pink-500/10 rounded-full blur-3xl pointer-events-none hidden xl:block" aria-hidden="true" />

      <div className="container mx-auto px-4 relative z-10 py-10 xl:py-16">
        {/* Hero */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center max-w-5xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500/20 via-pink-500/15 to-purple-500/10 backdrop-blur-sm border border-purple-500/40 px-4 py-2 rounded-full text-sm font-medium mb-5">
            <FiZap className="text-pink-400 animate-pulse" aria-hidden="true" />
            <span className="text-white">Active · Public Preview · v2.2.0-preview</span>
          </div>

          <h1 className="text-4xl md:text-5xl xl:text-7xl font-bold mb-4 leading-tight">
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
              DevSpace
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-white/80 font-light mb-3 leading-snug">
            Stop hunting for projects. Start working.
          </p>
          <p className="text-base md:text-lg text-white/60 max-w-2xl mx-auto mb-7 leading-relaxed">
            A Windows desktop app that centralizes every project you work on — tools,
            credentials, git, terminals — in one place. Free during the public preview.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-3">
            <Link
              href={DOWNLOAD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 hover:from-purple-500/30 hover:to-pink-500/30 border border-purple-500/40 hover:border-purple-500/60 text-purple-200 px-6 py-3 rounded-lg transition-all duration-300 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#1a1a1f]"
            >
              <FaDownload aria-hidden="true" />
              <span>Download for Windows (Free)</span>
            </Link>
            <Link
              href={REPO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 hover:from-cyan-500/20 hover:to-blue-500/20 border border-cyan-500/30 hover:border-cyan-500/50 text-cyan-300 px-6 py-3 rounded-lg transition-all duration-300 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#1a1a1f]"
            >
              <FaGithub aria-hidden="true" />
              <span>View on GitHub</span>
            </Link>
          </div>
          <p className="text-xs text-white/40">v2.2.0-preview · Windows 10/11 · ~80 MB · No admin required</p>
          <p className="mt-1 text-[11px] text-white/40 max-w-md mx-auto">
            Note: unsigned during preview — Windows may show a SmartScreen warning. Code signing is on the roadmap before stable release.
          </p>

          <div className="mt-3 inline-flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs text-emerald-300/80">
            <span className="inline-flex items-center gap-1.5">
              <FaLock className="text-emerald-400" aria-hidden="true" />
              Local-first
            </span>
            <span className="text-white/20" aria-hidden="true">·</span>
            <span>No telemetry</span>
            <span className="text-white/20" aria-hidden="true">·</span>
            <span>No cloud account required</span>
          </div>
          <p className="mt-1 text-[11px] text-white/40">
            Never collected: IP addresses, project paths, commit content, credentials.
          </p>

          <p className="mt-4 text-sm text-white/60">
            Built by{" "}
            <Link
              href="https://www.linkedin.com/in/niloykumarbarman/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-300 hover:text-purple-200 underline-offset-4 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded"
            >
              Niloy Kumar Barman
            </Link>
            {" "}+{" "}
            <Link
              href="https://www.linkedin.com/in/robinabdullah/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-300 hover:text-purple-200 underline-offset-4 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded"
            >
              Abdullah Saleh Robin
            </Link>
          </p>
          <p className="mt-1 text-xs text-white/40">
            On nights and weekends over 18 months — concept to public preview.
          </p>

          <button
            type="button"
            onClick={() => setLightboxIndex(0)}
            aria-label="Expand DevSpace dashboard image"
            className="mt-8 block w-full rounded-xl overflow-hidden border border-purple-500/20 shadow-2xl shadow-purple-500/10 cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#1a1a1f]"
          >
            <Image
              src={HERO_IMAGE.src}
              alt={HERO_IMAGE.alt}
              width={1920}
              height={1200}
              className="w-full h-auto transition-transform duration-500 hover:scale-[1.01]"
              priority
            />
          </button>
        </motion.section>

        {/* Problem */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mt-20 max-w-6xl mx-auto"
        >
          <div className="flex items-center gap-2 mb-6">
            <FaCogs className="text-yellow-500 text-xl" aria-hidden="true" />
            <h2 className="text-lg font-semibold text-yellow-500">The problem</h2>
          </div>
          <div className="bg-gray-900/50 backdrop-blur-sm border border-white/10 rounded-xl p-6 sm:p-8">
            <ul className="space-y-3">
              {PROBLEMS.map((p) => (
                <li key={p} className="flex items-start gap-3 text-white/80 text-base leading-relaxed">
                  <span className="mt-2 inline-block w-1.5 h-1.5 rounded-full bg-pink-400 flex-shrink-0" aria-hidden="true" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </motion.section>

        {/* Solution / Metrics */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mt-20 max-w-7xl mx-auto"
        >
          <div className="flex items-center gap-2 mb-6">
            <FaChartLine className="text-emerald-400 text-xl" aria-hidden="true" />
            <h2 className="text-lg font-semibold text-emerald-400">What it changes about your day</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {METRICS.map((m) => {
              const c = metricColorClasses[m.color];
              return (
                <div
                  key={m.label}
                  className={`bg-gradient-to-br ${c.gradient} border ${c.border} rounded-xl p-5 transition-all`}
                >
                  <div className={`text-2xl xl:text-3xl font-bold ${c.text} mb-1`}>{m.value}</div>
                  <div className="text-sm text-white/70 font-medium">{m.label}</div>
                  <div className="text-xs text-white/40 mt-1">{m.sub}</div>
                </div>
              );
            })}
          </div>
        </motion.section>

        {/* Features */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mt-20 max-w-7xl mx-auto"
        >
          <div className="flex items-center gap-2 mb-6">
            <FaTools className="text-cyan-400 text-xl" aria-hidden="true" />
            <h2 className="text-lg font-semibold text-cyan-400">What DevSpace does</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {FEATURES.map((f, i) => (
              <article
                key={f.title}
                className="group bg-gray-900/50 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden hover:border-purple-500/40 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300"
              >
                {f.image && (
                  <button
                    type="button"
                    onClick={() => openLightboxForFeature(f.image!)}
                    aria-label={`Expand ${f.alt ?? f.title} image`}
                    className="block w-full overflow-hidden border-b border-white/5 cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-cyan-400"
                  >
                    <Image
                      src={f.image}
                      alt={f.alt ?? f.title}
                      width={1280}
                      height={800}
                      className="w-full h-auto transition-transform duration-500 group-hover:scale-[1.02]"
                      loading={i < 2 ? "eager" : "lazy"}
                    />
                  </button>
                )}
                <div className="p-5">
                  <h3 className="flex items-center gap-2 text-base font-semibold text-white mb-2">
                    <span className="text-lg">{f.icon}</span>
                    {f.title}
                  </h3>
                  <p className="text-sm text-white/65 leading-relaxed">{f.body}</p>
                </div>
              </article>
            ))}
          </div>
        </motion.section>

        {/* Tech stack */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mt-20 max-w-6xl mx-auto"
        >
          <div className="flex items-center gap-2 mb-6">
            <FaServer className="text-purple-400 text-xl" aria-hidden="true" />
            <h2 className="text-lg font-semibold text-purple-400">Built with</h2>
          </div>
          <div className="bg-gray-900/50 backdrop-blur-sm border border-white/10 rounded-xl p-6 sm:p-8">
            <div className="flex flex-wrap gap-2 mb-4">
              {TECH.map((t) => (
                <Badge
                  key={t.text}
                  icon={t.icon ?? undefined}
                  text={t.text}
                  color="default"
                  size="compact"
                />
              ))}
            </div>
            <p className="text-sm text-white/60 leading-relaxed">
              Built on Clean Architecture (4 layers), CQRS, and DDD —
              designed for maintainability and testability over the long haul.
              Security: 21-command shell whitelist with argument sanitization;
              credentials encrypted with Windows DPAPI per project. No telemetry
              in the current preview.
            </p>
          </div>
        </motion.section>

        {/* How it works */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mt-20 max-w-7xl mx-auto"
        >
          <div className="flex items-center gap-2 mb-6">
            <FaProjectDiagram className="text-cyan-400 text-xl" aria-hidden="true" />
            <h2 className="text-lg font-semibold text-cyan-400">How it works</h2>
          </div>
          <div className="bg-gray-900/50 backdrop-blur-sm border border-white/10 rounded-xl p-6 sm:p-8">
            <p className="text-sm text-white/70 leading-relaxed mb-6">
              A two-process desktop app: an Electron renderer for the UI and a
              local .NET 9 WebAPI on <code className="text-cyan-300 bg-white/5 px-1.5 py-0.5 rounded">localhost:7003</code> for
              everything else. Your data never leaves your machine — no cloud
              account, no telemetry.
            </p>
            <div className="rounded-lg overflow-hidden border border-white/10 bg-white/5">
              <MermaidDiagram chart={ARCHITECTURE_DIAGRAM} />
            </div>
          </div>
        </motion.section>

        {/* Roadmap */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mt-20 max-w-5xl mx-auto"
        >
          <div className="flex items-center gap-2 mb-6">
            <FiArrowRight className="text-pink-400 text-xl" aria-hidden="true" />
            <h2 className="text-lg font-semibold text-pink-400">Roadmap</h2>
          </div>
          <p className="mb-4 text-xs text-white/50">
            Heads up: preview builds expire April 26, 2027. Import / export remain available after expiry so you can migrate your data.
          </p>
          <ul className="space-y-3">
            {ROADMAP.map((r) => {
              const dotColor =
                r.status === "shipped"
                  ? "bg-emerald-400"
                  : r.status === "in-progress"
                  ? "bg-yellow-400"
                  : "bg-white/30";
              const tag =
                r.status === "shipped"
                  ? "shipped"
                  : r.status === "in-progress"
                  ? "in progress"
                  : "planned";
              const tagColor =
                r.status === "shipped"
                  ? "text-emerald-400 bg-emerald-500/10 border-emerald-500/30"
                  : r.status === "in-progress"
                  ? "text-yellow-400 bg-yellow-500/10 border-yellow-500/30"
                  : "text-white/50 bg-white/5 border-white/10";
              return (
                <li
                  key={r.label}
                  className="flex items-center gap-4 bg-gray-900/50 backdrop-blur-sm border border-white/10 rounded-lg px-5 py-4"
                >
                  <span className={`w-2.5 h-2.5 rounded-full ${dotColor} flex-shrink-0`} aria-hidden="true" />
                  <span className="text-white/80 text-sm flex-1">{r.label}</span>
                  <span className={`text-xs px-2 py-1 rounded border ${tagColor}`}>{tag}</span>
                </li>
              );
            })}
          </ul>
        </motion.section>

        {/* CTA */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mt-20 max-w-3xl mx-auto"
        >
          <div className="bg-gradient-to-br from-purple-500/10 via-pink-500/5 to-cyan-500/10 backdrop-blur-sm border-2 border-purple-500/30 rounded-2xl p-8 sm:p-10 text-center">
            <h2 className="text-2xl xl:text-3xl font-bold mb-3 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
              Try it
            </h2>
            <p className="text-white/70 mb-6">
              Free during the public preview. Windows 10/11. ~80 MB installer.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href={DOWNLOAD_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 hover:from-purple-500/30 hover:to-pink-500/30 border border-purple-500/40 hover:border-purple-500/60 text-purple-200 px-6 py-3 rounded-lg transition-all duration-300 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#1a1a1f]"
              >
                <FaDownload aria-hidden="true" />
                <span>Download v2.2.0-preview</span>
              </Link>
            </div>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-white/60">
              <Link
                href={REPO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-yellow-300 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded"
              >
                <FaStar className="text-yellow-400" aria-hidden="true" />
                Star on GitHub
              </Link>
              <span className="text-white/20" aria-hidden="true">·</span>
              <Link
                href={`${REPO_URL}/issues`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded"
              >
                Found a bug? Open an issue
                <FiArrowRight aria-hidden="true" />
              </Link>
            </div>
            <p className="mt-6 text-xs text-white/40">
              <Link
                href={PRIVACY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-white/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded"
              >
                Privacy policy
              </Link>
            </p>
          </div>
        </motion.section>
      </div>

      <Lightbox
        open={lightboxIndex >= 0}
        index={lightboxIndex >= 0 ? lightboxIndex : 0}
        close={() => setLightboxIndex(-1)}
        slides={slides}
        styles={{ container: { backgroundColor: "rgba(0, 0, 0, 0.95)" } }}
        controller={{ closeOnBackdropClick: true, closeOnPullDown: true }}
      />
    </main>
  );
};

export default DevSpaceClient;
