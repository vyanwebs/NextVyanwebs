"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRouter } from "next/navigation";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const CaseStudy = ({ workSeeder }) => {
  const carouselRef = useRef(null);
  const cardRefs = useRef([]);
  const router = useRouter();

  const headingRef = useRef(null);
  const buttonRef = useRef(null);

  const caseStudies = workSeeder;

  // Check if workSeeder exists
  if (!caseStudies || caseStudies.length === 0) {
    return (
      <div className="bg-gray-900 py-16 md:py-20 lg:py-15 relative overflow-hidden">
        <div className="text-center text-white">
          <p>Loading projects...</p>
        </div>
      </div>
    );
  }

  const totalSlides = caseStudies.length;
  const [currentIndex, setCurrentIndex] = useState(0);

  // Helper function to get image source
  const getImageSrc = (img) => {
    if (!img) return null;
    if (typeof img === 'object' && img.src) return img.src;
    if (typeof img === 'string') return img;
    return null;
  };

  const animateCards = useCallback(() => {
    if (!carouselRef.current || cardRefs.current.length === 0) return;

    const carouselWidth = carouselRef.current.offsetWidth;
    const isMobile = window.innerWidth < 640;

    const cardBaseWidth = isMobile ? carouselWidth : carouselWidth / 3;

    cardRefs.current.forEach((card, index) => {
      if (!card) return;

      const isCurrent = index === currentIndex;
      const isPrev = index === (currentIndex - 1 + totalSlides) % totalSlides;
      const isNext = index === (currentIndex + 1) % totalSlides;

      let xPos = 0;
      let scale = 0.8;
      let opacity = 0.4;
      let zIndex = 10;
      let rotateY = 0;

      if (isCurrent) {
        xPos = 0;
        scale = 1;
        opacity = 1;
        zIndex = 30;
      }

      if (isPrev) {
        xPos = isMobile ? -carouselWidth : -cardBaseWidth * 0.9;
        scale = 0.9;
        opacity = 0.7;
        rotateY = 10;
      } else if (isNext) {
        xPos = isMobile ? carouselWidth : cardBaseWidth * 0.9;
        scale = 0.9;
        opacity = 0.7;
        rotateY = -10;
      } else if (!isCurrent) {
        const distance = index - currentIndex;
        xPos = distance * (isMobile ? carouselWidth : cardBaseWidth * 1.2);
        scale = 0.7;
        opacity = 0.2;
        rotateY = distance > 0 ? -20 : 20;
      }

      gsap.to(card, {
        x: xPos,
        scale,
        opacity,
        zIndex,
        rotateY,
        duration: 0.8,
        ease: "power3.out",
      });
    });
  }, [currentIndex, totalSlides]);

  useEffect(() => {
    animateCards();

    const cards = document.querySelectorAll(".case-card");
    cards.forEach((card) => {
      const content = card.querySelector(".card-content");
      const image = card.querySelector(".card-image");

      const handleMouseEnter = () => {
        gsap.to(content, { y: -5, duration: 0.3, ease: "power2.out" });
        gsap.to(image, { scale: 1.1, duration: 0.3, ease: "power2.out" });
      };

      const handleMouseLeave = () => {
        gsap.to(content, { y: 0, duration: 0.3, ease: "power2.out" });
        gsap.to(image, { scale: 1, duration: 0.3, ease: "power2.out" });
      };

      card.addEventListener("mouseenter", handleMouseEnter);
      card.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        card.removeEventListener("mouseenter", handleMouseEnter);
        card.removeEventListener("mouseleave", handleMouseLeave);
      };
    });
  }, [currentIndex, animateCards]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalSlides);
    }, 4000);
    return () => clearInterval(interval);
  }, [totalSlides]);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const elements = [headingRef, buttonRef];
      elements.forEach((ref, i) => {
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

  return (
    <div className="bg-gray-900 py-16 md:py-20 lg:py-15 relative overflow-hidden">
      <h2
        ref={headingRef}
        className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-white mb-12 md:mb-20 lg:mb-35"
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

      {/* Carousel */}
      <div
        ref={carouselRef}
        className="relative flex justify-center items-center px-4 sm:px-8 py-10 md:px-12"
      >
        <div className="relative flex justify-center items-center h-[400px] sm:h-[450px] md:h-[500px]">
          {caseStudies.map((work, index) => (
            <div
              key={work.slug || index}
              ref={(el) => (cardRefs.current[index] = el)}
              className="case-card absolute w-72 sm:w-80 md:w-96 lg:w-[420px] px-2 cursor-pointer overflow-visible"
              onClick={() => router.push(`/work/${work.slug}`)}
            >
              <div className="flex flex-col justify-between h-full rounded-2xl overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 shadow-2xl border border-gray-700">
                {/* Main High Quality Image */}
                <div className="relative w-full aspect-[4/3] overflow-hidden group card-image">
                  <Image
                    src={getImageSrc(work.screenImg) || work.screenImg}
                    alt={work.title}
                    fill
                    quality={100}
                    priority={index === currentIndex}
                    sizes="(max-width: 640px) 288px, (max-width: 768px) 320px, (max-width: 1024px) 384px, 420px"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60" />
                </div>

                {/* Content */}
                <div className="p-4 sm:p-5 card-content">
                  <p className="text-[11px] sm:text-xs uppercase tracking-wide text-blue-400 mb-1 font-semibold">
                    {work.subTitle}
                  </p>
                  <h5 className="text-base sm:text-lg font-bold text-white mb-2 sm:mb-3">
                    {work.title}
                  </h5>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {work.tags.slice(0, 4).map((tag, i) => (
                      <span
                        key={i}
                        className="bg-gray-700/80 text-blue-300 text-[10px] sm:text-xs px-2 sm:px-3 py-0.5 sm:py-1 rounded-full border border-gray-600"
                      >
                        {tag}
                      </span>
                    ))}
                    {work.tags.length > 4 && (
                      <span className="bg-gray-700/80 text-gray-400 text-[10px] sm:text-xs px-2 sm:px-3 py-0.5 sm:py-1 rounded-full">
                        +{work.tags.length - 4}
                      </span>
                    )}
                  </div>
                  {work.backend && (
                    <div className="mt-3">
                      <span className="text-[10px] sm:text-xs bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded-full">
                        Backend: {work.backend}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Indicators */}
      <div className="flex justify-center mt-16 space-x-2">
        {caseStudies.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-6 mt-6 h-1 transition-all duration-300 ${currentIndex === index
                ? "bg-blue-500 scale-110"
                : "bg-gray-500/50 hover:bg-gray-400"
              }`}
          />
        ))}
      </div>

      {/* Bottom Button */}
      <div className="flex justify-center items-center mt-10 md:mt-12">
        <button
          ref={buttonRef}
          onClick={() => router.push("/work")}
          className="flex items-center border-2 border-blue-500 text-blue-500 rounded-full px-5 sm:px-7 py-2 sm:py-2.5 hover:bg-blue-500 hover:text-white transition-all duration-300 font-semibold text-sm sm:text-base"
        >
          See All Work <span className="ml-2 text-lg sm:text-xl">→</span>
        </button>
      </div>
    </div>
  );
};

export default CaseStudy;