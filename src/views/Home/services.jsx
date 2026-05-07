
"use client";

import React, {
  useEffect,
  useRef,
  useState,
  useLayoutEffect,
  useCallback,
} from "react";
import { ArrowRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ourServiceSeed } from "@/seeder/ourServiceSeed";
import bgImage from "../../assets/service-bg-image.png";

gsap.registerPlugin(ScrollTrigger);

const AUTO_ROTATE_SECONDS = 7;

const Service = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const imgRef = useRef(null);      // ← now on the <img> tag directly
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

    const imageEl = imgRef.current;   // ← points to <img> now
    const descEl = descRef.current;
    if (!imageEl || !descEl) return;

    const service = servicesRef.current[currentIndex];
    const newSrc = service?.img
      ? typeof service.img === "object"
        ? service.img.src          // Next.js imported image object
        : service.img              // plain URL string
      : "";

    const tl = gsap.timeline();

    tl.to(imageEl, {
      opacity: 0,
      y: 30,
      duration: 0.45,
      ease: "power2.inOut",
      onComplete: () => {
        imageEl.src = newSrc;      // swap src while invisible
      },
    })
      .to(imageEl, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" })
      .to(descEl, { opacity: 0, y: 30, duration: 0.35, ease: "power2.inOut" }, "<")
      .to(descEl, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out", delay: 0.05 });

    return () => tl.kill();
  }, [currentIndex, isVisible]);

  const service = servicesRef.current[currentIndex] || {};

  // Resolve img src safely for the initial render
  const imgSrc = service.img
    ? typeof service.img === "object"
      ? service.img.src
      : service.img
    : "";

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

          {/* Image wrapper — ref is on <img>, NOT the div */}
          <div className="w-full lg:w-1/2 rounded-2xl overflow-hidden shadow-2xl">
            <img
              ref={imgRef}
              src={imgSrc}
              alt={service.name || "Service"}
              className="w-full h-64 sm:h-80 lg:h-[420px] object-cover"
            />
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

            <div className="flex mt-10 gap-3 justify-center lg:justify-start">
              {servicesRef.current.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentIndex
                      ? "bg-blue-500 w-6"
                      : "bg-gray-600 hover:bg-gray-500"
                    }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(Service);