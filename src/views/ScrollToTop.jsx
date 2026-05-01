"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const ScrollToTop = () => {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top-left of the window on route change
  }, [pathname]);

  return null; // This component does not render anything
};

export default ScrollToTop;
