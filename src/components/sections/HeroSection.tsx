import { ArrowRight, Shield, Lock, Users, Star } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const metrics = [
  { value: "10k+", label: "Customers" },
  { value: "4.7★", label: "Average Rating" },
  { value: "₹100+ Cr", label: "Facilitated" },
];

const trustBadges = [
  { icon: Shield, label: "Bank-grade security" },
  { icon: Lock, label: "Encrypted KYC" },
  { icon: Users, label: "Trusted partner lenders" },
];

export function HeroSection() {
  const navigate = useNavigate();
  const [loanType, setLoanType] = useState("personal");
  const [loanAmount, setLoanAmount] = useState("");

  const handleApplyNow = () => {
    const user = localStorage.getItem("snapfin_user");
    if (user) {
      const userData = JSON.parse(user);
      if (userData.isLoggedIn) {
        navigate("/apply");
        return;
      }
    }
    // Store redirect intent
    localStorage.setItem("snapfin_redirect", "/apply");
    navigate("/auth");
  };

  const handleCheckEligibility = () => {
    navigate("/eligibility", { state: { loanType, loanAmount } });
  };

  return (
    <section className="relative min-h-screen flex items-center pt-20 pb-16 overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source
            src="https://videos.pexels.com/video-files/3191572/3191572-uhd_2560_1440_25fps.mp4"
            type="video/mp4"
          />
        </video>
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-background/80 dark:bg-background/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-transparent" />
      </div>
      
      {/* Decorative blurs */}
      <div className="absolute top-1/4 -right-1/4 w-1/2 h-1/2 bg-secondary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -left-1/4 w-1/2 h-1/2 bg-primary/10 rounded-full blur-3xl" />
      
      <div className="container-snapfin relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/20 mb-6 animate-fade-up">
              <Star className="w-4 h-4 text-accent fill-accent" />
              <span className="text-sm font-medium text-secondary">AI-Powered • Trusted by 10,000+ customers</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6 animate-fade-up delay-100">
              Redefining
              <br />
              <span className="text-secondary">Digital Lending</span>
            </h1>

            {/* Subhead */}
            <p className="text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-8 animate-fade-up delay-200">
              Snapfin uses advanced AI to instantly match borrowers with ideal financial institutions. We simplify the process, ensuring you get the best loan terms and smarter financial outcomes.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10 animate-fade-up delay-300">
              <Button variant="outline" size="lg" className="group" asChild>
                <Link to="/eligibility">
                  Check My Eligibility
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button variant="hero" size="lg" className="group" onClick={handleApplyNow}>
                Apply Now — 2 min
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 animate-fade-up delay-400">
              {trustBadges.map((badge) => (
                <div
                  key={badge.label}
                  className="flex items-center gap-2 text-sm text-muted-foreground"
                >
                  <badge.icon className="w-4 h-4 text-secondary" />
                  <span>{badge.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Visual / Stats Card */}
          <div className="relative animate-fade-up delay-200">
            {/* Main Card */}
            <div className="relative bg-card rounded-3xl border border-border shadow-snapfin-xl p-8 lg:p-10">
              {/* Decorative gradient */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-secondary/5 via-transparent to-primary/5" />
              
              <div className="relative">
                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-6 mb-8">
                  {metrics.map((metric) => (
                    <div key={metric.label} className="text-center">
                      <div className="text-2xl sm:text-3xl font-bold text-foreground mb-1">
                        {metric.value}
                      </div>
                      <div className="text-xs sm:text-sm text-muted-foreground">
                        {metric.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Quick Check Card */}
                <div className="bg-muted/50 rounded-2xl p-6">
                  <h3 className="font-semibold text-foreground mb-4">Quick Eligibility Check</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-muted-foreground mb-2">
                        Loan Type
                      </label>
                      <select 
                        value={loanType}
                        onChange={(e) => setLoanType(e.target.value)}
                        className="w-full h-12 px-4 rounded-xl bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-secondary/50"
                      >
                        <option value="personal">Personal Loan</option>
                        <option value="lap">Loan Against Property</option>
                        <option value="business">Business Loan</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm text-muted-foreground mb-2">
                        Loan Amount (₹)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g., 5,00,000"
                        value={loanAmount}
                        onChange={(e) => setLoanAmount(e.target.value)}
                        className="w-full h-12 px-4 rounded-xl bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-secondary/50"
                      />
                    </div>
                    <Button variant="hero" className="w-full" size="lg" onClick={handleCheckEligibility}>
                      Check Eligibility
                      <ArrowRight className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-accent/20 rounded-2xl blur-2xl animate-float" />
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-secondary/20 rounded-2xl blur-2xl animate-float delay-500" />
          </div>
        </div>
      </div>
    </section>
  );
}