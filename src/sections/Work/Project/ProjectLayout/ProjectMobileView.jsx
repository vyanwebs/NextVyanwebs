import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ProjectMobileView = ({ data }) => {
  const sectionRef = useRef(null);
  const image1Ref = useRef(null);
  const image2Ref = useRef(null);
  const textRef = useRef(null);

  // Helper function to get image source
  const getImageSrc = (img) => {
    if (!img) return "";
    if (typeof img === "string") return img;
    if (typeof img === "object" && img.src) return img.src;
    return "";
  };

  useEffect(() => {
    if (!data) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          toggleActions: "play none none reset",
        },
      });

      tl.from(image1Ref.current, {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      })
        .from(
          image2Ref.current,
          {
            y: 60,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
          },
          "-=0.6"
        )
        .from(
          textRef.current.children,
          {
            y: 40,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            ease: "power3.out",
          },
          "-=0.5"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, [data]);

  if (!data) return null;

  return (
    <section
      ref={sectionRef}
      className="bg-blue-600 text-white min-h-[90vh] flex flex-col justify-between pt-16"
    >
      <div className="container mx-auto px-4 flex-1 flex flex-col lg:flex-row items-center gap-10 lg:gap-16">

        {/* LEFT PART */}
        <div className="w-full lg:w-1/2 flex flex-col">
          {/* Heading */}
          <div className="mb-10">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center leading-snug">
              {data.heading}
            </h2>
          </div>

          {/* IMAGES FIXED */}
          <div className="relative w-full flex justify-center items-center">

            {/* MOBILE VIEW → SIDE BY SIDE CENTERED */}
            <div className="flex lg:hidden w-full justify-center items-center gap-5">
              <img
                ref={image1Ref}
                src={getImageSrc(data.images?.[0])}
                alt="Mobile 1"
                className="h-64 sm:h-72 object-contain"
              />
              <img
                ref={image2Ref}
                src={getImageSrc(data.images?.[1])}
                alt="Mobile 2"
                className="h-64 sm:h-72 object-contain"
              />
            </div>

            {/* DESKTOP VIEW → ZIG ZAG */}
            <div className="hidden lg:block relative w-full h-[32rem]">
              <img
                ref={image1Ref}
                src={getImageSrc(data.images?.[0])}
                alt="Mobile 1"
                className="
                  absolute left-[15%] top-[10%]
                  h-96 xl:h-[28rem] object-contain
                "
              />

              <img
                ref={image2Ref}
                src={getImageSrc(data.images?.[1])}
                alt="Mobile 2"
                className="
                  absolute left-[55%] top-[20%]
                  h-96 xl:h-[28rem] object-contain z-10
                "
              />
            </div>

          </div>
        </div>

        {/* RIGHT TEXT SIDE */}
        <div
          ref={textRef}
          className="w-full lg:w-1/2 flex flex-col justify-center space-y-6 px-4"
        >
          {data.mobileFeatures?.map((feature, idx) => (
            <div key={idx}>
              <h4 className="text-xl md:text-3xl font-semibold mb-2">
                {feature.title}
              </h4>
              <p className="text-gray-200 text-sm md:text-lg leading-relaxed font-medium">
                {feature.subTitle}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ProjectMobileView;