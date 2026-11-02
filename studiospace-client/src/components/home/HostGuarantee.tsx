import { Shield, UserCheck, Wrench, Headphones } from "lucide-react";

const guarantees = [
  {
    icon: Shield,
    title: "Liability Protection",
    description:
      "Every booking includes comprehensive liability coverage up to $1M, protecting both hosts and creators.",
  },
  {
    icon: UserCheck,
    title: "Verified Profiles",
    description:
      "All hosts and studios undergo thorough identity verification and space quality assessments.",
  },
  {
    icon: Wrench,
    title: "Equipment Safety",
    description:
      "Studio equipment is cataloged, insured, and maintained to professional standards.",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description:
      "Our dedicated creator support team is available around the clock for any booking issues.",
  },
];

export function HostGuarantee() {
  return (
    <section id="about" className="section-spacing border-t border-white/[0.04] bg-[#070707]">
      <div className="section-container">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          {/* Left: Text Content */}
          <div>
            <p className="mb-2 text-sm font-medium uppercase tracking-widest text-[#c9a87c]">
              Built on Trust
            </p>
            <h2 className="heading-section text-white">
              Host Guarantee &<br />Creator Support
            </h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-white/50">
              We&apos;ve built comprehensive protections into every layer of
              StudioSpace. Whether you&apos;re listing your space or booking one,
              you&apos;re backed by our commitment to safety, transparency, and
              exceptional support.
            </p>
            <div className="mt-8 flex items-center gap-6">
              <div>
                <p className="text-3xl font-semibold text-white">10K+</p>
                <p className="text-sm text-white/40">Verified Studios</p>
              </div>
              <div className="h-10 w-px bg-white/[0.08]" />
              <div>
                <p className="text-3xl font-semibold text-white">50K+</p>
                <p className="text-sm text-white/40">Happy Creators</p>
              </div>
              <div className="h-10 w-px bg-white/[0.08]" />
              <div>
                <p className="text-3xl font-semibold text-white">99%</p>
                <p className="text-sm text-white/40">Satisfaction</p>
              </div>
            </div>
          </div>

          {/* Right: Guarantee Cards */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {guarantees.map((guarantee) => (
              <div
                key={guarantee.title}
                className="group rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 transition-all duration-300 hover:border-[#c9a87c]/15 hover:bg-white/[0.04]"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-[#c9a87c]/10 text-[#c9a87c]">
                  <guarantee.icon className="h-5 w-5" />
                </div>
                <h3 className="mb-2 text-sm font-semibold text-white">
                  {guarantee.title}
                </h3>
                <p className="text-xs leading-relaxed text-white/40">
                  {guarantee.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
