"use client";

import React, { useEffect, useRef, useState } from "react";
import WorkCards from "@/sections/Work/WorkCards";
import { useRouter } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import { workSeeder } from "@/seeder/workSeeder";


gsap.registerPlugin(ScrollTrigger);

const WorkPreview = () => {
  const router = useRouter();
  const containerRef = useRef(null);
  const subheadingRef = useRef(null);
  const headingRef = useRef(null);
  const buttonRef = useRef(null);
  const cardsRef = useRef(null);
  const projects = workSeeder
  // const [projects, setProjects] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  // Fetch all projects
  // useEffect(() => {
  //   const fetchProjects = async () => {
  //     try {
  //       const res = await axios.get(`${API_BASE_URL}/project/`);
  //       setProjects(res.data || []);
  //     } catch (error) {
  //       console.error("Error fetching projects:", error);
  //     }
  //   };
  //   fetchProjects();
  // }, [startIndex]);

  // Auto-rotate cards one by one
  useEffect(() => {
    if (projects.length <= 2) return;
    const interval = setInterval(() => {
      setStartIndex((prev) => (prev + 1) % projects.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [projects.length]);

  // Animate card changes
  useEffect(() => {
    if (cardsRef.current) {
      const children = cardsRef.current.children;
      gsap.fromTo(
        children,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          stagger: 0.3, // animate one after another
        }
      );
    }
  }, []);

  // Pick current 2 projects
  const visibleProjects =
    projects.length > 0
      ? [projects[startIndex], projects[(startIndex + 1) % projects.length]]
      : [];

  return (
    <div
      ref={containerRef}
      className="container mx-auto px-6 md:px-12 py-12 min-h-screen flex flex-col justify-center"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        {/* Left Section */}
        <div className="w-full flex flex-col justify-start items-start text-left pt-10 px-6 md:px-12">
          <h5
            ref={subheadingRef}
            className="font-bold uppercase text-gray-500 mb-4 opacity-75 text-lg md:text-xl"
          >
            Our relevant projects
          </h5>
          <h4
            ref={headingRef}
            className="font-bold mb-12 text-gray-900 dark:text-white leading-snug text-2xl md:text-3xl lg:text-4xl"
          >
            Quality is at the core of our services, as we strive to stimulate
            growth in the digital sphere.
          </h4>
          <div ref={buttonRef} className="hidden md:block">
            <button
              className="primary-button group"
              onClick={() => router.push("/work")}
            >
              <span className="btn-bg"></span>
              <span className="btn-text">Explore now</span>
              <span className="btn-icon">
                <ArrowRight />
              </span>
            </button>
          </div>
        </div>

        {/* Right Section → Rotating 2 Cards one by one */}
        <div ref={cardsRef} className="w-full flex flex-wrap justify-center -mx-3">
          <WorkCards projects={visibleProjects} />
        </div>
      </div>
    </div>
  );
};

export default WorkPreview;
