import React, { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ProcessLayout = ({ title, subtitle, steps }) => {
  const containerRef = useRef(null);
  const headingRef = useRef(null);
  const subtitleRef = useRef(null);
  const stepsRefs = useRef([]);
  const buttonRef = useRef(null);

  stepsRefs.current = [];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
        },
        defaults: { ease: "power3.out", duration: 0.8 },
      });

      tl.from([headingRef.current, subtitleRef.current], {
        y: 40,
        opacity: 0,
        stagger: 0.15,
      })
        .from(
          stepsRefs.current,
          { y: 30, opacity: 0, stagger: 0.12 },
          "-=0.4"
        )
        // .from(buttonRef.current, { y: 40, opacity: 0 }, "-=0.3");
    });

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-[#121726] text-white py-14 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-12">
          <h2 ref={headingRef} className="text-4xl font-bold mb-4">
            {title}
          </h2>
          <p ref={subtitleRef} className="text-gray-400 max-w-3xl mx-auto">
            {subtitle}
          </p>
        </div>

        {/* STEPS FIXED LAYOUT */}
        <div className="
          flex flex-wrap 
          md:flex-nowrap 
          gap-6 
          md:justify-center 
          overflow-x-auto 
          w-full
          md:overflow-visible
          scrollbar-hide
          pb-4
        ">
          {steps.map((step, index) => (
            <div
              key={step._id || index}
              ref={(el) => (stepsRefs.current[index] = el)}
              className="flex items-center shrink-0"
            >
              <div className="
                bg-[#1A1F35] 
                px-6 py-3 
                rounded-full 
                border border-[#2C324D] 
                text-center 
                text-sm md:text-lg 
                font-medium
                whitespace-nowrap
              ">
                {step.title}
              </div>

              {index < steps.length - 1 && (
                <ArrowRight className="text-[#38E1AE] mx-4 hidden md:block" />
              )}
            </div>
          ))}
        </div>

        {/* BUTTON ALWAYS VISIBLE */}
        <div className="text-center mt-12 relative ">
          <button
            ref={buttonRef}
            className="
            cursor-pointer bg-[#38E1AE] text-white px-8 py-3 rounded-full font-semibold shadow hover:bg-[#2ec49c] transition"
          >
            Talk to Expert
          </button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ProcessLayout);
