import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Eye, EyeOff, Mail, Phone, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/ui/form-input";
import { FormCheckbox } from "@/components/ui/form-checkbox";

type AuthMode = "login" | "signup" | "otp";

export default function Auth() {
  const [mode, setMode] = useState<AuthMode>("login");
  const [isLoading, setIsLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);

  // Form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [name, setName] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);

    if (mode === "otp" && !otpSent) {
      setOtpSent(true);
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left: Form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">
          {/* Logo */}
          <Link to="/" className="inline-flex items-center gap-2 mb-8">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xl">S</span>
            </div>
            <span className="text-2xl font-bold text-foreground">Snapfin</span>
          </Link>

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              {mode === "login" && "Welcome back"}
              {mode === "signup" && "Create account"}
              {mode === "otp" && "Sign in with OTP"}
            </h1>
            <p className="text-muted-foreground">
              {mode === "login" && "Sign in to access your dashboard"}
              {mode === "signup" && "Start your loan journey today"}
              {mode === "otp" && "We'll send a code to your phone"}
            </p>
          </div>

          {/* Auth Mode Tabs */}
          <div className="flex gap-2 mb-6 p-1 bg-muted rounded-xl">
            <button
              onClick={() => { setMode("login"); setOtpSent(false); }}
              className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all ${
                mode === "login" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Email
            </button>
            <button
              onClick={() => { setMode("otp"); setOtpSent(false); }}
              className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all ${
                mode === "otp" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              OTP
            </button>
          </div>

          {/* Forms */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Signup Name */}
            {mode === "signup" && (
              <FormInput
                label="Full Name"
                required
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            )}

            {/* Email/Password Mode */}
            {(mode === "login" || mode === "signup") && (
              <>
                <FormInput
                  label="Email Address"
                  required
                  type="email"
                  placeholder="john@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <FormInput
                  label="Password"
                  required
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  showPasswordToggle
                />
              </>
            )}

            {/* OTP Mode */}
            {mode === "otp" && (
              <>
                <FormInput
                  label="Mobile Number"
                  required
                  type="tel"
                  placeholder="10-digit mobile number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                  disabled={otpSent}
                />
                {otpSent && (
                  <FormInput
                    label="Enter OTP"
                    required
                    placeholder="6-digit code"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                    helperText="OTP sent to your mobile"
                  />
                )}
              </>
            )}

            {/* Remember Me / Forgot Password */}
            {mode === "login" && (
              <div className="flex items-center justify-between">
                <FormCheckbox
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                  label="Remember me"
                />
                <a href="#forgot" className="text-sm text-secondary hover:underline">
                  Forgot password?
                </a>
              </div>
            )}

            {/* Terms for signup */}
            {mode === "signup" && (
              <FormCheckbox
                checked={acceptTerms}
                onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
                label={
                  <>
                    I agree to the{" "}
                    <a href="#terms" className="text-secondary hover:underline">Terms</a>
                    {" "}and{" "}
                    <a href="#privacy" className="text-secondary hover:underline">Privacy Policy</a>
                  </>
                }
              />
            )}

            {/* Submit */}
            <Button
              type="submit"
              variant="hero"
              size="lg"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? (
                "Please wait..."
              ) : mode === "otp" && !otpSent ? (
                "Send OTP"
              ) : mode === "otp" && otpSent ? (
                "Verify OTP"
              ) : mode === "signup" ? (
                "Create Account"
              ) : (
                "Sign In"
              )}
              {!isLoading && <ArrowRight className="w-5 h-5" />}
            </Button>
          </form>

          {/* Toggle signup/login */}
          <p className="mt-6 text-center text-sm text-muted-foreground">
            {mode === "signup" ? (
              <>
                Already have an account?{" "}
                <button onClick={() => setMode("login")} className="text-secondary hover:underline font-medium">
                  Sign in
                </button>
              </>
            ) : (
              <>
                Don't have an account?{" "}
                <button onClick={() => setMode("signup")} className="text-secondary hover:underline font-medium">
                  Sign up
                </button>
              </>
            )}
          </p>

          {/* Security Note */}
          <div className="mt-8 pt-6 border-t border-border">
            <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Lock className="w-3.5 h-3.5" />
                Secure login
              </div>
              <div className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5" />
                Verified
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right: Visual (hidden on mobile) */}
      <div className="hidden lg:flex flex-1 items-center justify-center bg-gradient-to-br from-primary to-primary/80 p-12">
        <div className="max-w-md text-center">
          <div className="w-24 h-24 bg-secondary/20 rounded-3xl flex items-center justify-center mx-auto mb-8">
            <Phone className="w-12 h-12 text-secondary" />
          </div>
          <h2 className="text-3xl font-bold text-primary-foreground mb-4">
            Quick & Secure Access
          </h2>
          <p className="text-primary-foreground/80 text-lg">
            Sign in to check your loan status, manage applications, and access exclusive offers.
          </p>
        </div>
      </div>
    </div>
  );
}
