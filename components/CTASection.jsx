export default function CTASection() {
  return (
    <section id="contact" className="py-24">
      <div className="container-x flex flex-col items-center text-center">
        <div className="flex items-center gap-6 text-gold">
          <Sparkle className="h-7 w-7" />
          <h2 className="max-w-xl h2-display">
            Take the leap, start your content creation{" "}
            <em className="italic">journey</em> with us
          </h2>
          <Sparkle className="h-7 w-7" />
        </div>
        <p className="mt-5 max-w-md body-text">
          Book a first session and leave with a plan you can start using the
          same week.
        </p>
        <a href="#" className="btn mt-8">
          Get started
        </a>
      </div>
    </section>
  );
}

function Sparkle({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 0l1.8 8.2L22 10l-8.2 1.8L12 20l-1.8-8.2L2 10l8.2-1.8L12 0z" />
    </svg>
  );
}
