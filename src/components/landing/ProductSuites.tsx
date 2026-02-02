import { useState } from "react";
import { Users, TrendingUp, ShoppingCart, ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import ScrollReveal from "@/components/ui/ScrollReveal";

const suites = [
  {
    id: "hr",
    title: "HR Suite",
    description: "Automate recruiting, onboarding, and employee management with AI-powered workflows.",
    icon: Users,
    color: "emerald",
    features: ["Smart Recruiting", "Auto-Onboarding", "Performance Analytics"],
    stats: { label: "Time Saved", value: "65%" },
  },
  {
    id: "marketing",
    title: "Marketing Suite",
    description: "Optimize campaigns, generate content, and analyze customer behavior at scale.",
    icon: TrendingUp,
    color: "amber",
    features: ["Content Generation", "Campaign Automation", "Predictive Analytics"],
    stats: { label: "ROI Increase", value: "3.2x" },
  },
  {
    id: "procurement",
    title: "Procurement Suite",
    description: "Streamline vendor management, automate purchases, and reduce costs intelligently.",
    icon: ShoppingCart,
    color: "emerald",
    features: ["Vendor Intelligence", "Auto-Purchasing", "Cost Optimization"],
    stats: { label: "Cost Reduction", value: "40%" },
  },
];

const ProductSuites = () => {
  const [activeCard, setActiveCard] = useState<string | null>(null);
  const [hoveredFeature, setHoveredFeature] = useState<string | null>(null);

  return (
    <section className="bg-midnight py-24 relative overflow-hidden">
      {/* Animated background accent */}
      <div 
        className="absolute top-0 right-0 w-1/2 h-1/2 opacity-5 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at top right, hsl(160 84% 39%), transparent 60%)'
        }}
      />
      
      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-emerald/20"
            style={{
              left: `${10 + i * 12}%`,
              top: `${20 + (i % 4) * 20}%`,
              animation: `float ${5 + i * 0.5}s ease-in-out infinite`,
              animationDelay: `${i * 0.3}s`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section header */}
        <ScrollReveal animation="fadeUp">
          <div className="text-center mb-16 space-y-4">
            <span className="text-emerald text-sm font-semibold uppercase tracking-widest inline-flex items-center gap-2">
              <Sparkles className="w-4 h-4 animate-pulse" />
              Product Suites
              <Sparkles className="w-4 h-4 animate-pulse" />
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-semibold text-ivory">
              AI Agents for Every Department
            </h2>
            <p className="text-ivory/50 max-w-2xl mx-auto text-lg font-light">
              Deploy specialized AI agents tailored to your team's unique workflows
            </p>
          </div>
        </ScrollReveal>

        {/* Cards grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {suites.map((suite, index) => (
            <ScrollReveal key={suite.id} animation="fadeUp" delay={index * 150}>
              <div
                className={`card-hover group relative bg-card border rounded-2xl p-8 backdrop-blur-sm h-full transition-all duration-500 ${
                  activeCard === suite.id 
                    ? 'border-emerald/50 scale-[1.02]' 
                    : 'border-slate/20 hover:border-slate/40'
                }`}
                onMouseEnter={() => setActiveCard(suite.id)}
                onMouseLeave={() => setActiveCard(null)}
              >
                {/* Animated gradient border on hover */}
                <div 
                  className={`absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 pointer-events-none ${
                    activeCard === suite.id ? 'opacity-100' : 'group-hover:opacity-50'
                  }`}
                  style={{
                    background: 'radial-gradient(circle at 50% 0%, hsl(160 84% 39% / 0.15), transparent 60%)'
                  }}
                />

                {/* Shimmer effect on active */}
                {activeCard === suite.id && (
                  <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
                    <div className="absolute inset-0 animate-shimmer opacity-30" />
                  </div>
                )}

                {/* Icon with pulse animation */}
                <div className={`relative w-16 h-16 rounded-xl flex items-center justify-center mb-6 transition-all duration-500 ${
                  activeCard === suite.id 
                    ? 'bg-emerald/20 scale-110' 
                    : 'bg-slate/30 group-hover:bg-slate/40'
                }`}>
                  <suite.icon className={`w-8 h-8 transition-colors duration-300 ${
                    suite.color === 'amber' ? 'text-amber' : 'text-emerald'
                  }`} />
                  {activeCard === suite.id && (
                    <div className="absolute inset-0 rounded-xl animate-ping bg-emerald/20" />
                  )}
                </div>

                {/* Stats badge */}
                <div className={`absolute top-6 right-6 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-500 ${
                  activeCard === suite.id 
                    ? 'bg-emerald/20 text-emerald scale-110' 
                    : 'bg-slate/20 text-ivory/50'
                }`}>
                  {suite.stats.label}: {suite.stats.value}
                </div>

                {/* Content */}
                <h3 className="font-display text-2xl font-semibold text-ivory mb-3">
                  {suite.title}
                </h3>
                <p className="text-ivory/50 mb-6 leading-relaxed font-light">
                  {suite.description}
                </p>

                {/* Features list with stagger animation */}
                <ul className="space-y-3 mb-8">
                  {suite.features.map((feature, featureIndex) => (
                    <li 
                      key={feature} 
                      className={`flex items-center gap-3 text-sm transition-all duration-300 cursor-default ${
                        hoveredFeature === `${suite.id}-${feature}` 
                          ? 'text-ivory translate-x-2' 
                          : 'text-ivory/60'
                      }`}
                      onMouseEnter={() => setHoveredFeature(`${suite.id}-${feature}`)}
                      onMouseLeave={() => setHoveredFeature(null)}
                      style={{
                        transitionDelay: activeCard === suite.id ? `${featureIndex * 50}ms` : '0ms',
                      }}
                    >
                      <CheckCircle2 className={`w-4 h-4 transition-colors duration-300 ${
                        hoveredFeature === `${suite.id}-${feature}` 
                          ? 'text-emerald' 
                          : 'text-slate/50'
                      }`} />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Go button with enhanced animation */}
                <Button
                  variant="outline"
                  className={`w-full rounded-xl group/btn transition-all duration-300 ${
                    activeCard === suite.id 
                      ? 'border-emerald/50 bg-emerald/10 text-emerald hover:bg-emerald/20' 
                      : 'border-slate/30 text-ivory hover:bg-slate/20 hover:border-slate/50'
                  }`}
                >
                  <span>Explore Suite</span>
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
                </Button>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductSuites;
