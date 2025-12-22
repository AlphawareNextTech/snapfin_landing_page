import * as React from "react";
import { cn } from "@/lib/utils";
import { AlertCircle, CheckCircle2, Info, XCircle, X } from "lucide-react";

interface AlertBannerProps {
  variant?: "info" | "success" | "warning" | "error";
  title?: string;
  children: React.ReactNode;
  dismissible?: boolean;
  onDismiss?: () => void;
  className?: string;
}

const variantStyles = {
  info: {
    container: "bg-primary/10 border-primary/20 text-primary",
    icon: Info,
  },
  success: {
    container: "bg-secondary/10 border-secondary/20 text-secondary",
    icon: CheckCircle2,
  },
  warning: {
    container: "bg-accent/20 border-accent/30 text-accent-foreground",
    icon: AlertCircle,
  },
  error: {
    container: "bg-destructive/10 border-destructive/20 text-destructive",
    icon: XCircle,
  },
};

export function AlertBanner({
  variant = "info",
  title,
  children,
  dismissible = false,
  onDismiss,
  className,
}: AlertBannerProps) {
  const [isVisible, setIsVisible] = React.useState(true);
  const styles = variantStyles[variant];
  const Icon = styles.icon;

  if (!isVisible) return null;

  const handleDismiss = () => {
    setIsVisible(false);
    onDismiss?.();
  };

  return (
    <div
      role="alert"
      className={cn(
        "relative flex gap-3 p-4 rounded-xl border",
        styles.container,
        className
      )}
    >
      <Icon className="h-5 w-5 shrink-0 mt-0.5" />
      <div className="flex-1 min-w-0">
        {title && (
          <p className="font-semibold text-foreground mb-1">{title}</p>
        )}
        <div className="text-sm text-foreground/80">{children}</div>
      </div>
      {dismissible && (
        <button
          onClick={handleDismiss}
          className="shrink-0 p-1 rounded-lg hover:bg-background/50 transition-colors"
          aria-label="Dismiss alert"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
