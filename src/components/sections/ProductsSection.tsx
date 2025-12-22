import { Building2, User, Briefcase, ArrowRight, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const products = [
  {
    id: "lap",
    icon: Building2,
    title: "Loan Against Property",
    subtitle: "LAP",
    lead: "Unlock liquidity with competitive rates backed by your property.",
    benefits: [
      "High loan amounts up to ₹5 Cr",
      "Flexible repayment up to 15 years",
      "Competitive interest rates",
      "Transparent processing fees",
    ],
    example: {
      amount: "₹10,00,000",
      apr: "12%",
      emi: "₹11,122",
      tenure: "120 months",
    },
    color: "primary",
  },
  {
    id: "business",
    icon: Briefcase,
    title: "Business Loan",
    subtitle: "MSME Friendly",
    lead: "Working capital support for small and growing businesses.",
    benefits: [
      "MSME-friendly process",
      "GST & income-based evaluation",
      "Faster turnaround time",
      "Flexible usage terms",
    ],
    example: {
      amount: "₹5,00,000",
      apr: "16%",
      emi: "₹12,176",
      tenure: "60 months",
    },
    color: "secondary",
    featured: true,
  },
  {
    id: "personal",
    icon: User,
    title: "Personal Loan",
    subtitle: "Quick & Flexible",
    lead: "Fast, flexible loans for planned and unplanned expenses.",
    benefits: [
      "Quick approvals within 24 hours",
      "Minimal documentation required",
      "Instant eligibility check",
      "No collateral needed",
    ],
    example: {
      amount: "₹2,00,000",
      apr: "14%",
      emi: "₹3,418",
      tenure: "72 months",
    },
    color: "accent",
  },
];

export function ProductsSection() {
  const navigate = useNavigate();

  const handleCheckEligibility = (loanType: string) => {
    navigate("/eligibility", { state: { loanType } });
  };

  return (
    <section id="loans" className="py-20 lg:py-28">
      <div className="container-snapfin">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 animate-fade-up">
            Loan Solutions for Every Need
          </h2>
          <p className="text-lg text-muted-foreground animate-fade-up delay-100">
            Whether you're looking for personal funds, business capital, or property-backed loans, 
            we have the right solution.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          {products.map((product, index) => (
            <div
              key={product.id}
              id={product.id}
              className={`relative card-interactive p-6 lg:p-8 animate-fade-up ${
                product.featured ? "ring-2 ring-secondary shadow-snapfin-glow" : ""
              }`}
              style={{ animationDelay: `${(index + 1) * 100}ms` }}
            >
              {/* Featured Badge */}
              {product.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-secondary text-secondary-foreground text-xs font-semibold rounded-full">
                  Most Popular
                </div>
              )}

              {/* Icon & Title */}
              <div className="flex items-start gap-4 mb-6">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                    product.color === "primary"
                      ? "bg-primary/10 text-primary"
                      : product.color === "secondary"
                      ? "bg-secondary/10 text-secondary"
                      : "bg-accent/20 text-accent-foreground"
                  }`}
                >
                  <product.icon className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    {product.subtitle}
                  </span>
                  <h3 className="text-xl font-bold text-foreground">
                    {product.title}
                  </h3>
                </div>
              </div>

              {/* Lead */}
              <p className="text-muted-foreground mb-6">
                {product.lead}
              </p>

              {/* Benefits */}
              <ul className="space-y-3 mb-6">
                {product.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                    <span className="text-sm text-foreground">{benefit}</span>
                  </li>
                ))}
              </ul>

              {/* Example */}
              <div className="bg-muted/50 rounded-xl p-4 mb-6">
                <p className="text-xs text-muted-foreground mb-2">Representative Example</p>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-muted-foreground">Amount: </span>
                    <span className="font-semibold text-foreground">{product.example.amount}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">APR: </span>
                    <span className="font-semibold text-foreground">{product.example.apr} p.a.</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">EMI: </span>
                    <span className="font-semibold text-foreground">₹{product.example.emi}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Tenure: </span>
                    <span className="font-semibold text-foreground">{product.example.tenure}</span>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <Button
                variant={product.featured ? "hero" : "outline"}
                className="w-full group"
                onClick={() => handleCheckEligibility(product.id)}
              >
                Check Eligibility
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
