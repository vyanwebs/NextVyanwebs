"use client";

import React, { useLayoutEffect, useRef, useState } from "react";
import EngagementCard from "./EngagementCard";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRouter } from "next/navigation";
import { engagementSeed } from "@/seeder/engagementSeed";

gsap.registerPlugin(ScrollTrigger);

const EngagementModels = () => {
  const router = useRouter();

  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const cardRefs = useRef([]);
  const failedImages = useRef(new Set());

  const [engagements] = useState(engagementSeed);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Reset state - filter out null refs
      const validTitles = [titleRef.current, subtitleRef.current].filter(Boolean);
      const validCards = cardRefs.current.filter(Boolean);

      gsap.set(validTitles, { opacity: 0, y: 50 });
      gsap.set(validCards, { opacity: 0, y: 40 });

      // Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%", // Slightly earlier trigger
          toggleActions: "play none none reverse",
        },
      });

      if (titleRef.current) {
        tl.to(titleRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power2.out",
        });
      }

      if (subtitleRef.current) {
        tl.to(
          subtitleRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power2.out",
          },
          "-=0.4"
        );
      }

      if (validCards.length > 0) {
        tl.to(
          validCards,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.15,
            ease: "power2.out",
          },
          "-=0.3"
        );
      }

      // Refresh ScrollTrigger
      ScrollTrigger.refresh();
    }, sectionRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill()); // Safer than killAll()
    };
  }, [engagements]);

  return (
    <section
      ref={sectionRef}
      className="engagement-section relative bg-blue-600 text-white py-20 overflow-hidden"
    >
      <div className="container relative z-10 max-w-7xl px-6 mx-auto">
        <div className="max-w-2xl mb-14">
          <h2
            ref={titleRef}
            className="text-4xl md:text-5xl font-bold leading-tight engagement-title"
          >
            FLEXIBLE MODELS <br />
            <span className="text-white">TO MATCH YOUR VISION</span>
            <span className="text-blue-300">.</span>
          </h2>

          <h5
            ref={subtitleRef}
            className="text-lg md:text-xl text-gray-200 mt-4 engagement-subtitle"
          >
            Select flexible model that fits your business needs.
          </h5>
        </div>

        {/* Cards */}
        <div className="grid gap-8 md:gap-10 lg:gap-12 md:grid-cols-2 lg:grid-cols-3 group">
          {engagements.map((card, index) => (
            <div
              key={card._id}
              ref={(el) => (cardRefs.current[index] = el)}
              className="cursor-pointer transform transition-all duration-300 ease-in-out
              hover:scale-105 hover:z-10"
              onClick={() => router.push(card.link || "/contact")}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  router.push(card.link || "/contact");
                }
              }}
              role="button"
              tabIndex={0}
              aria-label={`View ${card.title} engagement model`}
            >
              <EngagementCard
                id={`0${card.order}`}
                title={card.title}
                desc={card.description}
                img={card.img}
                onErrorImg={(e) => {
                  if (!failedImages.current.has(card._id)) {
                    failedImages.current.add(card._id);
                    e.target.src = "/fallback.png";
                  }
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EngagementModels;