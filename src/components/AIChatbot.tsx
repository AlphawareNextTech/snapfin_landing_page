import { useState, useRef, useEffect } from "react";
import { X, Send, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  options?: string[];
  collectField?: "name" | "phone" | "email";
}

const initialMessages: Message[] = [
  {
    id: "1",
    text: "Hi there! I'm Aria, your loan assistant at Snapfin. How can I help you today?",
    isBot: true,
    options: [
      "Check my loan eligibility",
      "Learn about loan types",
      "Talk to an expert",
      "Check my CIBIL score"
    ]
  }
];

export function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPopupDismissed, setIsPopupDismissed] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [collectedData, setCollectedData] = useState<{
    name?: string;
    phone?: string;
    email?: string;
  }>({});
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Auto open popup after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPopupDismissed(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const addBotMessage = (text: string, options?: string[], collectField?: Message["collectField"]) => {
    setIsTyping(true);
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        text,
        isBot: true,
        options,
        collectField
      }]);
      setIsTyping(false);
    }, 1000);
  };

  const handleOptionClick = (option: string) => {
    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      text: option,
      isBot: false
    }]);

    switch (option) {
      case "Check my loan eligibility":
        addBotMessage(
          "I'd be happy to help you check your eligibility. It only takes a moment. May I have your name?",
          undefined,
          "name"
        );
        break;
      case "Learn about loan types":
        addBotMessage(
          "We offer three main loan products tailored to different needs:\n\nLoan Against Property — Borrow up to ₹5 Crore using your property as collateral. Ideal for large expenses with lower interest rates.\n\nBusiness Loan — Up to ₹50 Lakhs for expanding your business, purchasing equipment, or managing working capital.\n\nPersonal Loan — Up to ₹25 Lakhs for personal expenses like education, medical needs, or home renovation.\n\nWhich type would you like to explore further?",
          ["Loan Against Property", "Business Loan", "Personal Loan", "Help me decide"]
        );
        break;
      case "Talk to an expert":
        addBotMessage(
          "Our loan experts are available to guide you through the process. May I have your phone number so they can reach out at a convenient time?",
          undefined,
          "phone"
        );
        break;
      case "Check my CIBIL score":
        addBotMessage(
          "You can check your CIBIL score for free with Snapfin. Would you like to proceed to the score check page?",
          ["Go to CIBIL Check", "Share my phone number"]
        );
        break;
      case "Go to CIBIL Check":
        window.location.href = "/cibil-score";
        break;
      case "Help me decide":
        addBotMessage(
          "I can help you find the right fit. What's the primary purpose of your loan?",
          ["Home renovation", "Business expansion", "Personal expenses", "Something else"]
        );
        break;
      case "Home renovation":
        addBotMessage(
          "For home renovation, a Loan Against Property or Personal Loan would work well depending on the amount you need. Loan Against Property offers lower interest rates for larger amounts. Would you like to check your eligibility?",
          ["Yes, check eligibility", "Tell me more", "Talk to expert"]
        );
        break;
      case "Business expansion":
        addBotMessage(
          "For business expansion, our Business Loan offers quick disbursement with minimal documentation. You can borrow up to ₹50 Lakhs based on your business profile. Shall I help you get started?",
          ["Yes, check eligibility", "Tell me more", "Talk to expert"]
        );
        break;
      case "Personal expenses":
        addBotMessage(
          "Our Personal Loan is designed for exactly this — quick access to funds for education, medical expenses, travel, or any personal need. Interest rates start at 10.5% p.a. Would you like to check your eligibility?",
          ["Yes, check eligibility", "Tell me more", "Talk to expert"]
        );
        break;
      case "Yes, check eligibility":
        addBotMessage(
          "Perfect! Let me gather a few details to check your eligibility. What's your name?",
          undefined,
          "name"
        );
        break;
      case "Tell me more":
        addBotMessage(
          "Our AI-powered system analyzes your profile to match you with the best lenders offering competitive rates. The entire process is digital — from application to approval. Would you like to proceed?",
          ["Check eligibility", "Book consultation", "Talk to expert"]
        );
        break;
      case "Talk to expert":
        addBotMessage(
          "I'll connect you with one of our loan specialists. May I have your phone number?",
          undefined,
          "phone"
        );
        break;
      case "Check eligibility":
        addBotMessage(
          "Let's get started. May I have your name?",
          undefined,
          "name"
        );
        break;
      case "Book consultation":
        addBotMessage(
          "Great choice! Our experts can provide personalized guidance. Please share your phone number and we'll schedule a call.",
          undefined,
          "phone"
        );
        break;
      case "Browse loans":
        window.location.href = "/eligibility";
        break;
      case "Check CIBIL score (FREE)":
        window.location.href = "/cibil-score";
        break;
      case "Explore loan products":
        addBotMessage(
          "We offer Loan Against Property, Business Loans, and Personal Loans. Each is designed for different financial needs. Which would you like to know more about?",
          ["Loan Against Property", "Business Loan", "Personal Loan"]
        );
        break;
      case "Book a consultation":
        addBotMessage(
          "I'll help you book a free consultation with our experts. May I have your phone number?",
          undefined,
          "phone"
        );
        break;
      default:
        if (option.includes("Loan")) {
          addBotMessage(
            `Our ${option} comes with competitive interest rates starting at 10.5% p.a. and flexible repayment options. Would you like to check your eligibility?`,
            ["Yes, check eligibility", "Tell me more", "Talk to expert"]
          );
        } else {
          addBotMessage(
            "Thank you. Our AI-powered system can help match you with the best loan options. How would you like to proceed?",
            ["Check eligibility", "Book consultation", "Browse loans"]
          );
        }
    }
  };

  // Check if the message is related to SnapFin topics
  const isSnapfinRelated = (message: string): boolean => {
    const lowerMessage = message.toLowerCase();
    const snapfinKeywords = [
      // Loan related
      'loan', 'borrow', 'credit', 'emi', 'interest', 'rate', 'eligibility', 
      'eligible', 'apply', 'application', 'approval', 'approve', 'disburse',
      'repayment', 'tenure', 'amount', 'principal', 'collateral',
      // Loan types
      'personal', 'business', 'property', 'lap', 'msme', 'home', 'mortgage',
      // Financial terms
      'cibil', 'credit score', 'income', 'salary', 'document', 'kyc', 'pan',
      'aadhaar', 'bank', 'statement', 'itr', 'gst', 'financial',
      // SnapFin specific
      'snapfin', 'aria', 'consultation', 'expert', 'advisor', 'help',
      // General queries that should be allowed
      'hi', 'hello', 'hey', 'thanks', 'thank you', 'okay', 'ok', 'yes', 'no',
      'how', 'what', 'can', 'process', 'fee', 'charge', 'cost', 'time',
      'requirement', 'need', 'want', 'get', 'check', 'know', 'tell',
      // Contact & support
      'contact', 'call', 'phone', 'email', 'support', 'reach', 'talk',
      'name', 'number'
    ];
    
    return snapfinKeywords.some(keyword => lowerMessage.includes(keyword));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const currentCollectField = messages[messages.length - 1]?.collectField;

    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      text: inputValue,
      isBot: false
    }]);

    // If collecting user data (name, phone, email), process normally
    if (currentCollectField === "name") {
      setCollectedData(prev => ({ ...prev, name: inputValue }));
      addBotMessage(
        `Nice to meet you, ${inputValue}. What's the best phone number to reach you?`,
        undefined,
        "phone"
      );
    } else if (currentCollectField === "phone") {
      setCollectedData(prev => ({ ...prev, phone: inputValue }));
      addBotMessage(
        "Thank you. And your email address, please?",
        undefined,
        "email"
      );
    } else if (currentCollectField === "email") {
      setCollectedData(prev => ({ ...prev, email: inputValue }));
      addBotMessage(
        "I've saved your details. Our AI system is now analyzing the best loan options for your profile. A loan specialist will contact you within 24 hours.\n\nIs there anything else I can help you with?",
        ["Check CIBIL score (FREE)", "Explore loan products", "Book a consultation"]
      );
    } else if (!isSnapfinRelated(inputValue)) {
      // Guardrail: Politely redirect off-topic questions
      addBotMessage(
        "I'm Aria, your dedicated loan assistant at Snapfin. I'm here to help you with loan-related queries — eligibility checks, loan types, interest rates, CIBIL scores, and more.\n\nHow can I assist you with your loan needs today?",
        ["Check my loan eligibility", "Learn about loan types", "Check my CIBIL score", "Talk to an expert"]
      );
    } else {
      // Handle SnapFin-related free-text queries
      const lowerInput = inputValue.toLowerCase();
      
      if (lowerInput.includes('interest') || lowerInput.includes('rate')) {
        addBotMessage(
          "Our interest rates start from 10.5% p.a. and vary based on loan type, amount, and your credit profile. Would you like to check your personalized rate?",
          ["Check eligibility", "Talk to expert", "Learn about loan types"]
        );
      } else if (lowerInput.includes('document') || lowerInput.includes('require') || lowerInput.includes('kyc')) {
        addBotMessage(
          "For loan applications, you'll typically need:\n• PAN Card & Aadhaar\n• Income proof (salary slips or ITR)\n• Bank statements (6 months)\n• Property documents (for LAP)\n\nWould you like to start your application?",
          ["Check eligibility", "Talk to expert", "Learn about loan types"]
        );
      } else if (lowerInput.includes('time') || lowerInput.includes('long') || lowerInput.includes('fast')) {
        addBotMessage(
          "Our AI-powered system provides instant eligibility checks. Once approved, loan disbursement typically happens within 24-72 hours depending on the loan type. Ready to check your eligibility?",
          ["Yes, check eligibility", "Talk to expert", "Learn more"]
        );
      } else if (lowerInput.includes('cibil') || lowerInput.includes('credit score')) {
        addBotMessage(
          "Your CIBIL score is crucial for loan approval. A score of 700+ improves your chances significantly. Would you like to check your score for free?",
          ["Go to CIBIL Check", "Check loan eligibility", "Talk to expert"]
        );
      } else {
        addBotMessage(
          "Thank you for your message. How can I assist you further with your loan needs?",
          ["Check eligibility", "Talk to expert", "View loan types"]
        );
      }
    }

    setInputValue("");
  };

  const dismissPopup = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPopupDismissed(true);
  };

  return (
    <>
      {/* Chat Button with Human Avatar */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg hover:scale-110 overflow-hidden",
          "bg-gradient-to-br from-primary to-secondary",
          isOpen && "scale-0 opacity-0"
        )}
        aria-label="Open chat"
      >
        {/* Human Avatar */}
        <div className="relative w-full h-full flex items-center justify-center">
          <svg viewBox="0 0 64 64" className="w-12 h-12">
            {/* Face background */}
            <circle cx="32" cy="28" r="16" fill="#FFDBB4" />
            {/* Hair */}
            <ellipse cx="32" cy="20" rx="16" ry="10" fill="#4A3728" />
            <path d="M16 28c0-8 6-16 16-16s16 8 16 16" fill="#4A3728" />
            {/* Eyes */}
            <ellipse cx="26" cy="28" rx="2" ry="2.5" fill="#333" />
            <ellipse cx="38" cy="28" rx="2" ry="2.5" fill="#333" />
            {/* Smile */}
            <path d="M26 35c3 3 9 3 12 0" stroke="#333" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            {/* Headset */}
            <path d="M14 28a18 18 0 0 1 36 0" stroke="#2563EB" strokeWidth="3" fill="none" />
            <circle cx="14" cy="32" r="4" fill="#2563EB" />
            <circle cx="50" cy="32" r="4" fill="#2563EB" />
            {/* Microphone */}
            <path d="M50 32v6c0 2-1 3-3 3h-3" stroke="#2563EB" strokeWidth="2" fill="none" />
          </svg>
          <Sparkles className="w-4 h-4 absolute -top-0 -right-0 text-accent animate-pulse" />
        </div>
      </button>

      {/* Notification Badge / Popup */}
      {!isOpen && !isPopupDismissed && (
        <div className="fixed bottom-24 right-6 z-50 bg-card rounded-2xl shadow-snapfin-xl p-4 max-w-[260px] animate-fade-up border border-border">
          <button
            onClick={dismissPopup}
            className="absolute top-2 right-2 p-1 hover:bg-muted rounded-full transition-colors"
            aria-label="Dismiss"
          >
            <X className="w-4 h-4 text-muted-foreground" />
          </button>
          <p className="text-sm text-foreground font-medium pr-6">
            Hi! Need help finding the perfect loan?
          </p>
          <button 
            onClick={() => setIsOpen(true)}
            className="text-xs text-secondary mt-2 font-medium hover:underline"
          >
            Chat with Aria →
          </button>
        </div>
      )}

      {/* Chat Window */}
      <div className={cn(
        "fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-48px)] bg-card rounded-3xl shadow-snapfin-xl border border-border overflow-hidden transition-all duration-300",
        isOpen ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-95 pointer-events-none"
      )}>
        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-secondary p-4 text-primary-foreground">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Human Avatar in Header */}
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center overflow-hidden">
                <svg viewBox="0 0 64 64" className="w-10 h-10">
                  <circle cx="32" cy="28" r="16" fill="#FFDBB4" />
                  <ellipse cx="32" cy="20" rx="16" ry="10" fill="#4A3728" />
                  <path d="M16 28c0-8 6-16 16-16s16 8 16 16" fill="#4A3728" />
                  <ellipse cx="26" cy="28" rx="2" ry="2.5" fill="#333" />
                  <ellipse cx="38" cy="28" rx="2" ry="2.5" fill="#333" />
                  <path d="M26 35c3 3 9 3 12 0" stroke="#333" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold flex items-center gap-2">
                  Aria
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                </h3>
                <p className="text-xs opacity-90">AI Loan Assistant • Online</p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-primary-foreground/10 rounded-full transition-colors"
              aria-label="Close chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="h-[350px] overflow-y-auto p-4 space-y-4 bg-muted/30">
          {messages.map((message) => (
            <div key={message.id} className={cn(
              "flex",
              message.isBot ? "justify-start" : "justify-end"
            )}>
              <div className={cn(
                "max-w-[80%] rounded-2xl px-4 py-3",
                message.isBot 
                  ? "bg-card border border-border text-foreground rounded-tl-md" 
                  : "bg-gradient-to-r from-primary to-secondary text-primary-foreground rounded-tr-md"
              )}>
                <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                {message.options && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {message.options.map((option) => (
                      <button
                        key={option}
                        onClick={() => handleOptionClick(option)}
                        className="text-xs bg-secondary/10 hover:bg-secondary/20 text-secondary px-3 py-1.5 rounded-full transition-colors border border-secondary/20"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-card border border-border rounded-2xl rounded-tl-md px-4 py-3">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <form onSubmit={handleSubmit} className="p-4 border-t border-border bg-card">
          <div className="flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 h-11 px-4 rounded-xl bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-secondary/50 text-sm"
            />
            <Button type="submit" size="icon" className="h-11 w-11 rounded-xl bg-gradient-to-r from-primary to-secondary hover:opacity-90">
              <Send className="w-5 h-5" />
            </Button>
          </div>
          <p className="text-[10px] text-muted-foreground text-center mt-2">
            Powered by Snapfin AI • Your data is encrypted
          </p>
        </form>
      </div>
    </>
  );
}
