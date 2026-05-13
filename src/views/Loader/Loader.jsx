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
					<div className="flex flex-col items-center space-y-4">
						{/* Wrapper spins — logo + ring dono saath */}
						<div className="relative w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 animate-spin">
							{/* Ring */}
							<div className="absolute inset-[-4px] sm:inset-[-5px] md:inset-[-6px] lg:inset-[-8px] rounded-full border-2 border-blue-300 border-t-transparent" />
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