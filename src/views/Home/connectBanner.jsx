"use client";

import React, { useCallback, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function ConnectBanner() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const buttonsRef = useRef(null);
  const circleRef = useRef(null);
  const triggerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const setInitial = () => {
        gsap.set([titleRef.current, buttonsRef.current], { opacity: 0, y: 50 });
        gsap.set(circleRef.current, { scale: 0 });
      };

      setInitial();

      const createTimeline = () => {
        const tl = gsap.timeline();
        tl.to(titleRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
        })
          .to(
            buttonsRef.current,
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power2.out",
            },
            "-=0.4"
          )
          .fromTo(
            circleRef.current,
            { scale: 0 },
            {
              scale: 3,
              duration: 2.5,
              ease: "power2.out",
            },
            "-=0.6"
          );
        return tl;
      };

      triggerRef.current = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 85%",
        toggleActions: "play none none reverse",
        onEnter: () => {
          setInitial();
          createTimeline();
        },
        onEnterBack: () => {
          setInitial();
          createTimeline();
        },
      });
    }, sectionRef);

    return () => {
      if (triggerRef.current) triggerRef.current.kill();
      ctx.revert();
    };
  }, []);

  const handleEmailClick = useCallback(() => {
    const email = "info@vyanwebs.com";
    const subject = "Inquiry";
    const body = "Hello Vyanwebs,";
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  }, []);

  const handleWhatsAppClick = useCallback(() => {
    const phoneNumber = "919111721315";
    const message = "Hello Vyanwebs, I want to know more";
    window.open(
      `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  }, []);

  return (
    <section ref={sectionRef} className="bg-white py-8 sm:py-12 px-3 sm:px-6">
      <div
        className="relative bg-blue-600 rounded-2xl overflow-hidden 
                  max-w-7xl mx-auto px-4 sm:px-8 md:px-12 lg:px-16 py-10 sm:py-14 lg:py-20 text-white"
      >
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 to-blue-500/60 z-0" />

        {/* Animated Circle */}
        <div
          ref={circleRef}
          className="circle-bg absolute -bottom-16 -right-16 
                 w-56 h-56 sm:w-72 sm:h-72 lg:w-96 lg:h-96 
                 bg-white/10 rounded-full z-0"
        />

        {/* Foreground Content */}
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
          {/* Text Block */}
          <div ref={titleRef} className="text-center lg:text-left max-w-lg">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold leading-snug sm:leading-tight">
              Experience our <br className="hidden sm:block" />
              services <br className="hidden sm:block" />
              in action!
            </h2>
          </div>

          {/* Buttons */}
          <div
            ref={buttonsRef}
            className="flex flex-col gap-4 sm:gap-5 w-full max-w-xs sm:max-w-sm md:max-w-md"
          >
            {/* Email */}
            <button
              onClick={handleEmailClick}
              className="group border border-white rounded-full px-6 py-3 flex items-center justify-between gap-3 hover:bg-white hover:text-blue-600 transition-all duration-300"
            >
              <span className="text-white group-hover:text-blue-600 transition-colors">
                Connect Through Email
              </span>
              <span className="bg-blue-800 text-white p-1.5 rounded-full group-hover:bg-blue-600 transition-colors">
                <ArrowRight size={16} />
              </span>
            </button>

            {/* WhatsApp */}
            <button
              onClick={handleWhatsAppClick}
              className="group border border-white rounded-full px-6 py-3 flex items-center justify-between gap-3 hover:bg-white hover:text-blue-600 transition-all duration-300"
            >
              <span className="text-white group-hover:text-blue-600 transition-colors">
                Connect Through WhatsApp
              </span>
              <span className="bg-blue-800 text-white p-1.5 rounded-full group-hover:bg-blue-600 transition-colors">
                <ArrowRight size={16} />
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}