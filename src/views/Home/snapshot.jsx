"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const SuccessSnapshot = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const buttonRef = useRef(null);
  const statsRefs = useRef([]);

  const router = useRouter();

  // ✅ HARD-CODED VALUES (Replace with real numbers)
  const [stats] = useState([
    { number: 3, suffix: "+", label: "Years in\nBusiness" },
    { number: 50, suffix: "+", label: "Projects\nDelivered Globally" },
    { number: 95, suffix: "%", label: "Global Client\nRetention Rate" },
    { number: 30, suffix: "+", label: "Team\nMembers" },
  ]);

  // Count-up animation
  const runCountUp = (element, target) => {
    element.textContent = "0";
    gsap.fromTo(
      element,
      { textContent: 0 },
      {
        textContent: target,
        duration: 2,
        ease: "power2.out",
        snap: { textContent: 1 },
        onUpdate: function () {
          element.textContent = Math.floor(this.targets()[0].textContent);
        },
      }
    );
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial hidden state
      gsap.set([titleRef.current, buttonRef.current], { opacity: 0, y: 50 });
      statsRefs.current.forEach((ref) => gsap.set(ref, { opacity: 0, y: 40 }));

      const animateIn = () => {
        const tl = gsap.timeline();

        tl.to(titleRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
        });

        tl.to(
          statsRefs.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.15,
            ease: "power2.out",
          },
          "-=0.4"
        ).add(() => {
          statsRefs.current.forEach((ref, index) => {
            const numberElement = ref.querySelector(".stat-number");
            runCountUp(numberElement, stats[index].number);
          });
        });

        tl.to(
          buttonRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.6"
        );
      };

      const resetAll = () => {
        gsap.set([titleRef.current, buttonRef.current], { opacity: 0, y: 50 });
        statsRefs.current.forEach((ref) => {
          gsap.set(ref, { opacity: 0, y: 40 });
          const numberEl = ref.querySelector(".stat-number");
          if (numberEl) numberEl.textContent = "0";
        });
      };

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 80%",
        onEnter: animateIn,
        onEnterBack: animateIn,
        onLeaveBack: resetAll,
      });
    }, sectionRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [stats]);

  return (
    <section
      ref={sectionRef}
      className="py-10 sm:py-14 md:py-20 lg:py-24 px-4 sm:px-6 md:px-10 lg:px-16 bg-primary-color"
    >
      <div className="max-w-7xl mx-auto px-[1.5vw]">
        {/* Title */}
        <h2
          ref={titleRef}
          className="text-left text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-8 sm:mb-12 text-black-700 leading-snug"
        >
          Highlights of Our <span className="text-blue-800">Journey</span>
        </h2>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 md:gap-14 lg:gap-16 mb-12 sm:mb-16 lg:mb-20">
          {stats.map((stat, index) => (
            <div
              key={index}
              ref={(el) => (statsRefs.current[index] = el)}
              className="text-center px-2"
            >
              <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-blue-700 mb-2">
                <span className="stat-number">0</span>
                <span>{stat.suffix}</span>
              </div>
              <p className="text-sm sm:text-base md:text-lg text-black-800 font-medium whitespace-pre-line leading-snug">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Button */}
        <div ref={buttonRef} className="flex justify-center">
          <button
            className="primary-button group text-sm sm:text-base md:text-lg"
            onClick={() => router.push("/about")}
          >
            <span className="btn-bg"></span>
            <span className="btn-text">Learn More</span>
            <span className="btn-icon">
              <ArrowRight />
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default React.memo(SuccessSnapshot);
