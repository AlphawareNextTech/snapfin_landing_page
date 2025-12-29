import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Shield, Lock, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/ui/form-input";
import { FormSelect } from "@/components/ui/form-select";
import { FormCheckbox } from "@/components/ui/form-checkbox";
import { AlertBanner } from "@/components/ui/alert-banner";
import axios from "axios";
import api from "@/interceptor/axios";
import type { LeadFormData, EligibilityLocationState } from "@/types";

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
const businessType = [
  { label: "Sole Proprietorship", value: "sole_proprietorship" },
  { label: "Partnership", value: "partnership" },
  { label: "Private Limited", value: "pvt_ltd" },
  { label: "Public Limited", value: "public_ltd" },
  { label: "LLP", value: "llp" }
];


// const incomeRanges = [
//   { value: "below-25k", label: "Below ₹25,000" },
//   { value: "25k-50k", label: "₹25,000 - ₹50,000" },
//   { value: "50k-1l", label: "₹50,000 - ₹1,00,000" },
//   { value: "1l-2l", label: "₹1,00,000 - ₹2,00,000" },
//   { value: "above-2l", label: "Above ₹2,00,000" },
// ];
const propertyTypes = [
  { value: "residential", label: "Residential" },
  { value: "commercial", label: "Commercial" },
  { value: "land", label: "Land" },
  { value: "co-owned", label: "Co-Owned Property" },
];


