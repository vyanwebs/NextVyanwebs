"use client";
import React, { useState, useEffect } from "react";
import WhyVyanwebs from "../Home/whyVyanwebs";
import CompanyImpact from "../Home/companies";
import EngagementModels from "../../sections/EngagementModel/EngagementModels";
import CaseStudy from "../../sections/CaseStudies/CaseStudy";
import HeroSection from "./heroSection";
import Service from "../Home/services";
import SuccessSnapshot from "./snapshot";
import TestimonialSlider from "./testimonials";
import ConnectBanner from "./connectBanner";
import { workSeeder } from "../../seeder/workSeeder";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const layoutNavbar = document.querySelector("header");
    if (layoutNavbar) layoutNavbar.style.display = isLoading ? "none" : "block";
  }, [isLoading]);

  return (
    <>
      {isLoading ? (
        <div className="fixed top-0 left-0 w-full h-screen flex items-center justify-center bg-[#0a0a0f]">
          <div className="flex flex-col items-center">
            {/* Wrapper with balanced sizing */}
            <div
              className="relative animate-spin"
              style={{
                width: '48px',
                height: '48px',
                '@media (min-width: 640px)': { width: '56px', height: '56px' },
                '@media (min-width: 768px)': { width: '64px', height: '64px' },
                '@media (min-width: 1024px)': { width: '72px', height: '72px' }
              }}
            >
              {/* Ring */}
              <div
                className="absolute rounded-full border-2 border-blue-300 border-t-transparent"
                style={{
                  inset: '-5px',
                  '@media (min-width: 640px)': { inset: '-6px' },
                  '@media (min-width: 768px)': { inset: '-7px' },
                  '@media (min-width: 1024px)': { inset: '-8px' }
                }}
              />
              {/* Logo */}
              <img
                src="/logo.png"
                alt="Vyanwebs Logo"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  borderRadius: '9999px',
                  position: 'relative',
                  zIndex: 10
                }}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="min-h-screen bg-gray-900 transition-opacity duration-700 ease-in-out">
          <HeroSection />
          <WhyVyanwebs />
          <Service />
          <CompanyImpact />
          <SuccessSnapshot />
          <TestimonialSlider />
          <EngagementModels />
          <CaseStudy workSeeder={workSeeder} />
          <ConnectBanner />
          <div className="absolute top-0 left-0 w-full h-full backdrop-blur-sm z-[-1]" />
        </div>
      )}
    </>
  );
};

export default React.memo(Home);