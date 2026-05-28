export const personalInfo = {
  name: "Mazhar Rehman",
  title: "Full-Stack Web Developer",
  location: "Lahore, Pakistan",
  tagline:
    "I build fast, scalable, and conversion-focused digital products with React, PHP, Node.js, MySQL, Shopify, automation, and modern web technologies.",
  email: "mazhar@lancerstech.com",
  personalEmail: "mk5092048@gmail.com",
  phone: "+92 312 8572868",
  linkedin: "https://linkedin.com/in/mazhar-khan-8b3413278",
  github: "https://github.com/anonymouskh09",
  cvUrl: "/Mazhar_Rehman_CV.pdf",
};

export const skillCategories = [
  {
    title: "Front-End",
    skills: [
      "React.js",
      "JavaScript ES6+",
      "HTML5",
      "CSS3",
      "Tailwind CSS",
      "Responsive Design",
    ],
  },
  {
    title: "Back-End",
    skills: ["PHP", "Node.js", "RESTful APIs", "System Architecture"],
  },
  {
    title: "Databases",
    skills: ["MySQL", "DBMS", "ER Diagrams"],
  },
  {
    title: "CMS & Platforms",
    skills: ["Custom E-Commerce Solutions", "Shopify"],
  },
  {
    title: "DevOps & Servers",
    skills: [
      "Git/GitHub",
      "GoDaddy",
      "Hostinger",
      "DNS Configuration",
      "Server Management",
    ],
  },
  {
    title: "Automation & APIs",
    skills: [
      "n8n Workflow Automation",
      "11Labs API Integration",
      "Web Performance Optimization",
    ],
  },
];

export const experiences = [
  {
    role: "Full-Stack Web Developer",
    company: "LancerTech",
    location: "Lahore, Pakistan",
    period: "Feb 2024 – Present",
    points: [
      "Built the official company website lancerstech.com.",
      "Optimized Core Web Vitals and Lighthouse performance.",
      "Developed scalable full-stack applications using React.js, PHP, and Node.js.",
      "Integrated n8n automation workflows and 11Labs API pipelines.",
      "Worked with UI/UX and QA teams to deliver responsive, pixel-perfect interfaces.",
    ],
  },
  {
    role: "Freelance Full-Stack Developer & Digital Marketer",
    company: "Independent",
    location: "Remote",
    period: "2023 – Present",
    points: [
      "Delivered full web solutions for clients in Pakistan, Saudi Arabia, Australia, and international markets.",
      "Completed zero-downtime server migration for modernstreetes.com from Hostinger to GoDaddy.",
      "Built SEO-focused websites and digital marketing systems.",
      "Developed Shopify store al-ameeraa.shop for the Saudi health-and-beauty market.",
    ],
  },
];

export type ProjectCategory =
  | "All"
  | "E-Commerce"
  | "Shopify"
  | "Media"
  | "Tech"
  | "B2B";

export const projects = [
  {
    title: "Modern Streetes",
    url: "https://modernstreetes.com",
    description:
      "Full-stack e-commerce platform. Led zero-downtime server migration from Hostinger to GoDaddy and resolved backend routing and database configuration issues.",
    category: "E-Commerce" as ProjectCategory,
    gradient: "from-cyan-500/20 via-blue-600/30 to-purple-600/20",
  },
  {
    title: "Al-Ameeraa",
    url: "https://al-ameeraa.shop",
    description:
      "Complete Shopify health-and-beauty store for the Saudi market with localized UX, Arabic-ready layout, and streamlined checkout.",
    category: "Shopify" as ProjectCategory,
    gradient: "from-pink-500/20 via-purple-600/30 to-fuchsia-600/20",
  },
  {
    title: "AI Agentic Hub & AurumNode",
    url: "https://aiagentichub.io",
    description:
      "Modern tech landing platforms focused on high-speed delivery, scalable backend architecture, and conversion-focused UI/UX.",
    category: "Tech" as ProjectCategory,
    gradient: "from-blue-500/20 via-indigo-600/30 to-cyan-500/20",
    secondaryUrl: "https://aurumnode.com",
  },
  {
    title: "47 News HD",
    url: "https://47newshd.tv",
    description:
      "Content-heavy media portal optimized for high traffic, daily content updates, and fast asset delivery.",
    category: "Media" as ProjectCategory,
    gradient: "from-amber-500/20 via-orange-600/30 to-red-500/20",
  },
  {
    title: "ZM Exports",
    url: "https://zmexports.online",
    description:
      "Professional B2B export platform with responsive design and clean product catalogue architecture.",
    category: "B2B" as ProjectCategory,
    gradient: "from-emerald-500/20 via-teal-600/30 to-cyan-500/20",
  },
];

export const projectFilters: ProjectCategory[] = [
  "All",
  "E-Commerce",
  "Shopify",
  "Media",
  "Tech",
  "B2B",
];

export const education = {
  degree: "Bachelor of Computer Science",
  university: "Riphah International University",
  location: "Lahore, Pakistan",
  period: "2023 – 2027",
  coursework: [
    "Computer Architecture",
    "Database Management Systems",
    "System Architecture",
    "Automata Theory",
  ],
};

export const navLinks = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];
