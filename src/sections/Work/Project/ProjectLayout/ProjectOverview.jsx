import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ProjectOverview({ data }) {
  const sectionRef = useRef(null);
// console.log(data);

  useEffect(() => {
    const section = sectionRef.current;

    gsap.fromTo(
      section.querySelectorAll(".animate-fade"),
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.2,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
        },
      }
    );
  }, []);

  return (
    <section ref={sectionRef} className="bg-white py-20 text-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-10">
        {/* Title */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-snug mb-6 animate-fade">
          {data.categoryLine}
        </h2>

        {/* Description */}
        <p className="text-base sm:text-lg md:text-xl mb-8 animate-fade leading-loose tracking-wide font-normal">
          {data.description}
        </p>

        {/* Client + Role */}
        <div className="flex flex-col md:flex-row gap-8 sm:gap-10 md:gap-12 mb-8 animate-fade">
          <div>
            <h6 className="text-gray-800 font-bold mb-1">Client</h6>
            <p className="text-base">{data.client}</p>
          </div>
          <div>
            <h6 className="text-gray-800 font-bold mb-1">Role</h6>
            <p className="text-base">{data.role}</p>
          </div>
        </div>

        {/* CTA Button */}
        <a href="/contact" className="animate-fade inline-block">
          <button className="bg-blue-600 text-white py-3 px-6 rounded-full flex items-center gap-3 hover:bg-blue-700 transition-all">
            <span>Get started with your project</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M14.43 5.93L20.5 12l-6.07 6.07M3.5 12h16.83"
              />
            </svg>
          </button>
        </a>
      </div>
    </section>
  );
}
