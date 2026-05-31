"use client";

import React, { type MouseEvent, useState } from "react";
import {
  AnimatePresence,
  motion,
} from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
} from "lucide-react";
import {
  portfolioSections,
  type PortfolioSection,
} from "@/components/ui/portfolio-content";
import { BeamsBackground } from "@/components/ui/beams-background";
import { cn } from "@/lib/utils";
import { StackedCardsInteraction } from "@/components/ui/stacked-cards-interaction";

const nodeLayout = [
  { x: "50%", y: "12%" },
  { x: "82%", y: "36%" },
  { x: "69%", y: "76%" },
  { x: "31%", y: "76%" },
  { x: "18%", y: "36%" },
];

const particles = Array.from({ length: 58 }, (_, index) => ({
  id: index,
  left: `${(index * 29 + 11) % 100}%`,
  top: `${(index * 47 + 19) % 100}%`,
  size: 1 + (index % 4),
  delay: (index % 11) * 0.07,
  duration: 4.5 + (index % 7) * 0.42,
}));

const skills = [
  { name: "React",  x: "18%", y: "34%", color: "rgb(56 189 248)" },
  { name: "Node",  x: "42%", y: "18%", color: "rgb(52 211 153)" },
  { name: "Java",  x: "64%", y: "39%", color: "rgb(251 191 36)" },
  { name: "SQL",  x: "31%", y: "70%", color: "rgb(167 139 250)" },
  { name: "Supabase",  x: "73%", y: "70%", color: "rgb(45 212 191)" },
  { name: "TypeScript",  x: "53%", y: "56%", color: "rgb(96 165 250)" },
];

interface Project {
  title: string;
  meta: string;
  summary: string;
  gradient: string;
  image: string;
  gallery: string[];
  features: string[];
  techStack: string[];
  githubUrl: string;
  liveUrl?: string;
  liveLabel?: string;
  details: string;
}

const projects: Project[] = [
  {
    title: "TestNova",
    meta: "React.js / Node.js / MongoDB",
    summary:
      "AI-Powered Online Assessment Platform designed to simplify the process of creating, managing, and evaluating examinations.",
    gradient: "from-blue-400/28 via-cyan-400/12 to-white/5",
    image: "/TestNova1.png",
    gallery: [
      "/TestNova1.png", "/TestNova2.png", "/TestNova3.png", "/TestNova4.png", 
      "/TestNova5.png", "/TestNova6.png", "/TestNova7.png", "/TestNova8.png", 
      "/TestNova9.png", "/TestNova10.png", "/TestNova11.png", "/TestNova12.png"
    ],
    features: [
      "Dynamic test and quiz creation",
      "Automated answer evaluation and scoring",
      "Real-time performance tracking",
      "Detailed analytics and result reports",
      "Secure authentication and role-based access",
    ],
    techStack: ["React.js", "Node.js", "Express.js", "MongoDB", "JWT"],
    githubUrl: "https://github.com/rohankrajoli/TestNova",
    liveUrl: "https://testnova-hub.vercel.app",
    liveLabel: "Live Demo",
    details: "TestNova is a modern online assessment platform that reduces manual evaluation effort through automation, providing educators and trainers with secure, efficient, and accurate assessment tools."
  },
  {
    title: "Square Card Game",
    meta: "React.js / JavaScript / Local Storage",
    summary:
      "Interactive strategy-based card gaming application that combines strategic thinking, decision-making, and immersive gameplay.",
    gradient: "from-amber-300/30 via-orange-400/12 to-white/5",
    image: "/game1.png",
    gallery: ["/game1.png", "/game2.png", "/game3.png", "/game4.png"],
    features: [
      "Interactive card selection and gameplay",
      "Real-time score calculation",
      "Dynamic game logic and rule management",
      "Smooth animations and user interactions",
      "Win/loss tracking and game statistics",
    ],
    techStack: ["React.js", "JavaScript", "HTML5", "CSS3", "Local Storage"],
    githubUrl: "https://github.com/rohankrajoli/square-card-game",
    liveUrl: "https://squarecard.vercel.app",
    liveLabel: "Play Game",
    details: "Square Card Game showcases complex card interaction logic and efficient state management, delivering a seamless and engaging strategy-based gaming experience."
  },
];

