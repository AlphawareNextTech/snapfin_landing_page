import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    content: "The process was simple and fast. I got clarity instantly on my eligibility and the rates were exactly as promised. No hidden surprises.",
    author: "Rahul M.",
    role: "Personal Loan Customer",
    rating: 5,
  },
  {
    id: 2,
    content: "Great support and transparent breakdown of costs. My business loan was approved faster than I expected. Highly recommend for MSMEs.",
    author: "Priya S.",
    role: "Business Owner",
    rating: 5,
  },
  {
    id: 3,
    content: "Perfect for those needing fast working capital. The LAP process was smooth and the team guided me through every step. Very professional.",
    author: "Amit K.",
    role: "LAP Customer",
    rating: 5,
  },
];

const caseSnapshots = [
  { amount: "₹8L", type: "Personal Loan", time: "Same day approval" },
  { amount: "₹25L", type: "Business Loan", time: "48 hours disbursal" },
  { amount: "₹50L", type: "LAP", time: "5 days processing" },
];

export function TestimonialsSection() {
  return (
    <section className="py-20 lg:py-28">
      <div className="container-snapfin">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 animate-fade-up">
            Trusted by Thousands
          </h2>
          <p className="text-lg text-muted-foreground animate-fade-up delay-100">
            See what our customers have to say about their Snapfin experience.
          </p>
        </div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="card-interactive p-6 lg:p-8 animate-fade-up"
              style={{ animationDelay: `${(index + 1) * 100}ms` }}
            >
              {/* Quote Icon */}
              <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center mb-4">
                <Quote className="w-5 h-5 text-secondary" />
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-accent fill-accent" />
                ))}
              </div>

              {/* Content */}
              <p className="text-foreground mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                  <span className="text-sm font-semibold text-muted-foreground">
                    {testimonial.author[0]}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm">
                    {testimonial.author}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Case Snapshots */}
        <div className="bg-card rounded-2xl border border-border p-6 lg:p-8 shadow-snapfin-md">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-1">
                Recent Success Stories
              </h3>
              <p className="text-sm text-muted-foreground">
                Real approvals from real customers
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              {caseSnapshots.map((snapshot, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 px-4 py-3 bg-muted/50 rounded-xl"
                >
                  <div className="text-xl font-bold text-secondary">
                    {snapshot.amount}
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-medium text-foreground">
                      {snapshot.type}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {snapshot.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
