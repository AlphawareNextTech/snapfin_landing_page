import { Shield, Lock, Award, CheckCircle } from "lucide-react";

const trustFeatures = [
  {
    icon: Shield,
    title: "Bank-Grade Security",
    description: "256-bit encryption protects all your data in transit and at rest.",
  },
  {
    icon: Lock,
    title: "Secure KYC",
    description: "Your documents are encrypted and never shared without consent.",
  },
  {
    icon: Award,
    title: "RBI Compliant",
    description: "All partner lenders are fully licensed and RBI regulated.",
  },
  {
    icon: CheckCircle,
    title: "Verified Partners",
    description: "We work only with trusted, established financial institutions.",
  },
];

export function TrustSection() {
  return (
    <section id="security" className="py-20 lg:py-28 bg-primary text-primary-foreground relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.2),transparent_50%)]" />
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.15),transparent_50%)]" />
      </div>

      <div className="container-snapfin relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 animate-fade-up">
              Your Security is Our Priority
            </h2>
            <p className="text-lg opacity-80 mb-8 animate-fade-up delay-100">
              We employ industry-leading security measures to ensure your personal and financial 
              information is always protected. Your trust is our foundation.
            </p>

            <div className="grid sm:grid-cols-2 gap-6">
              {trustFeatures.map((feature, index) => (
                <div
                  key={feature.title}
                  className="flex gap-4 animate-fade-up"
                  style={{ animationDelay: `${(index + 2) * 100}ms` }}
                >
                  <div className="w-12 h-12 rounded-xl bg-primary-foreground/10 flex items-center justify-center shrink-0">
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{feature.title}</h3>
                    <p className="text-sm opacity-70">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Visual */}
          <div className="relative animate-fade-up delay-200">
            <div className="bg-primary-foreground/5 backdrop-blur-sm rounded-3xl border border-primary-foreground/10 p-8 lg:p-10">
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary-foreground/10 flex items-center justify-center">
                  <Shield className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold mb-4">100% Secure</h3>
                <p className="opacity-80 mb-6">
                  All data is encrypted using industry-standard protocols. 
                  We never store your banking credentials.
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  <span className="px-3 py-1 bg-primary-foreground/10 rounded-full text-sm">
                    SSL Secured
                  </span>
                  <span className="px-3 py-1 bg-primary-foreground/10 rounded-full text-sm">
                    GDPR Compliant
                  </span>
                  <span className="px-3 py-1 bg-primary-foreground/10 rounded-full text-sm">
                    ISO 27001
                  </span>
                </div>
              </div>
            </div>

            {/* Floating badges */}
            <div className="absolute -top-4 -left-4 w-16 h-16 bg-secondary rounded-2xl shadow-snapfin-lg flex items-center justify-center animate-float">
              <Lock className="w-8 h-8 text-secondary-foreground" />
            </div>
            <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-accent rounded-2xl shadow-snapfin-lg flex items-center justify-center animate-float delay-500">
              <Award className="w-8 h-8 text-accent-foreground" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
