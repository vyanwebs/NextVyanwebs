"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollToTopOnRouteChange() {
  const pathname = usePathname();

  useEffect(() => {
    // Always scroll to top when route changes OR on first load
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant", // you can also try "auto" if instant doesn't work
    });
  }, [pathname]);

  return null;
}
