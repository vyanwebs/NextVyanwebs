"use client";

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const QuoteSection = () => {
  const sectionRef = useRef(null);
  const quoteTextRef = useRef(null);
  const startQuoteRef = useRef(null);
  const endQuoteRef = useRef(null);
  const nameRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        }
      });

      tl.fromTo(
        [startQuoteRef.current, quoteTextRef.current, endQuoteRef.current, nameRef.current],
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          stagger: 0.2,
        }
      );
    });

    return () => ctx.revert();
  }, []);

  const StartQuoteSVG = () => (
    <svg className="w-16 h-16 md:w-20 md:h-20" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 80 L40 20 M60 80 L80 20" stroke="#59aed8ff" strokeWidth="10" strokeLinecap="round" />
    </svg>
  );

  const EndQuoteSVG = () => (
    <svg className="w-16 h-16 md:w-20 md:h-20" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M80 20 L60 80 M40 20 L20 80" stroke="#59aed8ff" strokeWidth="10" strokeLinecap="round" />
    </svg>
  );

  return (
    <section ref={sectionRef} className="relative bg-white py-16 px-4 md:px-8 lg:px-16 overflow-hidden">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto">
          <div className="relative text-center">
            <div ref={startQuoteRef} className="absolute -top-8 -left-8 md:-top-12 md:-left-12 opacity-0">
              <StartQuoteSVG />
            </div>

            <h3 ref={quoteTextRef} className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-8 text-gray-800 opacity-0 px-4">
              "Our shared mission is to deliver measurable digital growth for our clients and to create an environment where our team can thrive in fulfilling careers."
            </h3>

            <div ref={endQuoteRef} className="absolute -bottom-8 -right-8 md:-bottom-12 md:-right-12 opacity-0">
              <EndQuoteSVG />
            </div>
          </div>

          <div ref={nameRef} className="text-center mt-12 opacity-0">
            <h4 className="inline-block px-3 py-1 bg-yellow-400 text-gray-800 font-bold rounded-md text-lg md:text-xl">
              Kshitij Jain, CEO
            </h4>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuoteSection;