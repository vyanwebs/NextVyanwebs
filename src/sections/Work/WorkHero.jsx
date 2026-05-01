import React, { useEffect, useRef } from "react";
import WorkCards from "./WorkCards";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const WorkHero = () => {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const cardsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate the paragraph
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 90%",
            toggleActions: "restart none none none",
          },
        }
      );

      // Animate WorkCards section
      gsap.fromTo(
        cardsRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 90%",
            toggleActions: "restart none none none",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-white text-black py-16 px-6 md:px-16">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h5
          ref={textRef}
          className="text-lg md:text-xl leading-relaxed text-black font-bold"
        >
          For over 3 years, we've assisted technology startups, enterprises, and
          Fortune 500 companies in building innovative solutions. Discover why
          they chose us and how we transformed their operations.
        </h5>
      </div>

      <div ref={cardsRef} className="max-w-5xl mx-auto">
        <WorkCards />
      </div>
    </div>
  );
};

export default WorkHero;
