import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center justify-center py-32">
      <div className="container text-center">
        <span className="text-xs font-medium tracking-widest2 text-pista-600">404</span>
        <h1 className="mt-5 font-display text-3xl text-ink sm:text-4xl">
          This page couldn&apos;t be found.
        </h1>
        <p className="mt-4 text-ink-soft">
          The page you&apos;re looking for may have been moved or no longer exists.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3.5 text-sm font-medium text-sand-50"
        >
          Back to Home
        </Link>
      </div>
    </section>
  );
}