function DepthBackground() {
  return (
    <>
      <div className="absolute inset-0 bg-white transition-colors duration-300 dark:bg-black" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_34%,rgba(0,0,0,0.05)_100%)] dark:bg-[radial-gradient(circle_at_center,transparent_28%,rgba(255,255,255,0.05)_100%)]" />
      <div className="pointer-events-none absolute inset-[-50%] bg-[radial-gradient(rgba(0,0,0,0.055)_1px,transparent_1px)] bg-[size:5px_5px] opacity-8 dark:bg-[radial-gradient(rgba(255,255,255,0.045)_1px,transparent_1px)]" />
      {particles.map((particle) => (
        <motion.span
          key={particle.id}
          className="pointer-events-none absolute z-10 rounded-full bg-black/25 shadow-[0_0_14px_rgba(0,0,0,0.16)] dark:bg-white/35 dark:shadow-[0_0_14px_rgba(255,255,255,0.25)]"
          style={{
            left: particle.left,
            top: particle.top,
            width: particle.size,
            height: particle.size,
          }}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: [0, 0.22, 0.08], y: [-8, -42], x: [0, 10, -8] }}
          viewport={{ once: false }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
        />
      ))}
    </>
  );
}

function AnimatedTitle({ children }: { children: string }) {
  const words = children.split(" ");

  return (
    <h2 className="mt-5 max-w-4xl overflow-hidden text-3xl font-black leading-[1.05] text-black dark:text-white md:text-5xl">
      {words.map((word, index) => (
        <motion.span
          key={`${word}-${index}`}
          className="mr-2 inline-block text-black drop-shadow-[0_2px_18px_rgba(0,0,0,0.12)] dark:bg-gradient-to-r dark:from-white dark:via-white dark:to-white/75 dark:bg-clip-text dark:text-transparent dark:drop-shadow-[0_2px_18px_rgba(255,255,255,0.18)]"
          initial={{ y: "110%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            duration: 0.58,
            delay: index * 0.026,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {word}
        </motion.span>
      ))}
    </h2>
  );
}

function NodeButton({
  section,
  index,
  active,
  onFocus,
  onOpen,
}: {
  section: PortfolioSection;
  index: number;
  active: boolean;
  onFocus: () => void;
  onOpen: (section: PortfolioSection) => void;
}) {
  return (
    <motion.button
      type="button"
      onClick={() => onOpen(section)}
      onMouseEnter={onFocus}
      onFocus={onFocus}
      className="group absolute z-20 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center"
      style={{
        left: nodeLayout[index].x,
        top: nodeLayout[index].y,
      }}
      initial={{ opacity: 0, scale: 0.72, y: 18 }}
      whileInView={{ opacity: 1, scale: active ? 1.08 : 1, y: 0 }}
      whileHover={{ scale: 1.12 }}
      whileTap={{ scale: 0.96 }}
      transition={{ delay: index * 0.06, type: "spring", stiffness: 230, damping: 18 }}
      aria-label={`Zoom to ${section.label}`}
    >
      <span
        className={cn(
          "absolute h-32 w-32 rounded-full bg-gradient-to-br opacity-20 transition-opacity duration-500 group-hover:opacity-40",
          active && "opacity-30",
          section.glowClass,
        )}
      />
      <span
        className={cn(
          "absolute h-24 w-24 rounded-full border opacity-90 transition-colors duration-300 md:h-32 md:w-32",
          active 
            ? "border-black dark:border-white" 
            : "border-black/40 dark:border-white/40",
        )}
      />
      <span
        className={cn(
          "relative grid h-24 w-24 place-items-center rounded-full border text-center text-[0.66rem] font-bold uppercase tracking-[0.22em] transition-all duration-500 md:h-32 md:w-32 md:text-xs",
          "bg-white text-black border-black dark:bg-black dark:text-white dark:border-white",
          active 
            ? "scale-110" 
            : "opacity-90",
          "group-hover:scale-110"
        )}
      >
        {section.label}
      </span>
    </motion.button>
  );
}

function ActivePanel({
  section,
}: {
  section: PortfolioSection;
}) {
  return (
    <motion.div
      key={section.id}
      initial={{ opacity: 0, y: 28, scale: 0.94 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.58, ease: [0.22, 1, 0.36, 1] }}
      className="relative z-20 w-full max-w-xl border border-black/35 bg-white p-6 shadow-lg dark:border-white/25 dark:bg-black/75 md:p-8"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.35em] text-black dark:text-white/75">
        {section.eyebrow}
      </p>
      <AnimatedTitle>{section.title}</AnimatedTitle>
      <motion.p
        className="mt-5 text-sm leading-7 text-black dark:text-white/90 md:text-base md:leading-8"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.22, duration: 0.45 }}
      >
        {section.description}
      </motion.p>
    </motion.div>
  );
}

