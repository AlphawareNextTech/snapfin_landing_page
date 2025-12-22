import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Linkedin, Twitter, Facebook } from "lucide-react";
import snapfinLogo from "@/assets/snapfin-logo.png";

const footerLinks = {
  products: [
    { name: "Loan Against Property", href: "/eligibility?type=lap" },
    { name: "Personal Loan", href: "/eligibility?type=personal" },
    { name: "Business Loan", href: "/eligibility?type=business" },
  ],
  company: [
    { name: "About Us", href: "/about-us", highlight: true },
    { name: "How It Works", href: "/#how-it-works" },
    { name: "Partner With Us", href: "/partner" },
    { name: "Careers", href: "#careers" },
  ],
  support: [
    { name: "Help Center", href: "#help" },
    { name: "FAQ", href: "/faq", highlight: true },
    { name: "Contact Us", href: "/contact", highlight: true },
    { name: "Security", href: "#security" },
  ],
  legal: [
    { name: "Privacy Policy", href: "#privacy", highlight: true },
    { name: "Terms of Service", href: "#terms", highlight: true },
    { name: "Cookie Policy", href: "#cookies" },
    { name: "Disclosures", href: "#disclosures", highlight: true },
  ],
};

export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container-snapfin py-12 lg:py-16">
        {/* Main Footer */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <img src={snapfinLogo} alt="Snapfin" className="h-10 w-auto" />
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6 max-w-sm">
              AI-powered loan solutions with instant eligibility checks and transparent costs. 
              Apply online for LAP, Personal, or Business Loans.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="#linkedin"
                className="w-10 h-10 rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="#twitter"
                className="w-10 h-10 rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#facebook"
                className="w-10 h-10 rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Products</h3>
            <ul className="space-y-3">
              {footerLinks.products.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className={`text-sm transition-colors ${
                      link.highlight 
                        ? "text-secondary font-medium hover:text-secondary/80" 
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Support</h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className={`text-sm transition-colors ${
                      link.highlight 
                        ? "text-secondary font-medium hover:text-secondary/80" 
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Legal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className={`text-sm transition-colors ${
                      link.highlight 
                        ? "text-secondary font-medium hover:text-secondary/80" 
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact Bar */}
        <div className="flex flex-wrap gap-6 mt-12 pt-8 border-t border-border">
          <a
            href="mailto:support@snapfin.com"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <Mail className="w-4 h-4" />
            support@snapfin.com
          </a>
          <a
            href="tel:+911800123456"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <Phone className="w-4 h-4" />
            1800-123-456
          </a>
          <span className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4" />
            Mumbai, India
          </span>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-muted-foreground text-center md:text-left">
              © 2024 Snapfin. All rights reserved. Loans are offered by partner lenders. 
              Snapfin is a technology facilitator.
            </p>
            <p className="text-xs text-muted-foreground">
              Representative APR shown for sample calculations only.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}