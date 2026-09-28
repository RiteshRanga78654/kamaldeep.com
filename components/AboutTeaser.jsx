import Image from "next/image";

export default function AboutTeaser() {
  return (
    <section id="about" className="py-20 md:py-24">
      <div className="container-x grid grid-cols-1 items-center gap-16 md:grid-cols-2 md:gap-14">
        
        {/* LEFT — Image + Experience Card */}
        <div className="relative mx-auto w-full max-w-[500px] px-5 pb-16 sm:px-8 md:mx-0 md:px-0">
          
          {/* Decorative border behind image */}
          <div
            className="
              absolute
              left-0
              top-0
              h-[88%]
              w-[88%]
              border
              border-black/30
            "
          />

          {/* Main Portrait */}
          <div
            className="
              relative
              z-10
              ml-[8%]
              aspect-[4/5]
              w-[88%]
              overflow-hidden
              bg-sand
              shadow-lg
            "
          >
            <Image
              src="/profile/kamal01/kamal.png"
              alt="Portrait of Kamaldeep, Business Head & Strategic Mentor"
              fill
              priority
              sizes="(min-width: 768px) 400px, 85vw"
              className="object-cover object-center"
            />
          </div>

          {/* Experience Box — overlaps image */}
        <div
  className="
    absolute
    bottom-0
    right-0
    z-20
    w-[58%]
    min-h-[195px]
    border
    border-black/30
    bg-[#f5f2eb]/95
    p-5
    shadow-[0_15px_35px_rgba(0,0,0,0.10)]
    backdrop-blur-sm
    sm:w-[52%]
    sm:p-5
    md:right-[-3%]
    md:w-[50%]
  "
>
  {/* Heading */}
  <div className="flex items-center gap-3">
    <span
      className="italic"
      style={{
        fontFamily: "Cormorant Infant, serif",
        fontSize: "1.25rem",
      }}
    >
      Experience
    </span>

    <span className="h-px flex-1 bg-black/30" />
  </div>

  {/* Years */}
  <div className="mt-4 flex items-end gap-1">
    <span
      style={{
        fontFamily: "Cormorant Infant, serif",
        fontSize: "3.5rem",
        lineHeight: "0.8",
        fontWeight: 400,
      }}
    >
      5
    </span>

    <span
      style={{
        fontFamily: "Cormorant Infant, serif",
        fontSize: "1.5rem",
        lineHeight: "1",
      }}
    >
      +
    </span>
  </div>

  <p
    className="mt-2"
    style={{
      fontFamily: "Work Sans, sans-serif",
      fontSize: "12px",
      fontWeight: 500,
    }}
  >
    Years of Expertise
  </p>

  {/* Experience Points */}
  <div
    className="mt-4 space-y-2"
    style={{
      fontFamily: "Work Sans, sans-serif",
      fontSize: "11px",
    }}
  >
    <div className="flex items-center gap-2">
      <span className="h-px w-4 bg-black/40" />
      <span>Real Estate Growth</span>
    </div>

    <div className="flex items-center gap-2">
      <span className="h-px w-4 bg-black/40" />
      <span>Education & Training</span>
    </div>

    <div className="flex items-center gap-2">
      <span className="h-px w-4 bg-black/40" />
      <span>Strategic Leadership</span>
    </div>
  </div>
</div>
        </div>

        {/* RIGHT — About Content */}
        <div className="min-w-0">
          <h2
            className="h2-display w-full !leading-[1.1] md:!leading-none xl:w-[650px]"
            style={{
              fontFamily: "Cormorant Infant, serif",
              fontSize: "clamp(1.75rem, 3.2vw + 1rem, 52px)",
              letterSpacing: "-0.02em",
              fontWeight: "400",
            }}
          >
            Meet Kamaldeep Prajapati,{" "}
            <em className="italic">
              Business Head &amp; Strategic Mentor
            </em>{" "}
            at IREED
          </h2>

          <p
            className="body-text mt-5"
            style={{
              fontFamily: "Work Sans, sans-serif",
              fontSize: "16px",
              lineHeight: "24px",
            }}
          >
            With years of experience driving real estate growth and education,
            Kamaldeep now dedicates his expertise to helping emerging
            professionals and entrepreneurs accelerate their learning curve —
            through direct mentorship, market-tested frameworks, and insights
            built on proven industry success.
          </p>

          <p
            className="body-text mt-4"
            style={{
              fontFamily: "Work Sans, sans-serif",
              fontSize: "16px",
              lineHeight: "24px",
            }}
          >
            Every roadmap starts with your specific vision, not a generic
            template, ensuring the strategic guidance you receive matches your
            ambitions and leadership potential.
          </p>

          <a href="#services" className="btn mt-7 inline-flex">
            More about me
          </a>
        </div>
      </div>
    </section>
  );
}