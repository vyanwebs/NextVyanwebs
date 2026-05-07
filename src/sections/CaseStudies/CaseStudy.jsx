"use client";

import React, { useRef, useEffect, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const CaseStudy = ({ workSeeder }) => {
  const router = useRouter();
  const headingRef = useRef(null);
  const buttonRef = useRef(null);
  const track1Ref = useRef(null);
  const track2Ref = useRef(null);
  const tween1Ref = useRef(null);
  const tween2Ref = useRef(null);

  const caseStudies = workSeeder;

  if (!caseStudies || caseStudies.length === 0) {
    return (
      <div className="bg-gray-900 py-16 relative overflow-hidden">
        <div className="text-center text-white">
          <p>Loading projects...</p>
        </div>
      </div>
    );
  }

  const getImageSrc = (img) => {
    if (!img) return "";
    if (typeof img === "object" && img.src) return img.src;
    if (typeof img === "string") return img;
    return "";
  };

  const allCards = [...caseStudies, ...caseStudies, ...caseStudies];

  const startMarquee = useCallback(() => {
    [track1Ref, track2Ref].forEach((trackRef, rowIdx) => {
      if (!trackRef.current) return;
      const tweenRef = rowIdx === 0 ? tween1Ref : tween2Ref;
      if (tweenRef.current) tweenRef.current.kill();

      const trackWidth = trackRef.current.scrollWidth / 3;

      // Row 1 starts at 0, Row 2 starts offset
      gsap.set(trackRef.current, { x: rowIdx === 1 ? -trackWidth : 0 });

      tweenRef.current = gsap.to(trackRef.current, {
        x: rowIdx === 0 ? `-=${trackWidth}` : `+=${trackWidth}`,
        duration: trackWidth / 60,
        ease: "none",
        repeat: -1,
        modifiers: {
          x: gsap.utils.unitize((x) => {
            const val = parseFloat(x);
            if (rowIdx === 0) {
              // sliding left — wrap when going too negative
              return ((val % -trackWidth) - trackWidth) % -trackWidth;
            } else {
              // sliding right — wrap when going too positive
              return ((val % trackWidth) + trackWidth) % trackWidth - trackWidth;
            }
          }),
        },
      });
    });
  }, []);

  useEffect(() => {
    const t = setTimeout(startMarquee, 3000);
    return () => {
      clearTimeout(t);
      tween1Ref.current?.kill();
      tween2Ref.current?.kill();
    };
  }, [startMarquee]);

  // Manual slide — nudge by one card width
  const nudge = useCallback((row, direction) => {
    const trackRef = row === 0 ? track1Ref : track2Ref;
    const tweenRef = row === 0 ? tween1Ref : tween2Ref;
    if (!trackRef.current) return;

    tweenRef.current?.pause();

    gsap.to(trackRef.current, {
      x: `+=${direction * 296}`, // card width + gap
      duration: 0.5,
      ease: "power2.out",
      onComplete: () => tweenRef.current?.resume(),
    });
  }, []);

  const pauseRow = useCallback((row) => {
    (row === 0 ? tween1Ref : tween2Ref).current?.pause();
  }, []);

  const resumeRow = useCallback((row) => {
    (row === 0 ? tween1Ref : tween2Ref).current?.resume();
  }, []);

  // Heading + button entrance
  useEffect(() => {
    const ctx = gsap.context(() => {
      [headingRef, buttonRef].forEach((ref, i) => {
        if (!ref.current) return;
        gsap.fromTo(
          ref.current,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            delay: i * 0.2,
            scrollTrigger: {
              trigger: ref.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    });
    return () => ctx.revert();
  }, []);

  const Card = ({ work }) => {
    const src = getImageSrc(work.screenImg);
    return (
      <div
        onClick={() => router.push(`/work/${work.slug}`)}
        className="cursor-pointer rounded-xl overflow-hidden flex-shrink-0
                 bg-gradient-to-br from-gray-800 to-gray-900
                 border border-gray-700 shadow-xl
                 hover:border-blue-500/60 hover:-translate-y-1
                 transition-all duration-300"
        style={{ width: "280px" }}
      >
        {/* Image — plain img tag, no fill issues */}
        <div className="overflow-hidden group" style={{ height: "158px" }}>
          {src ? (
            <img
              src={src}
              alt={work.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full bg-gray-700 flex items-center justify-center">
              <span className="text-gray-400 text-sm">No image</span>
            </div>
          )}
        </div>

        <div className="p-3">
          <p className="text-[10px] uppercase tracking-wide text-blue-400 mb-0.5 font-semibold truncate">
            {work.subTitle}
          </p>
          <h5 className="text-sm font-bold text-white mb-1.5 truncate">
            {work.title}
          </h5>
          <div className="flex flex-wrap gap-1">
            {work.tags.slice(0, 3).map((tag, j) => (
              <span
                key={j}
                className="bg-gray-700/80 text-blue-300 text-[9px] px-2 py-0.5 rounded-full border border-gray-600"
              >
                {tag}
              </span>
            ))}
            {work.tags.length > 3 && (
              <span className="bg-gray-700/80 text-gray-400 text-[9px] px-2 py-0.5 rounded-full">
                +{work.tags.length - 3}
              </span>
            )}
          </div>
        </div>
      </div>
    );
  };

  const Row = ({ trackRef, cards, rowIdx }) => (
    <div className="relative">
      {/* Left fade */}
      <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to right, #111827, transparent)" }} />
      {/* Right fade */}
      <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to left, #111827, transparent)" }} />

      {/* Left Arrow */}
      <button
        onClick={() => nudge(rowIdx, 1)}
        className="absolute left-3 top-1/2 -translate-y-1/2 z-20
                   w-9 h-9 rounded-full
                   bg-gray-800/90 hover:bg-blue-600
                   border border-gray-600 hover:border-blue-500
                   text-white flex items-center justify-center
                   transition-all duration-300 shadow-lg"
        aria-label="Slide left"
      >
        <ChevronLeft size={18} />
      </button>

      {/* Right Arrow */}
      <button
        onClick={() => nudge(rowIdx, -1)}
        className="absolute right-3 top-1/2 -translate-y-1/2 z-20
                   w-9 h-9 rounded-full
                   bg-gray-800/90 hover:bg-blue-600
                   border border-gray-600 hover:border-blue-500
                   text-white flex items-center justify-center
                   transition-all duration-300 shadow-lg"
        aria-label="Slide right"
      >
        <ChevronRight size={18} />
      </button>

      {/* Track */}
      <div
        className="overflow-hidden px-12 sm:px-16"
        onMouseEnter={() => pauseRow(rowIdx)}
        onMouseLeave={() => resumeRow(rowIdx)}
      >
        <div
          ref={trackRef}
          className="flex gap-4 w-max py-2"
          style={{ willChange: "transform" }}
        >
          {cards.map((work, i) => (
            <Card key={`row${rowIdx}-${work.slug}-${i}`} work={work} />
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-gray-900 py-16 relative overflow-hidden">

      {/* Heading */}
      <h2
        ref={headingRef}
        style={{ opacity: 1 }}
        className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-white mb-12"
      >
        Case{" "}
        <span
          className="text-gray-900 font-extrabold text-4xl md:text-5xl"
          style={{
            textShadow:
              "1px 1px 0 white, -1px -1px 0 white, 1px -1px 0 white, -1px 1px 0 white",
          }}
        >
          Studies
        </span>
        <span className="text-blue-500">.</span>
      </h2>

      {/* Outer container with left/right margin */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <Row trackRef={track1Ref} cards={allCards} rowIdx={0} />
        <Row trackRef={track2Ref} cards={[...allCards].reverse()} rowIdx={1} />
      </div>

      {/* Bottom Button */}
      <div className="flex justify-center items-center mt-10">
        <button
          ref={buttonRef}
          style={{ opacity: 1 }}
          onClick={() => router.push("/work")}
          className="flex items-center border-2 border-blue-500 text-blue-500 rounded-full
                     px-5 sm:px-7 py-2 sm:py-2.5
                     hover:bg-blue-500 hover:text-white
                     transition-all duration-300 font-semibold text-sm sm:text-base"
        >
          See All Work <span className="ml-2 text-lg sm:text-xl">→</span>
        </button>
      </div>
    </div>
  );
};

export default CaseStudy;