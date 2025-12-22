import { Calendar, Phone, Sparkles, ArrowRight, Star, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function ConsultationBanner() {
  return (
    <section className="py-12 relative overflow-hidden">
      <div className="container-snapfin">
        <div className="relative bg-gradient-to-r from-accent/20 via-accent/10 to-accent/20 rounded-3xl p-8 md:p-12 border-2 border-accent/30 overflow-hidden">
          {/* Glow effects */}
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-accent/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-secondary/10 rounded-full blur-3xl" />
          
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            {/* Content */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 border border-accent/30 mb-4">
                <Sparkles className="w-4 h-4 text-accent fill-accent" />
                <span className="text-sm font-bold text-accent">100% FREE</span>
                <Star className="w-4 h-4 text-accent fill-accent" />
              </div>
              
              <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-3">
                Get Expert Advice on
                <br />
                <span className="text-secondary">Your Perfect Loan</span>
              </h2>
              
              <p className="text-muted-foreground max-w-lg mb-6">
                Connect with our AI-trained loan experts for personalized guidance. 
                Find the best rates, terms, and options tailored to your needs.
              </p>

              {/* Trust indicators */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-6">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Phone className="w-4 h-4 text-secondary" />
                  <span>15-min call</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="w-4 h-4 text-secondary" />
                  <span>5,000+ helped</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Star className="w-4 h-4 text-accent fill-accent" />
                  <span>4.9/5 rating</span>
                </div>
              </div>

              <Button variant="hero" size="lg" className="group" asChild>
                <Link to="/consultation">
                  <Calendar className="w-5 h-5 mr-2" />
                  Book Free Consultation
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>

            {/* Visual Element */}
            <div className="relative">
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-gradient-to-br from-secondary/20 to-primary/20 flex items-center justify-center border-2 border-secondary/20">
                <div className="w-48 h-48 md:w-60 md:h-60 rounded-full bg-gradient-to-br from-secondary/30 to-primary/30 flex items-center justify-center border border-secondary/20">
                  <div className="text-center">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-secondary to-primary mx-auto mb-3 flex items-center justify-center animate-pulse">
                      <Phone className="w-10 h-10 text-primary-foreground" />
                    </div>
                    <p className="text-lg font-bold text-foreground">Talk to Expert</p>
                    <p className="text-sm text-muted-foreground">No obligations</p>
                  </div>
                </div>
              </div>
              
              {/* Floating badges */}
              <div className="absolute -top-2 -right-2 bg-card rounded-xl p-3 shadow-snapfin-lg border border-border animate-float">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-accent" />
                  <span className="text-sm font-semibold text-foreground">AI-Powered</span>
                </div>
              </div>
              <div className="absolute -bottom-2 -left-2 bg-card rounded-xl p-3 shadow-snapfin-lg border border-border animate-float delay-500">
                <div className="flex items-center gap-1">
                  {[1,2,3,4,5].map(n => <Star key={n} className="w-4 h-4 text-accent fill-accent" />)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
