import React, { useEffect, useRef } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";


gsap.registerPlugin(ScrollTrigger);

const ServiceCards = ({ services, slug }) => {
  const cardsRef = useRef([]);
  const headingRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate heading
      if (headingRef.current) {
        gsap.from(headingRef.current, {
          y: 50,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
        });
      }

      // Animate cards on scroll
      cardsRef.current.forEach((card) => {
        if (!card) return;
        gsap.from(card, {
          y: 70,
          opacity: 0,
          duration: 0.3,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      });
    });

    // Cleanup → kills ScrollTriggers & animations tied to this component
    return () => ctx.revert();
  }, [services]);

  // Function to convert slug into readable heading text
  const formatHeading = (slug) => {
    if (!slug) return "Services";
    return (
      slug
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ") + " Services"
    );
  };

  const heading = formatHeading(slug);

  return (
    <div className="bg-white py-16 px-6 md:px-12">
      {/* Add ref to heading */}
      <h1
        ref={headingRef}
        className="text-center text-5xl font-bold text-gray-800 mb-10"
      >
        {heading}
        <span className="text-blue-800">.</span>
      </h1>
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <div
            key={service._id}
            ref={(el) => (cardsRef.current[index] = el)}
            className="flex flex-col border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 bg-white"
          >
            {/* Icon */}
            <div className="mb-4">
              {service.icon}
            </div>

            {/* Title */}
            <h3 className="text-lg font-bold mb-2">{service.title}</h3>

            {/* Description */}
            <p className="text-gray-600 text-sm leading-relaxed">
              {service.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default React.memo(ServiceCards);
