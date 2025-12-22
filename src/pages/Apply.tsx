import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Check, Upload, Shield, Lock, Save, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/ui/form-input";
import { FormSelect } from "@/components/ui/form-select";
import { FormCheckbox } from "@/components/ui/form-checkbox";
import { Stepper, StepperContent } from "@/components/ui/stepper";
import { AlertBanner } from "@/components/ui/alert-banner";
import { useToast } from "@/hooks/use-toast";

const steps = [
  { id: "personal", title: "Personal Info", description: "Basic details" },
  { id: "identity", title: "Identity", description: "KYC verification" },
  { id: "employment", title: "Employment", description: "Work details" },
  { id: "review", title: "Review", description: "Confirm & submit" },
];

const loanTypes = [
  { value: "personal", label: "Personal Loan" },
  { value: "lap", label: "Loan Against Property" },
  { value: "business", label: "Business Loan" },
];

export default function Apply() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  const getInitialFormData = () => {
    const savedDraft = localStorage.getItem("snapfin_application_draft");
    if (savedDraft) {
      return JSON.parse(savedDraft);
    }
    // Try to pre-fill from user data
    const userData = localStorage.getItem("snapfin_user");
    if (userData) {
      const user = JSON.parse(userData);
      const nameParts = (user.name || "").split(" ");
      return {
        firstName: nameParts[0] || "",
        lastName: nameParts.slice(1).join(" ") || "",
        email: user.email || "",
        phone: user.phone || "",
        dob: "",
        pan: "",
        aadhaar: "",
        employmentType: "",
        companyName: "",
        monthlyIncome: "",
        loanType: "",
        loanAmount: "",
        termsAccepted: false,
      };
    }
    return {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      dob: "",
      pan: "",
      aadhaar: "",
      employmentType: "",
      companyName: "",
      monthlyIncome: "",
      loanType: "",
      loanAmount: "",
      termsAccepted: false,
    };
  };

  const [formData, setFormData] = useState(getInitialFormData);

  // Check if user is logged in
  useEffect(() => {
    const userData = localStorage.getItem("snapfin_user");
    if (!userData) {
      localStorage.setItem("snapfin_redirect", "/apply");
      navigate("/auth");
      return;
    }
    const user = JSON.parse(userData);
    if (!user.isLoggedIn) {
      localStorage.setItem("snapfin_redirect", "/apply");
      navigate("/auth");
    }
  }, [navigate]);

  const updateForm = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSaveDraft = async () => {
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    localStorage.setItem("snapfin_application_draft", JSON.stringify(formData));
    localStorage.setItem("snapfin_application_step", currentStep.toString());
    setIsSaving(false);
    toast({
      title: "Draft Saved",
      description: "Your application progress has been saved.",
    });
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    // Clear draft on successful submission
    localStorage.removeItem("snapfin_application_draft");
    localStorage.removeItem("snapfin_application_step");
    
    // Save to applications list
    const applications = JSON.parse(localStorage.getItem("snapfin_applications") || "[]");
    const newApplication = {
      id: `SNAP-${Date.now()}`,
      type: loanTypes.find(l => l.value === formData.loanType)?.label || "Personal Loan",
      amount: formData.loanAmount,
      status: "Under Review",
      date: new Date().toISOString(),
    };
    applications.push(newApplication);
    localStorage.setItem("snapfin_applications", JSON.stringify(applications));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="max-w-md text-center">
          <div className="w-20 h-20 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-6 animate-scale-in">
            <Check className="w-10 h-10 text-secondary" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-4 animate-fade-up">
            Application Submitted!
          </h1>
          <p className="text-lg text-muted-foreground mb-2 animate-fade-up delay-100">
            Your application ID: <strong className="text-foreground">SNAP-{Date.now()}</strong>
          </p>
          <p className="text-muted-foreground mb-8 animate-fade-up delay-200">
            We'll review your application and contact you within 24 hours.
          </p>
          <Button variant="hero" size="lg" asChild className="animate-fade-up delay-300">
            <Link to="/">
              <Home className="w-5 h-5 mr-2" />
              Back to Home
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="container-snapfin py-4 flex items-center justify-between">
          <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <Home className="w-4 h-4" />
            Back to Home
          </Link>
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleSaveDraft}
              disabled={isSaving}
            >
              <Save className="w-4 h-4 mr-2" />
              {isSaving ? "Saving..." : "Save Draft"}
            </Button>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Shield className="w-4 h-4 text-secondary" />
              Secure Application
            </div>
          </div>
        </div>
      </header>

      <main className="py-8 lg:py-12">
        <div className="container-snapfin">
          <div className="max-w-3xl mx-auto">
            {/* Page Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
                Loan Application
              </h1>
              <p className="text-muted-foreground">
                Complete the form below — takes about 5 minutes
              </p>
            </div>

            {/* Stepper */}
            <div className="mb-8">
              <Stepper steps={steps} currentStep={currentStep} />
            </div>

            {/* Form Card */}
            <div className="bg-card rounded-2xl border border-border shadow-snapfin-lg p-6 sm:p-8">
              {/* Step 1: Personal Info */}
              {currentStep === 0 && (
                <StepperContent>
                  <h2 className="text-xl font-semibold text-foreground mb-6">
                    Personal Information
                  </h2>
                  <div className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-6">
                      <FormInput
                        label="First Name"
                        required
                        placeholder="Arjun"
                        value={formData.firstName}
                        onChange={(e) => updateForm("firstName", e.target.value)}
                      />
                      <FormInput
                        label="Last Name"
                        required
                        placeholder="Sharma"
                        value={formData.lastName}
                        onChange={(e) => updateForm("lastName", e.target.value)}
                      />
                    </div>
                    <FormInput
                      label="Email Address"
                      required
                      type="email"
                      placeholder="arjun.sharma@email.com"
                      value={formData.email}
                      onChange={(e) => updateForm("email", e.target.value)}
                    />
                    <div className="grid sm:grid-cols-2 gap-6">
                      <FormInput
                        label="Mobile Number"
                        required
                        type="tel"
                        placeholder="10-digit number"
                        value={formData.phone}
                        onChange={(e) => updateForm("phone", e.target.value.replace(/\D/g, "").slice(0, 10))}
                      />
                      <FormInput
                        label="Date of Birth"
                        required
                        type="date"
                        value={formData.dob}
                        onChange={(e) => updateForm("dob", e.target.value)}
                      />
                    </div>
                  </div>
                </StepperContent>
              )}

              {/* Step 2: Identity */}
              {currentStep === 1 && (
                <StepperContent>
                  <h2 className="text-xl font-semibold text-foreground mb-6">
                    Identity Verification
                  </h2>
                  <AlertBanner variant="info" className="mb-6">
                    Your KYC details are encrypted and stored securely. We use bank-level security.
                  </AlertBanner>
                  <div className="space-y-6">
                    <FormInput
                      label="PAN Number"
                      required
                      placeholder="ABCDE1234F"
                      value={formData.pan}
                      onChange={(e) => updateForm("pan", e.target.value.toUpperCase().slice(0, 10))}
                      helperText="10-character alphanumeric PAN"
                    />
                    <FormInput
                      label="Aadhaar Number"
                      required
                      placeholder="1234 5678 9012"
                      value={formData.aadhaar}
                      onChange={(e) => updateForm("aadhaar", e.target.value.replace(/\D/g, "").slice(0, 12))}
                      helperText="12-digit Aadhaar number"
                    />
                    <div className="p-4 border-2 border-dashed border-border rounded-xl text-center">
                      <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground mb-2">
                        Upload PAN Card (Optional)
                      </p>
                      <Button variant="outline" size="sm">
                        Choose File
                      </Button>
                    </div>
                  </div>
                </StepperContent>
              )}

              {/* Step 3: Employment */}
              {currentStep === 2 && (
                <StepperContent>
                  <h2 className="text-xl font-semibold text-foreground mb-6">
                    Employment & Loan Details
                  </h2>
                  <div className="space-y-6">
                    <FormSelect
                      label="Employment Type"
                      required
                      options={[
                        { value: "salaried", label: "Salaried" },
                        { value: "self-employed", label: "Self-Employed" },
                        { value: "business", label: "Business Owner" },
                      ]}
                      placeholder="Select type"
                      value={formData.employmentType}
                      onChange={(e) => updateForm("employmentType", e.target.value)}
                    />
                    <FormInput
                      label="Company/Business Name"
                      placeholder="Company name"
                      value={formData.companyName}
                      onChange={(e) => updateForm("companyName", e.target.value)}
                    />
                    <FormInput
                      label="Monthly Income"
                      required
                      placeholder="e.g., 75,000"
                      value={formData.monthlyIncome}
                      onChange={(e) => updateForm("monthlyIncome", e.target.value)}
                      helperText="Net monthly income in ₹"
                    />
                    <div className="grid sm:grid-cols-2 gap-6">
                      <FormSelect
                        label="Loan Type"
                        required
                        options={loanTypes}
                        placeholder="Select loan"
                        value={formData.loanType}
                        onChange={(e) => updateForm("loanType", e.target.value)}
                      />
                      <FormInput
                        label="Loan Amount"
                        required
                        placeholder="e.g., 5,00,000"
                        value={formData.loanAmount}
                        onChange={(e) => updateForm("loanAmount", e.target.value)}
                      />
                    </div>
                  </div>
                </StepperContent>
              )}

              {/* Step 4: Review */}
              {currentStep === 3 && (
                <StepperContent>
                  <h2 className="text-xl font-semibold text-foreground mb-6">
                    Review Your Application
                  </h2>
                  <div className="space-y-6">
                    {/* Summary */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="p-4 bg-muted/50 rounded-xl">
                        <p className="text-sm text-muted-foreground mb-1">Full Name</p>
                        <p className="font-medium text-foreground">{formData.firstName} {formData.lastName}</p>
                      </div>
                      <div className="p-4 bg-muted/50 rounded-xl">
                        <p className="text-sm text-muted-foreground mb-1">Email</p>
                        <p className="font-medium text-foreground">{formData.email}</p>
                      </div>
                      <div className="p-4 bg-muted/50 rounded-xl">
                        <p className="text-sm text-muted-foreground mb-1">Mobile</p>
                        <p className="font-medium text-foreground">{formData.phone}</p>
                      </div>
                      <div className="p-4 bg-muted/50 rounded-xl">
                        <p className="text-sm text-muted-foreground mb-1">PAN</p>
                        <p className="font-medium text-foreground">{formData.pan}</p>
                      </div>
                      <div className="p-4 bg-muted/50 rounded-xl">
                        <p className="text-sm text-muted-foreground mb-1">Loan Type</p>
                        <p className="font-medium text-foreground">{loanTypes.find(l => l.value === formData.loanType)?.label || "-"}</p>
                      </div>
                      <div className="p-4 bg-muted/50 rounded-xl">
                        <p className="text-sm text-muted-foreground mb-1">Loan Amount</p>
                        <p className="font-medium text-foreground">₹{formData.loanAmount}</p>
                      </div>
                    </div>

                    <FormCheckbox
                      checked={formData.termsAccepted}
                      onCheckedChange={(checked) => updateForm("termsAccepted", checked as boolean)}
                      label={
                        <>
                          I confirm that the information provided is accurate and I agree to the{" "}
                          <a href="#terms" className="text-secondary hover:underline">Terms</a>
                          {" "}and{" "}
                          <a href="#privacy" className="text-secondary hover:underline">Privacy Policy</a>
                        </>
                      }
                    />
                  </div>
                </StepperContent>
              )}

              {/* Navigation */}
              <div className="flex justify-between mt-8 pt-6 border-t border-border">
                <Button
                  variant="outline"
                  onClick={handleBack}
                  disabled={currentStep === 0}
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </Button>
                {currentStep < steps.length - 1 ? (
                  <Button variant="hero" onClick={handleNext}>
                    Continue
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                ) : (
                  <Button
                    variant="hero"
                    onClick={handleSubmit}
                    disabled={!formData.termsAccepted || isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Submit Application"}
                    {!isSubmitting && <ArrowRight className="w-4 h-4" />}
                  </Button>
                )}
              </div>
            </div>

            {/* Security note */}
            <div className="flex items-center justify-center gap-4 mt-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Lock className="w-4 h-4" />
                256-bit SSL
              </div>
              <div className="flex items-center gap-1">
                <Shield className="w-4 h-4" />
                PCI Compliant
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
