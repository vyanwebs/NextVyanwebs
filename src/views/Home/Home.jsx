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
import logo from "../../assets/logo.png";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000); // Delay for loader
    return () => clearTimeout(timer);
  }, []);

  // Hide MainLayout Navbar while Home is loading
  useEffect(() => {
    const layoutNavbar = document.querySelector("header"); // navbar has header internally
    if (layoutNavbar) layoutNavbar.style.display = isLoading ? "none" : "block";
  }, [isLoading]);

  return (
    <>
      {/* loading Screen  */}
      {isLoading ? (
        <div className="fixed top-0 left-0 w-full h-screen flex items-center justify-center bg-[#0c0c1d] transition-opacity duration-700 ease-in-out">
          <div className="flex flex-col items-center space-y-4">
            <img
              loading="lazy"
              src={logo}
              alt="Vyanwebs Logo"
              className="w-16 h-16 md:w-20 md:h-20 object-contain"
            />

            {/* Vyanwebs Text */}
            <h1 className="text-white text-4xl font-bold animate-pulse tracking-wider">
              Vyanwebs
            </h1>

            <div className="w-full px-4 text-center">
              <p className="text-white text-base sm:text-lg md:text-xl lg:text-2xl font-medium tracking-wide">
                "Empower the world with code";
              </p>
            </div>
          </div>
        </div>
      ) : (
        // actual screen
        <div className="min-h-screen bg-gray-900 transition-opacity duration-700 ease-in-out">
          {/* <Navbar /> */}
          <HeroSection />
          <WhyVyanwebs />
          <Service />
          <CompanyImpact />
          <SuccessSnapshot />
          <TestimonialSlider />
          <EngagementModels />
          <CaseStudy />
          <ConnectBanner />
          <div className="absolute top-0 left-0 w-full h-full backdrop-blur-sm z-[-1]" />
        </div>
      )}
    </>
  );
};

export default React.memo(Home);
