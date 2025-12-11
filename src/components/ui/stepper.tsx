import * as React from "react";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface Step {
  id: string;
  title: string;
  description?: string;
}

interface StepperProps {
  steps: Step[];
  currentStep: number;
  className?: string;
  orientation?: "horizontal" | "vertical";
}

export function Stepper({
  steps,
  currentStep,
  className,
  orientation = "horizontal",
}: StepperProps) {
  return (
    <nav
      aria-label="Progress"
      className={cn(
        orientation === "horizontal"
          ? "w-full"
          : "flex flex-col",
        className
      )}
    >
      <ol
        className={cn(
          "flex",
          orientation === "horizontal"
            ? "items-center justify-between"
            : "flex-col gap-4"
        )}
      >
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;
          const isUpcoming = index > currentStep;

          return (
            <li
              key={step.id}
              className={cn(
                "relative",
                orientation === "horizontal" && "flex-1",
                orientation === "horizontal" && index !== steps.length - 1 && "pr-8"
              )}
            >
              <div
                className={cn(
                  "flex items-center",
                  orientation === "vertical" && "gap-4"
                )}
              >
                {/* Step indicator */}
                <div
                  className={cn(
                    "relative flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300",
                    isCompleted && "bg-secondary border-secondary text-secondary-foreground",
                    isCurrent && "border-secondary bg-background text-secondary",
                    isUpcoming && "border-border bg-background text-muted-foreground"
                  )}
                >
                  {isCompleted ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <span className="text-sm font-semibold">{index + 1}</span>
                  )}
                </div>

                {/* Step content */}
                <div
                  className={cn(
                    orientation === "horizontal" && "hidden sm:block ml-4",
                    orientation === "vertical" && "flex-1"
                  )}
                >
                  <p
                    className={cn(
                      "text-sm font-semibold transition-colors",
                      isCurrent || isCompleted
                        ? "text-foreground"
                        : "text-muted-foreground"
                    )}
                  >
                    {step.title}
                  </p>
                  {step.description && (
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {step.description}
                    </p>
                  )}
                </div>
              </div>

              {/* Connector line (horizontal) */}
              {orientation === "horizontal" && index !== steps.length - 1 && (
                <div
                  className={cn(
                    "absolute top-5 left-10 w-full h-0.5 -translate-y-1/2",
                    isCompleted ? "bg-secondary" : "bg-border"
                  )}
                />
              )}

              {/* Connector line (vertical) */}
              {orientation === "vertical" && index !== steps.length - 1 && (
                <div
                  className={cn(
                    "absolute left-5 top-10 w-0.5 h-full -translate-x-1/2",
                    isCompleted ? "bg-secondary" : "bg-border"
                  )}
                  style={{ height: "calc(100% + 1rem)" }}
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

interface StepperContentProps {
  children: React.ReactNode;
  className?: string;
}

export function StepperContent({ children, className }: StepperContentProps) {
  return (
    <div className={cn("animate-fade-in", className)}>
      {children}
    </div>
  );
}
