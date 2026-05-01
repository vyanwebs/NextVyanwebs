"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { workSeeder } from "@/seeder/workSeeder";

gsap.registerPlugin(ScrollTrigger);

const CaseStudy = () => {
  const carouselRef = useRef(null);
  const cardRefs = useRef([]);
  const router = useRouter();

  const headingRef = useRef(null);
  const buttonRef = useRef(null);

  const caseStudies = workSeeder;

  const totalSlides = caseStudies.length;
  const [currentIndex, setCurrentIndex] = useState(0);

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
        <div className="relative flex justify-center items-center h-[300px] sm:h-[350px] md:h-[400px]">
          {caseStudies.map((work, index) => (
            <div
              key={work._id || index}
              ref={(el) => (cardRefs.current[index] = el)}
              className="case-card absolute w-60 sm:w-72 md:w-80 lg:w-96 px-2 cursor-pointer overflow-visible"
              onClick={() => router.push("/work")}
            >
              <div className="flex flex-col justify-between h-full rounded-2xl overflow-hidden bg-transparent shadow-none">
                {/* Main Image */}
                <div className="relative w-full aspect-[2/3] overflow-hidden flex justify-center items-center group">
                  <Image
                    src={work.mainImg}
                    alt={work.title}
                    fill
                    className="object-cover rounded-lg"
                  />

                  {/* Secondary Image */}
                  <div
                    className={`absolute shadow-lg transition-transform duration-300
                      ${work.orientation === "portrait"
                        ? "w-[180px] sm:w-[220px] md:w-[260px] left-1/2 bottom-0 -translate-x-1/2 translate-y-[20%] group-hover:translate-y-0"
                        : index % 2 === 0
                          ? "w-[420px] sm:w-[460px] md:w-[500px] left-1/2 bottom-0 -translate-x-1/2 translate-y-[25%] group-hover:translate-y-4"
                          : "w-[460px] sm:w-[520px] md:w-[560px] -right-2.5 sm:-right-3 top-1/2 -translate-y-1/2 translate-x-[35%] group-hover:translate-x-0"
                      }`}
                  >
                    <Image
                      src={work.screenImg}
                      alt={work.title}
                      width={560}
                      height={300}
                      className="object-contain rounded-lg w-full h-auto"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="p-3 sm:p-4 card-content">
                  <p className="text-[10px] sm:text-xs uppercase tracking-wide text-gray-400 mb-1">
                    {work.subTitle}
                  </p>
                  <h5 className="text-base sm:text-lg font-semibold text-blue-500 mb-2 sm:mb-3">
                    {work.title}
                  </h5>
                  <div className="flex flex-wrap gap-1 sm:gap-2">
                    {work.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="bg-gray-700 text-blue-400 text-[10px] sm:text-xs px-2 sm:px-3 py-0.5 sm:py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Indicators */}
      <div className="flex justify-center mt-24 space-x-2">
        {caseStudies.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-6 mt-6 h-1 transition-all duration-300 ${currentIndex === index
                ? "bg-blue-500 scale-110"
                : "bg-gray-500/50"
              }`}
          />
        ))}
      </div>

      {/* Bottom Button */}
      <div className="flex justify-center items-center mt-10 md:mt-10">
        <button
          ref={buttonRef}
          onClick={() => router.push("/work")}
          className="flex items-center border border-blue-500 text-blue-500 rounded-full px-4 sm:px-6 py-1.5 sm:py-2 hover:bg-blue-500 hover:text-white transition"
        >
          See All Work <span className="ml-2 text-lg sm:text-xl">→</span>
        </button>
      </div>
    </div>
  );
};

export default CaseStudy;