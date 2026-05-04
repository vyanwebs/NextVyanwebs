// src/pages/Projects/ProjectLayout/Feature.jsx

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Feature = ({ data }) => {

  const sectionRef = useRef(null);

  // Left-side sticky content refs
  const imageRef = useRef(null);
  const subtitleRef = useRef(null);
  const titleRef = useRef(null);

  // Image animation refs
  const imageRefs = useRef([]);
  imageRefs.current = [];

  // Helper function to get image source
  const getImageSrc = (img) => {
    if (!img) return "";
    if (typeof img === "string") return img;
    if (typeof img === "object" && img.src) return img.src;
    return "";
  };

  const addToImageRefs = (el) => {
    if (el && !imageRefs.current.includes(el)) {
      imageRefs.current.push(el);
    }
  };

  useEffect(() => {
    if (!data) return;

    const leftItems = [imageRef, subtitleRef, titleRef];

    // Animate left items
    leftItems.forEach((ref, i) => {
      if (!ref.current) return;
      gsap.fromTo(
        ref.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          delay: i * 0.15,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            toggleActions: "restart none none reverse",
          },
        }
      );
    });

    // Animate images only
    imageRefs.current.forEach((img) => {
      if (!img) return;
      gsap.fromTo(
        img,
        { scale: 0.2, y: 40, opacity: 0 },
        {
          scale: 1,
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: {
            trigger: img,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    return () => {
      // Clean up ScrollTriggers
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [data]);

  if (!data) return null;

  const section = data;

  return (
    <section
      ref={sectionRef}
      className="flex flex-col lg:flex-row w-full min-h-screen bg-white dark:bg-gray-900"
    >
      {/* LEFT SIDE - STICKY CONTENT */}
      <div className="w-full lg:w-1/2 flex justify-center items-center lg:sticky lg:top-0 h-auto lg:h-screen p-6 lg:p-10">
        <div className="max-w-md space-y-6">
          <img
            loading="lazy"
            ref={imageRef}
            src={getImageSrc(section.image)}
            alt="Feature Banner"
            className="w-3/4 mx-auto lg:mx-0 max-h-[500px]"
          />
          <p
            ref={subtitleRef}
            className="text-sm font-medium text-gray-800 dark:text-gray-300"
          >
            {section.subtitle}
          </p>
          <h2
            ref={titleRef}
            className="text-3xl lg:text-4xl font-bold text-gray-800 dark:text-white"
          >
            {section.title}
            <span className="text-blue-500">.</span>
          </h2>
        </div>
      </div>

      {/* RIGHT SIDE - SCROLLABLE FEATURES */}
      <div className="w-full lg:w-1/2 p-10 space-y-16 dark:bg-gray-800">
        {section.features?.map((feature, index) => (
          <div
            key={index}
            className="pb-8 border-b border-gray-300 dark:border-gray-700"
          >
            <h4 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">
              {feature.title}
              <span className="text-blue-500">.</span>
            </h4>
            <img
              loading="lazy"
              ref={addToImageRefs}
              src={getImageSrc(feature.image)}
              alt={feature.title}
              className="w-full h-auto rounded-xl shadow-md"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Feature;