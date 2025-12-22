import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { 
  Brain, 
  Target, 
  Eye, 
  Rocket, 
  Shield, 
  Clock, 
  Users, 
  Lightbulb, 
  TrendingUp,
  CheckCircle2,
  Sparkles,
  Building2,
  Award,
  Heart
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function AboutUs() {
  const impactStats = [
    { value: "125+", label: "Certified Experts", icon: Users },
    { value: "110+", label: "Lending & Tech Partners", icon: Building2 },
    { value: "85%", label: "Successful Match Rate", icon: TrendingUp },
  ];

  const whySnapfinFeatures = [
    {
      icon: Brain,
      title: "AI-Driven Matching",
      description: "Advanced algorithms evaluate your profile and connect you with lenders that genuinely fit your needs."
    },
    {
      icon: Clock,
      title: "Faster Approvals",
      description: "Optimized workflows and intelligent screening reduce delays and speed up lending decisions."
    },
    {
      icon: Shield,
      title: "Secure and Transparent",
      description: "Bank-grade security protects your data, while clear insights keep you informed at every step."
    },
    {
      icon: Lightbulb,
      title: "Personalized Solutions",
      description: "No two borrowers are the same. We tailor loan options based on real financial context, not assumptions."
    },
    {
      icon: Heart,
      title: "Inclusive Access",
      description: "We support individuals and businesses of all sizes, promoting broader access to credit."
    },
    {
      icon: Target,
      title: "Smarter Decisions",
      description: "Compare multiple offers, understand terms clearly, and choose with confidence."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5" />
          <div className="absolute top-20 left-10 w-72 h-72 bg-secondary/10 rounded-full blur-3xl animate-pulse-soft" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-soft delay-300" />
          
          <div className="container-snapfin relative py-16 md:py-24">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/20 mb-6 animate-fade-up">
                <Sparkles className="w-4 h-4 text-secondary" />
                <span className="text-sm font-semibold text-secondary">About SnapFin</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 animate-fade-up delay-100">
                Redefining{" "}
                <span className="text-gradient-teal">Digital Lending</span>
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8 animate-fade-up delay-200">
                SnapFin is a smart lending bridge that connects borrowers with the right financial institutions 
                using AI-driven decision intelligence. We help individuals and businesses discover the most 
                suitable loan options faster, with greater accuracy and complete transparency.
              </p>
              
              <p className="text-base text-muted-foreground/80 mb-10 animate-fade-up delay-300">
                By combining advanced technology with deep lending logic, SnapFin removes friction 
                from the borrowing process and replaces guesswork with clarity.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up delay-400">
                <Button variant="hero" size="lg" asChild>
                  <Link to="/eligibility">Check Your Eligibility</Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/consultation">Talk to an Expert</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Smart Connection Section */}
        <section className="py-16 md:py-20 bg-muted/30">
          <div className="container-snapfin">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="animate-fade-up">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                  The Smart Connection for Your{" "}
                  <span className="text-secondary">Financial Future</span>
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Access to credit should be simple, fair, and efficient. At SnapFin, we focus on exactly that.
                  </p>
                  <p>
                    We work at the intersection of borrowers and financial institutions, using AI to evaluate 
                    profiles, eligibility, and lending criteria in real time. This allows us to deliver precise 
                    loan matches, faster approvals, and better outcomes for all parties involved.
                  </p>
                  <p>
                    Our platform is built for users who value speed, trust, and informed decision-making. 
                    Instead of pushing generic offers, we surface options that actually make sense for your 
                    financial situation.
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 gap-6 animate-fade-up delay-200">
                {impactStats.map((stat, index) => (
                  <div 
                    key={index}
                    className="bg-card rounded-2xl border border-border p-6 shadow-snapfin-md hover:shadow-snapfin-lg transition-all duration-300 group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-secondary to-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                        <stat.icon className="w-7 h-7 text-primary-foreground" />
                      </div>
                      <div>
                        <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                        <p className="text-sm text-muted-foreground">{stat.label}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="py-16 md:py-20">
          <div className="container-snapfin">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12 animate-fade-up">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-4">
                  <Award className="w-4 h-4 text-accent" />
                  <span className="text-sm font-semibold text-accent">Our Story</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                  Built with <span className="text-secondary">Purpose</span>
                </h2>
              </div>
              
              <div className="bg-card rounded-3xl border border-border p-8 md:p-12 shadow-snapfin-xl animate-fade-up delay-100">
                <div className="space-y-6 text-muted-foreground text-lg leading-relaxed">
                  <p>
                    SnapFin was created to solve a clear problem. Borrowers struggle with slow processes, 
                    unclear eligibility, and limited visibility into real loan options. Lenders struggle 
                    with inefficient sourcing and poor lead quality.
                  </p>
                  <p className="font-medium text-foreground">
                    We built SnapFin to fix both.
                  </p>
                  <p>
                    By applying AI to loan discovery and eligibility assessment, we created a system that 
                    benefits borrowers and lenders equally, while reducing friction, time, and uncertainty 
                    across the lending journey.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Vision & Mission */}
        <section className="py-16 md:py-20 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
          <div className="container-snapfin">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Vision */}
              <div className="bg-card rounded-3xl border border-border p-8 shadow-snapfin-lg animate-fade-up">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-6">
                  <Eye className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">Our Vision</h3>
                <p className="text-muted-foreground leading-relaxed">
                  To become India's most trusted financial bridge, setting the benchmark for how credit 
                  is accessed, evaluated, and delivered. We aim to make smart, inclusive lending the 
                  default — not the exception.
                </p>
              </div>
              
              {/* Mission */}
              <div className="bg-card rounded-3xl border border-border p-8 shadow-snapfin-lg animate-fade-up delay-100">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-secondary to-accent flex items-center justify-center mb-6">
                  <Rocket className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">Our Mission</h3>
                <p className="text-muted-foreground leading-relaxed">
                  To simplify and empower the borrowing journey through AI-driven intelligence. We 
                  continuously refine our technology to deliver accurate loan matching, faster decisions, 
                  and meaningful financial choices for individuals and businesses across India.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why SnapFin */}
        <section className="py-16 md:py-20">
          <div className="container-snapfin">
            <div className="text-center mb-12 animate-fade-up">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Why <span className="text-secondary">SnapFin</span>?
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                We combine cutting-edge AI technology with deep financial expertise to deliver 
                a lending experience that's fast, fair, and transparent.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {whySnapfinFeatures.map((feature, index) => (
                <div 
                  key={index}
                  className="bg-card rounded-2xl border border-border p-6 shadow-snapfin-md hover:shadow-snapfin-lg transition-all duration-300 group animate-fade-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center mb-4 group-hover:bg-secondary/20 transition-colors">
                    <feature.icon className="w-6 h-6 text-secondary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-20">
          <div className="container-snapfin">
            <div className="relative bg-gradient-to-br from-primary via-primary to-secondary rounded-3xl p-8 md:p-12 overflow-hidden">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMC41IiBzdHJva2Utb3BhY2l0eT0iMC4xIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30" />
              
              <div className="relative max-w-3xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
                  Ready to Experience Smart Lending?
                </h2>
                <p className="text-lg text-primary-foreground/80 mb-8">
                  Join thousands of borrowers who've found their perfect loan match with SnapFin. 
                  Start your journey today.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="gold" size="lg" asChild className="shadow-lg">
                    <Link to="/apply">
                      Apply Now — 2 min
                      <Rocket className="w-5 h-5 ml-2" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild className="bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                    <Link to="/cibil-score">
                      <CheckCircle2 className="w-5 h-5 mr-2" />
                      Check CIBIL Score Free
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}