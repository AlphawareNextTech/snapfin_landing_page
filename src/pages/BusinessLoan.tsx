import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, Briefcase, TrendingUp, FileText, Clock, Calculator, Building } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function BusinessLoan() {
  const navigate = useNavigate();

  const benefits = [
    { icon: TrendingUp, title: "MSME Friendly", desc: "Tailored for small & growing businesses" },
    { icon: FileText, title: "GST-Based Evaluation", desc: "Quick assessment using GST returns" },
    { icon: Clock, title: "Fast Disbursal", desc: "Funds in your account within 48 hours" },
    { icon: Building, title: "Flexible Usage", desc: "Use for any business purpose" },
  ];

  const features = [
    "Loan amounts from ₹1,00,000 to ₹50,00,000",
    "Flexible tenure from 12 to 60 months",
    "Interest rates starting 14% p.a.",
    "Collateral-free loans up to ₹25 lakhs",
    "GST and ITR-based quick evaluation",
    "No hidden charges or processing fees",
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container-snapfin">
          {/* Hero Section */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-secondary/20 via-secondary/10 to-background p-8 md:p-12 mb-12 border border-secondary/20">
            <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/10 rounded-full blur-3xl" />
            
            <div className="relative z-10 grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/20 border border-secondary/30 mb-6">
                  <Briefcase className="w-4 h-4 text-secondary" />
                  <span className="text-sm font-medium text-foreground">MSME Friendly</span>
                </div>
                <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
                  Business Loan
                </h1>
                <p className="text-lg text-muted-foreground mb-6">
                  Working capital support for small and growing businesses. 
                  Fuel your business growth with quick and flexible funding.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button variant="hero" size="lg" onClick={() => navigate("/eligibility", { state: { loanType: "business" } })}>
                    Check Eligibility
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                  <Button variant="outline" size="lg" onClick={() => navigate("/apply")}>
                    Apply Now
                  </Button>
                </div>
              </div>
              
              <div className="bg-card rounded-2xl border border-border p-6 shadow-snapfin-lg">
                <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-secondary" />
                  Representative Example
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Loan Amount</span>
                    <span className="font-semibold text-foreground">₹5,00,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Interest Rate</span>
                    <span className="font-semibold text-foreground">16% p.a.</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tenure</span>
                    <span className="font-semibold text-foreground">60 months</span>
                  </div>
                  <div className="border-t border-border pt-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Monthly EMI</span>
                      <span className="text-xl font-bold text-secondary">₹12,176</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Benefits Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-card rounded-xl border border-border p-6 text-center">
                <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-secondary/20 flex items-center justify-center">
                  <benefit.icon className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground">{benefit.desc}</p>
              </div>
            ))}
          </div>

          {/* Features Section */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-12">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
                Why Choose Snapfin Business Loan?
              </h2>
              <ul className="space-y-4">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-muted/50 rounded-2xl p-8">
              <h3 className="font-semibold text-foreground mb-4">Eligibility Criteria</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li>• Business vintage: Minimum 2 years</li>
                <li>• Annual turnover: ₹10 lakhs or above</li>
                <li>• GST registered (preferred)</li>
                <li>• Positive net profit in last 2 years</li>
                <li>• Valid business registration documents</li>
              </ul>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-br from-primary to-secondary rounded-3xl p-8 md:p-12 text-center text-primary-foreground">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Grow Your Business Today</h2>
            <p className="text-lg opacity-90 mb-6 max-w-xl mx-auto">
              Check your eligibility in seconds and get personalized business loan offers.
            </p>
            <Button variant="secondary" size="lg" onClick={() => navigate("/eligibility", { state: { loanType: "business" } })}>
              Check Eligibility Now
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
