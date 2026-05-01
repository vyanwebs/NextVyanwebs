import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const LogoSection = ({ logoData }) => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const element = sectionRef.current;

    gsap.fromTo(
      element,
      { opacity: 0, y: 70 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: element,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, []);

  return (
    <div
      ref={sectionRef}
      className="py-10 sm:py-14 md:py-20 lg:py-24  dark:bg-gray-900 flex justify-center"
    >
      <div className="text-center px-4 sm:px-6 lg:px-8 max-w-4xl">
        <img loading="lazy"
          className="mx-auto mb-4  lg:w-4/5 h-auto"
          src={logoData.logo}
          alt="Project Logo"
        />
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 dark:text-gray-300 font-medium">
          {logoData.tagline}
        </p>
      </div>
    </div>
  );
};

export default LogoSection;
