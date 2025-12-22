import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/ui/form-input";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2, MessageSquare, Sparkles } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Valid email is required";
    }
    if (!formData.message) newErrors.message = "Message is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    setIsSubmitted(true);
  };

  const contactInfo = [
    { icon: Phone, label: "Phone", value: "1800-123-456", href: "tel:+911800123456", subtext: "Toll-free" },
    { icon: Mail, label: "Email", value: "support@snapfin.com", href: "mailto:support@snapfin.com", subtext: "24hr response" },
    { icon: MapPin, label: "Office", value: "Mumbai, India", href: "#", subtext: "Headquarters" },
    { icon: Clock, label: "Hours", value: "Mon-Sat: 9AM-7PM", href: "#", subtext: "IST" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container-snapfin">
          {/* Hero */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/20 mb-6 animate-fade-up">
              <MessageSquare className="w-4 h-4 text-secondary" />
              <span className="text-sm font-semibold text-secondary">Get In Touch</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 animate-fade-up delay-100">
              Contact <span className="text-secondary">Us</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-fade-up delay-200">
              Have questions about our AI-powered loan services? We're here to help you find the perfect financial solution.
            </p>
          </div>

          {/* Contact Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {contactInfo.map((item, i) => (
              <a 
                key={i}
                href={item.href}
                className="bg-card rounded-2xl border border-border p-6 hover:shadow-snapfin-lg hover:border-secondary/30 transition-all duration-300 animate-fade-up group"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center mb-4 group-hover:bg-secondary/20 transition-colors">
                  <item.icon className="w-6 h-6 text-secondary" />
                </div>
                <p className="text-xs text-muted-foreground mb-1">{item.label}</p>
                <p className="font-semibold text-foreground mb-1">{item.value}</p>
                <p className="text-xs text-muted-foreground">{item.subtext}</p>
              </a>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="animate-fade-up">
              {!isSubmitted ? (
                <div className="bg-card rounded-3xl border border-border shadow-snapfin-xl p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                      <Send className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-foreground">Send a Message</h2>
                      <p className="text-sm text-muted-foreground">We'll get back to you within 24 hours</p>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid md:grid-cols-2 gap-4">
                      <FormInput
                        label="Your Name"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        error={errors.name}
                        required
                      />
                      <FormInput
                        label="Email Address"
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        error={errors.email}
                        required
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <FormInput
                        label="Phone (Optional)"
                        placeholder="10-digit number"
                        value={formData.phone}
                        onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value.replace(/\D/g, "").slice(0, 10) }))}
                      />
                      <FormInput
                        label="Subject"
                        placeholder="How can we help?"
                        value={formData.subject}
                        onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Your Message <span className="text-destructive">*</span>
                      </label>
                      <textarea
                        value={formData.message}
                        onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                        placeholder="Tell us more about your inquiry..."
                        className="w-full h-32 px-4 py-3 rounded-xl bg-background border border-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-secondary/50 resize-none"
                        required
                      />
                      {errors.message && (
                        <p className="text-sm text-destructive mt-1">{errors.message}</p>
                      )}
                    </div>

                    <Button 
                      type="submit" 
                      variant="hero" 
                      size="lg" 
                      className="w-full"
                      disabled={isLoading}
                    >
                      {isLoading ? "Sending..." : "Send Message"}
                      <Send className="w-5 h-5" />
                    </Button>
                  </form>
                </div>
              ) : (
                <div className="bg-card rounded-3xl border border-border shadow-snapfin-xl p-12 text-center animate-scale-in">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-secondary to-primary mx-auto mb-6 flex items-center justify-center">
                    <CheckCircle2 className="w-10 h-10 text-primary-foreground" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground mb-3">Message Sent!</h2>
                  <p className="text-muted-foreground mb-6">
                    Thank you for reaching out. Our team will get back to you within 24 hours.
                  </p>
                  <Button variant="outline" onClick={() => setIsSubmitted(false)}>
                    Send Another Message
                  </Button>
                </div>
              )}
            </div>

            {/* Info Side */}
            <div className="space-y-6">
              {/* Quick Help */}
              <div className="bg-card rounded-2xl border border-border p-6">
                <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-secondary" />
                  Quick Help
                </h3>
                <div className="space-y-3">
                  {[
                    { q: "How do I check my loan eligibility?", link: "/eligibility" },
                    { q: "What documents do I need?", link: "/faq" },
                    { q: "How does the AI matching work?", link: "/#how-it-works" },
                    { q: "What are the interest rates?", link: "/faq" }
                  ].map((item, i) => (
                    <a 
                      key={i}
                      href={item.link}
                      className="block p-3 bg-muted/50 hover:bg-muted rounded-lg text-sm text-foreground hover:text-secondary transition-colors"
                    >
                      {item.q}
                    </a>
                  ))}
                </div>
              </div>

              {/* CTA Card */}
              <div className="bg-gradient-to-br from-primary to-secondary rounded-2xl p-6 text-primary-foreground">
                <h3 className="font-semibold mb-3">Need Immediate Help?</h3>
                <p className="text-sm opacity-90 mb-4">
                  Our AI assistant Aria is available 24/7 to answer your questions instantly.
                </p>
                <p className="text-xs opacity-80">
                  Look for the chat icon in the bottom right corner of your screen.
                </p>
              </div>

              {/* Map placeholder */}
              <div className="bg-muted/50 rounded-2xl p-6 text-center">
                <MapPin className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
                <p className="font-medium text-foreground">Snapfin Headquarters</p>
                <p className="text-sm text-muted-foreground">Mumbai, Maharashtra, India</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}