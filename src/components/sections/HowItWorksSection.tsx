import { ClipboardCheck, Smartphone, CreditCard, ArrowRight } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: ClipboardCheck,
    title: "Check",
    description: "Enter basic details and check your loan eligibility in seconds. No impact on credit score.",
  },
  {
    number: "02",
    icon: Smartphone,
    title: "Verify",
    description: "Complete quick OTP verification and upload minimal documents securely.",
  },
  {
    number: "03",
    icon: CreditCard,
    title: "Accept",
    description: "Review your personalized offers with transparent terms and accept the best match.",
  },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-20 lg:py-28 bg-muted/30">
      <div className="container-snapfin">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 animate-fade-up">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground animate-fade-up delay-100">
            Get matched with the right loan in three simple steps. Fast, easy, and completely transparent.
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12 relative">
          {/* Connection Line */}
          <div className="hidden md:block absolute top-24 left-1/6 right-1/6 h-0.5 bg-gradient-to-r from-secondary/20 via-secondary to-secondary/20" />

          {steps.map((step, index) => (
            <div
              key={step.number}
              className="relative text-center animate-fade-up"
              style={{ animationDelay: `${(index + 1) * 150}ms` }}
            >
              {/* Number Circle */}
              <div className="relative mx-auto w-20 h-20 mb-6">
                <div className="absolute inset-0 bg-secondary/10 rounded-full" />
                <div className="absolute inset-2 bg-card rounded-full shadow-snapfin-lg flex items-center justify-center">
                  <step.icon className="w-8 h-8 text-secondary" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-bold shadow-snapfin-md">
                  {step.number}
                </div>
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-foreground mb-3">
                {step.title}
              </h3>
              <p className="text-muted-foreground max-w-xs mx-auto">
                {step.description}
              </p>

              {/* Arrow (hidden on last) */}
              {index < steps.length - 1 && (
                <div className="hidden md:flex absolute top-20 -right-6 lg:-right-8 w-12 h-12 items-center justify-center text-secondary/30">
                  <ArrowRight className="w-6 h-6" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
