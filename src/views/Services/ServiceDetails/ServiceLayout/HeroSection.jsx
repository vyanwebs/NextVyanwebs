"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const HeroSection = ({ service }) => {
  const heroRef = useRef(null);
  const leftContentRef = useRef(null);

  useEffect(() => {
    if (!heroRef.current || !leftContentRef.current) return;

    const titleEl = leftContentRef.current.querySelector("h2");
    const subtitleEl = leftContentRef.current.querySelector(".subtitle");
    const buttonEl = leftContentRef.current.querySelector("button");

    const elements = [titleEl, subtitleEl, buttonEl].filter(Boolean);

    const ctx = gsap.context(() => {
      gsap.from(elements, {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        immediateRender: false,
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
    });

    return () => ctx.revert();
  }, []);

  if (!service) {
    return (
      <div className="flex items-center justify-center min-h-[50vh] bg-zinc-900 text-white">
        <p>No hero data available</p>
      </div>
    );
  }

  return (
    <div
      ref={heroRef}
      className="relative w-full flex flex-col md:flex-row bg-zinc-900"
      style={{ minHeight: "10vh" }}
    >
      {/* Right Background Image — always stays inside hero */}
      {service.image && (
        <div className="absolute right-0 top-0 h-full w-full md:w-1/2 opacity-30 z-0 overflow-hidden">
          <img
            loading="lazy"
            src={service.image}
            alt={service.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Left Content */}
      <div
        ref={leftContentRef}
        className="relative z-10 bg-[#44678b]/70 w-full md:w-1/2 flex flex-col justify-center p-8 md:p-14 lg:p-20 text-white"
      >
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-4">
          {service.title}
        </h2>

        {service.subtitle && (
          <p className="subtitle text-lg md:text-xl leading-relaxed opacity-90 mb-6">
            {service.subtitle}
          </p>
        )}

        <Link href="/contact" className="mt-4">
          <button className="bg-white text-[#007aff] font-semibold px-8 py-4 rounded-lg shadow-md hover:bg-gray-200 hover:scale-105 transition-all cursor-pointer">
            Get Started
          </button>
        </Link>
      </div>

      {/* Right Spacer Panel — guarantees layout stability */}
      <div className="hidden md:flex md:w-1/2"></div>
    </div>
  );
};

export default React.memo(HeroSection);