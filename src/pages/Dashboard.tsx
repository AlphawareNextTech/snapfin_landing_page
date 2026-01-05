import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Home, FileText, PlusCircle, Calculator, Settings, LogOut, User, CreditCard, TrendingUp, Clock, CheckCircle2, AlertCircle, ChevronRight, Bell, Search, Sparkles, Building2, IndianRupee, Calendar, Eye, Download, Menu, X, ChevronDown, Shield, Smartphone, Moon, Globe, HelpCircle, Lock, Mail, Phone, ToggleLeft, ToggleRight, ExternalLink, Monitor, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/ui/form-input";
import snapfinLogo from "@/assets/snapfin-logo.png";
interface LoanApplication {
  id: string;
  type: string;
  amount: string;
  status: "pending" | "approved" | "rejected" | "in-review";
  date: string;
  lender?: string;
}
interface UserProfile {
  name: string;
  email: string;
  phone: string;
  gstin?: string;
  panNumber?: string;
  age?: string;
  avatar?: string;
  lastLogin?: string;
}
interface UserSettings {
  emailNotifications: boolean;
  smsNotifications: boolean;
  pushNotifications: boolean;
  marketingEmails: boolean;
  darkMode: boolean;
  language: string;
  twoFactorEnabled: boolean;
}
export default function Dashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showAppBanner, setShowAppBanner] = useState(true);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");

  // Load user data from localStorage
  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    const savedUser = localStorage.getItem("snapfin_user");
    if (savedUser) {
      const parsed = JSON.parse(savedUser);
      return {
        name: parsed.name || "Guest User",
        email: parsed.email || "",
        phone: parsed.phone || "",
        gstin: parsed.gstin || "",
        panNumber: parsed.panNumber || "",
        age: parsed.age || "",
        lastLogin: parsed.lastLogin || new Date().toISOString()
      };
    }
    return {
      name: "Guest User",
      email: "",
      phone: "",
      gstin: "",
      panNumber: "",
      age: "",
      lastLogin: new Date().toISOString()
    };
  });

  // User settings state
  const [userSettings, setUserSettings] = useState<UserSettings>(() => {
    const savedSettings = localStorage.getItem("snapfin_settings");
    if (savedSettings) {
      return JSON.parse(savedSettings);
    }
    return {
      emailNotifications: true,
      smsNotifications: true,
      pushNotifications: false,
      marketingEmails: false,
      darkMode: false,
      language: "English",
      twoFactorEnabled: false
    };
  });

  // Check if app banner was dismissed
  useEffect(() => {
    const dismissed = localStorage.getItem("snapfin_app_banner_dismissed");
    if (dismissed) setShowAppBanner(false);
  }, []);

  // Load applications from localStorage (starts empty)
  const [applications, setApplications] = useState<LoanApplication[]>(() => {
    const savedApps = localStorage.getItem("snapfin_applications");
    return savedApps ? JSON.parse(savedApps) : [];
  });

  // Check if user is logged in
  // useEffect(() => {
  //   const savedUser = localStorage.getItem("snapfin_user");
  //   if (!savedUser || !JSON.parse(savedUser).isLoggedIn) {
  //     navigate("/auth");
  //   }
  // }, [navigate]);

  // Get greeting based on time of day
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };
  const getFirstName = () => {
    const firstName = userProfile.name.split(" ")[0];
    return firstName || "there";
  };

  // EMI Calculator State
  const [emiData, setEmiData] = useState({
    principal: "500000",
    rate: "10.5",
    tenure: "36"
  });
  const calculateEMI = () => {
    const P = parseFloat(emiData.principal) || 0;
    const r = (parseFloat(emiData.rate) || 0) / 12 / 100;
    const n = parseFloat(emiData.tenure) || 1;
    if (r === 0) return {
      emi: (P / n).toFixed(0),
      totalInterest: "0",
      totalPayment: P.toFixed(0)
    };
    const emi = P * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
    const totalPayment = emi * n;
    const totalInterest = totalPayment - P;
    return {
      emi: emi.toFixed(0),
      totalInterest: totalInterest.toFixed(0),
      totalPayment: totalPayment.toFixed(0)
    };
  };
  const emiResult = calculateEMI();
  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-700 border-green-200";
      case "rejected":
        return "bg-red-100 text-red-700 border-red-200";
      case "in-review":
        return "bg-blue-100 text-blue-700 border-blue-200";
      default:
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
    }
  };
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle2 className="w-4 h-4" />;
      case "rejected":
        return <AlertCircle className="w-4 h-4" />;
      case "in-review":
        return <Clock className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };
  const sidebarItems = [{
    id: "overview",
    icon: Home,
    label: "Overview"
  }, {
    id: "applications",
    icon: FileText,
    label: "My Applications"
  }, {
    id: "new-application",
    icon: PlusCircle,
    label: "New Application"
  }, {
    id: "cibil",
    icon: CreditCard,
    label: "CIBIL Score"
  }, {
    id: "emi-calculator",
    icon: Calculator,
    label: "EMI Calculator"
  }, {
    id: "settings",
    icon: Settings,
    label: "Settings"
  }];
  const handleLogout = () => {
    localStorage.removeItem("snapfin_token");
    localStorage.removeItem("snapfin_user");
    navigate("/");
  };
  const dismissAppBanner = () => {
    setShowAppBanner(false);
    localStorage.setItem("snapfin_app_banner_dismissed", "true");
  };
  const handleSaveProfile = async () => {
    setSaveStatus("saving");
    await new Promise(resolve => setTimeout(resolve, 800));
    const existingData = JSON.parse(localStorage.getItem("snapfin_user") || "{}");
    localStorage.setItem("snapfin_user", JSON.stringify({
      ...existingData,
      ...userProfile,
      isLoggedIn: true
    }));
    setSaveStatus("saved");
    setTimeout(() => setSaveStatus("idle"), 2000);
  };
  const handleSaveSettings = async () => {
    setSaveStatus("saving");
    await new Promise(resolve => setTimeout(resolve, 500));
    localStorage.setItem("snapfin_settings", JSON.stringify(userSettings));
    setSaveStatus("saved");
    setTimeout(() => setSaveStatus("idle"), 2000);
  };
  const toggleSetting = (key: keyof UserSettings) => {
    setUserSettings(prev => {
      const updated = {
        ...prev,
        [key]: !prev[key]
      };
      localStorage.setItem("snapfin_settings", JSON.stringify(updated));
      return updated;
    });
  };
  const formatLastLogin = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };
  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return <div className="space-y-6">
            {/* App Download Banner */}
            {showAppBanner && <div className="bg-gradient-to-r from-secondary/10 via-primary/10 to-accent/10 border border-secondary/20 rounded-2xl p-4 md:p-6 flex flex-col md:flex-row items-center justify-between gap-4 animate-fade-in">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-secondary to-primary flex items-center justify-center">
                    <Smartphone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Get the SnapFin App</h3>
                    <p className="text-sm text-muted-foreground">Manage your loans on the go with our mobile app</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <a href="#" className="hover:opacity-80 transition-opacity">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play" className="h-10" />
                  </a>
                  <a href="#" className="hover:opacity-80 transition-opacity">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" alt="App Store" className="h-10" />
                  </a>
                  <button onClick={dismissAppBanner} className="ml-2 p-2 hover:bg-muted rounded-lg transition-colors">
                    <X className="w-4 h-4 text-muted-foreground" />
                  </button>
                </div>
              </div>}

            {/* Welcome Section */}
            <div className="bg-gradient-to-br from-primary via-primary to-secondary rounded-2xl p-6 md:p-8 text-primary-foreground relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMC41IiBzdHJva2Utb3BhY2l0eT0iMC4xIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30" />
              <div className="relative">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-5 h-5 text-accent" />
                  <span className="text-sm text-primary-foreground/80">Welcome back!</span>
                </div>
                <h1 className="text-2xl md:text-3xl font-bold mb-2">Hello, {getFirstName()}!</h1>
                <p className="text-primary-foreground/80 mb-6">Ready to explore your financial options?</p>
                <Button variant="gold" size="lg" onClick={() => setActiveTab("new-application")}>
                  <PlusCircle className="w-5 h-5 mr-2" />
                  Apply for a New Loan
                </Button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[{
              icon: FileText,
              label: "Total Applications",
              value: applications.length.toString(),
              color: "bg-blue-100 text-blue-600"
            }, {
              icon: CheckCircle2,
              label: "Approved",
              value: applications.filter(a => a.status === "approved").length.toString(),
              color: "bg-green-100 text-green-600"
            }, {
              icon: Clock,
              label: "Pending",
              value: applications.filter(a => a.status === "pending" || a.status === "in-review").length.toString(),
              color: "bg-yellow-100 text-yellow-600"
            }, {
              icon: TrendingUp,
              label: "CIBIL Score",
              value: "Check",
              color: "bg-purple-100 text-purple-600"
            }].map((stat, i) => <div key={i} className="bg-card rounded-xl border border-border p-4 hover:shadow-snapfin-md transition-shadow">
                  <div className={`w-10 h-10 rounded-lg ${stat.color} flex items-center justify-center mb-3`}>
                    <stat.icon className="w-5 h-5" />
                  </div>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>)}
            </div>

            {/* Recent Applications */}
            <div className="bg-card rounded-xl border border-border p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-foreground">Recent Applications</h2>
                {applications.length > 0 && <Button variant="ghost" size="sm" onClick={() => setActiveTab("applications")}>
                    View All <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>}
              </div>
              {applications.length === 0 ? <div className="text-center py-8">
                  <FileText className="w-12 h-12 text-muted-foreground/50 mx-auto mb-3" />
                  <p className="text-muted-foreground mb-4">No applications yet</p>
                  <Button variant="hero" size="sm" onClick={() => setActiveTab("new-application")}>
                    <PlusCircle className="w-4 h-4 mr-2" />
                    Apply for Your First Loan
                  </Button>
                </div> : <div className="space-y-3">
                  {applications.slice(0, 3).map(app => <div key={app.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                          <FileText className="w-5 h-5 text-secondary" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{app.type}</p>
                          <p className="text-sm text-muted-foreground">₹{app.amount}</p>
                        </div>
                      </div>
                      <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-medium ${getStatusColor(app.status)}`}>
                        {getStatusIcon(app.status)}
                        {app.status.charAt(0).toUpperCase() + app.status.slice(1).replace("-", " ")}
                      </div>
                    </div>)}
                </div>}
            </div>

            {/* Quick Actions */}
            <div className="grid md:grid-cols-3 gap-4">
              {[{
              icon: CreditCard,
              title: "Check CIBIL Score",
              desc: "Free credit score check",
              action: () => setActiveTab("cibil"),
              color: "from-blue-500 to-purple-500"
            }, {
              icon: Calculator,
              title: "EMI Calculator",
              desc: "Plan your repayments",
              action: () => setActiveTab("emi-calculator"),
              color: "from-green-500 to-teal-500"
            }, {
              icon: User,
              title: "Update Profile",
              desc: "Keep your info current",
              action: () => setActiveTab("settings"),
              color: "from-orange-500 to-red-500"
            }].map((item, i) => <button key={i} onClick={item.action} className="bg-card rounded-xl border border-border p-5 text-left hover:shadow-snapfin-lg transition-all group">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </button>)}
            </div>
          </div>;
      case "applications":
        return <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-foreground">My Applications</h1>
              <Button variant="hero" onClick={() => setActiveTab("new-application")}>
                <PlusCircle className="w-4 h-4 mr-2" />
                New Application
              </Button>
            </div>

            {applications.length === 0 ? <div className="bg-card rounded-xl border border-border p-12 text-center">
                <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h2 className="text-xl font-semibold text-foreground mb-2">No Applications Yet</h2>
                <p className="text-muted-foreground mb-6">Start your financial journey by applying for a loan</p>
                <Button variant="hero" onClick={() => setActiveTab("new-application")}>
                  Apply for Your First Loan
                </Button>
              </div> : <div className="space-y-4">
                {applications.map(app => <div key={app.id} className="bg-card rounded-xl border border-border p-6 hover:shadow-snapfin-md transition-shadow">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center">
                          <FileText className="w-6 h-6 text-secondary" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-foreground">{app.type}</h3>
                            <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full border text-xs font-medium ${getStatusColor(app.status)}`}>
                              {getStatusIcon(app.status)}
                              {app.status.charAt(0).toUpperCase() + app.status.slice(1).replace("-", " ")}
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground">Application ID: {app.id}</p>
                          <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <IndianRupee className="w-4 h-4" />
                              {app.amount}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {app.date}
                            </span>
                            {app.lender && <span className="flex items-center gap-1">
                                <Building2 className="w-4 h-4" />
                                {app.lender}
                              </span>}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-1" />
                          View Details
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>)}
              </div>}
          </div>;
      case "new-application":
        return <div className="space-y-6">
            <h1 className="text-2xl font-bold text-foreground">Start New Loan Application</h1>
            <p className="text-muted-foreground">Choose a loan type to begin your application</p>
            
            <div className="grid md:grid-cols-3 gap-6">
              {[{
              type: "Personal Loan",
              amount: "Up to ₹25 Lakhs",
              rate: "10.5% onwards",
              icon: User,
              features: ["No collateral", "Quick approval", "Flexible tenure"]
            }, {
              type: "Business Loan",
              amount: "Up to ₹50 Lakhs",
              rate: "12% onwards",
              icon: Building2,
              features: ["Working capital", "Business expansion", "Equipment financing"]
            }, {
              type: "Loan Against Property",
              amount: "Up to ₹5 Crores",
              rate: "9% onwards",
              icon: Home,
              features: ["Lower interest", "Higher amount", "Longer tenure"]
            }].map((loan, i) => <div key={i} className="bg-card rounded-xl border border-border p-6 hover:shadow-snapfin-lg hover:border-secondary/50 transition-all group cursor-pointer">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-secondary to-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <loan.icon className="w-7 h-7 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">{loan.type}</h3>
                  <p className="text-2xl font-bold text-secondary mb-1">{loan.amount}</p>
                  <p className="text-sm text-muted-foreground mb-4">Interest: {loan.rate}</p>
                  <ul className="space-y-2 mb-6">
                    {loan.features.map((f, j) => <li key={j} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="w-4 h-4 text-secondary" />
                        {f}
                      </li>)}
                  </ul>
                  <Button variant="hero" className="w-full" asChild>
                    <Link to="/apply">Apply Now</Link>
                  </Button>
                </div>)}
            </div>
          </div>;
      case "cibil":
        return <div className="space-y-6">
            <h1 className="text-2xl font-bold text-foreground">CIBIL Score</h1>
            
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="bg-card rounded-xl border border-border p-8">
                <div className="text-center">
                  <div className="relative w-48 h-48 mx-auto mb-6">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="45" fill="none" stroke="hsl(var(--muted))" strokeWidth="10" />
                      <circle cx="50" cy="50" r="45" fill="none" stroke="hsl(var(--secondary))" strokeWidth="10" strokeLinecap="round" strokeDasharray={`${745 / 900 * 283} 283`} />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-4xl font-bold text-foreground">745</span>
                      <span className="text-sm text-muted-foreground">Good</span>
                    </div>
                  </div>
                  <div className="flex justify-center gap-4 text-sm">
                    <span className="text-muted-foreground">300 Poor</span>
                    <span className="text-muted-foreground">→</span>
                    <span className="text-muted-foreground">900 Excellent</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-card rounded-xl border border-border p-6">
                <h3 className="font-semibold text-foreground mb-4">Score Breakdown</h3>
                <div className="space-y-4">
                  {[{
                  label: "Payment History",
                  value: 85,
                  color: "bg-green-500"
                }, {
                  label: "Credit Utilization",
                  value: 70,
                  color: "bg-blue-500"
                }, {
                  label: "Credit Age",
                  value: 60,
                  color: "bg-yellow-500"
                }, {
                  label: "Account Mix",
                  value: 75,
                  color: "bg-purple-500"
                }, {
                  label: "Recent Inquiries",
                  value: 90,
                  color: "bg-teal-500"
                }].map((item, i) => <div key={i}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-muted-foreground">{item.label}</span>
                        <span className="font-medium text-foreground">{item.value}%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div className={`h-full ${item.color} rounded-full`} style={{
                      width: `${item.value}%`
                    }} />
                      </div>
                    </div>)}
                </div>
                <Button variant="outline" className="w-full mt-6" asChild>
                  <Link to="/cibil-score">Get Full Report</Link>
                </Button>
              </div>
            </div>
          </div>;
      case "emi-calculator":
        return <div className="space-y-6">
            <h1 className="text-2xl font-bold text-foreground">EMI Calculator</h1>
            
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="bg-card rounded-xl border border-border p-6">
                <h3 className="font-semibold text-foreground mb-6">Calculate Your EMI</h3>
                <div className="space-y-5">
                  <FormInput label="Loan Amount (₹)" value={emiData.principal} onChange={e => setEmiData(prev => ({
                  ...prev,
                  principal: e.target.value.replace(/\D/g, "")
                }))} placeholder="e.g., 500000" />
                  <FormInput label="Interest Rate (% per annum)" value={emiData.rate} onChange={e => setEmiData(prev => ({
                  ...prev,
                  rate: e.target.value
                }))} placeholder="e.g., 10.5" />
                  <FormInput label="Loan Tenure (months)" value={emiData.tenure} onChange={e => setEmiData(prev => ({
                  ...prev,
                  tenure: e.target.value.replace(/\D/g, "")
                }))} placeholder="e.g., 36" />
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-primary via-primary to-secondary rounded-xl p-6 text-primary-foreground">
                <h3 className="font-semibold mb-6">EMI Breakdown</h3>
                <div className="space-y-6">
                  <div className="text-center p-6 bg-primary-foreground/10 rounded-xl">
                    <p className="text-sm text-primary-foreground/70 mb-1">Monthly EMI</p>
                    <p className="text-4xl font-bold">₹{parseInt(emiResult.emi).toLocaleString("en-IN")}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-primary-foreground/10 rounded-xl">
                      <p className="text-sm text-primary-foreground/70 mb-1">Principal Amount</p>
                      <p className="text-xl font-semibold">₹{parseInt(emiData.principal || "0").toLocaleString("en-IN")}</p>
                    </div>
                    <div className="p-4 bg-primary-foreground/10 rounded-xl">
                      <p className="text-sm text-primary-foreground/70 mb-1">Total Interest</p>
                      <p className="text-xl font-semibold">₹{parseInt(emiResult.totalInterest).toLocaleString("en-IN")}</p>
                    </div>
                  </div>
                  <div className="p-4 bg-primary-foreground/10 rounded-xl">
                    <p className="text-sm text-primary-foreground/70 mb-1">Total Payment</p>
                    <p className="text-2xl font-bold">₹{parseInt(emiResult.totalPayment).toLocaleString("en-IN")}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>;
      case "settings":
        return <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-foreground">Account Settings</h1>
              {saveStatus === "saved" && <span className="flex items-center gap-2 text-sm text-green-600 animate-fade-in">
                  <CheckCircle2 className="w-4 h-4" />
                  Changes saved
                </span>}
            </div>

            {/* Profile Section */}
            <div className="bg-card rounded-xl border border-border overflow-hidden">
              <div className="p-4 bg-muted/50 border-b border-border">
                <div className="flex items-center gap-2">
                  <User className="w-5 h-5 text-muted-foreground" />
                  <h2 className="font-semibold text-foreground">Profile & Personal Information</h2>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-6 mb-8 pb-6 border-b border-border">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-secondary to-primary flex items-center justify-center text-2xl font-bold text-primary-foreground">
                    {userProfile.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground">{userProfile.name}</h3>
                    <p className="text-muted-foreground">{userProfile.email}</p>
                    <Button variant="outline" size="sm" className="mt-2">
                      Change Photo
                    </Button>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <FormInput label="Full Name" value={userProfile.name} onChange={e => setUserProfile(prev => ({
                  ...prev,
                  name: e.target.value
                }))} />
                  <FormInput label="Email Address" type="email" value={userProfile.email} onChange={e => setUserProfile(prev => ({
                  ...prev,
                  email: e.target.value
                }))} />
                  <FormInput label="Phone Number" value={userProfile.phone} onChange={e => setUserProfile(prev => ({
                  ...prev,
                  phone: e.target.value
                }))} />
                  <FormInput label="Age" value={userProfile.age || ""} onChange={e => setUserProfile(prev => ({
                  ...prev,
                  age: e.target.value
                }))} />
                  <FormInput label="PAN Number" value={userProfile.panNumber || ""} onChange={e => setUserProfile(prev => ({
                  ...prev,
                  panNumber: e.target.value.toUpperCase()
                }))} />
                  <FormInput label="GSTIN (Optional)" value={userProfile.gstin || ""} onChange={e => setUserProfile(prev => ({
                  ...prev,
                  gstin: e.target.value.toUpperCase()
                }))} />
                </div>
                
                <div className="flex justify-end gap-4 mt-6">
                  <Button variant="outline" onClick={() => {
                  const savedUser = localStorage.getItem("snapfin_user");
                  if (savedUser) setUserProfile(JSON.parse(savedUser));
                }}>
                    Cancel
                  </Button>
                  <Button variant="hero" onClick={handleSaveProfile} disabled={saveStatus === "saving"}>
                    {saveStatus === "saving" ? "Saving..." : "Save Changes"}
                  </Button>
                </div>
              </div>
            </div>

            {/* Security Section */}
            <div className="bg-card rounded-xl border border-border overflow-hidden">
              <div className="p-4 bg-muted/50 border-b border-border">
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-muted-foreground" />
                  <h2 className="font-semibold text-foreground">Security & Login</h2>
                </div>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Lock className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium text-foreground">Password</p>
                      <p className="text-sm text-muted-foreground">Last changed 30 days ago</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Change Password</Button>
                </div>

                <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Shield className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium text-foreground">Two-Factor Authentication</p>
                      <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                    </div>
                  </div>
                  <button onClick={() => toggleSetting("twoFactorEnabled")} className="text-secondary">
                    {userSettings.twoFactorEnabled ? <ToggleRight className="w-10 h-10" /> : <ToggleLeft className="w-10 h-10 text-muted-foreground" />}
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Monitor className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium text-foreground">Active Sessions</p>
                      <p className="text-sm text-muted-foreground">1 device currently logged in</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Manage Sessions</Button>
                </div>

                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="font-medium text-green-700">Last Login</p>
                      <p className="text-sm text-green-600">{formatLastLogin(userProfile.lastLogin || new Date().toISOString())}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Notifications Section */}
            <div className="bg-card rounded-xl border border-border overflow-hidden">
              <div className="p-4 bg-muted/50 border-b border-border">
                <div className="flex items-center gap-2">
                  <Bell className="w-5 h-5 text-muted-foreground" />
                  <h2 className="font-semibold text-foreground">Notifications & Communication</h2>
                </div>
              </div>
              <div className="p-6 space-y-4">
                {[{
                key: "emailNotifications",
                icon: Mail,
                title: "Email Notifications",
                desc: "Receive updates about your applications via email"
              }, {
                key: "smsNotifications",
                icon: Phone,
                title: "SMS Notifications",
                desc: "Get important alerts via text message"
              }, {
                key: "pushNotifications",
                icon: Bell,
                title: "Push Notifications",
                desc: "Enable browser push notifications"
              }, {
                key: "marketingEmails",
                icon: Sparkles,
                title: "Marketing Communications",
                desc: "Receive offers and promotional content"
              }].map(item => <div key={item.key} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                    <div className="flex items-center gap-3">
                      <item.icon className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium text-foreground">{item.title}</p>
                        <p className="text-sm text-muted-foreground">{item.desc}</p>
                      </div>
                    </div>
                    <button onClick={() => toggleSetting(item.key as keyof UserSettings)} className="text-secondary">
                      {userSettings[item.key as keyof UserSettings] ? <ToggleRight className="w-10 h-10" /> : <ToggleLeft className="w-10 h-10 text-muted-foreground" />}
                    </button>
                  </div>)}
              </div>
            </div>

            {/* App Preferences Section */}
            <div className="bg-card rounded-xl border border-border overflow-hidden">
              <div className="p-4 bg-muted/50 border-b border-border">
                <div className="flex items-center gap-2">
                  <Settings className="w-5 h-5 text-muted-foreground" />
                  <h2 className="font-semibold text-foreground">App Preferences</h2>
                </div>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Moon className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium text-foreground">Dark Mode</p>
                      <p className="text-sm text-muted-foreground">Switch between light and dark themes</p>
                    </div>
                  </div>
                  <button onClick={() => toggleSetting("darkMode")} className="text-secondary">
                    {userSettings.darkMode ? <ToggleRight className="w-10 h-10" /> : <ToggleLeft className="w-10 h-10 text-muted-foreground" />}
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Globe className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium text-foreground">Language</p>
                      <p className="text-sm text-muted-foreground">English (India)</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Change</Button>
                </div>
              </div>
            </div>

            {/* Help & Support Section */}
            <div className="bg-card rounded-xl border border-border overflow-hidden">
              <div className="p-4 bg-muted/50 border-b border-border">
                <div className="flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-muted-foreground" />
                  <h2 className="font-semibold text-foreground">Help & Support</h2>
                </div>
              </div>
              <div className="p-6 space-y-3">
                <Link to="/faq" className="flex items-center justify-between p-4 bg-muted/30 rounded-lg hover:bg-muted transition-colors">
                  <div className="flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-muted-foreground" />
                    <span className="font-medium text-foreground">FAQs</span>
                  </div>
                  <ExternalLink className="w-4 h-4 text-muted-foreground" />
                </Link>
                <Link to="/contact" className="flex items-center justify-between p-4 bg-muted/30 rounded-lg hover:bg-muted transition-colors">
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-muted-foreground" />
                    <span className="font-medium text-foreground">Contact Support</span>
                  </div>
                  <ExternalLink className="w-4 h-4 text-muted-foreground" />
                </Link>
                <Link to="/about-us" className="flex items-center justify-between p-4 bg-muted/30 rounded-lg hover:bg-muted transition-colors">
                  <div className="flex items-center gap-3">
                    <Building2 className="w-5 h-5 text-muted-foreground" />
                    <span className="font-medium text-foreground">About SnapFin</span>
                  </div>
                  <ExternalLink className="w-4 h-4 text-muted-foreground" />
                </Link>
              </div>
            </div>

            {/* Danger Zone */}
            <div className="bg-card rounded-xl border border-destructive/30 overflow-hidden">
              <div className="p-4 bg-destructive/5 border-b border-destructive/20">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-destructive" />
                  <h2 className="font-semibold text-destructive">Danger Zone</h2>
                </div>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between p-4 bg-destructive/5 rounded-lg border border-destructive/20">
                  <div>
                    <p className="font-medium text-foreground">Delete Account</p>
                    <p className="text-sm text-muted-foreground">Permanently delete your account and all data</p>
                  </div>
                  <Button variant="outline" size="sm" className="text-destructive border-destructive/30 hover:bg-destructive/10">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </div>
            </div>

            {/* Logout Button - Visually Separated */}
            <div className="pt-4">
              <Button variant="outline" className="w-full text-destructive border-destructive/30 hover:bg-destructive/10" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out of SnapFin
              </Button>
            </div>
          </div>;
      default:
        return null;
    }
  };
  return <div className="min-h-screen bg-background flex">
      {/* Sidebar - Desktop */}
      <aside className={`hidden lg:flex flex-col ${sidebarOpen ? "w-64" : "w-20"} bg-card border-r border-border transition-all duration-300`}>
        <div className="p-4 border-b border-border">
          <Link to="/" className="flex items-center gap-3">
            <img src={snapfinLogo} alt="SnapFin" className="h-10 w-auto" />
            {sidebarOpen}
          </Link>
        </div>
        
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {sidebarItems.map(item => <li key={item.id}>
                <button onClick={() => setActiveTab(item.id)} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === item.id ? "bg-secondary/10 text-secondary font-medium" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}>
                  <item.icon className="w-5 h-5 flex-shrink-0" />
                  {sidebarOpen && <span>{item.label}</span>}
                </button>
              </li>)}
          </ul>
        </nav>
        
        <div className="p-4 border-t border-border">
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-all">
            <LogOut className="w-5 h-5" />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && <div className="lg:hidden fixed inset-0 z-50 bg-background/80 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)}>
          <div className="fixed inset-y-0 left-0 w-72 bg-card border-r border-border p-4" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <Link to="/" className="flex items-center gap-3">
                <img src={snapfinLogo} alt="SnapFin" className="h-10 w-auto" />
                <span className="font-bold text-foreground">SnapFin</span>
              </Link>
              <button onClick={() => setMobileMenuOpen(false)}>
                <X className="w-6 h-6 text-muted-foreground" />
              </button>
            </div>
            
            <nav>
              <ul className="space-y-2">
                {sidebarItems.map(item => <li key={item.id}>
                    <button onClick={() => {
                setActiveTab(item.id);
                setMobileMenuOpen(false);
              }} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === item.id ? "bg-secondary/10 text-secondary font-medium" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}>
                      <item.icon className="w-5 h-5" />
                      <span>{item.label}</span>
                    </button>
                  </li>)}
              </ul>
            </nav>
            
            <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 mt-4 rounded-xl text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-all">
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top Header */}
        <header className="bg-card border-b border-border px-4 lg:px-6 py-4 flex items-center justify-between sticky top-0 z-40">
          <div className="flex items-center gap-3">
            {/* Mobile: Hamburger + Logo */}
            <button className="lg:hidden p-1" onClick={() => setMobileMenuOpen(true)}>
              <Menu className="w-6 h-6 text-foreground" />
            </button>
            <Link to="/" className="lg:hidden flex items-center">
              <img src={snapfinLogo} alt="SnapFin" className="h-8 w-auto" />
            </Link>
            
            {/* Desktop: Sidebar toggle + Search */}
            <button className="hidden lg:block p-1" onClick={() => setSidebarOpen(!sidebarOpen)}>
              <Menu className="w-5 h-5 text-muted-foreground hover:text-foreground" />
            </button>
            <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-muted rounded-lg">
              <Search className="w-4 h-4 text-muted-foreground" />
              <input type="text" placeholder="Search..." className="bg-transparent border-none outline-none text-sm text-foreground placeholder:text-muted-foreground w-48" />
            </div>
          </div>
          
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Personalized Greeting - Desktop */}
            <div className="hidden lg:block">
              <span className="text-sm text-muted-foreground">{getGreeting()},</span>
              <span className="text-sm font-medium text-foreground ml-1">{getFirstName()}!</span>
            </div>

            {/* Notifications Dropdown */}
            <div className="relative group">
              <button className="relative p-2 hover:bg-muted rounded-lg transition-colors">
                <Bell className="w-5 h-5 text-muted-foreground group-hover:text-foreground" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
              </button>
              <div className="absolute right-0 top-full mt-2 w-72 bg-card border border-border rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="p-4 border-b border-border">
                  <h3 className="font-semibold text-foreground">Notifications</h3>
                </div>
                <div className="p-4 text-center">
                  <Bell className="w-10 h-10 text-muted-foreground/30 mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">No new notifications</p>
                </div>
              </div>
            </div>

            {/* User Profile Dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-2 sm:gap-3 p-1 sm:p-2 hover:bg-muted rounded-lg transition-colors">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-br from-secondary to-primary flex items-center justify-center text-xs sm:text-sm font-semibold text-primary-foreground">
                  {userProfile.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                </div>
                <div className="hidden sm:block text-left">
                  <p className="text-sm font-medium text-foreground leading-tight">{userProfile.name}</p>
                  <p className="text-xs text-muted-foreground leading-tight truncate max-w-[120px]">{userProfile.email}</p>
                </div>
                <ChevronDown className="w-4 h-4 text-muted-foreground hidden sm:block" />
              </button>
              <div className="absolute right-0 top-full mt-2 w-56 bg-card border border-border rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="p-3 border-b border-border">
                  <p className="font-medium text-foreground">{userProfile.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{userProfile.email}</p>
                </div>
                <div className="p-2">
                  <button onClick={() => setActiveTab("overview")} className="w-full flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors">
                    <Home className="w-4 h-4" />
                    Dashboard
                  </button>
                  <button onClick={() => setActiveTab("settings")} className="w-full flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors">
                    <Settings className="w-4 h-4" />
                    Settings
                  </button>
                  <Link to="/about-us" className="w-full flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors">
                    <User className="w-4 h-4" />
                    About Us
                  </Link>
                </div>
                <div className="p-2 border-t border-border">
                  <button onClick={handleLogout} className="w-full flex items-center gap-2 px-3 py-2 text-sm text-destructive hover:bg-destructive/10 rounded-lg transition-colors">
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 lg:p-6 overflow-auto">
          {renderContent()}
        </main>
      </div>
    </div>;
}