import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/ui/form-input";
import { FormSelect } from "@/components/ui/form-select";
import { ArrowRight, Phone, Calendar, Clock, Users, Star, CheckCircle2, Sparkles, Video, MessageSquare } from "lucide-react";
import { toast } from "sonner";
import api from "@/interceptor/axios";
import { v4 as uuidv4 } from "uuid"; // import UUID
interface FormData {
  name: string;
  companyName?: string;
  mobileNumber: string;
  city: string;
  turnOver?: string;
  followUpDate: string;
  followUpTime: string;
  note: string;
}

export default function Consultation() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    companyName: "",
    mobileNumber: "",
    city: "",
    turnOver: "",
    followUpDate: "",
    followUpTime: "",
    note: ""
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = () => {
    const newErrors: Partial<FormData> = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.companyName?.trim()) newErrors.companyName = "Company name is required";
    if (!formData.mobileNumber || !/^\d{10}$/.test(formData.mobileNumber)) newErrors.mobileNumber = "Valid 10-digit phone required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.followUpDate) newErrors.followUpDate = "Schedule date is required";
    if (!formData.followUpTime) newErrors.followUpTime = "Schedule time is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setIsSubmitted(true);

    try {
      // Prepare payload
      const payload = {
        name: formData.name,
        companyName: formData.companyName,
        mobileNumber: formData.mobileNumber,
        city: formData.city,
        turnOver: formData.turnOver,
        followUpDate: formData.followUpDate,
        followUpTime: formData.followUpTime,
        note: formData.note,
        uniqueIdentifier: uuidv4(),
      };

      const { data } = await api.post("/api/customer/contacts/create", payload);
      console.log('data', data)
      toast.success(data.message || "Contact created successfully");

      // Reset form
      setFormData({
        name: "",
        companyName: "",
        mobileNumber: "",
        city: "",
        turnOver: "",
        followUpDate: "",
        followUpTime: "",
        note: "",
      });

      setIsSubmitted(true);
    } catch (err: any) {
      console.error("API error:", err);
      toast.error(
        err?.response?.data?.message || "Something went wrong. Please try again."
      );
      setIsSubmitted(false);
    }
  };


  const experts = [
    { name: "Rajesh Kumar", role: "Senior Loan Advisor", exp: "15+ years", avatar: "RK" },
    { name: "Priya Sharma", role: "Business Loan Expert", exp: "12+ years", avatar: "PS" },
    { name: "Amit Patel", role: "LAP Specialist", exp: "10+ years", avatar: "AP" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container-snapfin">
          {/* Hero */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6 animate-fade-up">
              <Sparkles className="w-4 h-4 text-accent" />
              <span className="text-sm font-semibold text-accent">100% FREE Consultation</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 animate-fade-up delay-100">
              Book a Free Expert
              <br />
              <span className="text-secondary">Consultation</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-fade-up delay-200">
              Connect with our AI-trained loan experts to find the perfect financing solution.
              Get personalized advice at no cost.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Form */}
            <div className="animate-fade-up delay-300">
              {!isSubmitted ? (
                <div className="bg-card rounded-3xl border border-border shadow-snapfin-xl p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-secondary to-primary flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-foreground">Schedule Your Call</h2>
                      <p className="text-sm text-muted-foreground">Takes less than 2 minutes</p>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid md:grid-cols-2 gap-4">
                      <FormInput
                        label="Customer Name"
                        placeholder="Vikram Mehta"
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        error={errors.name}
                        required
                      />
                      <FormInput
                        label="Company Name"
                        placeholder="pvt.ltd"
                        value={formData.companyName}
                        onChange={(e) => setFormData(prev => ({ ...prev, companyName: e.target.value }))}
                        error={errors.companyName}
                        required
                      />

                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <FormInput
                        label="City"
                        placeholder="Enter city name"
                        value={formData.city}

                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            city: e.target.value.replace(/[^a-zA-Z\s]/g, ""),
                          }))
                        }
                        error={errors.city}
                        required
                      />
                      <FormInput
                        label="Phone Number"
                        placeholder="10-digit number"
                        value={formData.mobileNumber}
                        onChange={(e) => setFormData(prev => ({ ...prev, mobileNumber: e.target.value.replace(/\D/g, "").slice(0, 10) }))}
                        error={errors.mobileNumber}
                        required
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <FormInput
                        label="Scheduled Date"
                        type="date"
                        value={formData.followUpDate}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            followUpDate: e.target.value,
                          }))
                        }
                        error={errors.followUpDate}
                        required
                      />
                      <FormInput
                        label="Scheduled Time"
                        type="time"
                        value={formData.followUpTime}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            followUpTime: e.target.value,
                          }))
                        }
                        error={errors.followUpTime}
                        required
                      />


                    </div>
                    <div className="space-y-4">
                      <FormInput
                        label="Turn Over (Optional)"
                        placeholder="Enter turnover"
                        value={formData.turnOver}
                        onChange={(e) => setFormData(prev => ({ ...prev, turnOver: e.target.value }))}
                        error={errors.turnOver}
                        required
                      />
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Additional Message (Optional)
                      </label>
                      <textarea
                        value={formData.note}
                        onChange={(e) => setFormData(prev => ({ ...prev, note: e.target.value }))}
                        placeholder="Tell us about your requirements..."
                        className="w-full h-24 px-4 py-3 rounded-xl bg-background border border-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-secondary/50 resize-none"
                      />
                    </div>

                    <Button type="submit" variant="hero" size="lg" className="w-full group">
                      Book Free Consultation
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Button>

                    <p className="text-xs text-muted-foreground text-center">
                      By booking, you agree to receive a call from our experts. No spam, guaranteed.
                    </p>
                  </form>
                </div>
              ) : (
                <div className="bg-card rounded-3xl border border-border shadow-snapfin-xl p-12 text-center animate-scale-in">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-secondary to-primary mx-auto mb-6 flex items-center justify-center">
                    <CheckCircle2 className="w-10 h-10 text-primary-foreground" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground mb-3">Consultation Booked!</h2>
                  <p className="text-muted-foreground mb-6">
                    Our expert will call you within 24 hours at your preferred time.
                    Check your email for confirmation.
                  </p>
                  <div className="bg-muted/50 rounded-xl p-4 mb-6">
                    <p className="text-sm text-muted-foreground">Reference ID</p>
                    <p className="text-lg font-bold text-foreground">SNP-{Date.now().toString().slice(-8)}</p>
                  </div>
                  <Button variant="outline" onClick={() => window.location.href = "/"}>
                    Back to Home
                  </Button>
                </div>
              )}
            </div>

            {/* Info Side */}
            <div className="space-y-6">
              {/* What to Expect */}
              <div className="bg-card rounded-2xl border border-border p-6">
                <h3 className="font-semibold text-foreground mb-4">What to Expect</h3>
                <div className="space-y-4">
                  {[
                    { icon: Phone, title: "15-min Discovery Call", desc: "Quick chat to understand your needs" },
                    { icon: Sparkles, title: "AI-Powered Analysis", desc: "Get instant loan recommendations" },
                    { icon: Video, title: "Video Call Option", desc: "Detailed walkthrough if needed" },
                    { icon: MessageSquare, title: "WhatsApp Support", desc: "Ongoing assistance throughout" }
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center flex-shrink-0">
                        <item.icon className="w-5 h-5 text-secondary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{item.title}</p>
                        <p className="text-sm text-muted-foreground">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Expert Team */}
              <div className="bg-card rounded-2xl border border-border p-6">
                <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5 text-secondary" />
                  Meet Our Experts
                </h3>
                <div className="space-y-4">
                  {experts.map((expert, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-muted/50">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-primary-foreground font-semibold">
                        {expert.avatar}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-foreground">{expert.name}</p>
                        <p className="text-sm text-muted-foreground">{expert.role}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-secondary">{expert.exp}</p>
                        <div className="flex gap-0.5">
                          {[1, 2, 3, 4, 5].map(n => <Star key={n} className="w-3 h-3 fill-accent text-accent" />)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4">
                {[
                  { value: "5,000+", label: "Consultations" },
                  { value: "4.9★", label: "Rating" },
                  { value: "₹500Cr+", label: "Loans Facilitated" }
                ].map((stat, i) => (
                  <div key={i} className="bg-muted/50 rounded-xl p-4 text-center">
                    <p className="text-xl font-bold text-foreground">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
