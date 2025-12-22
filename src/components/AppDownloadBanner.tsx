import { Sparkles, ArrowRight, QrCode } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AppDownloadBanner() {
  return (
    <section className="py-16 bg-gradient-to-br from-primary via-primary to-secondary relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMtOS45NDEgMC0xOCA4LjA1OS0xOCAxOHM4LjA1OSAxOCAxOCAxOCAxOC04LjA1OSAxOC0xOC04LjA1OS0xOC0xOC0xOHoiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSIgc3Ryb2tlLXdpZHRoPSIyIi8+PC9nPjwvc3ZnPg==')] opacity-30" />
      
      <div className="container-snapfin relative">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Content */}
          <div className="text-center lg:text-left text-primary-foreground">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-foreground/10 border border-primary-foreground/20 mb-4">
              <Sparkles className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium">Coming Soon on Mobile</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              Get the Snapfin App
            </h2>
            <p className="text-primary-foreground/80 max-w-md mb-6">
              AI-powered loan management at your fingertips. Apply, track, and manage your loans on the go.
            </p>
            
            {/* App Store Buttons with Real Logos */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              {/* Apple App Store Button */}
              <button className="flex items-center gap-3 bg-black hover:bg-gray-900 rounded-xl px-5 py-3 transition-colors">
                <svg viewBox="0 0 24 24" className="w-8 h-8 fill-white">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                <div className="text-left text-white">
                  <p className="text-xs opacity-80">Download on the</p>
                  <p className="font-semibold text-lg -mt-1">App Store</p>
                </div>
              </button>
              
              {/* Google Play Store Button */}
              <button className="flex items-center gap-3 bg-black hover:bg-gray-900 rounded-xl px-5 py-3 transition-colors">
                <svg viewBox="0 0 24 24" className="w-8 h-8">
                  <path fill="#EA4335" d="M3.609 1.814L13.792 12 3.609 22.186c-.181-.161-.293-.394-.293-.654V2.468c0-.26.112-.493.293-.654z"/>
                  <path fill="#FBBC04" d="M16.296 9.5L13.792 12l2.504 2.5 3.065-1.763c.348-.2.563-.571.563-.984s-.215-.784-.563-.984L16.296 9.5z"/>
                  <path fill="#4285F4" d="M3.609 1.814L13.792 12l2.504-2.5-10.1-5.938c-.166-.098-.354-.147-.547-.148-.342 0-.667.159-.878.4z"/>
                  <path fill="#34A853" d="M3.609 22.186c.211.241.536.4.878.4.193-.001.381-.05.547-.148l10.1-5.938-2.504-2.5L3.609 22.186z"/>
                </svg>
                <div className="text-left text-white">
                  <p className="text-xs opacity-80">Get it on</p>
                  <p className="font-semibold text-lg -mt-1">Google Play</p>
                </div>
              </button>
            </div>
          </div>

          {/* Phone Mockup / QR */}
          <div className="flex items-center gap-6">
            <div className="bg-primary-foreground/10 rounded-2xl p-6 text-center border border-primary-foreground/20">
              <QrCode className="w-24 h-24 mx-auto mb-3 text-primary-foreground" />
              <p className="text-sm text-primary-foreground/80">Scan to download</p>
            </div>
            
            {/* Notify Me */}
            <div className="hidden md:block bg-primary-foreground rounded-2xl p-6 max-w-xs text-foreground">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-secondary" />
                Get Notified
              </h4>
              <p className="text-sm text-muted-foreground mb-3">
                Be the first to know when our app launches!
              </p>
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="Your email"
                  className="flex-1 h-10 px-3 rounded-lg bg-muted border border-border text-sm focus:outline-none focus:ring-2 focus:ring-secondary/50"
                />
                <Button size="sm" className="bg-secondary hover:bg-secondary/90">
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}