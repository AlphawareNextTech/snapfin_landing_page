import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/ui/form-input";
import { ArrowRight, Shield, CheckCircle2, Sparkles, TrendingUp, AlertCircle, Star, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import api from "@/interceptor/axios";
type Step = "form" | "processing" | "result";
interface FormData {
  fullName: string;
  phone: string;
  pan: string;
  email: string;
  dob: string;
}
export default function CIBILScore() {

  const splitFullName = (fullName: string) => {
    const parts = fullName.trim().split(" ").filter(Boolean);

    return {
      first_name: parts[0] || "",
      last_name: parts.slice(1).join(" ") || "",
    };
  };

  const [step, setStep] = useState<Step>("form");
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    phone: "",
    pan: "",
    email: "",
    dob: ""
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [score, setScore] = useState(0);

  const validate = () => {
    const newErrors: Partial<FormData> = {};
    // if (!formData.fullName) newErrors.fullName = "Name is required";
    if (!formData.fullName.trim().includes(" ")) {
      newErrors.fullName = "Please enter your full name (First & Last name)";
    }
    if (!formData.phone || !/^\d{10}$/.test(formData.phone)) newErrors.phone = "Valid 10-digit phone required";
    if (!formData.pan || !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.pan.toUpperCase())) newErrors.pan = "Valid PAN required (e.g., ABCDE1234F)";
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Valid email required";
    if (!formData.dob) newErrors.dob = "Date of birth is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (!validate()) return;
  //   setStep("processing");

  //   // Simulate AI processing
  //   setTimeout(() => {
  //     const randomScore = Math.floor(Math.random() * (850 - 600 + 1)) + 600;
  //     setScore(randomScore);
  //     setStep("result");
  //   }, 3000);
  // };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setStep("processing");

    try {
      const { first_name, last_name } = splitFullName(formData.fullName);

      const payload = {
        client_ref_num: "SOFT_CHECK",
        mobile_no: formData.phone,
        first_name,
        last_name,
      };

      const response = await api.post("/api/customer/bre/soft-report", payload);
      // console.log('response',response)

      const digitapResponse = response.data?.data?.result;

      const score =
        digitapResponse?.credit_score ||
        digitapResponse?.cibil_score ||
        digitapResponse?.score;

      if (!score) {
        throw new Error("Credit score not found in response");
      }

      setScore(score);
      setStep("result");
    } catch (error: any) {
      console.error("Soft report error:", error);
      setStep("form");
    }
  };

  const getScoreCategory = (score: number) => {
    if (score >= 750) return {
      label: "Excellent",
      color: "text-green-500",
      bg: "bg-green-500/10",
      desc: "You're eligible for the best loan rates!"
    };
    if (score >= 700) return {
      label: "Good",
      color: "text-secondary",
      bg: "bg-secondary/10",
      desc: "You qualify for most loan products."
    };
    if (score >= 650) return {
      label: "Fair",
      color: "text-accent",
      bg: "bg-accent/10",
      desc: "Some loan options available with moderate rates."
    };
    return {
      label: "Needs Work",
      color: "text-destructive",
      bg: "bg-destructive/10",
      desc: "Let us help you improve your score."
    };
  };
  const scoreInfo = getScoreCategory(score);
  return <div className="min-h-screen bg-background">
    <Header />
    <main className="pt-24 pb-16">
      <div className="container-snapfin">
        {/* Hero Banner */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-primary to-secondary p-8 md:p-12 mb-12">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMtOS45NDEgMC0xOCA4LjA1OS0xOCAxOHM4LjA1OSAxOCAxOCAxOCAxOC04LjA1OSAxOC0xOC04LjA1OS0xOC0xOC0xOHoiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjEpIiBzdHJva2Utd2lkdGg9IjIiLz48L2c+PC9zdmc+')] opacity-20" />
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-secondary/30 rounded-full blur-3xl" />

          <div className="relative z-10 text-center text-primary-foreground">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 border border-primary-foreground/20 mb-6">
              <Sparkles className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium">100% FREE • Instant Results</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              Check Your CIBIL Score
            </h1>
            <p className="text-lg opacity-90 max-w-2xl mx-auto">Get your credit score instantly!
              Understand your creditworthiness and unlock better loan offers.</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Form / Result Section */}
          <div className="relative">
            {step === "form" && <div className="bg-card rounded-3xl border border-border shadow-snapfin-xl p-8 animate-fade-up">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <Shield className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-foreground">Quick CIBIL Check</h2>
                  <p className="text-sm text-muted-foreground">Your data is encrypted & secure</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <FormInput label="Full Name" placeholder="Enter your full name" value={formData.fullName} onChange={e => setFormData(prev => ({
                  ...prev,
                  fullName: e.target.value
                }))} error={errors.fullName} required />
                <FormInput label="Mobile Number" placeholder="10-digit mobile number" value={formData.phone} onChange={e => setFormData(prev => ({
                  ...prev,
                  phone: e.target.value.replace(/\D/g, "").slice(0, 10)
                }))} error={errors.phone} required />
                <FormInput label="PAN Number" placeholder="ABCDE1234F" value={formData.pan} onChange={e => setFormData(prev => ({
                  ...prev,
                  pan: e.target.value.toUpperCase().slice(0, 10)
                }))} error={errors.pan} required />
                <FormInput label="Email Address" type="email" placeholder="your@email.com" value={formData.email} onChange={e => setFormData(prev => ({
                  ...prev,
                  email: e.target.value
                }))} error={errors.email} required />
                <FormInput label="Date of Birth" type="date" value={formData.dob} onChange={e => setFormData(prev => ({
                  ...prev,
                  dob: e.target.value
                }))} error={errors.dob} required />

                <Button type="submit" variant="hero" size="lg" className="w-full group">
                  Check My CIBIL Score
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  By continuing, you agree to our Terms of Service and Privacy Policy
                </p>
              </form>
            </div>}

            {step === "processing" && <div className="bg-card rounded-3xl border border-border shadow-snapfin-xl p-12 text-center animate-fade-up">
              <div className="w-24 h-24 mx-auto mb-6 relative">
                <div className="absolute inset-0 rounded-full border-4 border-muted animate-pulse" />
                <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-secondary animate-spin" />
                <div className="absolute inset-4 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <Sparkles className="w-8 h-8 text-primary-foreground animate-pulse" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-2">AI Analyzing Your Credit</h2>
              <p className="text-muted-foreground mb-6">Our AI is fetching your CIBIL score from bureau...</p>
              <div className="flex justify-center gap-2">
                <span className="w-2 h-2 bg-secondary rounded-full animate-bounce" style={{
                  animationDelay: "0ms"
                }} />
                <span className="w-2 h-2 bg-secondary rounded-full animate-bounce" style={{
                  animationDelay: "150ms"
                }} />
                <span className="w-2 h-2 bg-secondary rounded-full animate-bounce" style={{
                  animationDelay: "300ms"
                }} />
              </div>
            </div>}

            {step === "result" && <div className="bg-card rounded-3xl border border-border shadow-snapfin-xl overflow-hidden animate-fade-up">
              {/* Score Display */}
              <div className="bg-gradient-to-br from-primary via-primary to-secondary p-8 text-center text-primary-foreground">
                <p className="text-sm opacity-80 mb-2">Your CIBIL Score</p>
                <div className="text-7xl font-bold mb-2">{score}</div>
                <div className={cn("inline-flex items-center gap-2 px-4 py-2 rounded-full", scoreInfo.bg)}>
                  <TrendingUp className="w-4 h-4" />
                  <span className="font-semibold">{scoreInfo.label}</span>
                </div>
              </div>

              <div className="p-8">
                <div className={cn("p-4 rounded-xl mb-6 flex items-start gap-3", scoreInfo.bg)}>
                  {score >= 700 ? <CheckCircle2 className={cn("w-5 h-5 mt-0.5", scoreInfo.color)} /> : <AlertCircle className={cn("w-5 h-5 mt-0.5", scoreInfo.color)} />}
                  <div>
                    <p className={cn("font-semibold", scoreInfo.color)}>{scoreInfo.label} Credit Score</p>
                    <p className="text-sm text-muted-foreground">{scoreInfo.desc}</p>
                  </div>
                </div>

                <h3 className="font-semibold text-foreground mb-4">Recommended Next Steps</h3>
                <div className="space-y-3 mb-6">
                  <a href="/eligibility" className="flex items-center gap-3 p-4 rounded-xl border border-border hover:bg-muted/50 transition-colors">
                    <Zap className="w-5 h-5 text-secondary" />
                    <span className="text-sm text-foreground">Check loan eligibility based on your score</span>
                    <ArrowRight className="w-4 h-4 text-muted-foreground ml-auto" />
                  </a>
                  <a href="/consultation" className="flex items-center gap-3 p-4 rounded-xl border border-border hover:bg-muted/50 transition-colors">
                    <Star className="w-5 h-5 text-accent" />
                    <span className="text-sm text-foreground">Book a FREE consultation with experts</span>
                    <ArrowRight className="w-4 h-4 text-muted-foreground ml-auto" />
                  </a>
                </div>

                <Button variant="hero" size="lg" className="w-full" onClick={() => window.location.href = "/eligibility"}>
                  Get Personalized Loan Offers
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </div>
            </div>}
          </div>

          {/* Features Side */}
          <div className="space-y-6">
            <div className="bg-card rounded-2xl border border-border p-6">
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-secondary" />
                Why Check with Snapfin?
              </h3>
              <ul className="space-y-4">
                {[{
                  title: "AI-Powered Analysis",
                  desc: "Our AI provides insights beyond just the score"
                }, {
                  title: "100% Free Forever",
                  desc: "No hidden charges or credit card required"
                }, {
                  title: "Instant Results",
                  desc: "Get your score in seconds, not days"
                }, {
                  title: "Doesn't Affect Score",
                  desc: "Soft inquiry that won't impact your CIBIL"
                }, {
                  title: "Personalized Recommendations",
                  desc: "AI-matched loan offers based on your profile"
                }].map((item, i) => <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-foreground">{item.title}</p>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </li>)}
              </ul>
            </div>

            <div className="bg-gradient-to-br from-accent/10 to-accent/5 rounded-2xl border border-accent/20 p-6">
              <div className="flex items-center gap-2 mb-3">
                <Shield className="w-5 h-5 text-accent" />
                <span className="font-semibold text-foreground">Bank-Grade Security</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Your data is encrypted with 256-bit SSL encryption. We're RBI-compliant and never share your information.
              </p>
            </div>

            <div className="bg-muted/50 rounded-2xl p-6 text-center">
              <p className="text-sm text-muted-foreground mb-2">Trusted by</p>
              <p className="text-2xl font-bold text-foreground">50,000+</p>
              <p className="text-sm text-muted-foreground">Users checked their CIBIL with Snapfin</p>
            </div>
          </div>
        </div>
      </div>
    </main>
    <Footer />
  </div>;
}