"use client";

// src/RootProviders.jsx
import React, { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function RootProviders({ children }) {
  useEffect(() => {
    // GSAP global optimizations
    // Reduce ScrollTrigger updates and enable batch when possible
    gsap.ticker.lagSmoothing(1000, 16); // helps remove jitter on some devices

    // ScrollTrigger performance tips:
    // - use batch for lots of similar elements
    // - use `once: true` or `toggleActions` to avoid re-triggering heavy logic
    ScrollTrigger.defaults({ scroller: undefined }); // default scroller

    // Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // smooth easing
      smooth: true,
      lerp: 0.08,
      wheelMultiplier: 1.2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // If ScrollTrigger needs to use Lenis, update on each scroll frame:
    lenis.on("scroll", () => {
      ScrollTrigger.update();
    });

    // cleanup
    return () => {
      lenis.destroy();
      ScrollTrigger.killAll();
      gsap.killTweensOf("*");
    };
  }, []);

  return (
    <>
      {children}
    </>
  );
}