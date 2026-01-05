// import { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { ArrowRight, Mail, Phone, Lock, AlertCircle, Loader2, Info } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { FormInput } from "@/components/ui/form-input";
// import { FormCheckbox } from "@/components/ui/form-checkbox";
// import snapfinLogo from "@/assets/snapfin-logo.png";
// import { QueryClient, useMutation } from "@tanstack/react-query";

// type AuthMode = "login" | "signup" | "otp";

// export default function Auth() {
//   const navigate = useNavigate();
//   const [mode, setMode] = useState<AuthMode>("login");
//   const [isLoading, setIsLoading] = useState(false);
//   const [otpSent, setOtpSent] = useState(false);
//   // Form states
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [phone, setPhone] = useState("");
//   const [otp, setOtp] = useState("");
//   const [name, setName] = useState("")
//   const [rememberMe, setRememberMe] = useState(false);
//   const [acceptTerms, setAcceptTerms] = useState(false);

//   // Error states
//   const [termsError, setTermsError] = useState(false);
//   const [authError, setAuthError] = useState<string | null>(null);
//   const [fieldErrors, setFieldErrors] = useState<{ email?: string; password?: string; phone?: string }>({});




//   // Load remembered credentials on mount
//   useEffect(() => {
//     const remembered = localStorage.getItem("snapfin_remember");
//     if (remembered) {
//       const data = JSON.parse(remembered);
//       setEmail(data.email || "");
//       setRememberMe(true);
//     }
//   }, []);

//   // Clear errors when switching modes
//   useEffect(() => {
//     setAuthError(null);
//     setFieldErrors({});
//     setTermsError(false);
//   }, [mode]);

//   const validateForm = (): boolean => {
//     const errors: typeof fieldErrors = {};

//     if (mode === "login" || mode === "signup") {
//       if (!email) {
//         errors.email = "Email is required";
//       } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
//         errors.email = "Please enter a valid email address";
//       }

//       if (!password) {
//         errors.password = "Password is required";
//       } else if (password.length < 6) {
//         errors.password = "Password must be at least 6 characters";
//       }
//     }

//     if (mode === "otp" && !otpSent) {
//       if (!phone) {
//         errors.phone = "Phone number is required";
//       } else if (phone.length !== 10) {
//         errors.phone = "Please enter a valid 10-digit phone number";
//       }
//     }

//     setFieldErrors(errors);
//     return Object.keys(errors).length === 0;
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setAuthError(null);

//     // Validate form
//     if (!validateForm()) return;

//     // Validate terms acceptance for signup
//     if (mode === "signup" && !acceptTerms) {
//       setTermsError(true);
//       return;
//     }

//     setTermsError(false);
//     setIsLoading(true);

//     // Simulate API call
//     await new Promise((resolve) => setTimeout(resolve, 1500));

//     // Simulate validation (for demo - check for specific test credentials)
//     if (mode === "login") {
//       const existingUser = localStorage.getItem("snapfin_user");
//       if (existingUser) {
//         const userData = JSON.parse(existingUser);
//         if (userData.email !== email) {
//           setIsLoading(false);
//           setAuthError("No account found with this email. Please sign up.");
//           return;
//         }
//       }
//     }

//     if (mode === "otp" && !otpSent) {
//       setOtpSent(true);
//       setIsLoading(false);
//       return;
//     }

//     if (mode === "otp" && otpSent && otp.length !== 6) {
//       setIsLoading(false);
//       setAuthError("Please enter a valid 6-digit OTP");
//       return;
//     }

//     // Handle Remember Me
//     if (rememberMe && mode === "login") {
//       localStorage.setItem("snapfin_remember", JSON.stringify({ email }));
//     } else {
//       localStorage.removeItem("snapfin_remember");
//     }

//     // Save user data to localStorage
//     const userData = {
//       name: mode === "signup" ? name : (localStorage.getItem("snapfin_user") ? JSON.parse(localStorage.getItem("snapfin_user")!).name : email.split("@")[0]),
//       email: mode === "otp" ? `user${phone}@snapfin.com` : email,
//       phone: mode === "otp" ? phone : "",
//       isLoggedIn: true,
//       lastLogin: new Date().toISOString()
//     };
//     localStorage.setItem("snapfin_user", JSON.stringify(userData));

//     setIsLoading(false);

