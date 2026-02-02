import { ReactNode } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";

type AnimationType = "fadeUp" | "fadeLeft" | "fadeRight" | "scaleIn" | "blur";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  animation?: AnimationType;
  delay?: number;
  duration?: number;
  threshold?: number;
}

const animationClasses: Record<AnimationType, { initial: string; visible: string }> = {
  fadeUp: {
    initial: "opacity-0 translate-y-8",
    visible: "opacity-100 translate-y-0",
  },
  fadeLeft: {
    initial: "opacity-0 -translate-x-8",
    visible: "opacity-100 translate-x-0",
  },
  fadeRight: {
    initial: "opacity-0 translate-x-8",
    visible: "opacity-100 translate-x-0",
  },
  scaleIn: {
    initial: "opacity-0 scale-95",
    visible: "opacity-100 scale-100",
  },
  blur: {
    initial: "opacity-0 blur-sm",
    visible: "opacity-100 blur-0",
  },
};

const ScrollReveal = ({
  children,
  className,
  animation = "fadeUp",
  delay = 0,
  duration = 700,
  threshold = 0.1,
}: ScrollRevealProps) => {
  const { ref, isVisible } = useScrollAnimation({ threshold });
  const { initial, visible } = animationClasses[animation];

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all will-change-transform",
        isVisible ? visible : initial,
        className
      )}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      {children}
    </div>
  );
};

export default ScrollReveal;
