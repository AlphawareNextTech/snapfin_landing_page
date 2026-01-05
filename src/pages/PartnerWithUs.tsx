import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/ui/form-input";
import { FormSelect } from "@/components/ui/form-select";
import api from "@/interceptor/axios";
import { ArrowRight, Building2, Users, TrendingUp, Shield, CheckCircle2, Sparkles, Handshake, Zap } from "lucide-react";
interface FormData {
  companyName: string;
  contactName: string;
  designation: string;
  businessEmail: string;
  mobileNumber: string;
  partnerType: string;
  website: string;
  businessDescription: string;
}
export default function PartnerWithUs() {
  const [formData, setFormData] = useState<FormData>({
    companyName: "",
    contactName: "",
    designation: "",
    businessEmail: "",
    mobileNumber: "",
    partnerType: "",
    website: "",
    businessDescription: ""
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const validate = () => {
    const newErrors: Partial<FormData> = {};
    if (!formData.companyName) newErrors.companyName = "Company name is required";
    if (!formData.contactName) newErrors.contactName = "Contact name is required";
    if (!formData.businessEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.businessEmail)) newErrors.businessEmail = "Valid email required";
    if (!formData.mobileNumber || !/^\d{10}$/.test(formData.mobileNumber)) newErrors.mobileNumber = "Valid 10-digit phone required";
    if (!formData.partnerType) newErrors.partnerType = "Please select partner type";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      const response = await api.post("/api/customer/partner-request/create", formData);
      // console.log('response', response)
      setIsSubmitted(true);
      // reset form
      setFormData({
        companyName: "",
        contactName: "",
        designation: "",
        businessEmail: "",
        mobileNumber: "",
        partnerType: "",
        website: "",
        businessDescription: "",
      });
    } catch (error: any) {
      console.error("Partner API Error:", error);
      alert(
        error?.response?.data?.message || "Failed to submit partner request"
      );
    }
  };
  const partnerBenefits = [{
    icon: TrendingUp,
    title: "Higher Conversions",
    desc: "AI-powered lead matching increases approval rates by 40%"
  }, {
    icon: Users,
    title: "Quality Leads",
    desc: "Pre-verified, high-intent borrowers ready for financing"
  }, {
    icon: Zap,
    title: "Instant Integration",
    desc: "Quick API setup with dedicated tech support"
  }, {
    icon: Shield,
    title: "Compliant & Secure",
    desc: "RBI-compliant processes with bank-grade security"
  }];
  const partnerTypes = [{
    icon: Building2,
    title: "Financial Institutions",
    desc: "Banks, NBFCs, and lending companies"
  }, {
    icon: Users,
    title: "DSA Partners",
    desc: "Direct Selling Agents and loan distributors"
  }, {
    icon: Handshake,
    title: "Corporate Tie-ups",
    desc: "Employee benefit programs and B2B partnerships"
  }];
  return <div className="min-h-screen bg-background">
    <Header />
    <main className="pt-24 pb-16">
      <div className="container-snapfin">
        {/* Hero */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/20 mb-6 animate-fade-up">
            <Handshake className="w-4 h-4 text-secondary" />
            <span className="text-sm font-semibold text-secondary">Partnership Program</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 animate-fade-up delay-100">Partner With
            Snapfin <br />
            <span className="text-secondary">Snapfin</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-fade-up delay-200">
            Join India's fastest-growing AI-powered lending ecosystem.
            Access quality leads and transform your loan business.
          </p>
        </div>

        {/* Partner Types */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {partnerTypes.map((type, i) => <div key={i} className="bg-card rounded-2xl border border-border p-6 hover:shadow-snapfin-lg transition-all duration-300 animate-fade-up" style={{
            animationDelay: `${i * 100}ms`
          }}>
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-4">
              <type.icon className="w-7 h-7 text-primary-foreground" />
            </div>
            <h3 className="text-lg font-bold text-foreground mb-2">{type.title}</h3>
            <p className="text-muted-foreground">{type.desc}</p>
          </div>)}
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Form */}
          <div className="animate-fade-up">
            {!isSubmitted ? <div className="bg-card rounded-3xl border border-border shadow-snapfin-xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-foreground">Become a Growth Partner</h2>
                  <p className="text-sm text-muted-foreground">Fill out the form to get started</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid md:grid-cols-2 gap-4">
                  <FormInput label="Company Name" placeholder="Your company name" value={formData.companyName} onChange={e => setFormData(prev => ({
                    ...prev,
                    companyName: e.target.value
                  }))} error={errors.companyName} required />
                  <FormInput label="Contact Person" placeholder="Full name" value={formData.contactName} onChange={e => setFormData(prev => ({
                    ...prev,
                    contactName: e.target.value
                  }))} error={errors.contactName} required />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <FormInput label="Designation" placeholder="Your role" value={formData.designation} onChange={e => setFormData(prev => ({
                    ...prev,
                    designation: e.target.value
                  }))} />
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Partner Type <span className="text-destructive">*</span>
                    </label>
                    <select value={formData.partnerType} onChange={e => setFormData(prev => ({
                      ...prev,
                      partnerType: e.target.value
                    }))} className="w-full h-12 px-4 rounded-xl bg-background border border-input text-foreground focus:outline-none focus:ring-2 focus:ring-secondary/50">
                      <option value="">Select partner type</option>
                      {/* <option value="bank">Bank / NBFC</option> */}
                      <option value="DSA">DSA / Loan Agent</option>
                      <option value="CORPORATE_PARTNER">Corporate Partner</option>
                      <option value="FINTECH">Fintech Company</option>
                      <option value="other">Other</option>
                    </select>
                    {errors.partnerType && <p className="text-sm text-destructive mt-1">{errors.partnerType}</p>}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <FormInput label="Business Email" type="email" placeholder="work@company.com" value={formData.businessEmail} onChange={e => setFormData(prev => ({
                    ...prev,
                    businessEmail: e.target.value
                  }))} error={errors.businessEmail} required />
                  <FormInput label="Phone Number" placeholder="10-digit number" value={formData.mobileNumber} onChange={e => setFormData(prev => ({
                    ...prev,
                    mobileNumber: e.target.value.replace(/\D/g, "").slice(0, 10)
                  }))} error={errors.mobileNumber} required />
                </div>

                <FormInput label="Website (Optional)" placeholder="https://yourcompany.com" value={formData.website} onChange={e => setFormData(prev => ({
                  ...prev,
                  website: e.target.value
                }))} />

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Tell us about your business
                  </label>
                  <textarea value={formData.businessDescription} onChange={e => setFormData(prev => ({
                    ...prev,
                    businessDescription: e.target.value
                  }))} placeholder="Brief description of your company and partnership goals..." className="w-full h-24 px-4 py-3 rounded-xl bg-background border border-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-secondary/50 resize-none" />
                </div>

                <Button type="submit" variant="hero" size="lg" className="w-full group">
                  Submit Partnership Request
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  Our partnership team will review and get back within 48 hours
                </p>
              </form>
            </div> : <div className="bg-card rounded-3xl border border-border shadow-snapfin-xl p-12 text-center animate-scale-in">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-secondary to-primary mx-auto mb-6 flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10 text-primary-foreground" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-3">Application Received!</h2>
              <p className="text-muted-foreground mb-6">
                Thank you for your interest in partnering with Snapfin.
                Our team will review your application and contact you within 48 hours.
              </p>
              <div className="bg-muted/50 rounded-xl p-4 mb-6">
                <p className="text-sm text-muted-foreground">Reference ID</p>
                <p className="text-lg font-bold text-foreground">PARTNER-{Date.now().toString().slice(-8)}</p>
              </div>
              <Button variant="outline" onClick={() => window.location.href = "/"}>
                Back to Home
              </Button>
            </div>}
          </div>

          {/* Benefits Side */}
          <div className="space-y-6">
            <div className="bg-card rounded-2xl border border-border p-6">
              <h3 className="font-semibold text-foreground mb-6 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-secondary" />
                Why Partner With Snapfin?
              </h3>
              <div className="space-y-5">
                {partnerBenefits.map((benefit, i) => <div key={i} className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center flex-shrink-0">
                    <benefit.icon className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{benefit.title}</p>
                    <p className="text-sm text-muted-foreground">{benefit.desc}</p>
                  </div>
                </div>)}
              </div>
            </div>

            {/* Stats */}
            <div className="bg-gradient-to-br from-primary to-secondary rounded-2xl p-6 text-primary-foreground">
              <h3 className="font-semibold mb-6">Our Partner Network</h3>
              <div className="grid grid-cols-2 gap-4">
                {[{
                  value: "50+",
                  label: "Lending Partners"
                }, {
                  value: "₹500Cr+",
                  label: "Monthly Disbursals"
                }, {
                  value: "40%",
                  label: "Higher Approval"
                }, {
                  value: "2x",
                  label: "Faster Processing"
                }].map((stat, i) => <div key={i} className="bg-primary-foreground/10 rounded-xl p-4 text-center">
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-xs opacity-80">{stat.label}</p>
                </div>)}
              </div>
            </div>

            {/* Testimonial */}
            <div className="bg-muted/50 rounded-2xl p-6">
              <p className="text-foreground italic mb-4">
                "Partnering with Snapfin increased our loan disbursals by 60%. Their AI-powered matching is a game-changer."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-semibold">
                  AK
                </div>
                <div>
                  <p className="font-medium text-foreground">Anil Kumar</p>
                  <p className="text-sm text-muted-foreground">CEO, Leading NBFC</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
    <Footer />
  </div>;
}