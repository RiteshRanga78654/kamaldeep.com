import Image from "next/image";

const posts = [
  {
    title: "Building your personal brand: effective steps to a strong online presence",
    date: "Sept 11, 2026",
    img: "/blogs/ireed-events/13.png",
  },
  {
    title: "Navigating social media: insights and best practices for creators",
    date: "Sept 17, 2026",
    img: "/blogs/ireed-events/04.png",
  },
  {
    title: "The power of engagement: strategies to connect and build a loyal audience",
    date: "Sept 26, 2026",
    img: "/blogs/ireed-events/01.jpg",
  },
];

export default function BlogGrid() {
  return (
    <section id="blog" className="py-14 sm:py-20">
      <div className="container-x">
        <h2 className="h2-display text-center">Latest blog &amp; article</h2>

        <div className="mt-10 grid grid-cols-1 gap-10 sm:mt-14 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => (
            // On tablet (2 columns) the last card spans both, so there's no lonely gap
            <article
              key={p.title}
              className="min-w-0 last:sm:col-span-2 last:lg:col-span-1"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden sm:aspect-auto sm:h-56">
                <Image
                  src={p.img}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <p className="small-text mt-4">
                By Kamaldeep prajapati &middot; <time>{p.date}</time>
              </p>
              <h3 className="h3-display mt-2">{p.title}</h3>
              <a href="#" className="eyebrow-link mt-3 inline-block py-2">
                Read more
                <span className="sr-only">: {p.title}</span>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}