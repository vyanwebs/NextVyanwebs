"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ContactSection = () => {
  const headingRef = useRef(null);
  const subtitleRef = useRef(null);
  const svgRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Timeline for heading and subtitle
      const tl = gsap.timeline({
        defaults: { ease: "power4.out", duration: 1.2 },
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      tl.from(headingRef.current, {
        y: 80,
        opacity: 0,
      }).from(
        subtitleRef.current,
        {
          y: 80,
          opacity: 0,
        },
        "-=0.8"
      );

      // Optional: Add subtle animation to SVG
      if (svgRef.current) {
        gsap.fromTo(
          svgRef.current,
          { scale: 0.9, opacity: 0 },
          {
            scale: 1,
            opacity: 0.2,
            duration: 1.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: headingRef.current,
              start: "top 85%",
            },
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="relative min-h-[45vh] md:min-h-[55vh] bg-gray-900 text-white flex flex-col justify-between p-4 sm:p-8 md:p-12 lg:p-16 overflow-hidden">
      {/* Animated Heading */}
      <h1
        ref={headingRef}
        className="absolute
            text-2xl text-gray-900 top-20 sm:text-4xl md:text-5xl lg:text-6xl font-bold text-right
            sm:top-40 md:top-28 lg:top-24 mt-[8vh]
            right-4 sm:right-8 md:right-12 lg:right-16"
        style={{
          textShadow:
            "1px 1px 0 #fff, -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff",
        }}
      >
        Contact Us
      </h1>

      {/* Animated Subtitle */}
      <h2
        ref={subtitleRef}
        className="absolute
            text-2xl sm:text-3xl md:text-4xl lg:text-5xl
            font-extrabold text-blue-400 leading-snug
            bottom-8 sm:bottom-12 md:bottom-16 lg:bottom-20
            left-4 sm:left-8 md:left-12 lg:left-20"
      >
        Let's discuss
        <br className="hidden md:inline" />
        working together
      </h2>

      {/* Decorative SVG */}
      <svg
        ref={svgRef}
        className="absolute bottom-6 right-6 opacity-20"
        width="280"
        height="280"
        viewBox="0 0 444 442"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M223.005 220C223.559 160.053 273.903 110.261 334.244 110.261C386.216 110.261 430.721 147.107 442.454 195.631C445.374 208.035 436.222 220 423.632 220H223.005ZM221 20.2766V219.995C160.769 219.446 110.756 169.321 110.756 109.261C110.756 57.5318 147.764 13.2244 196.516 1.54309C208.989 -1.36546 221 7.75722 221 20.2766ZM20.3683 222H220.995C220.441 281.947 170.097 331.739 109.756 331.739C57.7835 331.739 13.2777 294.891 1.54519 246.366C-1.37305 233.963 7.77877 222 20.3683 222ZM223 222.005C283.231 222.554 333.244 272.679 333.244 332.739C333.244 384.468 296.236 428.775 247.486 440.457C235.012 443.366 223 434.243 223 421.723V222.005Z"
          stroke="#73F9C9"
          strokeOpacity="0.2"
          strokeWidth="2"
        />
      </svg>
    </div>
  );
};

export default ContactSection;