//     // Check for redirect intent
//     const redirectTo = localStorage.getItem("snapfin_redirect");
//     if (redirectTo) {
//       localStorage.removeItem("snapfin_redirect");
//       navigate(redirectTo);
//     } else {
//       navigate("/dashboard");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-background flex">
//       {/* Left: Form */}
//       <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
//         <div className="w-full max-w-md">
//           {/* Logo - Links to Home */}
//           <Link to="/" className="inline-flex items-center gap-2 mb-8">
//             <img src={snapfinLogo} alt="Snapfin" className="h-10 w-auto" />
//           </Link>

//           {/* Header */}
//           <div className="mb-8">
//             <h1 className="text-3xl font-bold text-foreground mb-2">
//               {mode === "login" && "Welcome back"}
//               {mode === "signup" && "Create account"}
//               {mode === "otp" && "Sign in with OTP"}
//             </h1>
//             <p className="text-muted-foreground">
//               {mode === "login" && "Sign in to access your dashboard"}
//               {mode === "signup" && "Start your loan journey today"}
//               {mode === "otp" && "We'll send a code to your phone"}
//             </p>
//           </div>

//           {/* Auth Error Alert */}
//           {authError && (
//             <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-xl flex items-start gap-3 animate-fade-in">
//               <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
//               <div>
//                 <p className="text-sm font-medium text-destructive">{authError}</p>
//               </div>
//             </div>
//           )}

//           {/* Auth Mode Tabs */}
//           <div className="flex gap-2 mb-6 p-1 bg-muted rounded-xl">
//             <button
//               onClick={() => { setMode("login"); setOtpSent(false); }}
//               className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all ${mode === "login" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
//                 }`}
//             >
//               Email
//             </button>
//             <button
//               onClick={() => { setMode("otp"); setOtpSent(false); }}
//               className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all ${mode === "otp" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
//                 }`}
//             >
//               OTP
//             </button>
//           </div>

//           {/* Forms */}
//           <form onSubmit={handleSubmit} className="space-y-5">
//             {/* Signup Name */}
//             {mode === "signup" && (
//               <div className="grid grid-cols-2 gap-4">

//                 <FormInput
//                   label="First Name"
//                   required
//                   placeholder="Priya"
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                 />
//                 <FormInput
//                   label="Last Name"
//                   required
//                   placeholder="Verma"
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                 />
//               </div>

//             )}
//             {mode === "signup" && (
//               <FormInput
//                 label="Mobile number"
//                 required
//                 placeholder="XXXXXXX798"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//               />
//             )}
//             {/* Email/Password Mode */}
//             {(mode === "login" || mode === "signup") && (
//               <>

//                 <FormInput
//                   label="Email Address"
//                   required
//                   type="email"
//                   placeholder="priya.verma@email.com"
//                   value={email}
//                   onChange={(e) => {
//                     setEmail(e.target.value);
//                     if (fieldErrors.email) setFieldErrors(prev => ({ ...prev, email: undefined }));
//                   }}
//                   error={fieldErrors.email}
//                 />
//                 <FormInput
//                   label="Password"
//                   required
//                   type="password"
//                   placeholder="Enter password"
//                   value={password}
//                   onChange={(e) => {
//                     setPassword(e.target.value);
//                     if (fieldErrors.password) setFieldErrors(prev => ({ ...prev, password: undefined }));
//                   }}
//                   showPasswordToggle
//                   error={fieldErrors.password}
//                   helperText={mode === "signup" ? "Must be at least 6 characters" : undefined}
//                 />
//               </>
//             )}


//             {/* OTP Mode */}
//             {mode === "otp" && (
//               <>
//                 <FormInput
//                   label="Mobile Number"
//                   required
//                   type="tel"
//                   placeholder="10-digit mobile number"
//                   value={phone}
//                   onChange={(e) => {
//                     setPhone(e.target.value.replace(/\D/g, "").slice(0, 10));
//                     if (fieldErrors.phone) setFieldErrors(prev => ({ ...prev, phone: undefined }));
//                   }}
//                   disabled={otpSent}
//                   error={fieldErrors.phone}
//                 />
//                 {otpSent && (
//                   <FormInput
//                     label="Enter OTP"
//                     required
//                     placeholder="4-digit code"
//                     value={otp}
//                     onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 4))}
//                     helperText="OTP sent to your mobile"
//                     success={otp.length === 4}
//                   />
//                 )}
//               </>
//             )}

