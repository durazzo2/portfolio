/* Project data + SVG placeholder "photos" for polaroids */

const projects = [
  {
    id: "twitter",
    title: "Twitter Clone",
    year: "2025",
    description:
      "Real-time social app with JWT auth, hybrid SSR/CSR rendering, an API proxy security layer, and a containerized database.",
    stack: ["Next.js", "NestJS", "PostgreSQL", "Prisma", "Docker"],
    github: "https://github.com/durazzo2",
    palette: { bg: "#c8766a", fg: "#fbf5e4", accent: "#d9a33f" },
    motif: "bird",
  },
  {
    id: "mojproblem",
    title: "Mojproblem",
    year: "2025",
    description:
      "Full-stack civic platform — citizens report municipal issues, admins manage them, AI triages and classifies reports.",
    stack: ["Vue.js", "Spring Boot", "Java 21", "PostgreSQL", "Hibernate"],
    github: "https://github.com/durazzo2",
    palette: { bg: "#8a9a6b", fg: "#fbf5e4", accent: "#d9a33f" },
    motif: "map",
  },
  {
    id: "linker",
    title: "Linker",
    year: "2024",
    description:
      "A platform connecting students with internships and entry-level positions — matching, profiles, applications.",
    stack: ["Next.js", "NestJS", "Prisma", "PostgreSQL"],
    github: "https://github.com/durazzo2",
    palette: { bg: "#d9a33f", fg: "#221c17", accent: "#c8766a" },
    motif: "chain",
  },
];

const experience = [
  {
    role: "AI Developer",
    company: "CrazyLabs",
    when: "March 2026 – Present",
    byline: "Skopje · Current post",
    body:
      "Builds LLM-backed tools and generative-AI pipelines for internal automation. Focuses on evaluating where AI actually removes friction — and where it just adds latency. Prefers measurable, production-worthy systems over demo-ware.",
    tags: [],
    accent: "rose",
  },
  {
    role: "Game Ad Monetization Analyst",
    company: "CrazyLabs · Internship",
    when: "January 2026 – February 2026",
    byline: "Skopje · 2-month stint",
    body:
      "Analyzed ad-monetization funnels across a portfolio of mobile games. Wrote queries, spotted leaks, and proposed placements that were later A/B-tested. First exposure to how engineering decisions meet real revenue numbers.",
    tags: [],
    accent: "sage",
  },
];

/* ——— SVG "photos" for polaroids (abstract, no AI clichés) ——— */
function Photo({ motif, palette }) {
  const { bg, fg, accent } = palette;
  if (motif === "bird") {
    // horizon + scan lines
    return (
      <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice">
        <rect width="400" height="300" fill={bg} />
        <g opacity="0.18" stroke={fg} strokeWidth="1">
          {Array.from({ length: 30 }).map((_, i) => (
            <line key={i} x1="0" y1={i * 10 + 4} x2="400" y2={i * 10 + 4} />
          ))}
        </g>
        <circle cx="300" cy="90" r="54" fill={accent} />
        <rect x="0" y="190" width="400" height="110" fill={fg} opacity="0.12" />
        <g fill={fg}>
          <path d="M 60 170 q 20 -18 40 0 q 20 -18 40 0" fill="none" stroke={fg} strokeWidth="3" />
          <path d="M 160 145 q 20 -18 40 0 q 20 -18 40 0" fill="none" stroke={fg} strokeWidth="3" />
          <path d="M 110 120 q 20 -18 40 0 q 20 -18 40 0" fill="none" stroke={fg} strokeWidth="3" />
        </g>
        <text x="24" y="280" fontFamily="JetBrains Mono, monospace" fontSize="11" fill={fg} opacity="0.7" letterSpacing="2">
          /feed · socket · ssr
        </text>
      </svg>
    );
  }
  if (motif === "map") {
    return (
      <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice">
        <rect width="400" height="300" fill={bg} />
        <g stroke={fg} strokeWidth="1.5" fill="none" opacity="0.55">
          <path d="M 0 80 C 80 60, 140 110, 220 90 S 360 120, 400 100" />
          <path d="M 0 150 C 80 140, 160 180, 240 160 S 360 190, 400 170" />
          <path d="M 0 220 C 80 210, 160 240, 260 230 S 360 240, 400 235" />
        </g>
        <g fill={accent}>
          <circle cx="92" cy="88" r="7" />
          <circle cx="228" cy="162" r="7" />
          <circle cx="312" cy="108" r="7" />
          <circle cx="162" cy="230" r="7" />
        </g>
        <g stroke={fg} strokeWidth="1" opacity="0.7" strokeDasharray="3 4" fill="none">
          <path d="M 92 88 L 228 162 L 312 108 L 162 230 Z" />
        </g>
        <text x="24" y="282" fontFamily="JetBrains Mono, monospace" fontSize="11" fill={fg} opacity="0.75" letterSpacing="2">
          report · triage · resolve
        </text>
      </svg>
    );
  }
  // chain
  return (
    <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice">
      <rect width="400" height="300" fill={bg} />
      <g opacity="0.15" stroke={fg} strokeWidth="2">
        {Array.from({ length: 20 }).map((_, i) => (
          <line key={i} x1={i * 22} y1="0" x2={i * 22} y2="300" />
        ))}
      </g>
      <g stroke={fg} strokeWidth="6" fill="none" strokeLinecap="round">
        <rect x="60" y="110" width="80" height="80" rx="40" />
        <rect x="160" y="110" width="80" height="80" rx="40" />
        <rect x="260" y="110" width="80" height="80" rx="40" />
      </g>
      <g fill={accent}>
        <circle cx="100" cy="150" r="8" />
        <circle cx="200" cy="150" r="8" />
        <circle cx="300" cy="150" r="8" />
      </g>
      <text x="24" y="282" fontFamily="JetBrains Mono, monospace" fontSize="11" fill={fg} opacity="0.75" letterSpacing="2">
        students · roles · match
      </text>
    </svg>
  );
}

Object.assign(window, { projects, experience, Photo });
