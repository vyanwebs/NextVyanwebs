"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import { ourServiceSeed } from "@/seeder/ourServiceSeed";

gsap.registerPlugin(ScrollTrigger);

const ServiceCards = () => {
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card) => {
        if (!card) return;
        const img = card.querySelector("img");

        gsap.from(img, {
          y: 80,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-transparent py-16 px-4 sm:px-6 md:px-12">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 sm:gap-8">
        {ourServiceSeed.map((service, index) => (
          <div
            key={index}
            ref={(el) => (cardsRef.current[index] = el)}
            className="flex flex-col justify-between h-full min-h-[400px] sm:min-h-[500px] lg:min-h-[600px] bg-gray-800 p-6 shadow-lg hover:bg-[#2d2d2d] transition-all duration-300 group"
          >
            {/* IMAGE */}
            <div className="relative w-full grow mb-4 max-h-60 sm:max-h-72 overflow-hidden">
              <Image
                src={service.img}
                alt={service.name}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 50vw"
                loading="lazy"
              />
            </div>

            {/* TEXT */}
            <div className="mt-auto text-center sm:text-left">
              <h5 className="text-white font-bold uppercase text-lg mb-2">
                {service.name}
              </h5>
              <p
                className="text-white text-sm sm:text-base leading-relaxed overflow-hidden"
                style={{
                  display: "-webkit-box",
                  WebkitLineClamp: 4,
                  WebkitBoxOrient: "vertical",
                }}
              >
                {service.des}
              </p>
            </div>

            {/* BUTTON */}
            <div className="mt-6 flex justify-center sm:justify-start">
              <Link href={`/services/${service.slug}`}>
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-full transition-all duration-300 inline-flex items-center gap-2">
                  <span>Learn More</span>
                  <ArrowRight size={16} />
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceCards;