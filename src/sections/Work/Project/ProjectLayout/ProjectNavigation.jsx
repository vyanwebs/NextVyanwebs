"use client";

import Link from "next/link";

export default function ProjectNavigation({ navigationData }) {
  const { prev, next } = navigationData || {};

  return (
    <div className="w-full py-12 sm:py-16 bg-white dark:bg-gray-900 section section-project">
      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-6 sm:gap-8 md:flex-row md:justify-between md:items-center text-center">
          {/* Prev Project */}
          {prev && prev.slug && (
            <Link
              href={`/work/${prev.slug}`}
              className="w-full md:w-1/2 block"
            >
              <h2 className="text-xl sm:text-2xl font-semibold sm:font-bold hover:text-blue-500 transition-colors duration-300">
                ← Prev: {prev.title}
              </h2>
            </Link>
          )}

          {/* Next Project */}
          {next && next.slug && (
            <Link
              href={`/work/${next.slug}`}
              className="w-full md:w-1/2 block"
            >
              <h2 className="text-xl sm:text-2xl font-semibold sm:font-bold hover:text-blue-500 transition-colors duration-300">
                Next: {next.title} →
              </h2>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}