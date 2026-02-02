import { Bot, Database, Network } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import MoneyGeneratorAnimation from "./MoneyGeneratorAnimation";

const differentiators = [
  {
    icon: Bot,
    title: "Fully Agentic",
    description: "Autonomous AI agents that reason, plan, and execute complex multi-step tasks without constant human oversight.",
  },
  {
    icon: Database,
    title: "Trained on Your Data",
    description: "Custom-trained models that understand your business context, terminology, and unique processes.",
  },
  {
    icon: Network,
    title: "Multi-Agent System",
    description: "Orchestrated teams of specialized agents that collaborate to solve complex enterprise challenges.",
  },
];

const Differentiators = () => {
  return (
    <section className="bg-midnight py-24 relative overflow-hidden">
      {/* Background animation */}
      <MoneyGeneratorAnimation />
      
      {/* Subtle gradient line at top */}
      <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-slate/40 to-transparent" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section header */}
        <ScrollReveal animation="fadeUp">
          <div className="text-center mb-16 space-y-4">
            <span className="text-amber text-sm font-semibold uppercase tracking-widest">
              Why Choose Us
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-semibold text-ivory">
              Built Different
            </h2>
          </div>
        </ScrollReveal>

        {/* Three columns */}
        <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
          {differentiators.map((item, index) => (
            <ScrollReveal key={item.title} animation="fadeUp" delay={index * 100}>
              <div className="text-center group">
                {/* Icon with glow on hover */}
                <div className="relative inline-flex mb-6">
                  <div className="absolute inset-0 bg-emerald/15 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-slate/40 to-slate/20 flex items-center justify-center border border-slate/20 group-hover:border-emerald/30 transition-colors duration-300">
                    <item.icon className="w-7 h-7 text-emerald" />
                  </div>
                </div>

                {/* Title */}
                <h3 className="font-display text-xl font-semibold text-ivory mb-3">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-ivory/50 leading-relaxed font-light">
                  {item.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Decorative dots */}
        <div className="flex justify-center gap-3 mt-16">
          {[0, 1, 2].map((i) => (
            <span 
              key={i} 
              className="w-2 h-2 rounded-full"
              style={{ 
                background: i === 1 ? 'hsl(160 84% 39%)' : 'hsl(215 25% 27% / 0.5)'
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Differentiators;
