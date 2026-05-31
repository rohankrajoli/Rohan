export type PortfolioSection = {
  id: "about" | "education" | "projects" | "skills" | "contact";
  label: string;
  eyebrow: string;
  title: string;
  description: string;
  points: string[];
  panelClass: string;
  glowClass: string;
};

export const portfolioSections: PortfolioSection[] = [
  {
    id: "about",
    label: "About",
    eyebrow: "01 / ABOUT ME",
    title: "Java Full Stack Developer focused on scalable products and clean user experiences.",
    description:
      "I transform ideas into efficient, scalable, and visually engaging web applications using Java, React.js, and modern development tools.",
    points: [
      "Develop scalable web applications using Java, React.js, and SQL",
      "Build RESTful APIs and optimize backend performance",
      "Integrate frontend and backend systems for better response efficiency",
      "Collaborate using Git in an agile development environment",
    ],
    panelClass:
      "bg-[radial-gradient(circle_at_top,rgba(234,179,8,0.18),transparent_46%),linear-gradient(180deg,#fffaf0_0%,#ffffff_100%)] dark:bg-[radial-gradient(circle_at_top,rgba(234,179,8,0.18),transparent_46%),linear-gradient(180deg,#0a0a0a_0%,#050505_100%)]",
    glowClass: "from-amber-300/90 to-amber-500/70",
  },
  {
    id: "education",
    label: "Education",
    eyebrow: "02 / EDUCATION",
    title: "Bachelor of Engineering in Computer Science (2022 - 2026).",
    description:
      "PES Institute of Technology and Management, Shivamogga, Karnataka.",
    points: [
      "Strong foundation in Data Structures and Algorithms",
      "Core understanding of Object-Oriented Programming",
      "Practical knowledge of Database Management Systems",
      "Project-focused learning with practical implementation",
    ],
    panelClass:
      "bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.18),transparent_46%),linear-gradient(180deg,#f8fbff_0%,#ffffff_100%)] dark:bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.2),transparent_46%),linear-gradient(180deg,#090909_0%,#040404_100%)]",
    glowClass: "from-sky-300/90 to-blue-500/70",
  },
  {
    id: "projects",
    label: "Projects",
    eyebrow: "03 / PROJECTS",
    title: "Full-stack platforms and interactive applications.",
    description:
      "Showcasing expertise in AI-powered assessment platforms and strategy-based gaming mechanics.",
    points: [
      "TestNova — AI-Powered Online Assessment Platform with automated evaluation and scoring",
      "Square Card Game — Interactive strategy-based card game with complex state management",
      "Focused on scalability, user experience, and robust backend implementation",
    ],
    panelClass:
      "bg-[radial-gradient(circle_at_bottom_left,rgba(16,185,129,0.16),transparent_46%),linear-gradient(180deg,#f6fffb_0%,#ffffff_100%)] dark:bg-[radial-gradient(circle_at_bottom_left,rgba(16,185,129,0.18),transparent_46%),linear-gradient(180deg,#080808_0%,#040404_100%)]",
    glowClass: "from-emerald-300/90 to-emerald-500/70",
  },
  {
    id: "skills",
    label: "Skills",
    eyebrow: "04 / SKILLS",
    title: "Technical skills and certifications.",
    description:
      "A strong base in development fundamentals with modern full-stack technologies.",
    points: [
      "Languages: Java, SQL",
      "Frontend: React.js, TypeScript, HTML, CSS",
      "Backend: Node.js, Supabase",
      "Databases: MySQL, PostgreSQL",
      "Core Concepts: DSA, OOP, DBMS",
      "Certifications: NPTEL Cloud Computing (2024), Wingspan Agile Scrum (2025), Bosch IoT Training (2025)",
    ],
    panelClass:
      "bg-[radial-gradient(circle_at_center,rgba(217,70,239,0.14),transparent_48%),linear-gradient(180deg,#fff7ff_0%,#ffffff_100%)] dark:bg-[radial-gradient(circle_at_center,rgba(217,70,239,0.16),transparent_48%),linear-gradient(180deg,#070707_0%,#030303_100%)]",
    glowClass: "from-fuchsia-300/90 to-fuchsia-500/70",
  },
  {
    id: "contact",
    label: "Contact",
    eyebrow: "05 / CONTACT",
    title: "Let's connect for opportunities and collaborations.",
    description:
      "Open to software engineering opportunities and impactful product work.",
    points: [
      "Email: rohankrajoli@gmail.com",
      "GitHub: github.com/rohankrajoli",
      "LinkedIn: linkedin.com/in/rohankrajoli",
      "Location: Harihar, Karnataka, India",
    ],
    panelClass:
      "bg-[radial-gradient(circle_at_bottom,rgba(244,63,94,0.14),transparent_48%),linear-gradient(180deg,#fff8f9_0%,#ffffff_100%)] dark:bg-[radial-gradient(circle_at_bottom,rgba(244,63,94,0.16),transparent_48%),linear-gradient(180deg,#070707_0%,#020202_100%)]",
    glowClass: "from-rose-300/90 to-rose-500/70",
  },
];
