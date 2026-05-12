"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ContactBottom = () => {
  const sectionRef = useRef(null);
  const [displayedValues, setDisplayedValues] = useState([]);

  // ⭐ Hardcoded Stats
  const stats = [
    { label: "Years in Business", value: 6, suffix: "+" },
    { label: "Projects Delivered Globally", value: 95, suffix: "+" },
    { label: "Global Client Retention Rate", value: 95, suffix: "%" },
    { label: "Team Members", value: 35, suffix: "+" },
  ];

  // Initialize displayed values to 0
  useEffect(() => {
    setDisplayedValues(stats.map(() => 0));
  }, []);

  // ⭐ Manual count-up function
  const animateCounter = (idx, endValue) => {
    const duration = 2000;
    const stepTime = 20;
    const steps = duration / stepTime;
    const increment = endValue / steps;

    let current = 0;

    const timer = setInterval(() => {
      current += increment;

      setDisplayedValues((prev) => {
        const updated = [...prev];
        updated[idx] = Math.floor(current);
        return updated;
      });

      if (current >= endValue) {
        clearInterval(timer);
        setDisplayedValues((prev) => {
          const updated = [...prev];
          updated[idx] = endValue;
          return updated;
        });
      }
    }, stepTime);
  };

  // ⭐ Trigger animations on scroll
  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 80%",
        onEnter: () => {
          stats.forEach((item, idx) => animateCounter(idx, item.value));
        },
        onEnterBack: () => {
          stats.forEach((item, idx) => animateCounter(idx, item.value));
        },
      });

      gsap.fromTo(
        sectionRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="bg-[#3563E9] py-12 sm:py-20 lg:py-28 text-white relative overflow-hidden mb-10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 flex flex-wrap justify-center gap-x-6 gap-y-10 sm:gap-y-14 text-center z-10 relative">
        {stats.map((stat, index) => (
          <div key={index} className="w-full xs:w-[45%] sm:w-[40%] md:w-[22%] space-y-2">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#88FDC2]">
              {displayedValues[index]}
              {stat.suffix}
            </h2>
            <p className="text-sm sm:text-base font-medium">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactBottom;