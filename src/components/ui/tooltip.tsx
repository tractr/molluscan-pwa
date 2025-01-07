"use client"

import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"
import { useToast } from "@/hooks/use-toast"

import { cn } from "@/lib/utils"

const TooltipProvider = TooltipPrimitive.Provider

const Tooltip = ({ children, ...props }: { children: React.ReactNode } & TooltipPrimitive.TooltipProps) => {
  const [isTouchDevice, setIsTouchDevice] = React.useState(false);
  const { toast } = useToast();

  React.useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    const findTooltipContent = (children: React.ReactNode): React.ReactElement | null => {
      const childrenArray = React.Children.toArray(children);
      for (const child of childrenArray) {
        if (React.isValidElement(child)) {
          if (child.type === TooltipContent) {
            return child;
          }
          const found = findTooltipContent(child.props.children);
          if (found) return found;
        }
      }
      return null;
    };

    const tooltipContent = findTooltipContent(children);
    
    if (tooltipContent) {
      const content = React.Children.toArray(tooltipContent.props.children).find(
        child => React.isValidElement(child) && child.type === 'p'
      );

      toast({
        description: React.isValidElement(content) ? content.props.children : 'Info',
        duration: 2500,
        className: "top-5"
      });
    }
  };

  return (
    <TooltipPrimitive.Root 
      delayDuration={200}
      {...props}
    >
      {isTouchDevice ? (
        <div onTouchStart={handleTouchStart}>
          {children}
        </div>
      ) : (
        children
      )}
    </TooltipPrimitive.Root>
  );
};

const TooltipTrigger = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TooltipPrimitive.Trigger
    ref={ref}
    className={cn("cursor-pointer touch-none", className)}
    {...props}
  />
));
TooltipTrigger.displayName = TooltipPrimitive.Trigger.displayName;

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Portal>
    <TooltipPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "z-50 overflow-hidden rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className
      )}
      {...props}
    />
  </TooltipPrimitive.Portal>
))
TooltipContent.displayName = TooltipPrimitive.Content.displayName

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }
