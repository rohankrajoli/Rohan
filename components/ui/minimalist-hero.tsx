"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { LucideIcon, Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";
import { LampEffect } from "./lamp";

interface MinimalistHeroProps {
  logoText: string;
  mainText: string;
  readMoreLink: string;
  imageSrc: string;
  imageAlt: string;
  overlayText: {
    line1: string;
    line2: string;
    line3: string;
  };
  socialLinks: { icon: LucideIcon; href: string }[];
  locationText: string;
  className?: string;
}

const SocialIcon = ({
  href,
  icon: Icon,
}: {
  href: string;
  icon: LucideIcon;
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="text-black transition-colors hover:text-black/75 dark:text-white/80 dark:hover:text-white"
    aria-label={href}
  >
    <Icon className="h-5 w-5" strokeWidth={1.5} />
  </a>
);

const ThemeSwitch = ({ className = "" }: { className?: string }) => {
  const [theme, setTheme] = React.useState<"light" | "dark">("light");

  React.useEffect(() => {
    const savedTheme =
      localStorage.getItem("theme") ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");

    const nextTheme = savedTheme === "dark" ? "dark" : "light";
    setTheme(nextTheme);
    document.documentElement.classList.toggle("dark", nextTheme === "dark");
  }, []);

  const toggleTheme = React.useCallback(() => {
    const nextTheme = theme === "light" ? "dark" : "light";

    setTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);
    document.documentElement.classList.toggle("dark", nextTheme === "dark");
  }, [theme]);

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
      className={cn(
        "relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-full text-black transition-opacity hover:opacity-80 dark:text-white",
        className,
      )}
    >
      <Sun
        className={cn(
          "absolute h-5 w-5 transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
          theme === "light" ? "translate-y-0 scale-100 opacity-100" : "translate-y-5 scale-50 opacity-0",
        )}
      />
      <Moon
        className={cn(
          "absolute h-5 w-5 transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
          theme === "dark" ? "translate-y-0 scale-100 opacity-100" : "translate-y-5 scale-50 opacity-0",
        )}
      />
    </button>
  );
};

export const MinimalistHero = ({
  logoText,
  mainText,
  imageSrc,
  imageAlt,
  overlayText,
  socialLinks,
  locationText,
  className,
}: Omit<MinimalistHeroProps, 'readMoreLink'>) => {
  const [imageLoaded, setImageLoaded] = React.useState(false);

  return (
    <div
      className={cn(
        "relative flex min-h-[94svh] w-full flex-col items-center justify-between overflow-hidden bg-white p-6 text-black transition-colors duration-300 dark:bg-slate-950 dark:text-white md:min-h-[96svh] md:p-10 lg:p-12",
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-0 z-0 hidden dark:block -translate-y-[25%] md:-translate-y-[35%]">
        <LampEffect />
      </div>
      <header className="z-30 flex w-full max-w-7xl items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="text-lg font-bold tracking-tight text-black dark:text-white md:text-xl"
        >
          {logoText}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <ThemeSwitch />
        </motion.div>
      </header>

      <div className="relative flex w-full max-w-7xl flex-grow flex-col items-center justify-center px-4 md:px-8">
        <div className="relative grid w-full grid-cols-1 items-center gap-8 md:grid-cols-[1fr_auto_1fr] md:gap-0">
          {/* Left Side Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
            className="z-20 flex flex-col justify-center text-center md:text-left md:pr-8"
          >
            <div className="max-w-xs mx-auto md:mx-0">
              <p className="hidden">{imageAlt}</p>
              <p className="text-sm font-medium leading-relaxed text-black/80 dark:text-white/75">{mainText}</p>
            </div>
          </motion.div>

          {/* Center Image Container */}
          <div className="relative flex min-h-[340px] items-center justify-center md:min-h-[480px] lg:min-h-[600px]">
            {/* Circular Background with Pulse */}
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ 
                scale: [1, 1.05, 1],
                opacity: 1 
              }}
              transition={{ 
                scale: {
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                },
                opacity: {
                  duration: 0.8,
                  delay: 0.2
                }
              }}
              className="absolute z-0 aspect-square h-[280px] w-[280px] rounded-full bg-[#EAB308] md:h-[400px] md:w-[400px] lg:h-[480px] lg:w-[480px]"
            />
            
            {/* Image Loader */}
            {!imageLoaded && (
              <div className="absolute inset-0 z-20 flex items-center justify-center">
                <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#EAB308] border-t-transparent"></div>
              </div>
            )}

            {/* Image Container with Reveal & Hover */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ 
                opacity: imageLoaded ? 1 : 0,
                scale: imageLoaded ? 1 : 0.9,
                y: imageLoaded ? 0 : 40 
              }}
              whileHover={{ 
                scale: 1.05,
                rotateY: 5,
                rotateX: -5,
                transition: { duration: 0.4, ease: "easeOut" }
              }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 h-[380px] w-[270px] overflow-hidden md:h-[500px] md:w-[340px] lg:h-[600px] lg:w-[410px]"
              style={{ perspective: "1000px" }}
            >
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                priority
                className="scale-[1.16] object-cover object-[center_10%] transition-transform duration-700"
                onLoad={() => setImageLoaded(true)}
                onError={() => {
                  console.error("Image load error:", imageSrc);
                  setImageLoaded(true);
                }}
              />
            </motion.div>
          </div>

          {/* Right Side Text */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.6 }}
            className="z-20 flex h-full items-center justify-center md:justify-start md:pl-8"
          >
            <h1 className="text-left text-5xl font-black leading-[0.9] tracking-tighter text-black dark:text-white sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl whitespace-nowrap">
              {overlayText.line1}
              <br />
              <span className="inline-block [-webkit-text-stroke:2px_#000] dark:[-webkit-text-stroke:2px_#fff]" style={{ WebkitTextFillColor: "transparent" }}>
                {overlayText.line2}
              </span>
              <br />
              {overlayText.line3}
            </h1>
          </motion.div>
        </div>
      </div>

      <footer className="z-30 flex w-full max-w-7xl items-center justify-between px-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="flex items-center gap-5"
        >
          {socialLinks.map((link, index) => (
            <SocialIcon key={index} href={link.href} icon={link.icon} />
          ))}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.9 }}
          className="text-xs font-medium text-black dark:text-white/80 md:text-sm"
        >
          {locationText}
        </motion.div>
      </footer>
    </div>
  );
};
