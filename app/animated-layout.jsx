"use client";

import { usePathname } from "next/navigation";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

export default function AnimatedLayout({ children }) {
  const pathname = usePathname();
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const el = containerRef.current;
      if (!el) return;

      // Set initial state instantly (hidden & slightly down)
      gsap.set(el, {
        opacity: 0,
        y: 20,
        clearProps: "all",
      });

      // Smooth entry animation
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
        clearProps: "all", // remove inline transform & opacity after animation
      });
    }, containerRef);

    return () => ctx.revert(); // fully clean up on unmount
  }, [pathname]);

  return (
    <div
      ref={containerRef}
      style={{
        minHeight: "100vh",
        background: "transparent",
        position: "relative",
        zIndex: 1,
      }}
    >
      {children}
    </div>
  );
}
