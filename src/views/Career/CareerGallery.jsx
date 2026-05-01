"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { careerSeed } from "@/seeder/jobSeed";

gsap.registerPlugin(ScrollTrigger);

const chunkColumns = (arr) => [
  arr.slice(0, 2),
  arr.slice(2, 3),
  arr.slice(3, 5),
];

const Career = () => {
  const titleRef = useRef(null);
  const imageRefs = useRef([]);

  const addToImageRefs = (el) => {
    if (el && !imageRefs.current.includes(el)) imageRefs.current.push(el);
  };

  const columns = chunkColumns(careerSeed);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title Animation
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
            toggleActions: "restart none none none",
          },
        }
      );

      // Image Zoom Animations
      imageRefs.current.forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, scale: 0.8 },
          {
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: "back.out(1.6)",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "restart none none none",
            },
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="container mx-auto py-16 max-w-7xl px-6">
      <div className="mb-12 text-center">
        <h2
          ref={titleRef}
          className="text-4xl md:text-5xl font-bold text-gray-900"
        >
          Be a part of Amazing Team
          <span className="text-blue-600 text-6xl">.</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-3">
        {columns.map((col, colIndex) => (
          <div key={colIndex} className="flex flex-col gap-6">
            {col.map((member) => (
              <img
                loading="lazy"
                key={member.id}
                ref={addToImageRefs}
                src={member.img}
                alt={member.name}
                className="w-full h-auto rounded-xl shadow-lg object-cover"
              />
            ))}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Career;