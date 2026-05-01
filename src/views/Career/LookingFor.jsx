"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { whatWeLookingForSeed } from "@/seeder/jobSeed";

gsap.registerPlugin(ScrollTrigger);

const LookingFor = () => {
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(cardsRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        stagger: 0.3,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardsRef.current[0],
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="bg-gray-100 py-16 px-4 sm:px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center text-gray-800 mb-12">
          The Kind of Teammates We Love
          <span className="text-blue-600 text-3xl sm:text-4xl md:text-5xl">
            .
          </span>
        </h2>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          {whatWeLookingForSeed.map((card, index) => (
            <div
              key={card._id || index}
              ref={(el) => (cardsRef.current[index] = el)}
              className="bg-white shadow-md hover:shadow-xl transition-shadow duration-300 rounded-xl p-6 border-l-4 border-blue-500 flex flex-col"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {card.title}
              </h3>
              <p className="text-gray-600 grow">{card.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LookingFor;