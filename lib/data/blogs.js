export const categories = [
  "All",
  "Real Estate",
  "Leadership",
  "Business",
  "Market Insights",
  "Strategy",
];

export const blogs = [
  {
    slug: "discipline-behind-real-estate-growth",
    title: "The Discipline Behind Real Estate Growth",
    category: "Real Estate",
    date: "2026-08-14",
    readingTime: "5 min read",
    excerpt:
      "Sustainable growth in real estate rarely comes from a single deal — it comes from disciplined, repeatable decisions made across many.",
    content: [
      "Growth in real estate is often described in terms of single, headline-making transactions. In practice, the businesses that grow reliably over years do so through something far less glamorous: a disciplined, repeatable way of making decisions.",
      "That discipline shows up in how opportunities are evaluated, how risk is priced into every stage of a project, and how teams are held accountable to a shared set of standards rather than individual instinct alone.",
      "None of this removes the need for judgment or timing. But it does mean that the businesses built to last are the ones where good decisions are a process, not a personality trait of any one leader.",
    ],
  },
  {
    slug: "leading-teams-through-market-cycles",
    title: "Leading Teams Through Market Cycles",
    category: "Leadership",
    date: "2026-07-22",
    readingTime: "4 min read",
    excerpt:
      "Markets move in cycles. The leaders who hold their teams together through both halves of the cycle are the ones who build lasting organisations.",
    content: [
      "Every market moves in cycles, and real estate is no exception. What separates resilient organisations from fragile ones is rarely the cycle itself — it's how leadership communicates and holds steady through it.",
      "In an upswing, the risk is complacency: teams that stop questioning their assumptions because results are covering for weak process. In a downturn, the risk is panic: decisions made from fear rather than strategy.",
      "The work of leadership is to keep a team anchored to the fundamentals in both conditions — clear priorities, honest communication and a long view that doesn't get rewritten every quarter.",
    ],
  },
  {
    slug: "business-development-relationship-first",
    title: "Business Development, Relationship First",
    category: "Business",
    date: "2026-06-30",
    readingTime: "4 min read",
    excerpt:
      "In a relationship-driven industry like real estate, business development that treats trust as infrastructure outperforms development that treats it as a byproduct.",
    content: [
      "It is tempting to treat business development as a numbers exercise — leads generated, meetings booked, deals closed. Those numbers matter, but they are downstream of something harder to measure: trust.",
      "In real estate especially, decisions are large, timelines are long and stakeholders are many. A pipeline built on genuine relationships tends to survive market shifts that a purely transactional pipeline does not.",
      "Treating relationship-building as core infrastructure — not a soft skill on the side — changes how a business development function is resourced, measured and led.",
    ],
  },
  {
    slug: "reading-real-estate-market-signals",
    title: "Reading Real Estate Market Signals Early",
    category: "Market Insights",
    date: "2026-06-05",
    readingTime: "6 min read",
    excerpt:
      "The most useful market signals rarely arrive as headlines. They show up first in quieter, harder-to-see indicators.",
    content: [
      "By the time a market shift becomes a headline, much of the opportunity — or the risk — attached to it has usually already been priced in by the businesses paying closest attention.",
      "The more useful signals tend to be quieter: shifts in enquiry quality, changes in the pace of decision-making among buyers, or subtle movement in how partners and lenders talk about risk.",
      "Building a habit of tracking these quieter signals, rather than reacting to headline data alone, is one of the more underrated advantages a business can build over time.",
    ],
  },
  {
    slug: "strategy-as-a-living-document",
    title: "Strategy as a Living Document, Not a Slide Deck",
    category: "Strategy",
    date: "2026-05-18",
    readingTime: "5 min read",
    excerpt:
      "A strategy that only lives in a quarterly deck rarely survives contact with a real market. The best strategies are revisited, not just presented.",
    content: [
      "Strategy documents have a way of being written once, presented with confidence, and then quietly filed away until the next planning cycle. That is a missed opportunity.",
      "Treating strategy as a living document — something revisited as new information arrives, rather than defended as a fixed plan — allows a business to stay aligned with its long-term direction while adapting its near-term path.",
      "This does not mean strategy should change constantly. It means the assumptions behind it should be tested often enough that changes, when they come, are deliberate rather than reactive.",
    ],
  },
  {
    slug: "expanding-into-new-markets-with-intent",
    title: "Expanding Into New Markets With Intent",
    category: "Real Estate",
    date: "2026-04-27",
    readingTime: "5 min read",
    excerpt:
      "Market expansion done well looks unremarkable from the outside — because the hardest work happens before the first move is made.",
    content: [
      "Expansion into a new market is often judged by its visible milestones — a new office, a first project, an early sale. The real work, though, happens earlier and less visibly.",
      "It happens in understanding local buyer behaviour, regulatory nuance and competitive dynamics well enough that the first visible move is already informed by the ones that will follow it.",
      "Businesses that expand with intent tend to move more slowly at the start and more confidently thereafter — a trade worth making in an industry where mistakes are expensive to unwind.",
    ],
  },
];

export function getAllBlogs() {
  return blogs;
}

export function getBlogBySlug(slug) {
  return blogs.find((b) => b.slug === slug);
}

export function getRelatedBlogs(slug, count = 3) {
  const current = getBlogBySlug(slug);
  if (!current) return blogs.slice(0, count);
  return blogs
    .filter((b) => b.slug !== slug && b.category === current.category)
    .concat(blogs.filter((b) => b.slug !== slug && b.category !== current.category))
    .slice(0, count);
}
