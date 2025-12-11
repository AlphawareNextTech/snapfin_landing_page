import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface FAQItem {
  id: string;
  question: string;
  answer: React.ReactNode;
}

interface FAQAccordionProps {
  items: FAQItem[];
  className?: string;
  defaultOpenId?: string;
}

export function FAQAccordion({ items, className, defaultOpenId }: FAQAccordionProps) {
  return (
    <AccordionPrimitive.Root
      type="single"
      collapsible
      defaultValue={defaultOpenId}
      className={cn("space-y-3", className)}
    >
      {items.map((item) => (
        <AccordionPrimitive.Item
          key={item.id}
          value={item.id}
          className="rounded-xl border border-border bg-card overflow-hidden transition-all data-[state=open]:shadow-snapfin-md"
        >
          <AccordionPrimitive.Header className="flex">
            <AccordionPrimitive.Trigger
              className={cn(
                "flex flex-1 items-center justify-between p-5 text-left font-semibold text-foreground transition-all",
                "hover:bg-muted/50",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-secondary/50",
                "[&[data-state=open]>svg]:rotate-180"
              )}
              aria-expanded={undefined} // Let Radix handle this
            >
              {item.question}
              <ChevronDown
                className="h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200"
                aria-hidden="true"
              />
            </AccordionPrimitive.Trigger>
          </AccordionPrimitive.Header>
          <AccordionPrimitive.Content
            className={cn(
              "overflow-hidden text-sm text-muted-foreground transition-all",
              "data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
            )}
          >
            <div className="px-5 pb-5 pt-0 leading-relaxed">
              {item.answer}
            </div>
          </AccordionPrimitive.Content>
        </AccordionPrimitive.Item>
      ))}
    </AccordionPrimitive.Root>
  );
}
