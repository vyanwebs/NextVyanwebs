"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const WhatWeOffer = () => {
  const listItemsRef = useRef([]);
  const sectionRef = useRef(null);

  useEffect(() => {
    if (listItemsRef.current.length === 0) return;

    const ctx = gsap.context(() => {
      listItemsRef.current.forEach((item, index) => {
        gsap.fromTo(
          item,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            delay: index * 0.1,
            scrollTrigger: {
              trigger: item,
              start: index === 2 ? "top 70%" : "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-gray-900 text-white px-4 sm:px-6 lg:px-16 overflow-hidden py-20"
    >
      {/* Background SVG */}
      <div className="absolute inset-0 flex items-center justify-center opacity-30 z-0 pointer-events-none">
        <svg
          width="959"
          height="436"
          viewBox="0 0 959 436"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto max-w-4xl opacity-50"
        >
          <defs>
            <linearGradient
              id="paint0_linear_101_133"
              x1="0"
              y1="0"
              x2="0"
              y2="100%"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#73F9C9" />
              <stop offset="1" stopColor="#73F9C9" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Content Layout */}
      <div className="relative z-10 flex flex-col md:flex-row gap-10 items-start md:items-center max-w-7xl mx-auto">
        {/* Left Column */}
        <div className="w-full md:w-5/12 flex items-center justify-center">
          <div className="text-center md:text-left px-2 md:px-0">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-white">
              <span className="text-white">
                What we offer to our squad of superheroes goes beyond the norm
              </span>
              <span className="text-blue-500">.</span>
            </h2>
          </div>
        </div>

        {/* Right Column */}
        <div className="w-full md:w-7/12 px-2 sm:px-4 md:px-6 space-y-8">
          <ul className="list-disc pl-6 text-base sm:text-lg md:text-xl leading-relaxed space-y-8">
            {[
              "We offer a range of benefits to provide flexibility and support for our employees. You can choose your preferred working hours for both office and home days, and adjust to part-time hours when needed. In addition, we offer up to eight extra holidays and up to two extra months of fully-paid paternity leave.",
              "We offer worldwide working opportunities across India, the USA, and UAE through our offices. In addition, we organize various company events such as team building, family days, and summer parties. Moreover, we provide the chance to embark on unforgettable trips with your team to amazing destinations in India and abroad.",
              "We provide a mobile phone allowance and discounts at various retailers, ranging from restaurants to banks, car dealerships, gym memberships, and pet shops. Additionally, we offer health and dental cover, as well as mental health assistance programmes and services. Lastly, you can enjoy free hot drinks ;), cooked snacks, fruit, and refreshments in the office.",
            ].map((text, index) => (
              <li key={index} ref={(el) => (listItemsRef.current[index] = el)}>
                {text}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default WhatWeOffer;