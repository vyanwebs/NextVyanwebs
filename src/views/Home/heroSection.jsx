"use client";

// sections/HeroSection.jsx
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Dodecahedron from "../../components/home/Dodecahedron";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const subTextRef = useRef(null);
  const buttonRef = useRef(null);
  const shapeRefs = useRef([]);
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

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

      shapeRefs.current.forEach((ref) => {
        if (!ref) return;
        const scaleAmount = window.innerWidth < 480 ? 0.9 : 0.8;
        gsap.to(ref, {
          scale: scaleAmount,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [isMounted]);

  if (!isMounted) {
    return (
      <section
        className="min-h-screen text-white flex flex-col justify-center relative overflow-hidden"
        style={{ padding: "clamp(1rem,5vw,8vw)", backgroundColor: "#121427" }}
      >
        <div className="max-w-3xl z-20 relative">
          <p className="text-blue-400 uppercase tracking-widest mb-4 text-xs sm:text-sm">
            A Software Development Company for Ambitious People
          </p>
          <h1 className="font-bold leading-tight mb-6" style={{ fontSize: "clamp(1rem,5vw,3rem)" }}>
            Empowering businesses <br /> with seamless digital transformation across leading platforms
          </h1>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      className="min-h-screen text-white flex flex-col justify-center relative overflow-hidden"
      style={{ padding: "clamp(1rem,5vw,8vw)", backgroundColor: "#121427" }}
    >
      {/* Desktop Shape 1 */}
      <div
        ref={(el) => (shapeRefs.current[1] = el)}
        className="absolute top-[-10vh] right-[35vw] hidden lg:block z-10"
        style={{
          width: "clamp(200px,35vw,500px)",
          height: "clamp(200px,35vw,500px)",
        }}
      >
        <Dodecahedron size={1200} />
      </div>

      {/* Desktop Shape 2 */}
      <div
        ref={(el) => (shapeRefs.current[2] = el)}
        className="absolute bottom-[15vh] left-[30vw] hidden lg:block z-10"
        style={{
          width: "clamp(150px,15vw,300px)",
          height: "clamp(150px,15vw,300px)",
        }}
      >
        <Dodecahedron size={500} />
      </div>

      {/* Tablet Shape */}
      <div className="absolute inset-0 hidden md:flex lg:hidden justify-center items-center z-10">
        <div
          ref={(el) => (shapeRefs.current[3] = el)}
          style={{
            width: "clamp(200px,55vw,500px)",
            height: "clamp(200px,55vw,500px)",
            transform: "translateX(8vw)",
          }}
        >
          <Dodecahedron size={900} />
        </div>
      </div>

      {/* Mobile Shape */}
      <div className="absolute inset-0 flex md:hidden justify-center items-center z-10">
        <div
          ref={(el) => (shapeRefs.current[4] = el)}
          style={{
            width: "clamp(150px,80vw,400px)",
            height: "clamp(100px,48vw,300px)",
          }}
        >
          <Dodecahedron size={800} />
        </div>
      </div>

      {/* TEXT */}
      <div className="max-w-3xl z-20 relative">
        <p className="text-blue-400 uppercase tracking-widest mb-4 text-xs sm:text-sm">
          A Software Development Company for Ambitious People
        </p>

        <h1
          ref={textRef}
          className="font-bold leading-tight mb-6"
          style={{ fontSize: "clamp(1rem,5vw,3rem)" }}
        >
          Empowering businesses <br /> with seamless digital transformation across leading platforms{" "}
          <span className="text-blue-500">.</span>
        </h1>

        <p
          ref={subTextRef}
          className="text-gray-300 mb-6"
          style={{ fontSize: "clamp(0.875rem,2.5vw,1.125rem)" }}
        >
          As a global catalyst for digital innovation, we help enterprises and start-ups unlock
          sustainable growth through intelligent technology adoption
        </p>

        <button
          ref={buttonRef}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-full transition-all duration-300 inline-flex items-center gap-2 text-sm sm:text-base"
          onClick={() => router.push("/about")}
        >
          <span>Learn More</span>
          <ArrowRight size={18} />
        </button>
      </div>
    </section>
  );
}