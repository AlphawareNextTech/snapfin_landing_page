import { Zap, FileCheck, Eye, HeadphonesIcon } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Instant Eligibility",
    description: "Check your loan fit in under 60 seconds. No impact on credit score.",
    color: "secondary",
  },
  {
    icon: FileCheck,
    title: "Minimal Documentation",
    description: "Upload essentials securely with guided prompts. No paperwork hassle.",
    color: "primary",
  },
  {
    icon: Eye,
    title: "Transparent Pricing",
    description: "No hidden charges. Clear rate and fee breakdowns before you commit.",
    color: "accent",
  },
  {
    icon: HeadphonesIcon,
    title: "Reliable Support",
    description: "Real assistance through chat, phone, and email. We're always here.",
    color: "secondary",
  },
];

export function FeaturesSection() {
  return (
    <section className="py-20 lg:py-28 bg-muted/30">
      <div className="container-snapfin">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 animate-fade-up">
            Why Choose Snapfin?
          </h2>
          <p className="text-lg text-muted-foreground animate-fade-up delay-100">
            We've simplified every step of the loan process so you can focus on what matters.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="card-interactive p-6 lg:p-8 animate-fade-up"
              style={{ animationDelay: `${(index + 1) * 100}ms` }}
            >
              {/* Icon */}
              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${
                  feature.color === "secondary"
                    ? "bg-secondary/10 text-secondary"
                    : feature.color === "primary"
                    ? "bg-primary/10 text-primary"
                    : "bg-accent/20 text-accent-foreground"
                }`}
              >
                <feature.icon className="w-7 h-7" />
              </div>

              {/* Content */}
              <h3 className="text-lg font-semibold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
