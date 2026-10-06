/**
 * One-time import of the original demo content into MongoDB.
 *
 *   npm run seed
 *
 * The articles and projects that used to live in `app/blogs/posts.js` and
 * `app/projects/project-data.js` now sit in `./seed-data` and are written to the
 * database. Everything else in the app reads from MongoDB, so nothing imports
 * these modules at runtime.
 */

import { connectDB, disconnectDB } from "../lib/db/connect.js";
import Article from "../lib/db/models/Article.js";
import Gallery from "../lib/db/models/Gallery.js";
import Project from "../lib/db/models/Project.js";

const { POSTS } = await import("./seed-data/posts.js");
const { PROJECTS } = await import("./seed-data/projects.js");

/** The gallery was pointing at /images/... — the files actually live under /profile and /blogs. */
const GALLERY = [
  { url: "/profile/kamal01/TKS05243.JPG", title: "Summit Address", category: "Events", tags: ["Summit", "Leadership"], featured: true, caption: "Leading a panel discussion on scaling institutional real estate partnerships." },
  { url: "/profile/kamal01/TKS05249.JPG", title: "Closing Remarks", category: "Events", tags: ["Summit"], caption: "Wrapping up an executive dialogue on market expansion and strategy." },
  { url: "/profile/kamal01/TKS05223.JPG", title: "Industry Dialogue", category: "Events", tags: ["Networking"], featured: true, caption: "An exchange with industry leaders on building trust-first partnerships." },
  { url: "/profile/kamal01/kamaldeep.png", title: "Portrait Study", category: "Portraits", tags: ["Studio"], caption: "A formal portrait from the studio series." },
  { url: "/profile/kamal01/kamal.png", title: "Executive Portrait", category: "Portraits", tags: ["Studio"], caption: "The working portrait used across leadership profiles." },
  { url: "/profile/kamal01/TKS05377.JPG", title: "Keynote Moment", category: "Events", tags: ["Keynote"], caption: "Speaking to a room of founders and institutional partners." },
  { url: "/profile/kamal01/industry.jpeg", title: "In the Field", category: "Field Study", tags: ["Site Visit"], caption: "On location during an industry engagement." },
  { url: "/profile/kamal01/award.jpeg", title: "Recognition", category: "Milestones", tags: ["Award"], caption: "A milestone from the year in review." },
  { url: "/blogs/ireed-events/01.jpg", title: "IREED Event Series", category: "Events", tags: ["IREED"], caption: "A glimpse from the IREED event series." },
  { url: "/blogs/ireed-events/13.png", title: "Weekend Intensive", category: "Workshops", tags: ["IREED"], caption: "An intensive working session with partner institutions." },
];

async function run() {
  await connectDB();
  console.log("Connected to MongoDB\n");

  await Promise.all([
    Article.deleteMany({}),
    Project.deleteMany({}),
    Gallery.deleteMany({}),
  ]);

  const articles = await Article.insertMany(
    POSTS.map((post) => ({
      title: post.title,
      slug: post.slug,
      category: post.category,
      excerpt: post.excerpt,
      coverImage: post.img,
      alt: post.title,
      content: post.content,
      highlights: post.highlights ?? [],
      readingTime: post.readingTime,
      status: "published",
      publishedAt: new Date(post.date),
    })),
  );

  const projects = await Project.insertMany(
    PROJECTS.map((project) => ({
      title: project.title,
      slug: project.slug,
      category: project.category,
      client: project.client,
      year: project.year,
      duration: project.duration,
      coverImage: project.img,
      gallery: project.gallery ?? [],
      alt: project.title,
      excerpt: project.excerpt,
      services: project.services ?? [],
      overview: project.overview ?? [],
      challenge: project.challenge,
      approach: project.approach ?? [],
      outcomes: project.outcomes ?? [],
      results: project.results,
      status: "published",
      featured: true,
    })),
  );

  const images = await Gallery.insertMany(GALLERY);

  console.log(`  ${articles.length} articles`);
  console.log(`  ${projects.length} projects`);
  console.log(`  ${images.length} gallery images\n`);

  await disconnectDB();
  console.log("Done.");
}

run().catch(async (error) => {
  console.error("Seed failed:", error.message);
  await disconnectDB().catch(() => {});
  process.exit(1);
});