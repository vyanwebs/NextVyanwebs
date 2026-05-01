"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { jobCareItemsSeed } from "@/seeder/jobSeed";

gsap.registerPlugin(ScrollTrigger);

const CareerAbout = () => {
  const titleRef = useRef(null);
  const itemRefs = useRef([]);
  itemRefs.current = [];

  const addToRefs = (el) => {
    if (el && !itemRefs.current.includes(el)) {
      itemRefs.current.push(el);
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Card animation
      itemRefs.current.forEach((el, index) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
            delay: index * 0.1,
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="bg-white py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2
            ref={titleRef}
            className="text-3xl md:text-5xl font-bold text-gray-900"
          >
            What we care about
            <span className="text-blue-600 text-5xl">.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {jobCareItemsSeed.map((item, index) => (
            <div
              key={item._id || index}
              ref={addToRefs}
              className="p-4 bg-white rounded shadow-sm"
            >
              <h5 className="text-lg font-bold text-gray-900 mb-2">
                {item.title}
              </h5>
              <p className="text-gray-700">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CareerAbout;