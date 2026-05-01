"use client";

import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ServiceHero = () => {
  const headingRef = useRef(null);
  const bottomTextRef = useRef(null);
  const paragraphRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power4.out", duration: 1.2 },
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      tl.from(headingRef.current, { y: 80, opacity: 0 })
        .from(bottomTextRef.current, { y: 80, opacity: 0 }, "-=0.8")
        .from(paragraphRef.current, { y: 100, opacity: 0 }, "-=0.8");
    });

    return () => ctx.revert();
  }, []);

  return (
    <div>
      {/* Top Section */}
      <div className="relative h-[50vh] sm:h-[55vh] md:h-[60vh] lg:h-[65vh] bg-gray-900 text-white flex flex-col justify-between px-4 sm:px-6 md:px-12">
        <h1
          ref={headingRef}
          className="
            absolute 
            text-3xl sm:text-5xl md:text-6xl lg:text-7xl
            text-gray-900 font-bold text-right
            top-28 sm:top-36 md:top-28 lg:top-32 
            right-4 sm:right-8 md:right-12 lg:right-16
          "
          style={{
            textShadow:
              "1px 1px 0 #fff, -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff",
          }}
        >
          Service
        </h1>

        <h2
          ref={bottomTextRef}
          className="
            absolute 
            text-2xl sm:text-3xl md:text-4xl lg:text-5xl
            font-extrabold text-blue-400 leading-snug
            bottom-8 sm:bottom-12 md:bottom-16 lg:bottom-20
            left-4 sm:left-8 md:left-12 lg:left-16
          "
        >
          Superior Products,
          <br />
          Supported & Guided.
        </h2>

        <svg
          className="absolute bottom-6 right-6 opacity-20 w-40 sm:w-52 md:w-64"
          viewBox="0 0 444 442"
          fill="none"
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

      {/* Bottom Section */}
      <div className="relative h-[70vh] sm:h-[65vh] md:h-[60vh] lg:h-[70vh] bg-blue-600 text-white overflow-hidden px-4 sm:px-6 md:px-12">
        <div className="relative container mx-auto h-full flex items-center justify-center">
          <div
            ref={paragraphRef}
            className="max-w-4xl text-center px-4 sm:px-6"
          >
            <h4 className="text-base sm:text-lg md:text-xl lg:text-2xl font-medium leading-relaxed">
              Vyanwebs offers end-to-end services to enhance your business
              value, from product ideation and strategy to prototyping, testing,
              and product creation. We turn your ideas into successful products.
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceHero;