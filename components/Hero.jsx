import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-cream pb-16 pt-16 md:pb-24 md:pt-24">
      {/* Decorative image – left (same as original, xl+) */}
      <div className="pointer-events-none absolute bottom-16 left-0 z-0 hidden h-[300px] w-[210px] xl:block 2xl:h-[350px] 2xl:w-[240px]">
        <div className="absolute -bottom-8 -right-8 bottom-20 h-full w-full bg-sand" />
        <div className="relative bottom-20 h-full w-full overflow-hidden shadow-md">
          <Image
            src="/blogs/ireed-events/06.png"
            alt="Hands writing in a notebook"
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* Decorative image – right (same as original, xl+) */}
      <div className="pointer-events-none absolute right-0 top-20 z-0 hidden h-[300px] w-[240px] xl:block 2xl:h-[350px] 2xl:w-[275px]">
        <div className="relative h-full w-full overflow-hidden shadow-md">
          <Image
            src="/profile/kamal01/award.jpeg"
            alt="Cozy home workspace corner"
            fill
            className="object-cover"
          />
        </div>
      </div>

      <div className="container-x relative z-10">
        <div className="flex flex-col items-center gap-8 lg:ml-[220px] lg:flex-row lg:items-stretch lg:gap-0">
          {/* Portrait: 400 x 700 shifted up 98px on desktop (original), fluid below lg */}
          <div className="relative aspect-[4/5] w-full max-w-[360px] shrink-0 overflow-hidden shadow-lg sm:max-w-[400px] lg:top-[-98px] lg:aspect-auto lg:h-[700px] lg:w-[400px] lg:max-w-none">
            <Image
              src="/profile/kamal01/kamalsir.jpeg"
              alt="Content creator working at an outdoor café table"
              fill
              priority
              sizes="(min-width: 1024px) 400px, (min-width: 640px) 400px, 360px"
              className="object-cover"
            />
          </div>

          {/* Text */}
          <div
            className="flex flex-col items-center justify-center text-center lg:-ml-4 lg:mt-[-75px] lg:items-start lg:pl-10 lg:text-left"
            style={{ fontFamily: "Cormorant Infant, serif" }}
          >
            <h1 className="z-[10] text-[clamp(1.75rem,7vw,2.5rem)] leading-[1.1] text-ink lg:ml-[-87px] lg:text-[40px] xl:ml-[-113px] xl:text-[58px]">
              <span className="block">
                <span className="lg:text-white">Lea</span>ding Real Estate
              </span>
              <span className="block">
                <span className="lg:text-white">Edu</span>cation &amp; Strategic
              </span>
              <span className="block">
                <span className="lg:text-white">Gro</span>wth at IREED
              </span>
            </h1>

            <p className="mx-auto mt-7 max-w-md text-base leading-relaxed text-muted sm:text-lg lg:mx-0 lg:text-xl">
              Driving industry excellence as Business Head at IREED. Empowering
              future leaders with practical real estate education, strategic
              corporate partnerships, and market-ready expertise.
            </p>

            <a
              href="#contact"
              className="mx-auto mt-8 inline-flex w-full items-center justify-center bg-olive px-9 py-4 text-sm font-medium uppercase tracking-wider text-cream transition-colors hover:bg-olive-dark sm:w-fit lg:mx-0"
            >
              Get in touch
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}