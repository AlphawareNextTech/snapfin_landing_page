import { Link } from "react-router-dom";
import { ArrowLeft, Search } from "lucide-react";
import { FAQAccordion } from "@/components/ui/faq-accordion";
import { useState } from "react";
import { FormInput } from "@/components/ui/form-input";
import { Button } from "@/components/ui/button";

const faqCategories = [
  {
    title: "General Questions",
    items: [
      {
        id: "what-is-snapfin",
        question: "What is Snapfin?",
        answer: "Snapfin is a technology-driven loan facilitation platform that connects borrowers with trusted lending partners. We help you find the right loan — Personal, Business, or Loan Against Property — with transparent terms and quick approvals."
      },
      {
        id: "how-it-works",
        question: "How does Snapfin work?",
        answer: "Simply check your eligibility in under 60 seconds, upload minimal documents, and we'll match you with the best lending partners. Once approved, funds are disbursed directly to your account."
      },
      {
        id: "credit-score-impact",
        question: "Will checking eligibility affect my credit score?",
        answer: "No! Our eligibility check is a soft inquiry that doesn't impact your credit score. Only when you proceed with a full application will a formal credit check be conducted."
      },
    ]
  },
  {
    title: "Loans & Eligibility",
    items: [
      {
        id: "loan-types",
        question: "What types of loans does Snapfin offer?",
        answer: (
          <ul className="list-disc pl-4 space-y-1">
            <li><strong>Personal Loan:</strong> For personal expenses, emergencies, or travel</li>
            <li><strong>Loan Against Property (LAP):</strong> Secured loan using your property as collateral</li>
            <li><strong>Business Loan:</strong> Working capital for MSMEs and entrepreneurs</li>
          </ul>
        )
      },
      {
        id: "eligibility-criteria",
        question: "What are the eligibility criteria?",
        answer: (
          <div className="space-y-2">
            <p>General criteria include:</p>
            <ul className="list-disc pl-4 space-y-1">
              <li>Age: 21-60 years</li>
              <li>Indian citizen or resident</li>
              <li>Stable income (salaried/self-employed)</li>
              <li>Valid KYC documents (PAN, Aadhaar)</li>
            </ul>
            <p className="mt-2">Specific criteria may vary by loan type and lending partner.</p>
          </div>
        )
      },
      {
        id: "loan-amount",
        question: "How much can I borrow?",
        answer: "Loan amounts range from ₹50,000 to ₹5 Crore depending on the loan type, your income, and creditworthiness. Personal loans typically go up to ₹25 lakhs, while LAP can go up to ₹5 Crore."
      },
      {
        id: "interest-rates",
        question: "What are the interest rates?",
        answer: "Interest rates vary by loan type and your credit profile. Personal loans start from 10.49% p.a., LAP from 8.5% p.a., and Business loans from 12% p.a. Final rates are determined by the lending partner."
      },
    ]
  },
  {
    title: "Application Process",
    items: [
      {
        id: "documents-required",
        question: "What documents are required?",
        answer: (
          <ul className="list-disc pl-4 space-y-1">
            <li>PAN Card</li>
            <li>Aadhaar Card</li>
            <li>Bank statements (last 6 months)</li>
            <li>Salary slips / ITR (income proof)</li>
            <li>Property documents (for LAP only)</li>
          </ul>
        )
      },
      {
        id: "processing-time",
        question: "How long does the process take?",
        answer: "Eligibility check takes under 60 seconds. Full approval can be completed within 24-48 hours for Personal Loans, and 7-10 days for LAP (due to property verification)."
      },
      {
        id: "application-status",
        question: "How can I track my application?",
        answer: "Sign in to your Snapfin account to view real-time status updates. You'll also receive SMS and email notifications at each stage of the process."
      },
    ]
  },
  {
    title: "Security & Privacy",
    items: [
      {
        id: "data-security",
        question: "Is my data secure?",
        answer: "Absolutely. We use bank-level 256-bit SSL encryption, and your data is stored on secure, PCI-compliant servers. We never share your personal information without consent."
      },
      {
        id: "kyc-verification",
        question: "How is KYC verification done?",
        answer: "KYC is completed digitally through secure APIs. Your PAN and Aadhaar are verified electronically, ensuring a paperless and hassle-free process."
      },
    ]
  },
];

export default function FAQ() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCategories = faqCategories.map(category => ({
    ...category,
    items: category.items.filter(item =>
      item.question.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.items.length > 0);

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
          {/* Page Header */}
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Find answers to common questions about Snapfin loans
            </p>

            {/* Search */}
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search questions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-12 pl-12 pr-4 rounded-xl border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-secondary/50"
              />
            </div>
          </div>

          {/* FAQ Categories */}
          <div className="max-w-3xl mx-auto space-y-12">
            {filteredCategories.length > 0 ? (
              filteredCategories.map((category) => (
                <section key={category.title}>
                  <h2 className="text-xl font-semibold text-foreground mb-6">
                    {category.title}
                  </h2>
                  <FAQAccordion items={category.items} />
                </section>
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">No results found for "{searchQuery}"</p>
                <Button variant="outline" onClick={() => setSearchQuery("")}>
                  Clear search
                </Button>
              </div>
            )}
          </div>

          {/* Contact CTA */}
          <div className="max-w-2xl mx-auto mt-16 text-center p-8 bg-card rounded-2xl border border-border">
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Still have questions?
            </h3>
            <p className="text-muted-foreground mb-6">
              Our support team is here to help you
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero">
                Contact Support
              </Button>
              <Button variant="outline">
                Call 1800-123-456
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
