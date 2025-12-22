import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ChevronDown, Moon, Sun, Phone, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import snapfinLogo from "@/assets/snapfin-logo.png";

const navLinks = [
  { name: "Home", href: "/" },
  {
    name: "Loans",
    href: "#loans",
    children: [
      { name: "Loan Against Property", href: "/eligibility?type=lap" },
      { name: "Personal Loan", href: "/eligibility?type=personal" },
      { name: "Business Loan", href: "/eligibility?type=business" }
    ]
  },
  { name: "How It Works", href: "/#how-it-works" },
  { 
    name: "Check CIBIL Score", 
    href: "/cibil-score",
    highlight: true 
  },
  { name: "FAQ", href: "/faq" },
  { name: "Partner With Us", href: "/partner" }
];

const moreLinks = [
  { name: "Sign In / Sign Up", href: "/auth" },
  { name: "Contact Us", href: "/contact" },
  { name: "About Us", href: "/about-us" },
  { name: "Check Eligibility", href: "/eligibility" },
  { name: "Apply for Loan", href: "/apply" },
  { name: "Book Consultation", href: "/consultation" }
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  // Close more menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (isMoreMenuOpen && !(e.target as Element).closest('.more-menu-container')) {
        setIsMoreMenuOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMoreMenuOpen]);

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      isScrolled 
        ? "bg-background/95 backdrop-blur-xl border-b border-border shadow-snapfin-sm" 
        : "bg-background/80 backdrop-blur-md"
    )}>
      <div className="container-snapfin">
        <nav className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <img src={snapfinLogo} alt="Snapfin" className="h-8 md:h-10 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map(link => (
              <div 
                key={link.name} 
                className="relative"
                onMouseEnter={() => link.children && setOpenDropdown(link.name)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                {link.children ? (
                  <button className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                    {link.name}
                    <ChevronDown className={cn("w-4 h-4 transition-transform", openDropdown === link.name && "rotate-180")} />
                  </button>
                ) : (
                  <Link 
                    to={link.href} 
                    className={cn(
                      "flex items-center gap-1 px-4 py-2 text-sm font-medium transition-colors",
                      link.highlight 
                        ? "text-secondary font-semibold relative" 
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {link.highlight && <Sparkles className="w-4 h-4" />}
                    {link.name}
                    {link.highlight && (
                      <span className="absolute -top-1 -right-1 px-1.5 py-0.5 text-[10px] font-bold bg-accent text-accent-foreground rounded-full">
                        FREE
                      </span>
                    )}
                  </Link>
                )}
                {link.children && (
                  <div className={cn(
                    "absolute top-full left-0 pt-2 transition-all duration-200 z-50",
                    openDropdown === link.name ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2"
                  )}>
                    <div className="bg-card rounded-xl border border-border shadow-snapfin-lg p-2 min-w-[220px]">
                      {link.children.map(child => (
                        <Link 
                          key={child.name} 
                          to={child.href} 
                          className="block px-4 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <button 
              onClick={() => setIsDark(!isDark)} 
              className="p-2 rounded-lg hover:bg-muted transition-colors" 
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/auth">Sign In</Link>
            </Button>
            <Button 
              variant="hero" 
              size="sm" 
              className="gap-2 shadow-lg hover:shadow-xl transition-shadow animate-pulse-subtle"
              asChild
            >
              <Link to="/consultation">
                <Phone className="w-4 h-4" />
                Book Free Call
              </Link>
            </Button>
            
            {/* Hamburger Menu for Desktop */}
            <div className="relative more-menu-container">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setIsMoreMenuOpen(!isMoreMenuOpen);
                }}
                className="p-2 rounded-lg hover:bg-muted transition-colors border border-border"
                aria-label="More options"
              >
                <Menu className="w-5 h-5" />
              </button>
              
              {isMoreMenuOpen && (
                <div className="absolute top-full right-0 mt-2 w-56 bg-card rounded-xl border border-border shadow-snapfin-xl p-2 z-50">
                  {moreLinks.map(link => (
                    <Link 
                      key={link.name}
                      to={link.href}
                      onClick={() => setIsMoreMenuOpen(false)}
                      className="block px-4 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
                    >
                      {link.name}
                    </Link>
                  ))}
                  <div className="border-t border-border my-2" />
                  <Link 
                    to="/cibil-score"
                    onClick={() => setIsMoreMenuOpen(false)}
                    className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-secondary hover:bg-secondary/10 rounded-lg transition-colors"
                  >
                    <Sparkles className="w-4 h-4" />
                    Free CIBIL Check
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <Button 
              variant="hero" 
              size="sm" 
              className="gap-1 text-xs px-3"
              asChild
            >
              <Link to="/consultation">
                <Phone className="w-3 h-3" />
                Free Call
              </Link>
            </Button>
            <button 
              onClick={() => setIsDark(!isDark)} 
              className="p-2 rounded-lg hover:bg-muted transition-colors" 
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
              className="p-2 rounded-lg hover:bg-muted transition-colors" 
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <div className={cn(
          "lg:hidden overflow-hidden transition-all duration-300",
          isMobileMenuOpen ? "max-h-[600px] pb-4" : "max-h-0"
        )}>
          <div className="flex flex-col gap-1 pt-2">
            {navLinks.map(link => (
              <div key={link.name}>
                {link.children ? (
                  <>
                    <button 
                      className="w-full px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors flex items-center justify-between"
                      onClick={() => setOpenDropdown(openDropdown === link.name ? null : link.name)}
                    >
                      {link.name}
                      <ChevronDown className={cn("w-4 h-4 transition-transform", openDropdown === link.name && "rotate-180")} />
                    </button>
                    <div className={cn("overflow-hidden transition-all duration-200", openDropdown === link.name ? "max-h-40" : "max-h-0")}>
                      {link.children.map(child => (
                        <Link 
                          key={child.name} 
                          to={child.href}
                          className="block px-8 py-2 text-sm text-muted-foreground hover:text-foreground"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  </>
                ) : (
                  <Link 
                    to={link.href} 
                    className={cn(
                      "px-4 py-3 text-sm font-medium hover:bg-muted rounded-lg transition-colors block flex items-center gap-2",
                      link.highlight 
                        ? "text-secondary font-semibold bg-secondary/10" 
                        : "text-muted-foreground hover:text-foreground"
                    )}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.highlight && <Sparkles className="w-4 h-4" />}
                    {link.name}
                    {link.highlight && (
                      <span className="px-1.5 py-0.5 text-[10px] font-bold bg-accent text-accent-foreground rounded-full">
                        FREE
                      </span>
                    )}
                  </Link>
                )}
              </div>
            ))}
            
            {/* Additional mobile links */}
            <div className="border-t border-border mt-2 pt-2">
              {moreLinks.map(link => (
                <Link 
                  key={link.name}
                  to={link.href}
                  className="px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors block"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            </div>
            
            <div className="flex flex-col gap-2 pt-4 px-4">
              <Button variant="ghost" className="justify-center" asChild>
                <Link to="/auth">Sign In</Link>
              </Button>
              <Button variant="hero" className="justify-center gap-2" asChild>
                <Link to="/consultation">
                  <Phone className="w-4 h-4" />
                  Book Free Call
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}