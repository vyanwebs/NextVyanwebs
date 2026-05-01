"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ourCoreValuesSeed } from "@/seeder/OurCoreValuesSeed";

gsap.registerPlugin(ScrollTrigger);

export default function CoreValues() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const iconsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade in the entire section on scroll
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Animate each card and its icon
      cardsRef.current.forEach((card, i) => {
        const icon = iconsRef.current[i];

        gsap.fromTo(
          card,
          { opacity: 0, y: 80, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: "power3.out",
            delay: i * 0.1,
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse",
              onEnter: () => {
                gsap.fromTo(
                  icon,
                  { y: -20 },
                  {
                    y: 0,
                    duration: 0.6,
                    ease: "bounce.out",
                    clearProps: "y",
                  }
                );
              },
              onLeaveBack: () => {
                gsap.to(icon, {
                  y: -20,
                  duration: 0.4,
                  ease: "power1.in",
                });
              },
            },
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="px-4 md:px-10 py-20 max-w-7xl mx-auto">
      <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-6 text-gray-800">
        Our core values<span className="text-blue-600">.</span>
      </h2>
      <p className="text-center text-lg text-gray-600 max-w-2xl mx-auto mb-12">
        We believe in a culture driven by purpose, people, and principles.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {ourCoreValuesSeed.map((value, index) => (
          <div
            key={value._id || index}
            ref={(el) => (cardsRef.current[index] = el)}
            style={{ willChange: "transform" }}
            className="bg-white border border-gray-200 p-8 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col items-center text-center"
          >
            <div
              className="text-5xl mb-4 text-blue-600"
              ref={(el) => (iconsRef.current[index] = el)}
            >
              {value.icon}
            </div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">
              {value.title}
            </h3>
            <p className="text-gray-600 leading-relaxed">{value.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}