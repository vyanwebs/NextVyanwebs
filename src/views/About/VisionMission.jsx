"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import vision from "../../assets/vision.jpeg";
import mission from "../../assets/mission.jpeg";

gsap.registerPlugin(ScrollTrigger);

const VisionMission = () => {
  const visionCardRef = useRef(null);
  const missionCardRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Vision Card Animation
      gsap.fromTo(
        visionCardRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: visionCardRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Mission Card Animation
      gsap.fromTo(
        missionCardRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: missionCardRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="relative bg-gray-100 font-sans py-24 overflow-hidden">
      <div className="container mx-auto max-w-7xl px-4 space-y-20">
        {/* Vision Section */}
        <div className="relative overflow-hidden rounded-3xl shadow-2xl min-h-[400px]">
          <Image
            src={vision}
            alt="Vision background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/60 z-0" />

          <div className="relative z-10 flex flex-col md:flex-row justify-start items-center p-8 md:p-16">
            <div
              ref={visionCardRef}
              className="bg-white p-6 sm:p-8 rounded-xl shadow-lg w-full max-w-xl"
            >
              <h4 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
                <span className="text-blue-600">Our Vision</span>
                <span className="text-blue-600">.</span>
              </h4>
              <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                Be the ultimate choice for focused clients & quality-driven
                technology enthusiasts around the globe!
              </p>
            </div>
          </div>
        </div>

        {/* Mission Section */}
        <div className="relative overflow-hidden rounded-3xl shadow-2xl min-h-[400px]">
          <Image
            src={mission}
            alt="Mission background"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/60 z-0" />

          <div className="relative z-10 flex flex-col md:flex-row justify-end items-center p-8 md:p-16">
            <div
              ref={missionCardRef}
              className="bg-white p-6 sm:p-8 rounded-xl shadow-lg w-full max-w-xl"
            >
              <h4 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
                <span className="text-blue-600">Mission</span>
                <span className="text-blue-600">.</span>
              </h4>
              <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                Vyanwebs exists to create innovative IT solutions which help entrepreneurs and enterprises worldwide achieve success through our commitment to excellence and our values of integrity and accountability. Our organization upholds five core values which include diversity and inclusion and positive problem-solving and worldwide reach and positive workplace environment and superior quality standards.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisionMission;