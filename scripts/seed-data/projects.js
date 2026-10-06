/**
 * Original demo projects, kept only so `npm run seed` can recreate a fresh
 * database. The app itself reads projects from MongoDB.
 */

export const PROJECTS = [
  {
    slug: "session-1-1-coaching-program",
    title: "Session 1:1 Coaching Program",
    category: "Brand Identity",
    client: "Independent Creator",
    year: "2025",
    duration: "8 weeks",
    img: "/profile/kamal01/kamalsir.jpeg",
    gallery: ["/blogs/ireed-events/13.png", "/profile/kamal01/award.jpeg"],
    excerpt:
      "A full brand refresh and content system built for a solo creator scaling into a coaching offer.",
    services: ["Brand Strategy", "Visual Identity", "Content System"],
    overview: [
      "A solo creator with a loyal following and no recognisable brand was preparing to launch a premium coaching programme. The audience was warm; everything they could see looked improvised.",
      "The engagement covered positioning, a visual identity, and a content system the creator could run themselves — built so the brand kept working after the project closed.",
    ],
    challenge:
      "The creator had been posting consistently for two years, but every asset looked like it came from somewhere different. Prospective clients could not tell what they were paying for, and the coaching offer was priced like a template rather than a programme.",
    approach: [
      {
        title: "Positioning",
        text: "Three candidate positions were pressure-tested against the existing audience. The chosen one narrowed the offer from 'career guidance' to a specific, defensible promise.",
      },
      {
        title: "Visual identity",
        text: "A restrained palette, one display face and a short photography brief — chosen so the creator could produce good assets alone, without a designer on call.",
      },
      {
        title: "Content system",
        text: "Four repeatable formats, each with a template and a hook pattern, mapped onto the existing publishing rhythm rather than replacing it.",
      },
    ],
    outcomes: [
      { value: "3×", label: "Enquiries per month" },
      { value: "8", label: "Weeks to launch" },
      { value: "4", label: "Reusable content formats" },
    ],
    results:
      "The programme launched on schedule and sold its first cohort without paid promotion. More usefully, the content system was still in use eight months later — which was the actual brief.",
  },
  {
    slug: "personalized-coaching-launch",
    title: "Personalized Coaching Launch",
    category: "Content Strategy",
    client: "First-Time Founder",
    year: "2025",
    duration: "90 days",
    img: "/blogs/ireed-events/09.png",
    gallery: ["/blogs/ireed-events/12.png", "/profile/kamal01/industry.jpeg"],
    excerpt:
      "Editorial calendar, voice guide and a 90-day content roadmap for a first product launch.",
    services: ["Content Strategy", "Editorial Calendar", "Launch Campaign"],
    overview: [
      "A founder launching her first paid product had a large audience and no plan for what to publish in the twelve weeks around the launch.",
      "The work produced a 90-day roadmap, a written voice guide the team could hand to anyone new, and a launch campaign that used the existing audience instead of buying new reach.",
    ],
    challenge:
      "The founder wanted to launch quickly, but every previous launch had been preceded by a month of silence followed by a week of over-posting. The team had no shared definition of what the brand sounded like, so review took longer than production.",
    approach: [
      {
        title: "Audit",
        text: "Six months of existing posts were mapped against topic, format and outcome. Two topics carried almost all the engagement and had never been given a series.",
      },
      {
        title: "Voice guide",
        text: "A short written guide — vocabulary, sentence length, what the brand never says — so anyone on the team could draft without waiting for approval.",
      },
      {
        title: "Roadmap",
        text: "Thirteen weeks mapped to three phases: warm-up, proof and launch. Each week had a purpose and a defined deliverable, not just a theme.",
      },
    ],
    outcomes: [
      { value: "90", label: "Days planned" },
      { value: "13", label: "Weekly deliverables" },
      { value: "1st", label: "Cohort sold out" },
    ],
    results:
      "Launch week produced the highest-engagement fortnight of the account's history. The voice guide went on to become the reference for every piece of copy the team published afterwards.",
  },
  {
    slug: "strategy-development-sprint",
    title: "Strategy Development Sprint",
    category: "Creative Direction",
    client: "Growth-Stage Brand",
    year: "2025",
    duration: "2 weeks",
    img: "/profile/kamal01/industry.jpeg",
    gallery: ["/blogs/ireed-events/16.png", "/blogs/ireed-events/06.png"],
    excerpt:
      "A two-week sprint turning a scattered feed into a consistent, recognizable visual system.",
    services: ["Creative Direction", "Art Direction", "Templates"],
    overview: [
      "A brand with good creative output and no shared standard. Every asset was made by a different person, and nothing looked like it came from the same company.",
      "A two-week sprint produced an art direction framework, a small set of templates, and the working rules needed to make output consistent without a designer reviewing every piece.",
    ],
    challenge:
      "The creative team was capable but working from different references, so the output drifted month to month. Leadership could see the inconsistency but not name its cause, which made it hard to brief a fix.",
    approach: [
      {
        title: "Reference audit",
        text: "Two years of published assets sorted into what worked and what failed, then reduced to a written set of rules with examples attached to each one.",
      },
      {
        title: "Templates",
        text: "Six templates covering the formats the team actually used. Restraint was deliberate: fewer, better templates beat a large library nobody adopted.",
      },
      {
        title: "Handover",
        text: "A working session with the whole team, plus a one-page checklist, so the system survived the engagement ending.",
      },
    ],
    outcomes: [
      { value: "2", label: "Week sprint" },
      { value: "6", label: "Shipped templates" },
      { value: "1", label: "Art direction system" },
    ],
    results:
      "Output across the following quarter came back visually consistent for the first time in the brand's history, without additional production budget.",
  },
  {
    slug: "engagement-enhancement-playbook",
    title: "Engagement Enhancement Playbook",
    category: "Audience Growth",
    client: "Creator Network",
    year: "2024",
    duration: "6 weeks",
    img: "/blogs/ireed-events/01.jpg",
    gallery: ["/blogs/ireed-events/08.png", "/profile/kamal01/kamaldeep.png"],
    excerpt:
      "A repeatable engagement framework that took a stalled account from plateau to steady growth.",
    services: ["Community Building", "Engagement Systems", "Analytics"],
    overview: [
      "An account that had grown quickly and then flattened for five months. Reach was stable, posting was consistent, and almost nothing was changing.",
      "The engagement work focused on the hour after publishing, where distribution was actually being decided, rather than on producing more content.",
    ],
    challenge:
      "The team believed the plateau was an algorithm problem and were changing formats in response. In practice the account had stopped being present in its own replies, and the first hour after each post was being spent elsewhere.",
    approach: [
      {
        title: "Diagnose",
        text: "Twelve weeks of post-level data pulled apart by format, hour and comment volume. The pattern was in the replies, not the reach.",
      },
      {
        title: "Protocol",
        text: "A written first-hour protocol with named owners and a shift pattern, so responding was scheduled work rather than goodwill.",
      },
      {
        title: "Measure",
        text: "A weekly one-page report the team could read in two minutes, replacing the monthly review that never changed anything.",
      },
    ],
    outcomes: [
      { value: "6", label: "Week engagement" },
      { value: "+68%", label: "Comment volume" },
      { value: "4×", label: "Post reach at 1hr" },
    ],
    results:
      "Reach per post rose steadily for the remainder of the year on unchanged output volume — growth that came from distribution rather than from publishing more.",
  },
];

export function getProjectBySlug(slug) {
  return PROJECTS.find((project) => project.slug === slug);
}

export function getProjectSlugs() {
  return PROJECTS.map((project) => project.slug);
}

/** Wraps around, so the "next project" link at the end of a page always exists. */
export function getNextProject(slug) {
  const index = PROJECTS.findIndex((project) => project.slug === slug);
  if (index < 0) return null;
  return PROJECTS[(index + 1) % PROJECTS.length];
}

export const PROCESS = [
  {
    step: "01",
    title: "Diagnose",
    text: "We start with what the numbers and the archive already say, before proposing anything.",
  },
  {
    step: "02",
    title: "Define",
    text: "One clear position, one promise, one audience — agreed before a single asset is made.",
  },
  {
    step: "03",
    title: "Build",
    text: "Identity, content and the systems around them, produced to be used without us.",
  },
  {
    step: "04",
    title: "Hand over",
    text: "Documented, taught and handed over. The work has to keep working after we leave.",
  },
];

export const CLIENT_LOGOS = [
  "Northline",
  "Verve & Co.",
  "Studio Meridian",
  "Paperlight",
  "Ambervale",
  "Coastal Grove",
  "The Loft Co.",
  "Fernwood",
];
