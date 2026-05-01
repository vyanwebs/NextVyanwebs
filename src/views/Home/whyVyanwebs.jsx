"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, ArrowUp } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { whyVyanwebSeed } from "@/seeder/whyVyanwebsSeed";

gsap.registerPlugin(ScrollTrigger);

export default function WhyVyanwebs() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const para1Ref = useRef(null);
  const para2Ref = useRef(null);
  const buttonRef = useRef(null);
  const rightBlockRefs = useRef([]);
  rightBlockRefs.current = [];

  const [showScroll, setShowScroll] = useState(false);
  const router = useRouter(); // ✅ only this, no useNavigate

  const addToRightRefs = (el) => {
    if (el && !rightBlockRefs.current.includes(el)) {
      rightBlockRefs.current.push(el);
    }
  };

  useEffect(() => {
    const leftElements = [headingRef, para1Ref, para2Ref, buttonRef];

    leftElements.forEach((ref, i) => {
      gsap.fromTo(
        ref.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          delay: i * 0.1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            toggleActions: "restart none none reverse",
          },
        }
      );
    });

    rightBlockRefs.current.forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            toggleActions: "restart none none reverse",
          },
        }
      );
    });

    const onScroll = () => setShowScroll(window.scrollY > 400);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="flex flex-col lg:flex-row min-h-screen w-full bg-white">
      {/* LEFT: Sticky Info Panel */}
      <div
        ref={sectionRef}
        className="w-full lg:w-1/2 px-4 sm:px-6 md:px-8 lg:px-[9.5vw] py-8 md:py-12 flex justify-center items-start lg:sticky lg:top-0 h-auto lg:h-screen"
      >
        <div className="max-w-xl w-full">
          <h2
            ref={headingRef}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-bold mb-6"
          >
            <span
              className="text-white font-extrabold text-4xl sm:text-5xl md:text-5xl lg:text-5xl"
              style={{
                textShadow:
                  "1px 1px 0 #335fe6, -1px -1px 0 #335fe6, 1px -1px 0 #335fe6, -1px 1px 0 #335fe6",
              }}
            >
              Why{" "}
            </span>
            <span className="text-blue-700">Vyanwebs</span>
            <span className="primary-color">.</span>
          </h2>

          <p
            ref={para1Ref}
            className="text-gray-800 font-semibold mb-4 leading-relaxed text-justify text-sm sm:text-base md:text-lg"
          >
            The team at Vyanwebs Pvt Ltd creates digital solutions which
            generate enduring results. Our organization delivers fast and
            scalable solutions through innovative approaches and deep technical
            knowledge to create future-proofed digital products.
          </p>

          <p
            ref={para2Ref}
            className="text-gray-700 font-medium mb-6 leading-relaxed text-justify text-sm sm:text-base md:text-lg"
          >
            Our company develops flexible modern high-performance software
            solutions which serve businesses at every stage from small startups
            to worldwide corporations. Our team focuses on delivering solutions
            using React and Next.js and Angular and Vue and TypeScript and
            Node.js and NestJS and AWS Cloud and React Native and Flutter
            technologies.
          </p>

          <button
            ref={buttonRef}
            className="primary-button group w-full sm:w-auto flex justify-center sm:justify-start"
            onClick={() => router.push("/contact")}
          >
            <span className="btn-bg"></span>
            <span className="btn-text">Learn More</span>
            <span className="btn-icon">
              <ArrowRight />
            </span>
          </button>
        </div>
      </div>

      {/* RIGHT: Scrollable Animated Info */}
      <div className="w-full lg:w-1/2 px-4 sm:px-6 md:px-8 lg:px-20 py-8 sm:py-12 md:py-16 lg:py-24 space-y-6 sm:space-y-8 md:space-y-10 lg:space-y-12 bg-primary-color text-gray-900 overflow-hidden">
        {whyVyanwebSeed.map((block) => (
          <div key={block.id} ref={addToRightRefs} className="scroll-block">
            <span
              className="py-2 sm:py-3 lg:py-4 font-extrabold text-base sm:text-xl md:text-2xl lg:text-3xl mr-2 sm:mr-3 inline-block"
              style={{
                color: "#D6EEF8",
                textShadow:
                  "1px 1px 0 #335fe6, -1px -1px 0 #335fe6, 1px -1px 0 #335fe6, -1px 1px 0 #335fe6",
              }}
            >
              {block.id}
            </span>

            <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold">
              {block.title}
            </h3>

            <p className="mt-2 pt-2 sm:pt-3 lg:pt-4 pb-4 sm:pb-6 lg:pb-8 text-xs sm:text-sm md:text-base lg:text-lg text-gray-800 leading-relaxed text-justify">
              {block.content}
            </p>
          </div>
        ))}
      </div>

      {/* Scroll to Top Button */}
      {showScroll && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 text-white p-3 rounded-full shadow-lg transition"
        >
          <ArrowUp />
        </button>
      )}
    </section>
  );
}