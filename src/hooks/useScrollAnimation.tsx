import { useEffect, useRef, useState } from "react";

interface UseScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export const useScrollAnimation = (options: UseScrollAnimationOptions = {}) => {
  const { threshold = 0.1, rootMargin = "0px 0px -50px 0px", triggerOnce = true } = options;
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce && ref.current) {
            observer.unobserve(ref.current);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [threshold, rootMargin, triggerOnce]);

  return { ref, isVisible };
};

// Animation variants for different effects
export const scrollAnimationVariants = {
  fadeUp: "opacity-0 translate-y-8",
  fadeUpVisible: "opacity-100 translate-y-0",
  fadeLeft: "opacity-0 -translate-x-8",
  fadeLeftVisible: "opacity-100 translate-x-0",
  fadeRight: "opacity-0 translate-x-8",
  fadeRightVisible: "opacity-100 translate-x-0",
  scaleIn: "opacity-0 scale-95",
  scaleInVisible: "opacity-100 scale-100",
  blur: "opacity-0 blur-sm",
  blurVisible: "opacity-100 blur-0",
};
