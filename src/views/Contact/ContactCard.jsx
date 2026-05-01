"use client";

import React, { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRouter } from "next/navigation";

gsap.registerPlugin(ScrollTrigger);

const ContactCard = () => {
  const sectionRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%", // Slightly earlier trigger for better UX
            toggleActions: "play none none reverse", // Better for re-visiting section
          },
        }
      );
    }, sectionRef);

    // Clean up GSAP + ScrollTrigger on unmount or navigation
    return () => {
      ctx.revert();
      // Kill only triggers related to this component
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === sectionRef.current) {
          trigger.kill();
        }
      });
    };
  }, []); // No re-run needed

  const handleEmailClick = () => {
    window.location.href = "mailto:info@vyanwebs.com";
  };

  const handleWhatsAppClick = () => {
    window.open("https://wa.me/919111721315", "_blank");
  };

  return (
    <div ref={sectionRef} className="py-12 max-w-7xl mx-auto px-4 sm:px-6">
      <div className="bg-blue-600 rounded-xl px-6 sm:px-12 py-10 sm:py-20 flex flex-col sm:flex-row justify-between items-center text-white shadow-lg overflow-hidden">

        {/* Left Text */}
        <div className="mb-8 sm:mb-0 text-center sm:text-left">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight">
            Start your project with <br />
            <span className="font-bold">
              Vyanwebs{" "}
              <span className="text-[#32F6B0]">today</span>
              <span className="text-blue-300 text-4xl ml-1">.</span>
            </span>
          </h2>
        </div>

        {/* Right Buttons */}
        <div className="flex flex-col gap-4 w-full sm:w-auto sm:items-end">
          <button
            onClick={handleEmailClick}
            className="w-full sm:w-auto min-w-[240px] border border-white rounded-full px-6 py-3 flex items-center justify-between gap-3 hover:bg-white hover:text-blue-600 transition-all duration-300 group"
            aria-label="Connect through email"
          >
            Connect Through Email
            <span className="bg-[#001F99] text-white p-1.5 rounded-full group-hover:bg-blue-600 transition-colors duration-300">
              <ArrowRight size={16} />
            </span>
          </button>

          <button
            onClick={handleWhatsAppClick}
            className="w-full sm:w-auto min-w-[240px] border border-white rounded-full px-6 py-3 flex items-center justify-between gap-3 hover:bg-white hover:text-blue-600 transition-all duration-300 group"
            aria-label="Connect through WhatsApp"
          >
            Connect Through WhatsApp
            <span className="bg-[#001F99] text-white p-1.5 rounded-full group-hover:bg-blue-600 transition-colors duration-300">
              <ArrowRight size={16} />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactCard;