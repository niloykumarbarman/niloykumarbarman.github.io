"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Badge from "@/components/Badge";
import { FiAward, FiArrowRight } from "@/lib/icons";
import { SiReact, SiDotnet, SiTypescript, SiTailwindcss, FaGithub, FaServer } from "@/lib/icons";
import type { Project } from "@/types/api";

interface DevSpaceFeaturedSectionProps {
  project: Project;
}

/**
 * DevSpaceFeaturedSection
 *
 * Sibling of FeaturedAchievementSection, kept separate because the metric
 * labels and tech stack here are specific to DevSpace (long-form personal
 * product) and don't fit the SpireWiz card's API-string parsing.
 */
const DevSpaceFeaturedSection: React.FC<DevSpaceFeaturedSectionProps> = ({ project }) => {
  return (
    <motion.section
      id="devspace-featured"
      data-testid="home-devspace-featured"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.2 }}
      className="py-12"
    >
      <div className="flex items-center gap-2 mb-6">
        <FiAward className="text-yellow-500 text-xl" aria-hidden="true" />
        <h2 className="text-lg font-semibold text-yellow-500">Featured Personal Product</h2>
      </div>

      <div className="bg-gray-900/50 backdrop-blur-sm border-2 border-cyan-500/30 rounded-xl p-5 sm:p-6 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-blue-500/5 to-transparent pointer-events-none"
          aria-hidden="true"
        />

        <div className="relative z-10">
          <h3 className="text-2xl xl:text-2xl font-bold mb-2 bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
            {project.title}
          </h3>
          {project.subtitle && (
            <p className="text-sm text-cyan-300/80 mb-4">{project.subtitle}</p>
          )}

          <p className="text-white/80 text-base leading-relaxed mb-6">
            {project.shortDescription}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div className="bg-gradient-to-br from-purple-500/10 to-transparent border border-purple-500/30 rounded-lg p-4 text-center hover:border-purple-500/50 transition-all">
              <div className="text-3xl font-bold text-purple-400 mb-1">30+ min</div>
              <div className="text-sm text-white/60">The morning ritual</div>
              <div className="text-xs text-white/40 mt-1">Built to reclaim, day by day</div>
            </div>

            <div className="bg-gradient-to-br from-emerald-500/10 to-transparent border border-emerald-500/30 rounded-lg p-4 text-center hover:border-emerald-500/50 transition-all">
              <div className="text-3xl font-bold text-emerald-400 mb-1">&lt;3 sec</div>
              <div className="text-sm text-white/60">Tool discovery</div>
              <div className="text-xs text-white/40 mt-1">100+ apps, no config required</div>
            </div>

            <div className="bg-gradient-to-br from-cyan-500/10 to-transparent border border-cyan-500/30 rounded-lg p-4 text-center hover:border-cyan-500/50 transition-all">
              <div className="text-3xl font-bold text-cyan-400 mb-1">1 click</div>
              <div className="text-sm text-white/60">Full project launch</div>
              <div className="text-xs text-white/40 mt-1">IDE + terminals + browser + DB</div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 mb-6">
            <span className="text-sm text-white/50">Tech Stack:</span>
            <Badge icon={<SiReact className="text-cyan-400" />} text="React 18" color="default" size="compact" />
            <Badge icon={<SiTypescript className="text-blue-400" />} text="TypeScript" color="default" size="compact" />
            <Badge icon={<SiDotnet className="text-purple-400" />} text=".NET 9" color="purple" size="compact" />
            <Badge icon={<SiTailwindcss className="text-cyan-400" />} text="Tailwind" color="default" size="compact" />
            <Badge icon={<FaServer className="text-emerald-400" />} text="SignalR + EF Core" color="emerald" size="compact" />
            <Badge text="Clean Architecture" color="neutral" size="compact" />
            <Badge text="CQRS · DDD" color="neutral" size="compact" />
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/devspace">
              <button className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 hover:from-cyan-500/30 hover:to-blue-500/30 border border-cyan-500/40 hover:border-cyan-500/60 rounded-lg transition-all duration-300 text-sm text-cyan-300 font-medium group focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#1a1a1f]">
                <span>View Project</span>
                <FiArrowRight className="text-sm group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </button>
            </Link>
            {project.github && (
              <Link href={project.github} target="_blank" rel="noopener noreferrer">
                <button className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 hover:from-blue-500/20 hover:to-purple-500/20 border border-blue-500/30 hover:border-blue-500/50 rounded-lg transition-all duration-300 text-sm text-blue-300 font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#1a1a1f]">
                  <FaGithub className="text-sm" aria-hidden="true" />
                  <span>Releases on GitHub</span>
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default DevSpaceFeaturedSection;