//             {/* Remember Me / Forgot Password */}
//             {mode === "login" && (
//               <div className="space-y-3">
//                 <div className="flex items-center justify-between">
//                   <FormCheckbox
//                     checked={rememberMe}
//                     onCheckedChange={(checked) => setRememberMe(checked as boolean)}
//                     label="Remember me"
//                   />
//                   <a href="#forgot" className="text-sm text-secondary hover:underline">
//                     Forgot password?
//                   </a>
//                 </div>
//                 {/* Remember Me Helper Text */}
//                 <div className="flex items-start gap-2 p-3 bg-muted/50 rounded-lg">
//                   <Info className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" />
//                   <p className="text-xs text-muted-foreground">
//                     Enabling "Remember me" will save your email for faster login on this device. Your session will stay active for 30 days.
//                   </p>
//                 </div>
//               </div>
//             )}

//             {/* Terms for signup */}
//             {mode === "signup" && (
//               <div className="space-y-1">
//                 <FormCheckbox
//                   checked={acceptTerms}
//                   onCheckedChange={(checked) => {
//                     setAcceptTerms(checked as boolean);
//                     if (checked) setTermsError(false);
//                   }}
//                   label={
//                     <>
//                       I agree to the{" "}
//                       <a href="#terms" className="text-secondary hover:underline">Terms</a>
//                       {" "}and{" "}
//                       <a href="#privacy" className="text-secondary hover:underline">Privacy Policy</a>
//                     </>
//                   }
//                   error={termsError ? "You must accept the Terms and Privacy Policy to continue" : undefined}
//                 />
//               </div>
//             )}

//             {/* Submit */}
//             <Button
//               type="submit"
//               variant="hero"
//               size="lg"
//               className="w-full"
//               disabled={isLoading}
//             >
//               {isLoading ? (
//                 <>
//                   <Loader2 className="w-5 h-5 animate-spin" />
//                   <span className="ml-2">Please wait...</span>
//                 </>
//               ) : mode === "otp" && !otpSent ? (
//                 <>Send OTP<ArrowRight className="w-5 h-5 ml-2" /></>
//               ) : mode === "otp" && otpSent ? (
//                 <>Verify OTP<ArrowRight className="w-5 h-5 ml-2" /></>
//               ) : mode === "signup" ? (
//                 <>Create Account<ArrowRight className="w-5 h-5 ml-2" /></>
//               ) : (
//                 <>Sign In<ArrowRight className="w-5 h-5 ml-2" /></>
//               )}
//             </Button>
//           </form>

//           {/* Toggle signup/login */}
//           <p className="mt-6 text-center text-sm text-muted-foreground">
//             {mode === "signup" ? (
//               <>
//                 Already have an account?{" "}
//                 <button onClick={() => setMode("login")} className="text-secondary hover:underline font-medium">
//                   Sign in
//                 </button>
//               </>
//             ) : (
//               <>
//                 Don't have an account?{" "}
//                 <button onClick={() => setMode("signup")} className="text-secondary hover:underline font-medium">
//                   Sign up
//                 </button>
//               </>
//             )}
//           </p>

//           {/* Security Note */}
//           <div className="mt-8 pt-6 border-t border-border">
//             <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
//               <div className="flex items-center gap-1">
//                 <Lock className="w-3.5 h-3.5" />
//                 256-bit encryption
//               </div>
//               <div className="flex items-center gap-1">
//                 <Mail className="w-3.5 h-3.5" />
//                 Verified secure
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Right: Visual (hidden on mobile) */}
//       <div className="hidden lg:flex flex-1 items-center justify-center bg-gradient-to-br from-primary to-primary/80 p-12">
//         <div className="max-w-md text-center">
//           <div className="w-24 h-24 bg-secondary/20 rounded-3xl flex items-center justify-center mx-auto mb-8">
//             <Phone className="w-12 h-12 text-secondary" />
//           </div>
//           <h2 className="text-3xl font-bold text-primary-foreground mb-4">
//             Quick & Secure Access
//           </h2>
//           <p className="text-primary-foreground/80 text-lg">
//             Sign in to check your loan status, manage applications, and access exclusive offers.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }


import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Mail, Phone, Lock, AlertCircle, Loader2, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/ui/form-input";
import { FormCheckbox } from "@/components/ui/form-checkbox";
import snapfinLogo from "@/assets/snapfin-logo.png";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { useAuth } from "@/auth/AuthContext";

import api from "@/interceptor/axios";

type AuthMode = "login" | "signup" | "otp";

