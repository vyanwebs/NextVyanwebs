"use client";

import React, { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { testimonialSeed } from "@/seeder/testimonialSeed";
import Image from "next/image";

// Swiper core & react
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import bgImage from "../../assets/clientbgimage.jpg";

// Swiper styles
import "swiper/css";
import "swiper/css/pagination";

gsap.registerPlugin(ScrollTrigger);

export default function TestimonialSlider() {
  const headingRef = useRef(null);
  const sectionRef = useRef(null);

  // Heading animation
  useLayoutEffect(() => {
    if (!headingRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse", // Changed from restart to play
          },
        }
      );
    }, headingRef);

    return () => ctx.revert();
  }, []);

  // Optional: Add fade-in animation for the slider
  useLayoutEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.3,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="relative text-white py-12 sm:py-16 px-4 sm:px-6 md:px-12 lg:px-20 overflow-hidden bg-[#0E1125]"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={bgImage}
          alt="Client Background"
          fill
          className="object-cover opacity-30"
          priority={false}
          sizes="100vw"
          quality={85}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Heading */}
        <h2
          ref={headingRef}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-8 sm:mb-10 text-left leading-tight"
        >
          Proven Trust,{" "}
          <span className="text-blue-500 mt-2 inline-block">
            Shared by Clients
          </span>
          <span className="text-blue-500">.</span>
        </h2>

        {/* Swiper Slider */}
        {testimonialSeed.length > 0 && (
          <Swiper
            modules={[Autoplay, Pagination]}
            slidesPerView={1}
            loop={true}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true, // Pause on hover for better UX
            }}
            speed={800}
            pagination={{
              clickable: true,
              el: ".custom-swiper-pagination",
              renderBullet: (index, className) =>
                `<span class="${className} custom-dot"></span>`,
            }}
            className="pt-4 pb-12"
          >
            {testimonialSeed.map((item, i) => (
              <SwiperSlide key={item._id || i}> {/* Use unique ID if available */}
                <div className="px-2 sm:px-4 md:px-6">
                  <div className="relative mx-auto px-4 sm:px-6 md:px-10 py-10 sm:py-14 lg:py-20">
                    {/* Start Quote */}
                    <div className="absolute top-0 left-0 w-8 sm:w-12 md:w-16 lg:w-20 opacity-30 z-0">
                      <Image
                        src="https://qualwebs-website.s3.amazonaws.com/assets/img/icons/s-quotes.svg"
                        alt="Start Quote"
                        width={80}
                        height={80}
                        className="w-full h-auto"
                      />
                    </div>

                    {/* End Quote */}
                    <div className="absolute bottom-6 right-2 sm:right-6 md:right-16 w-8 sm:w-12 md:w-16 lg:w-20 opacity-30 z-0">
                      <Image
                        src="https://qualwebs-website.s3.amazonaws.com/assets/img/icons/e-quotes.svg"
                        alt="End Quote"
                        width={80}
                        height={80}
                        className="w-full h-auto"
                      />
                    </div>

                    {/* Content */}
                    <div className="relative z-10 flex flex-col gap-6">
                      <p className="text-lg sm:text-xl md:text-2xl lg:text-2xl font-semibold leading-relaxed text-left">
                        {item.quote}
                      </p>

                      {/* Client Info */}
                      <div className="flex items-start text-left">
                        <div className="w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 bg-blue-100 rounded-full mt-1 shrink-0 z-0" />

                        <div className="pl-3 sm:pl-4 pt-1 z-10">
                          <h5 className="font-bold text-sm sm:text-base md:text-lg lg:text-xl">
                            {item.clientName}
                          </h5>
                          <p className="text-xs sm:text-sm md:text-base text-gray-300">
                            {item.clientDetails}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}

        {/* Custom Pagination */}
        <div className="custom-swiper-pagination flex justify-center mt-6 space-x-2"></div>
      </div>

      {/* Dot Styling */}
      <style jsx>{`
        .custom-dot {
          width: 24px;
          height: 5px;
          background-color: #555;
          border-radius: 9999px;
          transition: all 0.3s ease;
          display: inline-block;
          cursor: pointer;
        }

        .custom-dot:hover {
          background-color: #777;
        }

        .swiper-pagination-bullet-active.custom-dot {
          background-color: #59aed8ff;
          width: 32px; /* Slightly wider when active */
        }
      `}</style>
    </div>
  );
}