export default function CheckEligibility() {
  const location = useLocation();
  const initialData = (location.state as EligibilityLocationState) || {};
  const [formData, setFormData] = useState<LeadFormData>({
    name: `${initialData.firstName ?? ""} ${initialData.lastName ?? ""}`.trim(),
    email: "",
    city: "",
    mobileNumber: initialData.mobile || "",
    loanType: initialData.loanType || "",
    panNumber: "",
    pincode: "",
    loanAmount: "",
    employment: "",
    propertyType: "",
    organisationName: "",
    businessVintage: "",
    businessType: "",
    consent: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEligible, setIsEligible] = useState<boolean | null>(null);

  const validatemobileNumber = (mobileNumber: string) => {
    return /^[6-9]\d{9}$/.test(mobileNumber);
  };
  const validatePAN = (panNumber: string) => {
    return /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(panNumber);
  };
  const validatePincode = (pincode: string) => {
    return /^[1-9][0-9]{5}$/.test(pincode);
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    if (!formData.name) newErrors.name = "Please enter your full name";
    if (!formData.email) {
      newErrors.email = "Please enter your email address";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.city) {
      newErrors.city = "Please enter your city";
    }
    if (!formData.loanAmount) newErrors.loanAmount = "Please enter loan amount";
    if (!formData.employment) newErrors.employment = "Please select employment type";
    // if (!formData.income) newErrors.income = "Please select income range";
    if (!formData.mobileNumber) {
      newErrors.mobileNumber = "Please enter your mobile number";
    } else if (!validatemobileNumber(formData.mobileNumber)) {
      newErrors.mobileNumber = "Please enter a valid 10-digit mobile number";
    }
    if (!formData.panNumber) {
      newErrors.panNumber = "Please enter your PAN number";
    } else if (!validatePAN(formData.panNumber)) {
      newErrors.panNumber = "Please enter a valid PAN (ABCDE1234F)";
    }
    if (!formData.pincode) {
      newErrors.pincode = "Please enter your pincode";
    } else if (!validatePincode(formData.pincode)) {
      newErrors.pincode = "Please enter a valid 6-digit pincode";
    }
    if (!formData.propertyType) {
      newErrors.propertyType = "Please select property type";
    }

    if (!formData.consent) newErrors.consent = "Please accept the terms to continue";

    setErrors(newErrors);

    // if (Object.keys(newErrors).length === 0) {
    //   setIsSubmitting(true);
    //   // Simulate API call
    //   await new Promise((resolve) => setTimeout(resolve, 1500));
    //   setIsEligible(true);
    //   setIsSubmitting(false);
    // }


    try {
      setIsSubmitting(true);
      const payload = {
        productKey: "business_loan",
        formData,
        notificationPreferences: {
          sms: true,
          email: true,
        },
      };

      const response = await api.post(
        `/api/customer/leads`,
        payload,
      );
      // console.log("Lead created:", response.data);
      setIsEligible(true);

    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        console.error("API Error:", error.response?.data);
        setErrors({
          api: error.response?.data?.message || "Lead creation failed",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  }

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
                  <FormInput
                    label="Full Name"
                    required
                    type="text"
                    placeholder="Enter Full Name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    error={errors.firstName}
                  />
                  <FormInput
                    label="Email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    error={errors.email}
                  />

                  <FormInput
                    label="City"
                    value={formData.city}
                    placeholder="Enter your city"
                    onChange={(e) =>
                      setFormData({ ...formData, city: e.target.value })
                    }
                    error={errors.city}
                  />

                  <FormInput
                    label="Mobile Number"
                    required
                    type="tel"
                    placeholder="10-digit mobile number"
                    value={formData.mobileNumber}
                    onChange={(e) => setFormData({ ...formData, mobileNumber: e.target.value.replace(/\D/g, "").slice(0, 10) })}
                    error={errors.mobileNumber}
                  />
                  <FormInput
                    label="PAN Number"
                    required
                    type="text"
                    placeholder="ABCDE1234F"
                    value={formData.panNumber}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        panNumber: e.target.value.toUpperCase().slice(0, 10),
                      })
                    }
                    error={errors.panNumber}
                    helperText="Used for eligibility check only"
                  />

                  <FormInput
                    label="Pincode"
                    required
                    type="text"
                    placeholder="6-digit pincode"
                    value={formData.pincode}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        pincode: e.target.value.replace(/\D/g, "").slice(0, 6),
                      })
                    }
                    error={errors.pincode}
                    helperText="Used to check service availability"
                  />
                </div>

                {["personal", "lap"].includes(formData.loanType) && (
                  <div className="grid sm:grid-cols-2 gap-6">
                    <FormSelect
                      label="Employment Type"
                      required
                      options={employmentTypes}
                      placeholder="Select employment"
                      value={formData.employment}
                      onChange={(e) =>
                        setFormData({ ...formData, employment: e.target.value })
                      }
                      error={errors.employment}
                    />

                    {/* Show Property Type ONLY for LAP */}
                    {formData.loanType === "lap" && (
                      <FormSelect
                        label="Property Type"
                        required
                        options={propertyTypes}
                        placeholder="Select property type"
                        value={formData.propertyType}
                        onChange={(e) =>
                          setFormData({ ...formData, propertyType: e.target.value })
                        }
                        error={errors.propertyType}
                      />
                    )}
                  </div>
                )}

                {formData.loanType === "business" && (
                  <div className="grid sm:grid-cols-2 gap-6">
                    <FormInput
                      label="Organization Name"
                      required
                      type="text"
                      placeholder="Enter organization name"
                      value={formData.organisationName}
                      onChange={(e) =>
                        setFormData({ ...formData, organisationName: e.target.value })
                      }
                      error={errors.organisationName}
                    />

                    <FormInput
                      label="Business Vintage (Years)"
                      required
                      type="number"
                      min={0}
                      placeholder="e.g. 3"
                      value={formData.businessVintage}
                      onChange={(e) =>
                        setFormData({ ...formData, businessVintage: e.target.value })
                      }
                      error={errors.businessVintage}
                      helperText="Number of years in business"
                    />
                    <FormSelect
                      label="Business Type"
                      required
                      options={businessType}
                      placeholder="Select business type"
                      value={formData.businessType}
                      onChange={(e) =>
                        setFormData({ ...formData, businessType: e.target.value })
                      }
                      error={errors.businessType}
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

                )}

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
