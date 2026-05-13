"use client";

import React, {
  useEffect,
  useRef,
  useState,
  useLayoutEffect,
  useCallback,
} from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ourServiceSeed } from "@/seeder/ourServiceSeed";
import bgImage from "../../assets/service-bg-image.png";

// Import images from discoverhome folder
import aiMlImage from "../../assets/discoverhome/img1.jpg";
import appdevImage from "../../assets/discoverhome/img2.jpg";
import cloudImage from "../../assets/discoverhome/img3.jpg";
import ecommerceImage from "../../assets/discoverhome/img4.jpg";
import figmaImage from "../../assets/discoverhome/img3.jpg";
import softwaredevImage from "../../assets/discoverhome/img1.jpg";
import webdevImage from "../../assets/discoverhome/img2.jpg";
import Staffing from "../../assets/discoverhome/staffing.jpg";

gsap.registerPlugin(ScrollTrigger);

const AUTO_ROTATE_SECONDS = 7;

// Map service names to images
const serviceImageMap = {
  "AI, Machine Learning & Data Engineering": aiMlImage,
  "App Development": appdevImage,
  "Cloud Solutions": cloudImage,
  "E-commerce Development": ecommerceImage,
  "UI/UX Design": figmaImage,
  "Software Development": softwaredevImage,
  "Web Development": webdevImage,
  "IT Staffing & Recruitment": Staffing,
};

const Service = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const imgRef = useRef(null);
  const descRef = useRef(null);

  const observerRef = useRef(null);
  const servicesRef = useRef(ourServiceSeed);
  const currentIndexRef = useRef(0);

  const [isVisible, setIsVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // — Intersection observer —
  useEffect(() => {
    if (observerRef.current) return;

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observerRef.current?.disconnect();
          observerRef.current = null;
        }
      },
      { threshold: 0.08, rootMargin: "200px" }
    );

    if (sectionRef.current) observerRef.current.observe(sectionRef.current);
    return () => observerRef.current?.disconnect();
  }, []);

  // — Auto-rotate —
  useEffect(() => {
    if (!isVisible) return;

    let elapsed = 0;

    const onTick = () => {
      elapsed += gsap.ticker.deltaMS / 1000;
      if (elapsed >= AUTO_ROTATE_SECONDS) {
        elapsed = 0;
        const next = (currentIndexRef.current + 1) % servicesRef.current.length;
        currentIndexRef.current = next;
        setCurrentIndex(next);
      }
    };

    gsap.ticker.add(onTick);
    return () => gsap.ticker.remove(onTick);
  }, [isVisible]);

  // — Manual nav —
  const goToIndex = useCallback((index) => {
    const total = servicesRef.current.length;
    const clamped = ((index % total) + total) % total;
    currentIndexRef.current = clamped;
    setCurrentIndex(clamped);
  }, []);

  const goPrev = useCallback(() => {
    const total = servicesRef.current.length;
    const prev = (currentIndexRef.current - 1 + total) % total;
    goToIndex(prev);
  }, [goToIndex]);

  const goNext = useCallback(() => {
    const total = servicesRef.current.length;
    const next = (currentIndexRef.current + 1) % total;
    goToIndex(next);
  }, [goToIndex]);

  // — Heading entrance animation —
  useLayoutEffect(() => {
    if (!isVisible || !headingRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 80 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, headingRef);

    return () => ctx.revert();
  }, [isVisible]);

  // — Image + desc swap animation —
  useLayoutEffect(() => {
    if (!isVisible) return;

    const imageEl = imgRef.current;
    const descEl = descRef.current;
    if (!imageEl || !descEl) return;

    const service = servicesRef.current[currentIndex];
    const newSrc = serviceImageMap[service.name] || serviceImageMap["Web Development"];

    const tl = gsap.timeline();

    tl.to(imageEl, {
      opacity: 0,
      y: 30,
      duration: 0.45,
      ease: "power2.inOut",
      onComplete: () => {
        imageEl.src = newSrc.src;
      },
    })
      .to(imageEl, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" })
      .to(descEl, { opacity: 0, y: 30, duration: 0.35, ease: "power2.inOut" }, "<")
      .to(descEl, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out", delay: 0.05 });

    return () => tl.kill();
  }, [currentIndex, isVisible]);

  const service = servicesRef.current[currentIndex] || {};

  // Resolve img src safely for the initial render
  const imgSrc = serviceImageMap[service.name]?.src || serviceImageMap["Web Development"]?.src || "";

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#0c0c1d] py-12 md:py-16 overflow-hidden text-white"
      style={{
        backgroundImage: `url(${bgImage.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-[8vw]">
        <div className="mb-12 md:mb-16 text-center" ref={headingRef}>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold leading-tight">
            Discover the Difference
            <br />
            <span className="text-blue-500">at Vyanwebs</span>
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-12">
          {/* Image wrapper with left side slider arrows */}
          <div className="relative w-full lg:w-1/2 rounded-2xl overflow-hidden shadow-2xl group">
            <img
              ref={imgRef}
              src={imgSrc}
              alt={service.name || "Service"}
              className="w-full h-64 sm:h-80 lg:h-[420px] object-cover"
            />

            {/* Left Arrow */}
            <button
              onClick={goPrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-10
                         w-9 h-9 sm:w-11 sm:h-11
                         rounded-full bg-black/50 hover:bg-blue-600
                         border border-white/30 hover:border-blue-500
                         text-white flex items-center justify-center
                         transition-all duration-300 hover:scale-110"
              aria-label="Previous service"
            >
              <ChevronLeft size={20} />
            </button>

            {/* Right Arrow */}
            <button
              onClick={goNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-10
                         w-9 h-9 sm:w-11 sm:h-11
                         rounded-full bg-black/50 hover:bg-blue-600
                         border border-white/30 hover:border-blue-500
                         text-white flex items-center justify-center
                         transition-all duration-300 hover:scale-110"
              aria-label="Next service"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          <div
            ref={descRef}
            className="w-full lg:w-1/2 flex flex-col justify-center px-2 sm:px-6 lg:px-8 text-justify"
          >
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
              {service.name}
            </h3>

            <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-6">
              {service.des}
            </p>

            <a
              href={`/services/${service.slug}`}
              className="inline-flex items-center gap-2 px-6 py-3 mt-4 font-semibold rounded-lg
               bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300
               group w-fit"
            >
              <span className="relative overflow-hidden">
                <span className="block group-hover:-translate-y-full transition-transform duration-300">
                  Learn More
                </span>
                <span className="absolute top-full left-0 block group-hover:top-0 transition-all duration-300">
                  Learn More
                </span>
              </span>
              <ArrowRight
                size={18}
                className="transform group-hover:translate-x-1 transition-transform duration-300"
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(Service);