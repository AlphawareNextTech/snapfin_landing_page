import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Check, Shield, Building2, Award } from "lucide-react";
import { Button } from "@/components/ui/button";

const plans = [
  {
    id: "personal",
    name: "Personal Loan",
    description: "Quick funds for personal needs",
    amountRange: "₹50K - ₹25L",
    interestRate: "10.49% - 24%",
    tenure: "12 - 60 months",
    processingFee: "Up to 2%",
    features: [
      "No collateral required",
      "Quick 24-hour approval",
      "Minimal documentation",
      "Flexible EMI options",
      "Prepayment available",
    ],
    popular: false,
  },
  {
    id: "lap",
    name: "Loan Against Property",
    description: "Unlock your property's value",
    amountRange: "₹5L - ₹5Cr",
    interestRate: "8.5% - 14%",
    tenure: "12 - 180 months",
    processingFee: "Up to 1.5%",
    features: [
      "Lowest interest rates",
      "Highest loan amounts",
      "Long tenure options",
      "Overdraft facility",
      "Balance transfer option",
      "Top-up loan available",
    ],
    popular: true,
  },
  {
    id: "business",
    name: "Business Loan",
    description: "Working capital for MSMEs",
    amountRange: "₹1L - ₹2Cr",
    interestRate: "12% - 24%",
    tenure: "12 - 60 months",
    processingFee: "Up to 2.5%",
    features: [
      "GST-based assessment",
      "No collateral for select cases",
      "Quick disbursement",
      "Flexible repayment",
      "Business expansion support",
    ],
    popular: false,
  },
];

const partners = [
  "HDFC Bank",
  "ICICI Bank",
  "Axis Bank",
  "Bajaj Finserv",
  "Tata Capital",
  "L&T Finance",
];

export default function Pricing() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="container-snapfin py-4">
          <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </header>

      <main className="py-12 lg:py-20">
        <div className="container-snapfin">
          {/* Page Header */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Transparent Pricing
            </h1>
            <p className="text-lg text-muted-foreground">
              No hidden fees. Compare loan products and find the best fit for your needs.
            </p>
          </div>

          {/* Plans Grid */}
          <div className="grid lg:grid-cols-3 gap-6 lg:gap-8 mb-16">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`relative bg-card rounded-2xl border shadow-snapfin-md p-6 lg:p-8 transition-all hover:shadow-snapfin-lg ${
                  plan.popular
                    ? "border-secondary ring-2 ring-secondary/20"
                    : "border-border"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-secondary text-secondary-foreground text-xs font-semibold rounded-full">
                    Most Popular
                  </div>
                )}

                <h3 className="text-xl font-bold text-foreground mb-1">
                  {plan.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-6">
                  {plan.description}
                </p>

                {/* Key Metrics */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="p-3 bg-muted/50 rounded-xl">
                    <p className="text-xs text-muted-foreground mb-1">Amount</p>
                    <p className="font-semibold text-foreground text-sm">{plan.amountRange}</p>
                  </div>
                  <div className="p-3 bg-muted/50 rounded-xl">
                    <p className="text-xs text-muted-foreground mb-1">Interest</p>
                    <p className="font-semibold text-foreground text-sm">{plan.interestRate} p.a.</p>
                  </div>
                  <div className="p-3 bg-muted/50 rounded-xl">
                    <p className="text-xs text-muted-foreground mb-1">Tenure</p>
                    <p className="font-semibold text-foreground text-sm">{plan.tenure}</p>
                  </div>
                  <div className="p-3 bg-muted/50 rounded-xl">
                    <p className="text-xs text-muted-foreground mb-1">Processing</p>
                    <p className="font-semibold text-foreground text-sm">{plan.processingFee}</p>
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                      <span className="text-sm text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Button
                  variant={plan.popular ? "hero" : "outline"}
                  className="w-full"
                  asChild
                >
                  <Link to="/eligibility">
                    Check Eligibility
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </div>
            ))}
          </div>

          {/* Disclaimer */}
          <div className="bg-muted/30 rounded-2xl p-6 mb-16">
            <p className="text-sm text-muted-foreground text-center">
              <strong>Note:</strong> Interest rates and terms shown are indicative and subject to change. 
              Final rates depend on your credit profile, loan amount, and the lending partner's policies. 
              Processing fees, foreclosure charges, and other fees may apply.
            </p>
          </div>

          {/* Partner Banks */}
          <div className="text-center">
            <h2 className="text-xl font-semibold text-foreground mb-6">
              Our Lending Partners
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              {partners.map((partner) => (
                <div
                  key={partner}
                  className="px-6 py-3 bg-card rounded-xl border border-border text-sm font-medium text-muted-foreground"
                >
                  {partner}
                </div>
              ))}
            </div>
          </div>

          {/* Trust Section */}
          <div className="grid sm:grid-cols-3 gap-6 mt-16">
            <div className="text-center p-6 bg-card rounded-2xl border border-border">
              <Shield className="w-10 h-10 text-secondary mx-auto mb-4" />
              <h3 className="font-semibold text-foreground mb-2">Secure & Encrypted</h3>
              <p className="text-sm text-muted-foreground">Bank-level security for all transactions</p>
            </div>
            <div className="text-center p-6 bg-card rounded-2xl border border-border">
              <Building2 className="w-10 h-10 text-secondary mx-auto mb-4" />
              <h3 className="font-semibold text-foreground mb-2">RBI Regulated</h3>
              <p className="text-sm text-muted-foreground">All partners are RBI-registered NBFCs/Banks</p>
            </div>
            <div className="text-center p-6 bg-card rounded-2xl border border-border">
              <Award className="w-10 h-10 text-secondary mx-auto mb-4" />
              <h3 className="font-semibold text-foreground mb-2">No Hidden Charges</h3>
              <p className="text-sm text-muted-foreground">Transparent fees disclosed upfront</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