function SkillCluster() {
  return (
    <div className="relative mt-12 h-[420px] w-full overflow-hidden border border-black/10 bg-white dark:border-white/10 dark:bg-black/35">
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <motion.path
          d="M18 34 L42 18 L64 39 L73 70 L53 56 L31 70 Z M18 34 L53 56 M42 18 L31 70"
          fill="none"
          stroke="rgba(255,255,255,0.34)"
          strokeWidth="0.28"
          strokeDasharray="2 2"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1.4, ease: "easeInOut" }}
        />
      </svg>
      {skills.map((skill, index) => (
        <motion.div
          key={skill.name}
          className="absolute grid -translate-x-1/2 -translate-y-1/2 place-items-center"
          style={{ left: skill.x, top: skill.y }}
          initial={{ opacity: 0, scale: 0.4, y: 22 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ delay: index * 0.09, type: "spring", stiffness: 160, damping: 16 }}
        >
          <div
            className="grid h-28 w-28 place-items-center rounded-full border bg-white/80 shadow-[0_0_34px_rgba(0,0,0,0.12)] backdrop-blur-md dark:bg-black/70 dark:shadow-[0_0_34px_rgba(255,255,255,0.1)]"
            style={{ borderColor: skill.color }}
          >
            <div className="absolute h-24 w-24 rounded-full border-4 border-black/10 dark:border-white/10" />
            <motion.div
              className="absolute h-24 w-24 rounded-full border-4 border-transparent"
              style={{
                borderTopColor: skill.color,
                borderRightColor: skill.color,
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 8 + index, repeat: Infinity, ease: "linear" }}
            />
            <span className="relative text-center text-xs font-bold uppercase tracking-[0.16em] text-black dark:text-white">
              {skill.name}
              
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function ProjectShowcase({ onOpenCaseStudy }: { onOpenCaseStudy: (project: Project) => void }) {
  return (
    <div className="mt-12 grid gap-8 md:grid-cols-2 max-w-5xl mx-auto">
      {projects.map((project, index) => (
        <motion.article
          key={project.title}
          onClick={() => onOpenCaseStudy(project)}
          className="group relative min-h-[480px] cursor-pointer overflow-hidden border border-black/10 bg-white p-5 dark:border-white/15 dark:bg-white/[0.07]"
          initial={{ opacity: 0, y: 38, rotateX: 10 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ delay: index * 0.1, type: "spring", stiffness: 150, damping: 18 }}
          whileHover={{ y: -12, rotateX: 5, rotateY: index === 1 ? 0 : index === 0 ? -5 : 5 }}
        >
          <div className="absolute inset-x-5 top-5 h-56 overflow-hidden">
            <StackedCardsInteraction
              width="100%"
              height="100%"
              spreadDistance={20}
              cards={project.gallery.slice(0, 3).map((img: string) => ({
                image: img,
                title: "",
                description: ""
              }))}
            />
          </div>
          <div className="relative pt-64">
            <p className="text-xs uppercase tracking-[0.22em] text-black dark:text-white/75">{project.meta}</p>
            <h3 className="mt-3 text-2xl font-black leading-tight text-black dark:text-white">{project.title}</h3>
            <p className="mt-4 text-sm leading-6 text-black dark:text-white/90">{project.summary}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              <motion.a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="border border-black/15 px-3 py-2 text-[0.65rem] font-bold uppercase tracking-[0.16em] text-neutral-700 transition-colors hover:border-black hover:bg-black hover:text-white dark:border-white/15 dark:text-white/75 dark:hover:border-white dark:hover:bg-white dark:hover:text-black"
                whileHover={{ scale: 1.06, x: 3 }}
                whileTap={{ scale: 0.96 }}
              >
                GitHub
              </motion.a>
              {project.liveUrl && (
                <motion.a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="bg-black text-white dark:bg-white dark:text-black px-3 py-2 text-[0.65rem] font-bold uppercase tracking-[0.16em] transition-all hover:scale-105"
                  whileHover={{ scale: 1.06, x: 3 }}
                  whileTap={{ scale: 0.96 }}
                >
                  {project.liveLabel || "Live Demo"}
                </motion.a>
              )}
              <motion.button
                onClick={() => onOpenCaseStudy(project)}
                className="border border-black/15 px-3 py-2 text-[0.65rem] font-bold uppercase tracking-[0.16em] text-neutral-700 transition-colors hover:border-black hover:bg-black hover:text-white dark:border-white/15 dark:text-white/75 dark:hover:border-white dark:hover:bg-white dark:hover:text-black"
                whileHover={{ scale: 1.06, x: 3 }}
                whileTap={{ scale: 0.96 }}
              >
                Case Study
              </motion.button>
            </div>
          </div>
        </motion.article>
      ))}
    </div>
  );
}

function ContactGrid() {
  const contactLinks = [
    {
      icon: Github,
      label: "GitHub",
      href: "https://github.com/rohankrajoli",
      handle: "@rohankrajoli",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/rohankrajoli",
      handle: "Rohan K Rajoli",
    },
    {
      icon: Mail,
      label: "Email",
      href: "mailto:rohankrajoli@gmail.com",
      handle: "rohankrajoli@gmail.com",
    },
  ];

  return (
    <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
      {contactLinks.map((link, index) => (
        <motion.a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex flex-col items-center justify-center border border-black/10 bg-white p-10 transition-all hover:border-black dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
          whileHover={{ y: -5 }}
        >
          <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-black/5 bg-black/5 transition-colors group-hover:bg-black group-hover:text-white dark:border-white/5 dark:bg-white/5 dark:group-hover:bg-white dark:group-hover:text-black">
            <link.icon className="h-7 w-7" strokeWidth={1.5} />
          </div>
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-black dark:text-white">
            {link.label}
          </span>
          <span className="mt-2 text-sm text-black/50 dark:text-white/50">
            {link.handle}
          </span>
        </motion.a>
      ))}
    </div>
  );
}

function ProjectCaseStudy({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  if (!project) return null;

  return (
    <AnimatePresence>
      {project ? (
        <motion.div
          key={project.title}
          className="fixed inset-0 z-[10000] overflow-y-auto bg-white text-black dark:bg-black dark:text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            type="button"
            onClick={onClose}
            className="fixed right-5 top-5 z-[10010] border border-black bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-black transition-colors hover:bg-black hover:text-white dark:border-white/20 dark:bg-black/50 dark:text-white dark:hover:bg-white dark:hover:text-black"
          >
            Close
          </button>
          
          <div className="mx-auto max-w-7xl px-6 py-24 md:px-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-black/60 dark:text-white/60">
                Case Study
              </p>
              <h2 className="mt-4 text-4xl font-black md:text-6xl lg:text-7xl">
                {project.title}
              </h2>
              <p className="mt-4 text-lg text-black/60 dark:text-white/60">
                {project.meta}
              </p>
            </motion.div>

            <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="space-y-12"
              >
                <div>
                  <h3 className="text-xl font-bold uppercase tracking-wider">Overview</h3>
                  <p className="mt-4 text-lg leading-relaxed text-black/80 dark:text-white/80">
                    {project.details}
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold uppercase tracking-wider">Key Features</h3>
                  <ul className="mt-6 grid gap-4">
                    {project.features.map((feature: string) => (
                      <li key={feature} className="flex items-start gap-3">
                        <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-black dark:bg-white" />
                        <span className="text-black/80 dark:text-white/80">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold uppercase tracking-wider">Tech Stack</h3>
                  <div className="mt-6 flex flex-wrap items-center gap-4">
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map((tech: string) => (
                        <span
                          key={tech}
                          className="border border-black/10 bg-black/5 px-3 py-1.5 text-xs font-bold uppercase tracking-wider dark:border-white/10 dark:bg-white/5"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <motion.a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 border border-black px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors hover:bg-black hover:text-white dark:border-white/20 dark:bg-white/10 dark:hover:bg-white dark:hover:text-black"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Github className="h-4 w-4" />
                      View Code
                    </motion.a>
                    {project.liveUrl && (
                      <motion.a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 bg-black text-white px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <ExternalLink className="h-4 w-4" />
                        {project.liveLabel || "Live Demo"}
                      </motion.a>
                    )}
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex items-center justify-center min-h-[400px] md:min-h-[500px]"
              >
                  <div className="relative w-full max-w-[400px] h-[450px] flex items-center justify-center">
                    <StackedCardsInteraction
                      width="100%"
                      height="100%"
                      spreadDistance={60}
                      cards={project.gallery.map((img: string) => ({
                        image: img,
                        title: "",
                        description: ""
                      }))}
                    />
                  </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function ZoomOverlay({
  section,
  onClose,
  onOpenCaseStudy,
}: {
  section: PortfolioSection | null;
  onClose: () => void;
  onOpenCaseStudy: (project: Project) => void;
}) {
  return (
    <AnimatePresence>
      {section ? (
        <motion.div
          className="fixed inset-0 z-[9000] overflow-y-auto bg-white text-black dark:bg-black dark:text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className={cn("fixed inset-0 -z-10", section.panelClass)}
            initial={{ scale: 0.72, opacity: 0.4 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.12, opacity: 0 }}
            transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1] }}
          />
          <button
            type="button"
            onClick={onClose}
            className="fixed right-5 top-5 z-20 border border-black bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-black transition-colors hover:bg-black hover:text-white dark:border-white/20 dark:bg-black/50 dark:text-white dark:hover:bg-white dark:hover:text-black"
          >
            Close
          </button>
          <motion.div
            className="mx-auto flex min-h-screen w-full max-w-6xl flex-col justify-center px-6 py-24 md:px-10"
            initial={{ scale: 0.86, y: 70, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 1.08, y: -40, opacity: 0 }}
            transition={{ duration: 0.78, ease: [0.16, 1, 0.3, 1] }}
          >
            <AnimatedTitle>{section.title}</AnimatedTitle>
            <p className="mt-6 max-w-3xl text-base leading-8 text-black dark:text-white/90 md:text-lg md:leading-9">
              {section.description}
            </p>
            {section.id === "skills" ? <SkillCluster /> : null}
            {section.id === "projects" ? <ProjectShowcase onOpenCaseStudy={onOpenCaseStudy} /> : null}
            {section.id === "contact" ? <ContactGrid /> : null}
            {section.id !== "skills" && section.id !== "projects" && section.id !== "contact" ? (
              <ul className="mt-10 grid gap-3 md:grid-cols-2">
                {section.points.map((point) => (
                  <li
                    key={point}
                    className="border border-black/35 bg-white/75 px-5 py-4 text-sm leading-6 text-black backdrop-blur-md dark:border-white/20 dark:bg-black/45 dark:text-white/95 md:text-base"
                  >
                    {point}
                  </li>
                ))}
              </ul>
            ) : null}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export function NodeUniverse() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedSection, setSelectedSection] = useState<PortfolioSection | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [mouseGlow, setMouseGlow] = useState({ x: 50, y: 50 });

  function handleMouseMove(event: MouseEvent<HTMLElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    setMouseGlow({
      x: ((event.clientX - rect.left) / rect.width) * 100,
      y: ((event.clientY - rect.top) / rect.height) * 100,
    });
  }

  return (
    <>
      <section
        id="universe"
        onMouseMove={handleMouseMove}
        className="relative min-h-screen overflow-hidden bg-white text-black transition-colors duration-300 dark:bg-black dark:text-white"
      >
        <div className="flex min-h-screen items-center overflow-hidden">
          <DepthBackground />
          <BeamsBackground
            backgroundOnly
            showContent={false}
            intensity="strong"
            className="pointer-events-none z-[1] opacity-95 mix-blend-normal dark:opacity-70"
          />
          <motion.div
            className="pointer-events-none absolute z-[2] h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black/10 blur-3xl dark:bg-white/10"
            animate={{ left: `${mouseGlow.x}%`, top: `${mouseGlow.y}%` }}
            transition={{ type: "spring", stiffness: 70, damping: 22 }}
          />

          <motion.div
            className="relative z-10 mx-auto grid h-full w-full max-w-7xl grid-cols-1 items-center gap-8 px-6 py-16 md:grid-cols-[1.15fr_0.85fr] md:px-12"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative h-[56vh] min-h-[380px] md:h-[72vh]">
              {portfolioSections.map((section, index) => (
                <NodeButton
                  key={section.id}
                  section={section}
                  index={index}
                  active={activeIndex === index}
                  onFocus={() => setActiveIndex(index)}
                  onOpen={setSelectedSection}
                />
              ))}
            </div>

            <ActivePanel
              section={portfolioSections[activeIndex]}
            />
          </motion.div>
        </div>
      </section>

      <ZoomOverlay
        section={selectedSection}
        onClose={() => setSelectedSection(null)}
        onOpenCaseStudy={(project) => setSelectedProject(project)}
      />

      <ProjectCaseStudy 
        project={selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />
    </>
  );
}
