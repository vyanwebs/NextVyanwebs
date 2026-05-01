"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { workingLanguageSeed } from "@/seeder/workingLanguageSeed";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const Tech = ({ techList }) => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    if (!cardsRef.current.length) return;

    const ctx = gsap.context(() => {
      gsap.from(cardsRef.current, {
        y: 50,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.15,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reset",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [techList]);

  return (
    <section ref={sectionRef} className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold">
            <span className="text-blue-600">Technologies we use</span>
            <b className="text-black">.</b>
          </h2>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-6 justify-items-center">
          {workingLanguageSeed.map((tech, index) => (
            <div
              key={index}
              ref={(el) => (cardsRef.current[index] = el)}
              className="text-center w-full"
            >
              <div className="relative mx-auto mb-3 w-16 h-16">
                <Image
                  src={tech.img}
                  alt={tech.name}
                  fill
                  className="object-contain"
                />
              </div>
              <h6 className="font-semibold text-gray-700">{tech.name}</h6>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Tech;