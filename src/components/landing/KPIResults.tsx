import { useEffect, useState, useRef } from "react";
import { TrendingUp, Clock, CheckCircle, Sparkles, ArrowUpRight } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";

interface Metric {
  value: number;
  suffix: string;
  label: string;
  description: string;
  color: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  comparison: string;
}

const metrics: Metric[] = [
  { 
    value: 15, 
    suffix: "x", 
    label: "ROI", 
    description: "Return on investment in the first year",
    color: "hsl(160 84% 39%)",
    icon: TrendingUp,
    comparison: "vs. industry avg 3x",
  },
  { 
    value: 55, 
    suffix: "%", 
    label: "Faster Response", 
    description: "Decreased average response time",
    color: "hsl(38 92% 50%)",
    icon: Clock,
    comparison: "2.3s → 1.03s avg",
  },
  { 
    value: 98, 
    suffix: "%", 
    label: "Resolution Rate", 
    description: "Issues resolved automatically",
    color: "hsl(215 50% 55%)",
    icon: CheckCircle,
    comparison: "+45% improvement",
  },
];

const AnimatedCounter = ({ 
  target, 
  suffix,
  color,
  duration = 2000 
}: { 
  target: number; 
  suffix: string;
  color: string;
  duration?: number 
}) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeOut * target));

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setIsComplete(true);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, target, duration]);

  return (
    <span ref={ref} className="relative inline-block">
      <span 
        className="font-display text-6xl md:text-7xl font-bold tabular-nums transition-all duration-300"
        style={{ color: isComplete ? color : 'hsl(40 33% 98%)' }}
      >
        {count}{suffix}
      </span>
      {isComplete && (
        <Sparkles 
          className="absolute -top-2 -right-6 w-5 h-5 animate-pulse"
          style={{ color }}
        />
      )}
    </span>
  );
};

// Animated circular progress
const CircularProgress = ({ 
  value, 
  color, 
  isVisible 
}: { 
  value: number; 
  color: string; 
  isVisible: boolean;
}) => {
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (value / 100) * circumference;

  return (
    <svg className="w-32 h-32 -rotate-90" viewBox="0 0 100 100">
      <circle
        cx="50"
        cy="50"
        r="45"
        fill="none"
        stroke="hsl(215 25% 20%)"
        strokeWidth="6"
      />
      <circle
        cx="50"
        cy="50"
        r="45"
        fill="none"
        stroke={color}
        strokeWidth="6"
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={isVisible ? strokeDashoffset : circumference}
        className="transition-all duration-[2000ms] ease-out"
      />
    </svg>
  );
};

