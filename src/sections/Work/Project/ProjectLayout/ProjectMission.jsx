// src/pages/Projects/ProjectLayout/ProjectMission.jsx

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ProjectMission({ leftText, rightText }) {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const elements = section.querySelectorAll(".fade-up");

    gsap.fromTo(
      elements,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.2,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
        },
      }
    );
  }, []);
  return (
    <section ref={sectionRef} className="bg-primary-color py-20 px-4">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-10">
        <div className="flex flex-col md:flex-row justify-between gap-10">
          <div className="w-full md:w-1/2 fade-up">
            <h6 className="font-semibold text-gray-800 text-base sm:text-lg leading-loose tracking-normal">
              {leftText}
            </h6>
          </div>
          <div className="w-full md:w-1/2 fade-up">
            <h6 className="font-semibold text-gray-800 text-base sm:text-lg leading-loose tracking-normal">
              {rightText}
            </h6>
          </div>
        </div>
      </div>
    </section>
  );
}
