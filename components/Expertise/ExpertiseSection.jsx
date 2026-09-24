import { ArrowUpRight } from "lucide-react";
import * as Icons from "lucide-react";
import { expertise } from "@/lib/data/expertise";
import Reveal from "@/components/ui/Reveal";

export function ExpertiseSection() {
  return (
    <section id="expertise" className="relative scroll-mt-24 bg-sand-200 py-24 lg:py-32">
      <div className="container">
        <Reveal>
          <span className="text-sm font-semibold text-pista-700">What I Do</span>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className="relative mb-11 mt-3 inline-block pb-3 font-display text-[2.3rem] font-medium leading-[1.1] text-ink sm:text-4xl">
            Key Focus Areas
            <span className="absolute bottom-0 left-0 h-[3px] w-[46px] rounded-full bg-pista-600" />
          </h2>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {expertise.map((area, i) => {
            const Icon = Icons[area.icon] || Icons.Sparkle;
            return (
              <Reveal key={area.id} delay={i * 0.08}>
                <div className="group relative h-full rounded-[18px] border hairline bg-sand-50 p-6 transition-all duration-500 ease-premium hover:-translate-y-2 hover:border-pista-300 hover:shadow-[0_26px_44px_-22px_rgba(28,25,18,0.3)]">
                  <div className="mb-5 flex h-[46px] w-[46px] items-center justify-center rounded-xl bg-pista-100 text-pista-700 transition-all duration-500 ease-premium group-hover:-rotate-[8deg] group-hover:scale-[1.08] group-hover:bg-ink group-hover:text-sand-50">
                    <Icon size={20} strokeWidth={1.9} />
                  </div>
                  <h3 className="text-[1.08rem] font-semibold text-ink">{area.title}</h3>
                  <p className="mt-2 text-[0.87rem] leading-relaxed text-ink-soft">{area.description}</p>
                  <a href="#" className="group/link mt-4 inline-flex items-center gap-1.5 text-[0.86rem] font-semibold text-ink">
                    Learn More
                    <ArrowUpRight size={13} strokeWidth={2.25} className="transition-transform duration-300 group-hover/link:translate-x-1" />
                  </a>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
