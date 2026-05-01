"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { jobSeed } from "@/seeder/jobSeed";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const JobOpenings = () => {
  const cardsRef = useRef([]);
  const containerRef = useRef(null);
  const headingRef = useRef(null);

  useEffect(() => {
    if (jobSeed.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        }
      );

      cardsRef.current.forEach((card, index) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0)",
            duration: 1,
            delay: index * 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      ScrollTrigger.refresh();
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="py-24 px-6 md:px-10 bg-gradient-to-b from-slate-50 to-slate-100"
    >
      <h2
        ref={headingRef}
        className="text-4xl md:text-5xl font-extrabold text-center mb-16 text-gray-800"
      >
        Explore Our Openings<span className="text-blue-600">.</span>
      </h2>

      <div className="space-y-10 max-w-6xl mx-auto">
        {jobSeed.map((job, index) => (
          <div
            key={job._id || index}
            ref={(el) => (cardsRef.current[index] = el)}
            className="relative bg-white/70 backdrop-blur-md border border-gray-200 rounded-2xl shadow-md hover:shadow-xl transition-shadow px-6 py-8 flex flex-col md:flex-row md:items-center justify-between group overflow-hidden"
          >
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl z-0"></div>

            <div className="relative z-10">
              <p className="text-xs tracking-widest uppercase text-blue-600 mb-1">
                {job.department}
              </p>
              <h3 className="text-2xl font-bold text-gray-800">{job.role}</h3>
              <p className="text-gray-600 text-sm mt-1">
                Experience: {job.experience}
              </p>
            </div>

            <Link
              href={`/careers/${job.slug}`}
              className="relative z-10 mt-6 md:mt-0 inline-flex items-center justify-center border border-blue-500 text-blue-600 font-semibold bg-white hover:bg-blue-600 hover:text-white px-6 py-2 rounded-full transition-all duration-300 group"
            >
              Apply Now
              <span className="ml-2 transform transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default JobOpenings;