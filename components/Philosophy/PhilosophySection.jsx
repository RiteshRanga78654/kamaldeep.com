import { profile } from "@/lib/data/profile";
import Reveal from "@/components/ui/Reveal";
import { BlueprintGrid } from "@/components/ui/ArchitectureMotif";

export function PhilosophySection() {
  return (
    <section className="relative overflow-hidden bg-pista-800 py-28 text-sand-100 lg:py-36">
      <BlueprintGrid className="absolute inset-0 h-full w-full text-sand-100/10" />
      <div className="container relative">
        <Reveal>
          <span className="text-xs font-medium tracking-widest2 text-pista-200">
            {profile.philosophyHeading}
          </span>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mt-7 max-w-3xl font-display text-2xl italic leading-[1.5] text-sand-50 sm:text-[2rem] lg:text-[2.4rem]">
            {profile.philosophyBody}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
