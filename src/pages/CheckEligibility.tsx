import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Shield, Lock, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/ui/form-input";
import { FormSelect } from "@/components/ui/form-select";
import { FormCheckbox } from "@/components/ui/form-checkbox";
import { AlertBanner } from "@/components/ui/alert-banner";

const loanTypes = [
  { value: "personal", label: "Personal Loan" },
  { value: "lap", label: "Loan Against Property" },
  { value: "business", label: "Business Loan" },
];

const employmentTypes = [
  { value: "salaried", label: "Salaried" },
  { value: "self-employed", label: "Self-Employed" },
  { value: "business-owner", label: "Business Owner" },
];

const incomeRanges = [
  { value: "below-25k", label: "Below ₹25,000" },
  { value: "25k-50k", label: "₹25,000 - ₹50,000" },
  { value: "50k-1l", label: "₹50,000 - ₹1,00,000" },
  { value: "1l-2l", label: "₹1,00,000 - ₹2,00,000" },
  { value: "above-2l", label: "Above ₹2,00,000" },
];

export default function CheckEligibility() {
  const [formData, setFormData] = useState({
    loanType: "",
    loanAmount: "",
    employment: "",
    income: "",
    phone: "",
    consent: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEligible, setIsEligible] = useState<boolean | null>(null);

  const validatePhone = (phone: string) => {
    return /^[6-9]\d{9}$/.test(phone);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!formData.loanType) newErrors.loanType = "Please select a loan type";
    if (!formData.loanAmount) newErrors.loanAmount = "Please enter loan amount";
    if (!formData.employment) newErrors.employment = "Please select employment type";
    if (!formData.income) newErrors.income = "Please select income range";
    if (!formData.phone) {
      newErrors.phone = "Please enter your mobile number";
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = "Please enter a valid 10-digit mobile number";
    }
    if (!formData.consent) newErrors.consent = "Please accept the terms to continue";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setIsEligible(true);
      setIsSubmitting(false);
    }
  };

  if (isEligible) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container-snapfin py-20">
          <div className="max-w-xl mx-auto text-center">
            <div className="w-20 h-20 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-6 animate-scale-in">
              <CheckCircle2 className="w-10 h-10 text-secondary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-4 animate-fade-up">
              Great News! You're Eligible
            </h1>
            <p className="text-lg text-muted-foreground mb-8 animate-fade-up delay-100">
              Based on your information, you pre-qualify for a loan up to ₹10,00,000 at competitive rates.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up delay-200">
              <Button variant="hero" size="lg" asChild>
                <Link to="/apply">
                  Continue to Apply
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/">Back to Home</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="container-snapfin py-4">
          <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </header>

      <main className="py-12 lg:py-20">
        <div className="container-snapfin">
          <div className="max-w-2xl mx-auto">
            {/* Page Header */}
            <div className="text-center mb-10">
              <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Check Your Eligibility
              </h1>
              <p className="text-lg text-muted-foreground">
                Quick check with no impact on your credit score
              </p>
            </div>

            {/* Form */}
            <div className="bg-card rounded-2xl border border-border shadow-snapfin-lg p-6 sm:p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <FormSelect
                    label="Loan Type"
                    required
                    options={loanTypes}
                    placeholder="Select loan type"
                    value={formData.loanType}
                    onChange={(e) => setFormData({ ...formData, loanType: e.target.value })}
                    error={errors.loanType}
                  />
                  <FormInput
                    label="Loan Amount"
                    required
                    type="text"
                    placeholder="e.g., 5,00,000"
                    value={formData.loanAmount}
                    onChange={(e) => setFormData({ ...formData, loanAmount: e.target.value })}
                    error={errors.loanAmount}
                    helperText="Enter amount in ₹"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <FormSelect
                    label="Employment Type"
                    required
                    options={employmentTypes}
                    placeholder="Select employment"
                    value={formData.employment}
                    onChange={(e) => setFormData({ ...formData, employment: e.target.value })}
                    error={errors.employment}
                  />
                  <FormSelect
                    label="Monthly Income"
                    required
                    options={incomeRanges}
                    placeholder="Select income range"
                    value={formData.income}
                    onChange={(e) => setFormData({ ...formData, income: e.target.value })}
                    error={errors.income}
                  />
                </div>

                <FormInput
                  label="Mobile Number"
                  required
                  type="tel"
                  placeholder="10-digit mobile number"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, "").slice(0, 10) })}
                  error={errors.phone}
                  helperText="We'll send OTP for verification"
                />

                <FormCheckbox
                  checked={formData.consent}
                  onCheckedChange={(checked) => setFormData({ ...formData, consent: checked as boolean })}
                  error={errors.consent}
                  label={
                    <>
                      I agree to the{" "}
                      <a href="#terms" className="text-secondary hover:underline">Terms of Service</a>
                      {" "}and{" "}
                      <a href="#privacy" className="text-secondary hover:underline">Privacy Policy</a>
                    </>
                  }
                />

                <Button
                  type="submit"
                  variant="hero"
                  size="lg"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>Checking Eligibility...</>
                  ) : (
                    <>
                      Check Eligibility
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </Button>
              </form>

              {/* Trust indicators */}
              <div className="flex flex-wrap justify-center gap-6 mt-8 pt-6 border-t border-border">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Shield className="w-4 h-4 text-secondary" />
                  Bank-level encryption
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Lock className="w-4 h-4 text-secondary" />
                  Your data is safe
                </div>
              </div>
            </div>

            {/* Info Banner */}
            <AlertBanner variant="info" className="mt-6">
              This is a soft check and will not affect your credit score. Final approval is subject to document verification.
            </AlertBanner>
          </div>
        </div>
      </main>
    </div>
  );
}
