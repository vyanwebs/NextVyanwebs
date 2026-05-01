"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowLeft, ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

function NavigationLayout({ nav }) {
  const containerRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    if (!contentRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(contentRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.15,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  if (!nav) return null;

  return (
    <div ref={containerRef} className="bg-[#2F5CF4] py-20">
      <div
        ref={contentRef}
        className="container mx-auto flex flex-col md:flex-row justify-center items-center gap-6 md:gap-10 text-white text-center md:text-left"
      >
        {/* Previous */}
        {nav.prev && (
          <Link
            href={`/services/${nav.prev.slug}`}
            className="flex flex-col md:flex-row items-center gap-3 hover:opacity-80"
          >
            <span className="bg-[#1C3FCC] p-2 rounded-full">
              <ArrowLeft size={16} />
            </span>
            <div className="flex flex-col">
              <span className="text-xs tracking-widest uppercase">Previous</span>
              <span className="text-lg sm:text-xl md:text-3xl font-semibold">
                {nav.prev.title}
              </span>
            </div>
          </Link>
        )}

        {/* Divider */}
        <div className="hidden md:block h-12 w-px bg-white/40"></div>

        {/* Next */}
        {nav.next && (
          <Link
            href={`/services/${nav.next.slug}`}
            className="flex flex-col md:flex-row items-center gap-3 hover:opacity-80"
          >
            <div className="flex flex-col text-center md:text-right">
              <span className="text-xs tracking-widest uppercase">Next</span>
              <span className="text-lg sm:text-xl md:text-3xl font-semibold">
                {nav.next.title}
              </span>
            </div>
            <span className="bg-[#1C3FCC] p-2 rounded-full">
              <ArrowRight size={16} />
            </span>
          </Link>
        )}
      </div>
    </div>
  );
}

export default React.memo(NavigationLayout);