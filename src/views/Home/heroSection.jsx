"use client";

// sections/HeroSection.jsx
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";

// Static imports for all 5 images (much more reliable)
import img1 from "@/assets/home/hero/img2.jpg";
import img2 from "@/assets/home/hero/img1.jpg";
import img3 from "@/assets/home/hero/img3.jpg";
import img4 from "@/assets/home/hero/img4.jpg";
import img5 from "@/assets/home/hero/img5.jpg";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const subTextRef = useRef(null);
  const buttonRef = useRef(null);
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // All 5 images array
  const backgroundImages = [
    { url: img1.src, title: "Tech Background 1" },
    { url: img2.src, title: "Tech Background 2" },
    { url: img3.src, title: "Digital Technology Network" },
    { url: img4.src, title: "Download Image" },
    { url: img5.src, title: "Mundophone" }
  ];

  // Image rotation interval
  useEffect(() => {
    if (!isMounted) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === backgroundImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [isMounted, backgroundImages.length]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // GSAP animations
  useEffect(() => {
    if (!isMounted) return;

    const ctx = gsap.context(() => {
      gsap.set([textRef.current, subTextRef.current, buttonRef.current], {
        opacity: 0,
        y: 100,
      });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 80%",
        toggleActions: "restart none none none",
        onEnter: () => {
          const tl = gsap.timeline();
          tl.to(textRef.current, {
            opacity: 1,
            y: 0,
            duration: 1.4,
            ease: "power2.out",
          })
            .to(
              subTextRef.current,
              {
                opacity: 1,
                y: 0,
                duration: 1.4,
                ease: "power2.out",
              },
              "-=0.8"
            )
            .to(
              buttonRef.current,
              {
                opacity: 1,
                y: 0,
                duration: 1.2,
                ease: "power2.out",
              },
              "-=0.8"
            );
        },
        onLeaveBack: () => {
          gsap.set([textRef.current, subTextRef.current, buttonRef.current], {
            opacity: 0,
            y: 100,
          });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [isMounted]);

  // Loading state
  if (!isMounted) {
    return (
      <section
        className="min-h-screen text-white flex flex-col justify-center relative overflow-hidden bg-slate-900"
        style={{ padding: "clamp(1rem,5vw,8vw)" }}
      >
        <div className="max-w-3xl z-20 relative">
          <p className="text-blue-400 uppercase tracking-widest mb-4 text-xs sm:text-sm">
            Software Development Company
          </p>
          <h1 className="font-bold leading-tight mb-6" style={{ fontSize: "clamp(1rem,5vw,3rem)" }}>
            Empowering businesses with custom software solutions
          </h1>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      className="min-h-screen text-white flex flex-col justify-center relative overflow-hidden"
      style={{ padding: "clamp(1rem,5vw,8vw)" }}
    >
      {/* Sliding Background Images - All images now properly loaded */}
      <div className="absolute inset-0 w-full h-full">
        {backgroundImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out ${index === currentImageIndex ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
            style={{
              backgroundImage: `url(${image.url})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          />
        ))}
      </div>

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/60 to-black/70 z-20" />

      {/* Subtle blue gradient overlay for tech feel */}
      <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 via-transparent to-transparent z-20" />

      {/* Slider Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex gap-2">
        {backgroundImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`transition-all duration-300 rounded-full ${index === currentImageIndex
                ? "w-8 h-1 bg-blue-500"
                : "w-6 h-1 bg-white/30 hover:bg-white/50"
              }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Text Content */}
      <div className="max-w-4xl z-30 relative">
        <div className="mb-4">
          <span className="text-blue-400 uppercase tracking-[0.2em] text-xs sm:text-sm font-light bg-blue-500/10 px-4 py-2 rounded-full backdrop-blur-sm inline-block">
            Software Development Company
          </span>
        </div>

        <h1
          ref={textRef}
          className="font-bold leading-tight mb-6 text-white"
          style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}
        >
          Empowering businesses <br /> with seamless{" "}
          <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            digital transformation
          </span>
        </h1>

        <p
          ref={subTextRef}
          className="text-gray-200 mb-8 text-lg leading-relaxed max-w-2xl"
          style={{ fontSize: "clamp(0.875rem, 2.5vw, 1.125rem)" }}
        >
          As a global catalyst for digital innovation, we help enterprises and start-ups unlock
          sustainable growth through intelligent technology adoption and custom software development.
        </p>

        <div className="flex gap-4 flex-wrap">
          <button
            ref={buttonRef}
            className="group bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 inline-flex items-center gap-2 text-sm sm:text-base shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/35"
            onClick={() => router.push("/about")}
          >
            <span>Learn More</span>
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            className="border border-white/30 hover:border-blue-500 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 inline-flex items-center gap-2 text-sm sm:text-base backdrop-blur-sm hover:bg-white/5"
            onClick={() => router.push("/contact")}
          >
            <span>Contact Us</span>
          </button>
        </div>
      </div>
    </section>
  );
}