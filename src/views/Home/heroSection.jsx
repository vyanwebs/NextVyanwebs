"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const subTextRef = useRef(null);
  const buttonRef = useRef(null);
  const marqueeRef = useRef(null);
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Single centered marquee scroll — very slow horizontal
  useEffect(() => {
    if (!isMounted) return;

    if (marqueeRef.current) {
      const totalWidth = marqueeRef.current.scrollWidth / 2;
      gsap.fromTo(
        marqueeRef.current,
        { x: 0 },
        { x: -totalWidth, duration: 120, ease: "none", repeat: -1 }
      );
    }

    return () => {
      if (marqueeRef.current) gsap.killTweensOf(marqueeRef.current);
    };
  }, [isMounted]);

  // Gentle floating up-down
  useEffect(() => {
    if (!isMounted) return;

    if (marqueeRef.current) {
      gsap.to(marqueeRef.current, {
        y: 15,
        duration: 10,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
    }
  }, [isMounted]);

  // Entry animations
  useEffect(() => {
    if (!isMounted) return;

    const ctx = gsap.context(() => {
      gsap.set([textRef.current, subTextRef.current, buttonRef.current], {
        opacity: 0,
        y: 60,
      });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 80%",
        toggleActions: "restart none none none",
        onEnter: () => {
          gsap.timeline()
            .to(textRef.current, { opacity: 1, y: 0, duration: 1.4, ease: "power3.out" })
            .to(subTextRef.current, { opacity: 1, y: 0, duration: 1.4, ease: "power3.out" }, "-=0.9")
            .to(buttonRef.current, { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }, "-=0.9");
        },
        onLeaveBack: () => {
          gsap.set([textRef.current, subTextRef.current, buttonRef.current], { opacity: 0, y: 60 });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [isMounted]);

  const words = Array.from({ length: 15 });

  const MarqueeRow = () => (
    <div
      ref={marqueeRef}
      className="flex whitespace-nowrap will-change-transform"
      style={{ opacity: 0.025 }}
    >
      {words.map((_, i) => (
        <span
          key={i}
          className="font-black tracking-tighter text-white inline-flex items-center gap-8 px-8"
          style={{ fontSize: "clamp(4rem, 12vw, 10rem)" }}
        >
          VYANWEBS
          <span className="text-blue-400" style={{ fontSize: "clamp(1rem, 3vw, 2.5rem)" }}>✦</span>
        </span>
      ))}
    </div>
  );

  if (!isMounted) {
    return (
      <section
        className="min-h-screen text-white flex flex-col justify-center relative overflow-hidden bg-[#0a0a0f]"
        style={{ padding: "clamp(1rem,5vw,8vw)" }}
      >
        <div className="max-w-3xl z-20 relative">
          <p className="text-blue-400 uppercase tracking-widest mb-4 text-xs sm:text-sm">
            Software Development Company
          </p>
          <h1 className="font-bold leading-tight mb-6" style={{ fontSize: "clamp(2rem,5vw,4rem)" }}>
            Empowering businesses with custom software solutions
          </h1>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      className="min-h-screen text-white flex flex-col justify-center relative overflow-hidden bg-[#0a0a0f]"
      style={{ padding: "clamp(1rem,5vw,8vw)" }}
    >
      {/* Glow blobs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-700/10 rounded-full blur-[160px] pointer-events-none z-0" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-cyan-600/8 rounded-full blur-[130px] pointer-events-none z-0" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-indigo-700/10 rounded-full blur-[100px] pointer-events-none z-0" />

      {/* Single centered marquee row */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden z-10 pointer-events-none select-none">
        <MarqueeRow />
      </div>

      {/* Foreground content - Left aligned */}
      <div className="max-w-4xl z-30 relative">
        <div className="mb-5">
          <span className="text-blue-400 uppercase tracking-[0.25em] text-xs sm:text-sm font-light bg-blue-500/10 px-4 py-2 rounded-full backdrop-blur-sm border border-blue-500/20 inline-block">
            Software Development Company
          </span>
        </div>

        <h1
          ref={textRef}
          className="font-bold leading-[1.1] mb-6 text-white"
          style={{ fontSize: "clamp(2rem, 5.5vw, 4.5rem)" }}
        >
          Empowering businesses <br /> with seamless{" "}
          <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent">
            digital transformation
          </span>
        </h1>

        <p
          ref={subTextRef}
          className="text-gray-400 mb-10 leading-relaxed max-w-2xl"
          style={{ fontSize: "clamp(0.875rem, 2.5vw, 1.125rem)" }}
        >
          As a global catalyst for digital innovation, we help enterprises and
          start-ups unlock sustainable growth through intelligent technology
          adoption and custom software development.
        </p>

        <div ref={buttonRef} className="flex gap-4 flex-wrap">
          <button
            className="group bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 inline-flex items-center gap-2 text-sm sm:text-base shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40"
            onClick={() => router.push("/about")}
          >
            <span>Learn More</span>
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            className="border border-white/20 hover:border-blue-400/60 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 inline-flex items-center gap-2 text-sm sm:text-base backdrop-blur-sm hover:bg-white/5"
            onClick={() => router.push("/contact")}
          >
            <span>Contact Us</span>
          </button>

          {/* WhatsApp Button */}
          <button
            className="border border-white/20 hover:border-blue-400/60 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 inline-flex items-center gap-2 text-sm sm:text-base backdrop-blur-sm hover:bg-white/5"
            onClick={() => window.open('https://wa.me/919111721315', '_blank')}
          >
            <span>WhatsApp</span>
          </button>
        </div>
      </div>
    </section>
  );
}