"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { industriesSeed } from "@/seeder/industriesSeed";

gsap.registerPlugin(ScrollTrigger);

const chunkArray = (arr, size) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
    arr.slice(i * size, i * size + size)
  );

const Industries = () => {
  const containerRef = useRef(null);
  const rowRefs = useRef([]);
  const iconRefs = useRef([]);
  const [industries] = useState(industriesSeed);

  useEffect(() => {
    const ctx = gsap.context(() => {
      rowRefs.current.forEach((row, i) => {
        if (!row) return;

        gsap.fromTo(
          row,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            delay: i * 0.15,
            scrollTrigger: {
              trigger: row,
              start: "top 95%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleMouseEnter = useCallback((index) => {
    const icon = iconRefs.current[index];
    if (!icon) return;
    gsap.to(icon, {
      x: -20,
      opacity: 0,
      duration: 0.2,
      onComplete: () => {
        gsap.fromTo(
          icon,
          { x: 20, opacity: 0, color: "#3b82f6" },
          { x: 0, opacity: 1, duration: 0.3, ease: "power2.out" }
        );
      },
    });
  }, []);

  const handleMouseLeave = useCallback((index) => {
    const icon = iconRefs.current[index];
    if (!icon) return;
    gsap.to(icon, {
      x: -20,
      opacity: 0,
      duration: 0.2,
      onComplete: () => {
        gsap.fromTo(
          icon,
          { x: 20, opacity: 0, color: "#9ca3af" },
          { x: 0, opacity: 1, duration: 0.3, ease: "power2.out" }
        );
      },
    });
  }, []);

  const rows = chunkArray(industries, 3);

  return (
    <section className="bg-gray-100 py-24 px-4">
      <div className="max-w-6xl mx-auto text-center" ref={containerRef}>
        <h2 className="text-4xl md:text-5xl font-extrabold mb-16 text-gray-900">
          Industries We Serve<span className="text-blue-600">.</span>
        </h2>

        <div className="flex flex-col gap-10">
          {rows.map((row, rowIndex) => (
            <div
              key={rowIndex}
              ref={(el) => (rowRefs.current[rowIndex] = el)}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10"
            >
              {row.map((industry, idx) => {
                const iconIndex = rowIndex * 3 + idx;
                return (
                  <div
                    key={industry.id}
                    onMouseEnter={() => handleMouseEnter(iconIndex)}
                    onMouseLeave={() => handleMouseLeave(iconIndex)}
                    className="group cursor-pointer bg-white/80 backdrop-blur-lg px-10 py-12 rounded-2xl shadow-xl border border-transparent transition-all duration-500 hover:-translate-y-2 hover:border-blue-500/40 hover:shadow-blue-300/40 hover:shadow-2xl"
                  >
                    <div className="flex items-center justify-between">
                      <span
                        ref={(el) => (iconRefs.current[iconIndex] = el)}
                        className="text-gray-400 transition-colors duration-300"
                      >
                        {industry.icon}
                      </span>
                      <span className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {industry.name}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Industries;