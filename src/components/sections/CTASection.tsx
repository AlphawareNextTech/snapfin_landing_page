import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <section className="py-20 lg:py-28">
      <div className="container-snapfin">
        <div className="relative bg-gradient-to-br from-secondary via-secondary to-primary rounded-3xl p-8 sm:p-12 lg:p-16 text-center overflow-hidden">
          {/* Background elements */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 right-0 w-96 h-96 bg-accent rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />
          </div>

          <div className="relative">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-secondary-foreground mb-6 animate-fade-up">
              Ready to Get Started?
            </h2>
            <p className="text-lg sm:text-xl text-secondary-foreground/80 max-w-2xl mx-auto mb-10 animate-fade-up delay-100">
              Check your eligibility in seconds. No impact on your credit score. 
              Get matched with the best loan offers for your needs.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up delay-200">
              <Button
                size="xl"
                className="bg-background text-foreground hover:bg-background/90 shadow-snapfin-xl group"
                asChild
              >
                <Link to="/eligibility">
                  Check My Eligibility
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="xl"
                className="border-2 border-secondary-foreground/30 text-secondary-foreground hover:bg-secondary-foreground/10 hover:border-secondary-foreground/50"
                asChild
              >
                <Link to="/consultation">Talk to Us</Link>
              </Button>
            </div>

            <p className="text-sm text-secondary-foreground/60 mt-8 animate-fade-up delay-300">
              No commitment required. Takes only 2 minutes.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
