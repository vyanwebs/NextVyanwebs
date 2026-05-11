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
          <div className="flex flex-col items-center space-y-6">

            {/* Wrapper spins — logo + ring dono saath */}
            <div className="relative w-20 h-20 md:w-24 md:h-24 animate-spin">
              {/* Ring */}
              <div className="absolute inset-[-10px] rounded-full border-4 border-blue-500 border-t-transparent" />
              {/* Logo */}
              <img
                src="/logo.png"
                alt="Vyanwebs Logo"
                className="w-full h-full object-contain rounded-full z-10"
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