export default function Auth() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [mode, setMode] = useState<AuthMode>("login");
  const [isLoading, setIsLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  // Form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  // const [name, setName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobile, setMobile] = useState("");

  const [rememberMe, setRememberMe] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);

  // Error states
  const [termsError, setTermsError] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<{ email?: string; password?: string; phone?: string }>({});



  //  useEffect(() => {
  //     const token = localStorage.getItem("snapfin_token");
  //     if (token) {
  //       navigate("/dashboard", { replace: true });
  //     }
  //   }, [navigate]);

  // Load remembered credentials on mount
  useEffect(() => {
    const remembered = localStorage.getItem("snapfin_remember");
    if (remembered) {
      const data = JSON.parse(remembered);
      setEmail(data.email || "");
      setRememberMe(true);
    }
  }, []);

  // Clear errors when switching modes
  useEffect(() => {
    setAuthError(null);
    setFieldErrors({});
    setTermsError(false);
  }, [mode]);

  const signupMutation = useMutation({
    mutationFn: async () => {
      const response = await api.post(
        `/api/customer/sign-up`,
        {
          mobileNumber: mobile,
          email,
          password,
          firstName,
          lastName,
          registrationSource: "web",
        },
      );
      console.log("dataa", response.data);
      return response.data;
    },
  });

  const loginMutation = useMutation({
    mutationFn: async () => {
      const response = await api.post(
        "/api/customer/sign-in-email",
        {
          email,
          password,
        },
      );
      console.log('response123', response)
      return response.data;
    },
  });


  const validateForm = (): boolean => {
    const errors: typeof fieldErrors = {};

    if (mode === "login" || mode === "signup") {
      if (!email) {
        errors.email = "Email is required";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errors.email = "Please enter a valid email address";
      }

      if (!password) {
        errors.password = "Password is required";
      } else if (password.length < 6) {
        errors.password = "Password must be at least 6 characters";
      }
    }

    if (mode === "otp" && !otpSent) {
      if (!phone) {
        errors.phone = "Phone number is required";
      } else if (phone.length !== 10) {
        errors.phone = "Please enter a valid 10-digit phone number";
      }
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);

    // Validate form
    if (!validateForm()) return;

    // Validate terms acceptance for signup
    if (mode === "signup" && !acceptTerms) {
      setTermsError(true);
      return;
    }

    setTermsError(false);
    setIsLoading(true);

    // Simulate API call
    // await new Promise((resolve) => setTimeout(resolve, 1500));


    if (mode === "signup") {
      try {
        await signupMutation.mutateAsync();
        navigate("/dashboard");
      } catch (err: any) {
        setAuthError(err.message || "Unable to create account");
      } finally {
        setIsLoading(false);
      }
      return;
    }

    if (mode === "login") {
      try {
        setIsLoading(true);
        const data = await loginMutation.mutateAsync();

        // extract token safely
        const token = data?.data?.token;
        const account = data?.data?.account;
        if (!token) {
          throw new Error("Token not received");
        }

        // localStorage.setItem("snapfin_token", token);

        // // optional: store user
        // localStorage.setItem(
        //   "snapfin_user",
        //   JSON.stringify(data.data.account)
        // );
        login(token, account);

        //  navigate ONLY after token exists
        navigate("/dashboard");

      } catch (err: any) {
        setAuthError(
          err?.response?.data?.message || "Invalid email or password"
        );
      } finally {
        setIsLoading(false);
      }

      return;
    }


    // Simulate validation (for demo - check for specific test credentials)
    // if (mode === "login") {
    //   const existingUser = localStorage.getItem("snapfin_user");
    //   if (existingUser) {
    //     const userData = JSON.parse(existingUser);
    //     if (userData.email !== email) {
    //       setIsLoading(false);
    //       setAuthError("No account found with this email. Please sign up.");
    //       return;
    //     }
    //   }
    // }

    if (mode === "otp" && !otpSent) {
      setOtpSent(true);
      setIsLoading(false);
      return;
    }

    if (mode === "otp" && otpSent && otp.length !== 6) {
      setIsLoading(false);
      setAuthError("Please enter a valid 6-digit OTP");
      return;
    }

    // Handle Remember Me
    // if (rememberMe && mode === "login") {
    //   localStorage.setItem("snapfin_remember", JSON.stringify({ email }));
    // } else {
    //   localStorage.removeItem("snapfin_remember");
    // }

    // Save user data to localStorage
    // const userData = {
    //   name: mode === "signup" ? name : (localStorage.getItem("snapfin_user") ? JSON.parse(localStorage.getItem("snapfin_user")!).name : email.split("@")[0]),
    //   email: mode === "otp" ? `user${phone}@snapfin.com` : email,
    //   phone: mode === "otp" ? phone : "",
    //   isLoggedIn: true,
    //   lastLogin: new Date().toISOString()
    // };
    // localStorage.setItem("snapfin_user", JSON.stringify(userData));

    setIsLoading(false);

    // Check for redirect intent
    const redirectTo = localStorage.getItem("snapfin_redirect");
    if (redirectTo) {
      localStorage.removeItem("snapfin_redirect");
      navigate(redirectTo);
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left: Form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">
          {/* Logo - Links to Home */}
          <Link to="/" className="inline-flex items-center gap-2 mb-8">
            <img src={snapfinLogo} alt="Snapfin" className="h-10 w-auto" />
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

          {/* Auth Error Alert */}
          {authError && (
            <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-xl flex items-start gap-3 animate-fade-in">
              <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-destructive">{authError}</p>
              </div>
            </div>
          )}

          {/* Auth Mode Tabs */}
          <div className="flex gap-2 mb-6 p-1 bg-muted rounded-xl">
            <button
              onClick={() => { setMode("login"); setOtpSent(false); }}
              className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all ${mode === "login" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                }`}
            >
              Email
            </button>
            <button
              onClick={() => { setMode("otp"); setOtpSent(false); }}
              className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all ${mode === "otp" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                }`}
            >
              OTP
            </button>
          </div>

          {/* Forms */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Signup Name */}
            {mode === "signup" && (
              <div className="grid grid-cols-2 gap-4">

                <FormInput
                  label="First Name"
                  required
                  placeholder="Priya"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <FormInput
                  label="Last Name"
                  required
                  placeholder="Verma"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>

            )}
            {mode === "signup" && (
              <FormInput
                label="Mobile number"
                required
                placeholder="XXXXXXX798"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
              />
            )}
            {/* Email/Password Mode */}
            {(mode === "login" || mode === "signup") && (
              <>

                <FormInput
                  label="Email Address"
                  required
                  type="email"
                  placeholder="priya.verma@email.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (fieldErrors.email) setFieldErrors(prev => ({ ...prev, email: undefined }));
                  }}
                  error={fieldErrors.email}
                />
                <FormInput
                  label="Password"
                  required
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (fieldErrors.password) setFieldErrors(prev => ({ ...prev, password: undefined }));
                  }}
                  showPasswordToggle
                  error={fieldErrors.password}
                  helperText={mode === "signup" ? "Must be at least 6 characters" : undefined}
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
                  onChange={(e) => {
                    setPhone(e.target.value.replace(/\D/g, "").slice(0, 10));
                    if (fieldErrors.phone) setFieldErrors(prev => ({ ...prev, phone: undefined }));
                  }}
                  disabled={otpSent}
                  error={fieldErrors.phone}
                />
                {otpSent && (
                  <FormInput
                    label="Enter OTP"
                    required
                    placeholder="4-digit code"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 4))}
                    helperText="OTP sent to your mobile"
                    success={otp.length === 4}
                  />
                )}
              </>
            )}

            {/* Remember Me / Forgot Password */}
            {mode === "login" && (
              <div className="space-y-3">
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
                {/* Remember Me Helper Text */}
                <div className="flex items-start gap-2 p-3 bg-muted/50 rounded-lg">
                  <Info className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-muted-foreground">
                    Enabling "Remember me" will save your email for faster login on this device. Your session will stay active for 30 days.
                  </p>
                </div>
              </div>
            )}

            {/* Terms for signup */}
            {mode === "signup" && (
              <div className="space-y-1">
                <FormCheckbox
                  checked={acceptTerms}
                  onCheckedChange={(checked) => {
                    setAcceptTerms(checked as boolean);
                    if (checked) setTermsError(false);
                  }}
                  label={
                    <>
                      I agree to the{" "}
                      <a href="#terms" className="text-secondary hover:underline">Terms</a>
                      {" "}and{" "}
                      <a href="#privacy" className="text-secondary hover:underline">Privacy Policy</a>
                    </>
                  }
                  error={termsError ? "You must accept the Terms and Privacy Policy to continue" : undefined}
                />
              </div>
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
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span className="ml-2">Please wait...</span>
                </>
              ) : mode === "otp" && !otpSent ? (
                <>Send OTP<ArrowRight className="w-5 h-5 ml-2" /></>
              ) : mode === "otp" && otpSent ? (
                <>Verify OTP<ArrowRight className="w-5 h-5 ml-2" /></>
              ) : mode === "signup" ? (
                <>Create Account<ArrowRight className="w-5 h-5 ml-2" /></>
              ) : (
                <>Sign In<ArrowRight className="w-5 h-5 ml-2" /></>
              )}
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
                256-bit encryption
              </div>
              <div className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5" />
                Verified secure
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

