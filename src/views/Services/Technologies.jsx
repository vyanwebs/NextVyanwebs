"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { workingLanguageSeed } from "@/seeder/workingLanguageSeed";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const Technologies = () => {
  const techRef = useRef(null);
  const headingRef = useRef(null);
  const subheadingRef = useRef(null);
  const [techStack] = useState(workingLanguageSeed);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 85%",
          toggleActions: "restart none none none",
        },
      });

      gsap.from(subheadingRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        delay: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: subheadingRef.current,
          start: "top 85%",
          toggleActions: "restart none none none",
        },
      });

      gsap.from(".tech-logo", {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: techRef.current,
          start: "top 80%",
          end: "bottom 60%",
          scrub: 1,
        },
      });
    }, techRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={techRef}
      className="bg-gray-900 py-12 px-4 sm:py-16 sm:px-6 lg:px-12 text-center"
    >
      <div className="max-w-4xl mx-auto mb-10 sm:mb-12">
        <h2
          ref={headingRef}
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4"
        >
          Technologies we use<span className="primary-color">.</span>
        </h2>

        <h6
          ref={subheadingRef}
          className="text-white text-base sm:text-lg leading-relaxed"
        >
          We develop web applications using an up-to-date technology stack,
          which includes:{" "}
          <span className="font-semibold">
            PHP, Symfony, Laravel, WordPress, AngularJS, Node.js, React, Vue
          </span>{" "}
          and more — constantly evolving with the industry.
        </h6>
      </div>

      {/* TECHNOLOGY GRID */}
      <div className="max-w-6xl mx-auto grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-6 sm:gap-8 mt-8 sm:mt-12">
        {techStack.map((tech, index) => (
          <div key={index} className="tech-logo mx-auto w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 relative">
            <Image
              src={tech.img}
              alt={tech.alt}
              fill
              className="object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Technologies;