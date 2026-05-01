import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { floatingImages } from "../ProjectsData/ProjectShowcaseData";

gsap.registerPlugin(ScrollTrigger);

const ProjectShowcase = ({ screenshots,  floaters }) => {
  const screenshotRefs = useRef([]);
  const floatingRefs = useRef([]);
  const sectionRef = useRef(null);

  
  
  const projectFloaters = floaters;
    // const projectFloaters = floatingImages[floaters] || [];
const positions = [
  "top-0 right-0",
  "top-1/2 left-0 -translate-y-1/2",
  "bottom-0 right-0",
];
    useEffect(() => {
      // Clean up previous ScrollTriggers
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

      // Clean up only local tweens
      projectFloaters.forEach((_, i) => {
        if (floatingRefs.current[i]) {
          gsap.killTweensOf(floatingRefs.current[i]);
        }
      });

      screenshotRefs.current.forEach((ref) => {
        if (ref) gsap.killTweensOf(ref);
      });

      screenshotRefs.current.forEach((ref, index) => {
        if (!ref) return;

        // Animate screenshots
        gsap.fromTo(
          ref,
          { y: 80, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1.2,
            ease: "power4.out",
            scrollTrigger: {
              trigger: ref,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          }
        );

        // Animate floating image
        const floater = floatingRefs.current[index];
        if (!floater) return;

        let fromVars = { opacity: 0 };
        switch (index) {
          case 0:
            fromVars.x = 150;
            break;
          case 1:
            fromVars.x = -150;
            break;
          case 2:
            fromVars.y = 150;
            break;
          default:
            fromVars.y = 100;
        }

        gsap.fromTo(floater, fromVars, {
          x: 0,
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ref,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        });
      });

      ScrollTrigger.refresh();

      // Cleanup ScrollTriggers on unmount
      return () => {
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    }, [projectFloaters]);
  return (
    <section
      ref={sectionRef}
      className="relative bg-white py-20 overflow-hidden"
    >
      {/* Floating Images - ABOVE screenshots */}

     {projectFloaters.map((src, i) => (
  <img
    loading="lazy"
    key={i}
    ref={(el) => (floatingRefs.current[i] = el)}
    src={typeof src === "string" ? src : src.src}
    alt={`Floating ${i}`}
    className={`
      absolute z-30 pointer-events-none sm:block
      w-20 sm:w-20 md:w-1/4 lg:w-1/6
      ${positions[i]}
      ${i === 1 ? "mt-[70px]" : ""}
    `}
  />
))}

      <div className="container mx-auto px-4 relative z-10 lg:max-w-6xl">
        <div className="flex justify-center">
          <div className="w-full sm:w-5/6 md:w-2/3 space-y-20 sm:space-y-16 md:space-y-20">
            {screenshots.map((src, index) => (
              <img loading="lazy"
                key={index}
                ref={(el) => (screenshotRefs.current[index] = el)}
                src={src}
                alt={`Screenshot ${index + 1}`}
                className="w-full rounded-lg shadow-lg object-contain"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectShowcase;
