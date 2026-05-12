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
  const bottomBorderRef = useRef(null);
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

      gsap.set(bottomBorderRef.current, { opacity: 0, y: 20 });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 80%",
        toggleActions: "restart none none none",
        onEnter: () => {
          gsap.timeline()
            .to(textRef.current, { opacity: 1, y: 0, duration: 1.4, ease: "power3.out" })
            .to(subTextRef.current, { opacity: 1, y: 0, duration: 1.4, ease: "power3.out" }, "-=0.9")
            .to(buttonRef.current, { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }, "-=0.9")
            .to(bottomBorderRef.current, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "-=0.5");
        },
        onLeaveBack: () => {
          gsap.set([textRef.current, subTextRef.current, buttonRef.current], { opacity: 0, y: 60 });
          gsap.set(bottomBorderRef.current, { opacity: 0, y: 20 });
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

          <button
            className="border border-white/20 hover:border-blue-400/60 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 inline-flex items-center gap-2 text-sm sm:text-base backdrop-blur-sm hover:bg-white/5"
            onClick={() => window.open('https://wa.me/919111721315', '_blank')}
          >
            <span>WhatsApp</span>
          </button>
        </div>
      </div>

      {/* Bottom Border - Rich Network Lines and Nodes */}
      <div
        ref={bottomBorderRef}
        className="absolute bottom-0 left-0 w-full z-20 pointer-events-none opacity-0"
      >
        <div className="relative w-full h-[140px] bg-gradient-to-b from-transparent via-[#0a0a0f] to-[#0a0a0f] overflow-hidden">

          {/* Network SVG - Rich lines and nodes */}
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 1920 140"
            preserveAspectRatio="none"
          >
            <defs>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter id="glowStrong">
                <feGaussianBlur stdDeviation="5" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Layer 1 - Primary Network Lines */}
            <g stroke="#3b82f6" strokeWidth="1.2" fill="none">
              <line x1="3%" y1="50" x2="12%" y2="80" opacity="0.5">
                <animate attributeName="opacity" values="0.3;0.7;0.3" dur="3s" repeatCount="indefinite" />
              </line>
              <line x1="12%" y1="80" x2="20%" y2="45" opacity="0.5">
                <animate attributeName="opacity" values="0.4;0.8;0.4" dur="2.5s" repeatCount="indefinite" />
              </line>
              <line x1="20%" y1="45" x2="30%" y2="75" opacity="0.5">
                <animate attributeName="opacity" values="0.3;0.6;0.3" dur="3.2s" repeatCount="indefinite" />
              </line>
              <line x1="30%" y1="75" x2="38%" y2="50" opacity="0.5">
                <animate attributeName="opacity" values="0.5;0.9;0.5" dur="2.8s" repeatCount="indefinite" />
              </line>
              <line x1="38%" y1="50" x2="48%" y2="85" opacity="0.5">
                <animate attributeName="opacity" values="0.3;0.7;0.3" dur="3.5s" repeatCount="indefinite" />
              </line>
              <line x1="48%" y1="85" x2="58%" y2="55" opacity="0.5">
                <animate attributeName="opacity" values="0.4;0.8;0.4" dur="2.2s" repeatCount="indefinite" />
              </line>
              <line x1="58%" y1="55" x2="68%" y2="80" opacity="0.5">
                <animate attributeName="opacity" values="0.3;0.6;0.3" dur="3s" repeatCount="indefinite" />
              </line>
              <line x1="68%" y1="80" x2="78%" y2="45" opacity="0.5">
                <animate attributeName="opacity" values="0.5;0.9;0.5" dur="2.6s" repeatCount="indefinite" />
              </line>
              <line x1="78%" y1="45" x2="88%" y2="70" opacity="0.5">
                <animate attributeName="opacity" values="0.3;0.7;0.3" dur="3.3s" repeatCount="indefinite" />
              </line>
              <line x1="88%" y1="70" x2="97%" y2="50" opacity="0.5">
                <animate attributeName="opacity" values="0.4;0.8;0.4" dur="2.9s" repeatCount="indefinite" />
              </line>
            </g>

            {/* Layer 2 - Secondary Network Lines (cyan) */}
            <g stroke="#06b6d4" strokeWidth="0.8" fill="none">
              <line x1="7%" y1="65" x2="18%" y2="90" opacity="0.4">
                <animate attributeName="opacity" values="0.2;0.6;0.2" dur="4s" repeatCount="indefinite" />
              </line>
              <line x1="18%" y1="90" x2="25%" y2="60" opacity="0.4">
                <animate attributeName="opacity" values="0.3;0.7;0.3" dur="3.2s" repeatCount="indefinite" />
              </line>
              <line x1="25%" y1="60" x2="35%" y2="85" opacity="0.4">
                <animate attributeName="opacity" values="0.2;0.5;0.2" dur="3.8s" repeatCount="indefinite" />
              </line>
              <line x1="35%" y1="85" x2="45%" y2="55" opacity="0.4">
                <animate attributeName="opacity" values="0.4;0.8;0.4" dur="2.7s" repeatCount="indefinite" />
              </line>
              <line x1="45%" y1="55" x2="55%" y2="80" opacity="0.4">
                <animate attributeName="opacity" values="0.3;0.6;0.3" dur="3.4s" repeatCount="indefinite" />
              </line>
              <line x1="55%" y1="80" x2="65%" y2="50" opacity="0.4">
                <animate attributeName="opacity" values="0.2;0.7;0.2" dur="2.5s" repeatCount="indefinite" />
              </line>
              <line x1="65%" y1="50" x2="75%" y2="75" opacity="0.4">
                <animate attributeName="opacity" values="0.4;0.8;0.4" dur="3.1s" repeatCount="indefinite" />
              </line>
              <line x1="75%" y1="75" x2="85%" y2="90" opacity="0.4">
                <animate attributeName="opacity" values="0.3;0.6;0.3" dur="2.8s" repeatCount="indefinite" />
              </line>
              <line x1="85%" y1="90" x2="93%" y2="65" opacity="0.4">
                <animate attributeName="opacity" values="0.2;0.5;0.2" dur="3.6s" repeatCount="indefinite" />
              </line>
            </g>

            {/* Layer 3 - Horizontal backbone lines */}
            <g stroke="#2563eb" strokeWidth="0.5" fill="none" opacity="0.3">
              <line x1="0%" y1="35" x2="100%" y2="35">
                <animate attributeName="opacity" values="0.2;0.4;0.2" dur="5s" repeatCount="indefinite" />
              </line>
              <line x1="0%" y1="60" x2="100%" y2="60">
                <animate attributeName="opacity" values="0.3;0.5;0.3" dur="4.5s" repeatCount="indefinite" />
              </line>
              <line x1="0%" y1="85" x2="100%" y2="85">
                <animate attributeName="opacity" values="0.2;0.4;0.2" dur="5.5s" repeatCount="indefinite" />
              </line>
              <line x1="0%" y1="110" x2="100%" y2="110">
                <animate attributeName="opacity" values="0.1;0.3;0.1" dur="6s" repeatCount="indefinite" />
              </line>
            </g>

            {/* Layer 4 - Vertical connector lines */}
            <g stroke="#0ea5e9" strokeWidth="0.5" fill="none" opacity="0.25">
              <line x1="12%" y1="80" x2="12%" y2="35" />
              <line x1="25%" y1="85" x2="25%" y2="60" />
              <line x1="38%" y1="50" x2="38%" y2="35" />
              <line x1="55%" y1="80" x2="55%" y2="55" />
              <line x1="68%" y1="45" x2="68%" y2="80" />
              <line x1="82%" y1="70" x2="82%" y2="90" />
              <line x1="93%" y1="65" x2="93%" y2="35" />
            </g>

            {/* Layer 5 - Primary Nodes (Blue) */}
            <g fill="#3b82f6" filter="url(#glow)">
              <circle cx="3%" cy="50" r="3.5">
                <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite" />
                <animate attributeName="r" values="2.5;4.5;2.5" dur="2s" repeatCount="indefinite" />
              </circle>
              <circle cx="20%" cy="45" r="3">
                <animate attributeName="opacity" values="0.5;1;0.5" dur="2.3s" repeatCount="indefinite" />
                <animate attributeName="r" values="2;4;2" dur="2.3s" repeatCount="indefinite" />
              </circle>
              <circle cx="38%" cy="50" r="3.5">
                <animate attributeName="opacity" values="0.3;0.9;0.3" dur="1.8s" repeatCount="indefinite" />
                <animate attributeName="r" values="2.5;4.5;2.5" dur="1.8s" repeatCount="indefinite" />
              </circle>
              <circle cx="58%" cy="55" r="3">
                <animate attributeName="opacity" values="0.6;1;0.6" dur="2.5s" repeatCount="indefinite" />
                <animate attributeName="r" values="2;4;2" dur="2.5s" repeatCount="indefinite" />
              </circle>
              <circle cx="78%" cy="45" r="3.5">
                <animate attributeName="opacity" values="0.4;1;0.4" dur="2.1s" repeatCount="indefinite" />
                <animate attributeName="r" values="2.5;4.5;2.5" dur="2.1s" repeatCount="indefinite" />
              </circle>
              <circle cx="97%" cy="50" r="3">
                <animate attributeName="opacity" values="0.5;0.9;0.5" dur="2.4s" repeatCount="indefinite" />
                <animate attributeName="r" values="2;4;2" dur="2.4s" repeatCount="indefinite" />
              </circle>
            </g>

            {/* Layer 6 - Secondary Nodes (Cyan) */}
            <g fill="#06b6d4" filter="url(#glow)">
              <circle cx="12%" cy="80" r="2.5">
                <animate attributeName="opacity" values="0.3;0.8;0.3" dur="2.8s" repeatCount="indefinite" />
                <animate attributeName="r" values="2;3.5;2" dur="2.8s" repeatCount="indefinite" />
              </circle>
              <circle cx="30%" cy="75" r="3">
                <animate attributeName="opacity" values="0.4;0.9;0.4" dur="2.2s" repeatCount="indefinite" />
                <animate attributeName="r" values="2;4;2" dur="2.2s" repeatCount="indefinite" />
              </circle>
              <circle cx="48%" cy="85" r="2.5">
                <animate attributeName="opacity" values="0.5;1;0.5" dur="2.6s" repeatCount="indefinite" />
                <animate attributeName="r" values="2;3.5;2" dur="2.6s" repeatCount="indefinite" />
              </circle>
              <circle cx="68%" cy="80" r="3">
                <animate attributeName="opacity" values="0.3;0.8;0.3" dur="2s" repeatCount="indefinite" />
                <animate attributeName="r" values="2;4;2" dur="2s" repeatCount="indefinite" />
              </circle>
              <circle cx="88%" cy="70" r="2.5">
                <animate attributeName="opacity" values="0.4;0.9;0.4" dur="2.9s" repeatCount="indefinite" />
                <animate attributeName="r" values="2;3.5;2" dur="2.9s" repeatCount="indefinite" />
              </circle>
            </g>

            {/* Layer 7 - Small decorative nodes */}
            <g fill="#60a5fa" filter="url(#glowStrong)" opacity="0.7">
              {[5, 7, 9, 11, 13, 15, 17, 19, 21, 23].map((pos) => (
                <circle key={pos} cx={`${pos}%`} cy="70" r="1.5">
                  <animate attributeName="opacity" values="0.2;0.6;0.2" dur={`${2 + pos * 0.1}s`} repeatCount="indefinite" />
                </circle>
              ))}
              {[6, 8, 10, 12, 14, 16, 18, 20, 22, 24].map((pos) => (
                <circle key={pos} cx={`${pos}%`} cy="50" r="1.5">
                  <animate attributeName="opacity" values="0.3;0.7;0.3" dur={`${2.5 + pos * 0.1}s`} repeatCount="indefinite" />
                </circle>
              ))}
            </g>
            

            {/* Center hub - large node */}
            <circle cx="50%" cy="65" r="5" fill="#3b82f6" filter="url(#glowStrong)" opacity="0.8">
              <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" />
              <animate attributeName="r" values="4;6;4" dur="2s" repeatCount="indefinite" />
            </circle>

            {/* Inner glow for center hub */}
            <circle cx="50%" cy="65" r="8" fill="none" stroke="#3b82f6" strokeWidth="0.5" opacity="0.3">
              <animate attributeName="r" values="7;10;7" dur="2s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.2;0.4;0.2" dur="2s" repeatCount="indefinite" />
            </circle>
          </svg>

          {/* Top border line with gradient */}

          {/* Subtle bottom glow */}
          <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
        </div>
      </div>
    </section>
  );
}