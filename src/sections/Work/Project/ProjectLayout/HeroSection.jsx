import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { sharedIcons } from "../ProjectsData/HeroData";

export default function HeroSection({ project }) {
  const iconRefs = useRef([]);

  // Helper function to get image source
  const getImageSrc = (img) => {
    if (!img) return "";
    if (typeof img === "string") return img;
    if (typeof img === "object" && img.src) return img.src;
    return "";
  };

  useEffect(() => {
    if (iconRefs.current.length > 0) {
      gsap.from(iconRefs.current, {
        opacity: 0,
        y: 50,
        stagger: 0.2,
        duration: 1,
        ease: "power2.out",
      });
    }
  }, [project]);

  if (!project) return null;

  return (
    <div className="bg-[#1c1e26] min-h-[90vh] md:min-h-[60vh] lg:min-h-[90vh] flex flex-col pt-28 px-4 md:px-8 text-white">
      <div className="container mx-auto flex flex-col md:flex-row items-stretch gap-14 sm:gap-12 lg:gap-28 max-w-7xl md:px-8 lg:px-20 flex-1">
        {/* Left Section */}
        <div className="md:w-1/2 flex flex-col justify-center md:my-5">
          <div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-8">
              {project.title}
              <b className="primary-color">.</b>
            </h1>

            {/* Shared Icons */}
            <div className="flex gap-3 sm:gap-4 flex-wrap mb-8 md:mb-12">
              {sharedIcons?.map((icon, index) => (
                <img
                  loading="lazy"
                  key={index}
                  ref={(el) => (iconRefs.current[index] = el)}
                  src={getImageSrc(icon)}
                  alt="Tech icon"
                  className="h-6 sm:h-7 md:h-8 w-auto"
                />
              ))}
            </div>

            <h4 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-4">
              {project.tagline}
            </h4>

            <p className="text-sm sm:text-base leading-loose tracking-wider font-medium">
              {project.description}
            </p>
          </div>
        </div>

        {/* Right Section */}
        <div className="md:w-1/2 flex items-end justify-center md:justify-end mt-10 md:mt-0">
          <img
            loading="lazy"
            src={getImageSrc(project.heroImgs) || "https://placehold.co/800x400/1c1e26/white?text=No+Image"}
            alt={`${project.title} banner`}
            className="w-full object-contain rounded-md shadow-lg
             max-h-[280px] sm:max-h-[380px] md:max-h-[420px] lg:max-h-[500px] xl:max-h-[600px]"
          />
        </div>
      </div>
    </div>
  );
}