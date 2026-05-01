import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Faqs = ({ faqs, title }) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const faqRefs = useRef([]);
  const containerRef = useRef(null);

  useEffect(() => {
  if (!faqRefs.current.length) return;

  const ctx = gsap.context(() => {
    gsap.fromTo(
      faqRefs.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          toggleActions: "play none none reset",
        },
      }
    );
  }, containerRef);

  return () => ctx.revert(); // kills all ScrollTriggers & animations
}, [faqs]);


  const toggleFaq = (index) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  if (!faqs || !faqs.length) {
    return null;
  }

  return (
    <div ref={containerRef} className="bg-white py-16 px-6 text-gray-900">
      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          <span className="text-[#38E1AE] capitalize">{title}</span> FAQs
          <b className="text-[#38E1AE]">.</b>
        </h2>

        {/* Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              ref={(el) => (faqRefs.current[index] = el)}
              className="border border-gray-300 rounded-lg overflow-hidden bg-gray-50"
            >
              <button
                onClick={() => toggleFaq(index)}
                className="w-full flex justify-between items-center px-6 py-4 text-left text-gray-900 font-medium focus:outline-none"
              >
                {faq.question}
                <span
                  className={`transform transition-transform duration-300 ${
                    activeIndex === index ? "rotate-180" : ""
                  }`}
                >
                  ▼
                </span>
              </button>

              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  activeIndex === index ? "max-h-[999px]" : "max-h-0"
                }`}
              >
                <p className="px-6 pb-4 text-gray-700">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default React.memo(Faqs);
