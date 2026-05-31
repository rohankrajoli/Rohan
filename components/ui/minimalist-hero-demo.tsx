"use client";

import React from "react";
import { Github, Linkedin, Mail } from "lucide-react";
import { MinimalistHero } from "@/components/ui/minimalist-hero";

export function MinimalistHeroDemo() {
  const socialLinks = [
    { icon: Github, href: "https://github.com/rohankrajoli" },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/rohankrajoli",
    },
    { icon: Mail, href: "mailto:rohankrajoli@gmail.com" },
  ];

  return (
    <MinimalistHero
      logoText="rohan."
      mainText="Java Full Stack Developer passionate about building scalable applications, solving complex problems, and creating seamless user experiences."
      imageSrc="/rohan-hero.png"
      imageAlt="Rohan K Rajoli portrait"
      overlayText={{
        line1: "Design",
        line2: "Develop",
        line3: "Deliver",
      }}
      socialLinks={socialLinks}
      locationText="Harihar, Karnataka, IN"
    />
  );
}
