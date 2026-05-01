import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ProjectDesktopView = ({ images }) => {
  const sectionRef = useRef(null);
  const imgRef = useRef(null);
  

  useEffect(() => {
    const section = sectionRef.current;

    const animation = gsap.fromTo(
      imgRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none reset",
        },
      }
    );

    return () => {
      if (animation.scrollTrigger) {
        animation.scrollTrigger.kill();
      }
      animation.kill();
    };
  }, [images]);
  
  return (
    
    <section ref={sectionRef} className="max-w-full bg-white  ">
      <div className=" overflow-hidden">
        <img loading="lazy"
          ref={imgRef}
          src={images}
        
          alt="Project desktop view"
          className="w-full rounded-lg shadow-xl object-cover"
        />
      </div>
    </section>
  );
};

export default ProjectDesktopView;
