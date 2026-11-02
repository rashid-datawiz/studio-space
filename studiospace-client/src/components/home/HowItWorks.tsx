import { Search, Clock, CalendarCheck, Sparkles } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Discover Spaces",
    description:
      "Browse hundreds of verified creative studios. Filter by type, location, equipment, and availability to find your perfect match.",
  },
  {
    number: "02",
    icon: Clock,
    title: "Select Your Hours",
    description:
      "View real-time availability calendars. Pick your preferred date, time slot, and duration with transparent hourly pricing.",
  },
  {
    number: "03",
    icon: CalendarCheck,
    title: "Book Instantly",
    description:
      "Secure your studio in seconds with instant confirmation. No back-and-forth — just seamless, guaranteed reservations.",
  },
  {
    number: "04",
    icon: Sparkles,
    title: "Create & Produce",
    description:
      "Show up and start creating. Every space is prepped and ready with the equipment and setup you need.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="section-spacing border-t border-white/[0.04]">
      <div className="section-container">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <p className="mb-2 text-sm font-medium uppercase tracking-widest text-[#c9a87c]">
            Simple Process
          </p>
          <h2 className="heading-section text-white">How Booking Works</h2>
          <p className="mx-auto mt-3 max-w-lg text-base text-white/50">
            From discovery to creation in four effortless steps
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div key={step.number} className="group relative">
              {/* Connecting line (hidden on last item and mobile) */}
              {index < steps.length - 1 && (
                <div className="absolute top-8 left-[calc(50%+2rem)] hidden h-px w-[calc(100%-4rem)] bg-gradient-to-r from-white/10 to-transparent lg:block" />
              )}

              <div className="relative flex flex-col items-center text-center">
                {/* Step Number */}
                <span className="mb-4 text-xs font-medium tracking-[0.3em] text-[#c9a87c]/60">
                  {step.number}
                </span>

                {/* Icon */}
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/[0.06] bg-white/[0.03] transition-all duration-300 group-hover:border-[#c9a87c]/20 group-hover:bg-[#c9a87c]/5">
                  <step.icon className="h-6 w-6 text-[#c9a87c]" />
                </div>

                {/* Content */}
                <h3 className="mb-2 text-base font-semibold text-white">
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-white/40">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
