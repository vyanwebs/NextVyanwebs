"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import HeroSection from "./ProjectLayout/HeroSection";
import ProjectOverview from "./ProjectLayout/ProjectOverview";
import ProjectMission from "./ProjectLayout/ProjectMission";
import ProjectShowcase from "./ProjectLayout/ProjectShowcase";
import ProjectMobileView from "./ProjectLayout/ProjectMobileView";
import Feature from "./ProjectLayout/Feature";
import LogoSection from "./ProjectLayout/LogoSection";
import ProjectNavigation from "./ProjectLayout/ProjectNavigation";
import { showWorkSeeder } from "@/seeder/showWorkSeed";

export default function Projects() {
  const { slug } = useParams();
  const [projectData, setProjectData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const normalizeProject = (raw) => ({
    hero: {
      title: raw.heroTitle || raw.title || "",
      tagline: raw.tagline || raw.subTitle || "",
      description: raw.heroDescription || raw.description || "",
      heroImgs: raw.heroImgs || (raw.mainImg ? [raw.mainImg] : []),
    },
    showcase: {
      images: raw.showcaseImages || (raw.screenImg ? [raw.screenImg] : []),
      floaters: raw.floatingImages || [],
    },
    desktopShowcase: {
      images: raw.appShowcaseImages || [],
    },
    about: {
      left: raw.aboutLeft || "",
      right: raw.aboutRight || "",
    },
    projectOverview: {
      client: raw.client || "",
      role: raw.role || "",
      categoryLine: raw.categoryLine || "",
      description: raw.overviewDescription || raw.description || "",
    },
    mobileSection: {
      heading: raw.mobileHeading || "",
      images: raw.mobileImages || [],
      mobileFeatures: raw.mobileFeatures || [],
    },
    featuresSection: {
      title: raw.featuresTitle || "",
      subtitle: raw.featuresSubtitle || "",
      features: raw.featuresList || [],
      image: raw.featuresImage || "",
    },
    navigation: {
      prevSlug: raw.prevSlug || "",
      prevTitle: raw.prevTitle || "",
      nextSlug: raw.nextSlug || "",
      nextTitle: raw.nextTitle || "",
      image: raw.navigationImage?.image || "",
      title: raw.navigationImage?.title || "",
    },
  });

  useEffect(() => {
    setLoading(true);

    const raw = showWorkSeeder.find((item) => item.slug === slug);

    if (!raw) {
      setError("Project not found");
      setLoading(false);
      return;
    }

    const formatted = normalizeProject(raw);
    setProjectData(formatted);
    setLoading(false);
  }, [slug]);

  if (loading)
    return <div className="text-center py-20 text-white">Loading...</div>;
  if (error) return <div className="text-center py-20 text-white">{error}</div>;
  if (!projectData)
    return (
      <div className="text-center py-20 text-white">Project not found</div>
    );

  const {
    hero,
    showcase,
    about,
    projectOverview,
    mobileSection,
    featuresSection,
    navigation,
  } = projectData;

  return (
    <div>
      {hero && <HeroSection project={hero} />}

      {(showcase?.images?.length > 0 || showcase?.floaters?.length > 0) && (
        <ProjectShowcase
          screenshots={showcase.images}
          floaters={showcase.floaters}
          projectName={slug}
        />
      )}

      {(about?.left || about?.right) && (
        <ProjectMission leftText={about.left} rightText={about.right} />
      )}

      {projectOverview && <ProjectOverview data={projectOverview} />}

      {mobileSection &&
        ((mobileSection.images && mobileSection.images.length > 0) ||
          (mobileSection.mobileFeatures && mobileSection.mobileFeatures.length > 0)) && (
          <ProjectMobileView data={mobileSection} />
        )}

      {featuresSection && <Feature data={featuresSection} />}

      <LogoSection
        logoData={{
          logo: navigation.image,
          title: navigation.title,
        }}
      />

      {navigation && (
        <ProjectNavigation
          navigationData={{
            prev: {
              slug: navigation?.prevSlug || "",
              title: navigation?.prevTitle || "",
            },
            next: {
              slug: navigation?.nextSlug || "",
              title: navigation?.nextTitle || "",
            },
          }}
        />
      )}
    </div>
  );
}