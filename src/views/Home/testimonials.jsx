"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { testimonialSeed } from "@/seeder/testimonialSeed";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

gsap.registerPlugin(ScrollTrigger);

export default function TestimonialSlider() {
  const headingRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headingRef.current) {
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
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      if (sectionRef.current) {
        gsap.fromTo(
          sectionRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      style={{ opacity: 1 }}
      className="relative text-white py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-12 lg:px-20 overflow-hidden bg-[#0E1125] min-h-[500px] sm:min-h-[550px] md:min-h-[600px]"
    >
      {/* Background Image - Fixed for mobile */}
      <div className="absolute inset-0 z-0">
        {/* Mobile background (simpler, darker) */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0E1125] via-[#1a1f3a] to-[#0E1125] md:hidden" />

        {/* Desktop background with image */}
        <div className="hidden md:block relative w-full h-full">
          <Image
            src="/clientbgimage.jpg"
            alt="Client Background"
            fill
            className="object-cover opacity-30"
            priority={false}
            sizes="100vw"
            quality={85}
          />
        </div>

        {/* Overlay gradient for better text readability on all devices */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0E1125] via-[#0E1125]/80 to-[#0E1125]/60 z-[1]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <h2
          ref={headingRef}
          style={{ opacity: 1 }}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6 sm:mb-8 md:mb-10 text-left leading-tight"
        >
          Proven Trust,{" "}
          <span className="text-blue-500 mt-2 inline-block">
            Shared by Clients
          </span>
          <span className="text-blue-500">.</span>
        </h2>

        {testimonialSeed.length > 0 && (
          <Swiper
            modules={[Autoplay, Pagination]}
            slidesPerView={1}
            loop={true}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            speed={800}
            pagination={{
              clickable: true,
              el: ".custom-swiper-pagination",
              renderBullet: (index, className) =>
                `<span class="${className} custom-dot"></span>`,
            }}
            className="pt-2 sm:pt-4 pb-8 sm:pb-12"
          >
            {testimonialSeed.map((item, i) => (
              <SwiperSlide key={item._id || i}>
                <div className="px-1 sm:px-2 md:px-4">
                  <div className="relative mx-auto px-3 sm:px-4 md:px-6 lg:px-10 py-8 sm:py-10 md:py-14 lg:py-20 bg-black/20 backdrop-blur-sm rounded-2xl sm:rounded-3xl">
                    <div className="absolute top-2 sm:top-4 left-2 sm:left-4 w-6 sm:w-8 md:w-12 lg:w-16 opacity-20 z-0">
                      <img
                        src="https://qualwebs-website.s3.amazonaws.com/assets/img/icons/s-quotes.svg"
                        alt="Start Quote"
                        className="w-full h-auto"
                      />
                    </div>

                    <div className="absolute bottom-2 sm:bottom-4 right-2 sm:right-4 w-6 sm:w-8 md:w-12 lg:w-16 opacity-20 z-0">
                      <img
                        src="https://qualwebs-website.s3.amazonaws.com/assets/img/icons/e-quotes.svg"
                        alt="End Quote"
                        className="w-full h-auto"
                      />
                    </div>

                    <div className="relative z-10 flex flex-col gap-4 sm:gap-5 md:gap-6">
                      <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold leading-relaxed text-left">
                        "{item.quote}"
                      </p>

                      <div className="flex items-start text-left mt-2 sm:mt-3">
                        <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mt-1 shrink-0" />
                        <div className="pl-3 sm:pl-4 pt-0.5">
                          <h5 className="font-bold text-sm sm:text-base md:text-lg lg:text-xl">
                            {item.clientName}
                          </h5>
                          <p className="text-xs sm:text-sm md:text-base text-gray-300 mt-0.5 sm:mt-1">
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

        <div className="custom-swiper-pagination flex justify-center mt-4 sm:mt-6 md:mt-8 space-x-2"></div>
      </div>

      <style jsx>{`
        .custom-dot {
          width: 20px;
          height: 4px;
          background-color: rgba(255, 255, 255, 0.3);
          border-radius: 9999px;
          transition: all 0.3s ease;
          display: inline-block;
          cursor: pointer;
        }
        @media (min-width: 640px) {
          .custom-dot {
            width: 24px;
            height: 5px;
          }
        }
        .custom-dot:hover {
          background-color: rgba(255, 255, 255, 0.5);
        }
        .swiper-pagination-bullet-active.custom-dot {
          background-color: #59aed8;
          width: 28px;
        }
        @media (min-width: 640px) {
          .swiper-pagination-bullet-active.custom-dot {
            width: 32px;
          }
        }
        
        /* Swiper container responsive fixes */
        :global(.swiper) {
          overflow: visible !important;
        }
        :global(.swiper-wrapper) {
          padding-bottom: 10px;
        }
        :global(.swiper-pagination) {
          bottom: 0 !important;
          position: relative !important;
          margin-top: 20px;
        }
      `}</style>
    </div>
  );
}