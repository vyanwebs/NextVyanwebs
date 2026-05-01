import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { companyLogoData } from "@/seeder/companyLogoSeed";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const CompanyImpact = () => {
  const leftContentRef = useRef(null);
  const headingRef = useRef(null);
  const subheadingRef = useRef(null);
  const logoRefs = useRef([]);

  useEffect(() => {
    if (!companyLogoData || companyLogoData.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        [headingRef.current, subheadingRef.current].filter(Boolean),
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: leftContentRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      const validLogos = logoRefs.current.filter(Boolean);
      if (validLogos.length > 0) {
        gsap.fromTo(
          validLogos,
          { opacity: 0, y: 50, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            stagger: 0.08,
            ease: "back.out(0.6)",
            scrollTrigger: {
              trigger: validLogos[0],
              start: "top 85%",
              once: true,
            },
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  // Reset refs when data changes
  useEffect(() => {
    logoRefs.current = logoRefs.current.slice(0, companyLogoData.length);
  }, [companyLogoData]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row">
      {/* Left: Sticky Content */}
      <div
        ref={leftContentRef}
        className="md:w-1/2 w-full h-fit md:h-screen sticky top-0 flex items-center justify-center px-6 py-10 bg-gray-100 z-10"
      >
        <div className="max-w-md text-center md:text-left lg:ml-0">
          <h2
            ref={headingRef}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 leading-tight mb-4"
          >
            The Companies we build impact with
            <span className="text-blue-600"> !</span>
          </h2>
          <h5
            ref={subheadingRef}
            className="text-base sm:text-lg md:text-xl text-gray-600"
          >
            We strive to make technology accessible, alongside industry leaders.
          </h5>
        </div>
      </div>

      {/* Right: Logos Section */}
      <div className="md:w-1/2 w-full flex flex-col items-center gap-12 px-6 md:px-12 py-16 md:py-24">
        {companyLogoData.map((partner, index) => (
          <div
            key={partner._id}
            ref={(el) => (logoRefs.current[index] = el)}
            className="w-[200px] sm:w-[240px] md:w-[200px] lg:w-[240px] flex justify-center"
          >
            <div className="h-16 sm:h-20 md:h-24 lg:h-28 w-auto flex items-center justify-center relative">
              <Image
                src={partner.src}
                alt={partner.alt}
                width={200}
                height={112}
                className="h-full w-auto object-contain"
                loading="lazy"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default React.memo(CompanyImpact);