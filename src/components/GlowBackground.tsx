import React, { useEffect, useState } from "react";
import { motion } from "motion/react";

interface GlowBackgroundProps {
  theme?: "light" | "dark" | "cyber";
}

export default function GlowBackground({ theme = "light" }: GlowBackgroundProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  if (!mounted) return null;

  // Set colors based on chosen theme
  let containerBg = "bg-[#f7f9fc]";
  let gridOpacity = "opacity-60";
  let mouseGradient = "radial-gradient(circle, rgba(255, 95, 0, 0.08) 0%, rgba(0, 240, 255, 0.04) 50%, rgba(255, 255, 255, 0) 100%)";
  let blob1Gradient = "radial-gradient(circle, rgba(255, 95, 0, 0.12) 0%, rgba(0, 240, 255, 0.02) 60%, rgba(255, 255, 255, 0) 80%)";
  let blob2Gradient = "radial-gradient(circle, rgba(0, 240, 255, 0.12) 0%, rgba(255, 120, 0, 0.03) 60%, rgba(255, 255, 255, 0) 80%)";
  let blob3Gradient = "radial-gradient(circle, rgba(255, 160, 0, 0.08) 0%, rgba(255, 95, 0, 0.02) 50%, rgba(255, 255, 255, 0) 70%)";
  let overlayBg = "to-[#f7f9fc]";

  if (theme === "dark") {
    containerBg = "bg-[#0b111e]";
    gridOpacity = "opacity-15 invert brightness-200";
    mouseGradient = "radial-gradient(circle, rgba(16, 185, 129, 0.07) 0%, rgba(6, 182, 212, 0.03) 50%, rgba(15, 23, 42, 0) 100%)";
    blob1Gradient = "radial-gradient(circle, rgba(16, 185, 129, 0.09) 0%, rgba(6, 182, 212, 0.02) 60%, rgba(15, 23, 42, 0) 80%)";
    blob2Gradient = "radial-gradient(circle, rgba(6, 182, 212, 0.09) 0%, rgba(99, 102, 241, 0.02) 60%, rgba(15, 23, 42, 0) 80%)";
    blob3Gradient = "radial-gradient(circle, rgba(99, 102, 241, 0.07) 0%, rgba(16, 185, 129, 0.01) 50%, rgba(15, 23, 42, 0) 70%)";
    overlayBg = "to-[#0b111e]";
  } else if (theme === "cyber") {
    containerBg = "bg-[#070110]";
    gridOpacity = "opacity-25 hue-rotate-[120deg] brightness-125";
    mouseGradient = "radial-gradient(circle, rgba(236, 72, 153, 0.10) 0%, rgba(168, 85, 247, 0.04) 50%, rgba(7, 1, 16, 0) 100%)";
    blob1Gradient = "radial-gradient(circle, rgba(236, 72, 153, 0.12) 0%, rgba(168, 85, 247, 0.03) 60%, rgba(7, 1, 16, 0) 80%)";
    blob2Gradient = "radial-gradient(circle, rgba(168, 85, 247, 0.12) 0%, rgba(6, 182, 212, 0.03) 60%, rgba(7, 1, 16, 0) 80%)";
    blob3Gradient = "radial-gradient(circle, rgba(6, 182, 212, 0.08) 0%, rgba(236, 72, 153, 0.02) 50%, rgba(7, 1, 16, 0) 70%)";
    overlayBg = "to-[#070110]";
  }

  return (
    <div className={`fixed inset-0 -z-50 overflow-hidden ${containerBg} transition-colors duration-500`} id="glow-bg-container">
      {/* Dynamic Grid Overlay */}
      <div className={`spatial-grid absolute inset-0 ${gridOpacity} transition-opacity duration-500`} />

      {/* Interactive Radial Spotlight tracking Mouse */}
      <div
        className="pointer-events-none absolute hidden md:block transition-transform duration-100 ease-out"
        style={{
          transform: `translate(${mousePosition.x - 250}px, ${mousePosition.y - 250}px)`,
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background: mouseGradient,
          filter: "blur(40px)",
        }}
      />

      {/* Floating Liquid-Glass Blobs */}
      <motion.div
        animate={{
          x: [0, 40, -20, 0],
          y: [0, -50, 30, 0],
          scale: [1, 1.1, 0.95, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -top-[10%] -left-[5%] w-[45vw] h-[45vw] rounded-full"
        style={{
          background: blob1Gradient,
          filter: "blur(60px)",
        }}
      />

      <motion.div
        animate={{
          x: [0, -60, 40, 0],
          y: [0, 60, -30, 0],
          scale: [1, 0.9, 1.1, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -bottom-[10%] -right-[5%] w-[50vw] h-[50vw] rounded-full"
        style={{
          background: blob2Gradient,
          filter: "blur(80px)",
        }}
      />

      <motion.div
        animate={{
          x: [0, 30, -40, 0],
          y: [0, 40, 40, 0],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[40%] left-[30%] w-[35vw] h-[35vw] rounded-full"
        style={{
          background: blob3Gradient,
          filter: "blur(50px)",
        }}
      />

      {/* White-mode/Theme custom overlay gradient effect */}
      <div className={`absolute inset-0 bg-radial-gradient from-transparent ${overlayBg} opacity-75 pointer-events-none transition-all duration-500`} />
    </div>
  );
}