const KPIResults = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="bg-midnight py-24 relative overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full opacity-20"
            style={{
              width: `${4 + (i % 3) * 2}px`,
              height: `${4 + (i % 3) * 2}px`,
              left: `${5 + i * 8}%`,
              top: `${15 + (i % 5) * 18}%`,
              background: i % 2 === 0 ? 'hsl(160 84% 39%)' : 'hsl(38 92% 50%)',
              animation: `float ${4 + i * 0.3}s ease-in-out infinite`,
              animationDelay: `${i * 0.2}s`,
            }}
          />
        ))}
      </div>

      {/* Background glow */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] opacity-5 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, hsl(160 84% 39%), transparent 60%)'
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section header */}
        <ScrollReveal animation="fadeUp">
          <div className="text-center mb-20 space-y-4">
            <span className="text-emerald text-sm font-semibold uppercase tracking-widest inline-flex items-center gap-2">
              <ArrowUpRight className="w-4 h-4" />
              Proven Results
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-ivory tracking-tight">
              Real Impact, Measurable ROI
            </h2>
            <p className="text-ivory/50 max-w-2xl mx-auto text-lg">
              See the transformative results our enterprise clients achieve
            </p>
          </div>
        </ScrollReveal>

        {/* Metrics cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-10 max-w-5xl mx-auto">
          {metrics.map((metric, index) => {
            const IconComponent = metric.icon;
            const normalizedValue = metric.suffix === 'x' ? (metric.value / 20) * 100 : metric.value;
            
            return (
              <ScrollReveal key={metric.label} animation="fadeUp" delay={index * 150}>
                <div 
                  className="relative group"
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  {/* Card */}
                  <div
                    className={`relative bg-slate/10 border rounded-3xl p-8 text-center backdrop-blur-sm overflow-hidden transition-all duration-500 ${
                      hoveredCard === index 
                        ? 'border-opacity-100 scale-[1.03] shadow-xl' 
                        : 'border-slate/20 hover:border-slate/40'
                    }`}
                    style={{
                      borderColor: hoveredCard === index ? metric.color : undefined,
                      boxShadow: hoveredCard === index ? `0 20px 60px ${metric.color}20` : undefined,
                    }}
                  >
                    {/* Animated top glow */}
                    <div 
                      className={`absolute top-0 left-0 right-0 h-1 transition-all duration-500 ${
                        hoveredCard === index ? 'opacity-100' : 'opacity-0'
                      }`}
                      style={{ 
                        background: `linear-gradient(90deg, transparent, ${metric.color}, transparent)` 
                      }}
                    />

                    {/* Shimmer effect on hover */}
                    {hoveredCard === index && (
                      <div className="absolute inset-0 animate-shimmer opacity-20 pointer-events-none" />
                    )}
                    
                    {/* Circular progress behind icon */}
                    <div className="relative w-32 h-32 mx-auto mb-4">
                      <CircularProgress 
                        value={normalizedValue} 
                        color={metric.color} 
                        isVisible={isVisible} 
                      />
                      <div 
                        className={`absolute inset-0 flex items-center justify-center transition-transform duration-500 ${
                          hoveredCard === index ? 'scale-110' : ''
                        }`}
                      >
                        <div 
                          className="w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500"
                          style={{ 
                            background: `${metric.color}20`,
                            boxShadow: hoveredCard === index ? `0 0 30px ${metric.color}40` : undefined,
                          }}
                        >
                          <IconComponent 
                            className="w-7 h-7 transition-transform duration-300" 
                            style={{ 
                              color: metric.color,
                              transform: hoveredCard === index ? 'scale(1.1)' : 'scale(1)',
                            }} 
                          />
                        </div>
                      </div>
                    </div>

                    {/* Counter */}
                    <div className="mb-4">
                      <AnimatedCounter 
                        target={metric.value} 
                        suffix={metric.suffix} 
                        color={metric.color}
                      />
                    </div>

                    {/* Label */}
                    <h3 className="text-ivory font-semibold text-xl mb-2">
                      {metric.label}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-ivory/50 text-sm mb-4">
                      {metric.description}
                    </p>

                    {/* Comparison badge */}
                    <div 
                      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${
                        hoveredCard === index ? 'bg-opacity-30 scale-105' : 'bg-opacity-10'
                      }`}
                      style={{ 
                        background: `${metric.color}15`,
                        color: metric.color,
                      }}
                    >
                      <ArrowUpRight className="w-3 h-3" />
                      {metric.comparison}
                    </div>

                    {/* Animated progress bar */}
                    <div className="mt-6 h-1.5 rounded-full bg-slate/20 overflow-hidden">
                      <div 
                        className="h-full rounded-full transition-all duration-[2000ms] ease-out relative overflow-hidden"
                        style={{ 
                          background: `linear-gradient(90deg, ${metric.color}, ${metric.color}80)`,
                          width: isVisible ? `${normalizedValue}%` : '0%',
                        }}
                      >
                        {/* Shimmer on bar */}
                        <div 
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                          style={{
                            animation: isVisible ? 'shimmer 2s ease-in-out infinite' : 'none',
                            animationDelay: `${index * 0.3}s`,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default KPIResults;
