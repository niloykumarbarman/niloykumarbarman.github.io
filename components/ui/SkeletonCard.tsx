"use client";

import React from "react";

interface SkeletonCardProps {
  variant?: "project" | "certification" | "default";
  count?: number;
}

const shimmer = "animate-pulse bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 rounded";

function ProjectSkeleton() {
  return (
    <div className="group relative p-5 rounded-xl border border-gray-700/40 bg-gradient-to-br from-gray-800 to-gray-900 flex flex-col gap-4">
      {/* Image skeleton */}
      <div className={`${shimmer} h-44 w-full rounded-lg`} />

      {/* Title skeleton */}
      <div className="space-y-2">
        <div className={`${shimmer} h-5 w-3/4`} />
        <div className={`${shimmer} h-3 w-full`} />
        <div className={`${shimmer} h-3 w-5/6`} />
      </div>

      {/* Badges skeleton */}
      <div className="flex gap-2">
        <div className={`${shimmer} h-5 w-20 rounded-full`} />
        <div className={`${shimmer} h-5 w-16 rounded-full`} />
      </div>

      {/* Meta skeleton */}
      <div className="flex gap-2 items-center">
        <div className={`${shimmer} h-3 w-24`} />
        <div className={`${shimmer} h-3 w-16`} />
      </div>

      {/* Tech stack skeleton */}
      <div className="grid grid-cols-2 gap-1.5">
        {[...Array(4)].map((_, i) => (
          <div key={i} className={`${shimmer} h-4 w-full`} />
        ))}
      </div>

      {/* Buttons skeleton */}
      <div className="flex gap-3 mt-auto">
        <div className={`${shimmer} h-10 flex-1 rounded-lg`} />
        <div className={`${shimmer} h-10 flex-1 rounded-lg`} />
      </div>
    </div>
  );
}

function CertificationSkeleton() {
  return (
    <div className="p-5 rounded-xl border border-gray-700/40 bg-gradient-to-br from-gray-800 to-gray-900 flex flex-col gap-4">
      {/* Image skeleton */}
      <div className={`${shimmer} h-36 w-full rounded-lg`} />

      {/* Title */}
      <div className="space-y-2">
        <div className={`${shimmer} h-5 w-3/4`} />
        <div className={`${shimmer} h-3 w-1/2`} />
      </div>

      {/* Badge */}
      <div className="flex gap-2">
        <div className={`${shimmer} h-5 w-24 rounded-full`} />
      </div>

      {/* Date + credential */}
      <div className="flex justify-between">
        <div className={`${shimmer} h-3 w-24`} />
        <div className={`${shimmer} h-3 w-20`} />
      </div>

      {/* Button */}
      <div className={`${shimmer} h-9 w-full rounded-lg mt-auto`} />
    </div>
  );
}

function DefaultSkeleton() {
  return (
    <div className="p-5 rounded-xl border border-gray-700/40 bg-gradient-to-br from-gray-800 to-gray-900 space-y-3">
      <div className={`${shimmer} h-6 w-2/3`} />
      <div className={`${shimmer} h-4 w-full`} />
      <div className={`${shimmer} h-4 w-5/6`} />
      <div className={`${shimmer} h-4 w-4/6`} />
    </div>
  );
}

const SkeletonCard: React.FC<SkeletonCardProps> = ({
  variant = "default",
  count = 1,
}) => {
  const items = [...Array(count)];

  return (
    <>
      {items.map((_, i) => (
        <div key={i} aria-hidden="true">
          {variant === "project" && <ProjectSkeleton />}
          {variant === "certification" && <CertificationSkeleton />}
          {variant === "default" && <DefaultSkeleton />}
        </div>
      ))}
    </>
  );
};

export default SkeletonCard;
