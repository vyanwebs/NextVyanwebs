"use client";

import React, { useEffect, useRef } from "react";
import { ourServiceSeed } from "@/seeder/ourServiceSeed";
import { ShieldCheck } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const titleRef = useRef(null);
  const imageRef = useRef(null);
  const contentLeftRef = useRef(null);
  const contentRightRef = useRef(null);
  const yellowCircleRef = useRef(null);
  const certifiedSectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const animate = (ref, fromVars, toVars) => {
        if (!ref.current) return;

        gsap.fromTo(ref.current, fromVars, {
          ...toVars,
          scrollTrigger: {
            trigger: ref.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      };

      animate(
        titleRef,
        { x: 100, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, ease: "power3.out" }
      );

      animate(
        imageRef,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1, ease: "power3.out" }
      );

      animate(
        yellowCircleRef,
        { scale: 0, opacity: 0, rotation: 90 },
        {
          scale: 1,
          opacity: 1,
          rotation: 0,
          duration: 1.5,
          ease: "back.out(1.2)",
        }
      );

      animate(
        contentLeftRef,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
      );

      animate(
        contentRightRef,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
      );

      animate(
        certifiedSectionRef,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="font-sans text-gray-800 bg-white py-16 px-4 sm:px-6 lg:px-16 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
        {/* Image Section */}
        <div className="relative w-full lg:w-1/2">
          <div
            ref={imageRef}
            className="relative w-full max-w-md mx-auto z-10 overflow-hidden rounded-xl shadow-xl"
          >
            <Image
              src="https://qualwebs-website.s3.amazonaws.com/assets/img/about-1.png"
              alt="Modern office building"
              width={600}
              height={400}
              className="w-full h-auto object-cover"
              priority
            />
          </div>
          <div
            ref={yellowCircleRef}
            className="hidden sm:block absolute -bottom-10 -right-6 w-32 h-32 sm:w-40 sm:h-40 bg-blue-200 rounded-full z-0"
          ></div>
        </div>

        {/* Text Content */}
        <div className="w-full lg:w-1/2 space-y-8">
          <h1
            ref={titleRef}
            className="text-lg sm:text-xl lg:text-2xl font-extrabold text-gray-900 leading-snug"
          >
            Vyanwebs is a leading provider of end-to-end software solutions,
            focused on delivering impactful results through cutting-edge design,
            robust development practices, and ongoing product support.
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
            {/* Left Column */}
            <div ref={contentLeftRef}>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Vyanwebs operates as an innovative software development company which provides complete digital solutions to clients. The company provides complete web application development services through its full-cycle approach which includes product development from concept to launch support. Our team handles all stages of product development starting with idea creation and prototype development followed by design work and coding and testing and finally post-launch maintenance. Our Agile-based development method provides organizations with adaptable systems that maintain complete visibility and deliver high-quality results throughout the entire process.
              </p>
            </div>

            {/* Right Column */}
            <div ref={contentRightRef}>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-4">
                Vyanwebs provides customized technology solutions which enable businesses to expand their development resources with assurance. Our solutions help organizations achieve faster innovation and smarter growth through their enhanced operational efficiency and reduced expenses and superior quality standards.
              </p>
              <nav className="space-y-1 text-sm sm:text-base">
                {ourServiceSeed.map((data, index) => (
                  <Link
                    key={data._id || index}
                    href={`/services/${data.slug}`}
                    className="block text-gray-600 hover:text-blue-600 font-medium underline hover:no-underline transition-all duration-300"
                  >
                    {data.name}
                  </Link>
                ))}
              </nav>
            </div>
          </div>

          <div ref={certifiedSectionRef}>
            <p className="text-xl font-medium mb-4">Certified and in compliance with</p>
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-6">
              <div className="flex items-center space-x-3">
                <ShieldCheck className="text-green-600" fill="currentColor" />
                <p className="font-semibold text-gray-700">CMMI Level 5</p>
              </div>
              <div className="flex items-center space-x-3">
                <ShieldCheck className="text-green-600" fill="currentColor" />
                <p className="font-semibold text-gray-700">ISO 27001:2023</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;