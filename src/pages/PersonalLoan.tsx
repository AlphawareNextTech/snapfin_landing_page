import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, User, Clock, FileText, Shield, Zap, Calculator } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function PersonalLoan() {
  const navigate = useNavigate();

  const benefits = [
    { icon: Clock, title: "Quick Approvals", desc: "Get approved within 24 hours" },
    { icon: FileText, title: "Minimal Documentation", desc: "Simple paperwork process" },
    { icon: Shield, title: "No Collateral", desc: "Unsecured loan, no assets needed" },
    { icon: Zap, title: "Instant Eligibility", desc: "Know your eligibility in seconds" },
  ];

  const features = [
    "Loan amounts from ₹50,000 to ₹25,00,000",
    "Flexible tenure from 12 to 84 months",
    "Competitive interest rates starting 10.49% p.a.",
    "Zero prepayment charges after 12 months",
    "100% digital application process",
    "Transparent fee structure",
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container-snapfin">
          {/* Hero Section */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-accent/20 via-accent/10 to-background p-8 md:p-12 mb-12 border border-accent/20">
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/10 rounded-full blur-3xl" />
            
            <div className="relative z-10 grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 border border-accent/30 mb-6">
                  <User className="w-4 h-4 text-accent-foreground" />
                  <span className="text-sm font-medium text-foreground">Quick & Flexible</span>
                </div>
                <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
                  Personal Loan
                </h1>
                <p className="text-lg text-muted-foreground mb-6">
                  Fast, flexible loans for planned and unplanned expenses. 
                  Get funds quickly without any collateral requirement.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button variant="hero" size="lg" onClick={() => navigate("/eligibility", { state: { loanType: "personal" } })}>
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
                  <Calculator className="w-5 h-5 text-accent-foreground" />
                  Representative Example
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Loan Amount</span>
                    <span className="font-semibold text-foreground">₹2,00,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Interest Rate</span>
                    <span className="font-semibold text-foreground">14% p.a.</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tenure</span>
                    <span className="font-semibold text-foreground">72 months</span>
                  </div>
                  <div className="border-t border-border pt-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Monthly EMI</span>
                      <span className="text-xl font-bold text-secondary">₹3,418</span>
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
                <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-accent/20 flex items-center justify-center">
                  <benefit.icon className="w-6 h-6 text-accent-foreground" />
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
                Why Choose Snapfin Personal Loan?
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
                <li>• Age: 21 to 60 years</li>
                <li>• Minimum income: ₹25,000/month (salaried)</li>
                <li>• Employment: Minimum 1 year experience</li>
                <li>• CIBIL Score: 650 or above</li>
                <li>• Valid KYC documents</li>
              </ul>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-br from-primary to-secondary rounded-3xl p-8 md:p-12 text-center text-primary-foreground">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-lg opacity-90 mb-6 max-w-xl mx-auto">
              Check your eligibility in seconds and get personalized loan offers.
            </p>
            <Button variant="secondary" size="lg" onClick={() => navigate("/eligibility", { state: { loanType: "personal" } })}>
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
