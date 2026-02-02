import { useState, useEffect, useRef } from "react";
import { Database, Cpu, Layers, Building2, ChevronRight, Zap, Sparkles } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";

const layers = [
  {
    id: "applications",
    label: "Industry Applications",
    description: "Tailored AI solutions for specific verticals",
    icon: Building2,
    items: ["Healthcare", "Finance", "Retail", "Manufacturing"],
    color: "hsl(160 84% 39%)",
    gradient: "from-emerald/20 to-emerald/5",
  },
  {
    id: "models",
    label: "Foundation Models",
    description: "Best-in-class LLMs for every use case",
    icon: Cpu,
    items: ["Claude 3.5", "GPT-4", "Llama 3", "Gemini Pro"],
    color: "hsl(38 92% 50%)",
    gradient: "from-amber/20 to-amber/5",
  },
  {
    id: "data",
    label: "Scale Data Engine",
    description: "Enterprise-grade data infrastructure",
    icon: Database,
    items: ["Data Pipeline", "Vector Store", "Knowledge Graph", "Fine-tuning"],
    color: "hsl(215 50% 55%)",
    gradient: "from-slate/30 to-slate/10",
  },
];

// Animated data packet flowing between layers
const DataPacket = ({ fromY, toY, delay, color }: { fromY: number; toY: number; delay: number; color: string }) => {
  return (
    <div
      className="absolute left-1/2 -translate-x-1/2 w-2 h-2 rounded-full z-20"
      style={{
        background: color,
        boxShadow: `0 0 10px ${color}`,
        animation: `dataFlow 2s ease-in-out infinite`,
        animationDelay: `${delay}s`,
      }}
    />
  );
};

const TechStack = () => {
  const [activeLayer, setActiveLayer] = useState<string | null>(null);
  const [hoveredTag, setHoveredTag] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
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
    <section id="technology" ref={sectionRef} className="bg-midnight py-24 relative overflow-hidden">
      {/* Animated background grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(hsl(215 25% 40%) 1px, transparent 1px),
            linear-gradient(90deg, hsl(215 25% 40%) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${3 + (i % 3)}px`,
              height: `${3 + (i % 3)}px`,
              left: `${10 + i * 9}%`,
              top: `${20 + (i % 4) * 20}%`,
              background: i % 3 === 0 ? 'hsl(160 84% 39%)' : i % 3 === 1 ? 'hsl(38 92% 50%)' : 'hsl(215 50% 55%)',
              opacity: 0.3,
              animation: `float ${4 + i * 0.4}s ease-in-out infinite`,
              animationDelay: `${i * 0.2}s`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section header */}
        <ScrollReveal animation="fadeUp">
          <div className="text-center mb-20 space-y-4">
            <span className="text-emerald text-sm font-semibold uppercase tracking-widest inline-flex items-center gap-2">
              <Zap className="w-4 h-4 animate-pulse" />
              Technology
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-ivory tracking-tight">
              Enterprise-Grade Architecture
            </h2>
            <p className="text-ivory/50 max-w-2xl mx-auto text-lg">
              Built on cutting-edge foundation models with a scalable data engine
            </p>
          </div>
        </ScrollReveal>

        <div className="max-w-5xl mx-auto">
          {/* Stack visualization */}
          <ScrollReveal animation="fadeUp" delay={100}>
            <div className="relative space-y-4">
              {/* Animated connection line */}
              <div className="absolute left-8 top-0 bottom-0 w-px hidden md:block">
                <div
                  className="h-full w-full transition-all duration-1000"
                  style={{
                    background: isVisible
                      ? 'linear-gradient(to bottom, hsl(160 84% 39%), hsl(38 92% 50%), hsl(215 50% 55%))'
                      : 'transparent',
                    opacity: 0.3,
                  }}
                />
                {/* Animated particles on the line */}
                {isVisible && [0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="absolute left-1/2 -translate-x-1/2 w-2 h-2 rounded-full"
                    style={{
                      background: i === 0 ? 'hsl(160 84% 39%)' : i === 1 ? 'hsl(38 92% 50%)' : 'hsl(215 50% 55%)',
                      boxShadow: `0 0 8px ${i === 0 ? 'hsl(160 84% 39%)' : i === 1 ? 'hsl(38 92% 50%)' : 'hsl(215 50% 55%)'}`,
                      animation: `dataFlowDown 3s ease-in-out infinite`,
                      animationDelay: `${i * 1}s`,
                    }}
                  />
                ))}
              </div>

              {layers.map((layer, index) => {
                const IconComponent = layer.icon;
                const isActive = activeLayer === layer.id;

                return (
                  <div
                    key={layer.id}
                    className={`relative rounded-2xl border transition-all duration-500 cursor-pointer overflow-hidden ${isActive
                      ? 'border-opacity-100 bg-gradient-to-r scale-[1.02] shadow-xl'
                      : 'border-slate/20 bg-slate/5 hover:bg-slate/10'
                      } ${isActive ? layer.gradient : ''}`}
                    style={{
                      borderColor: isActive ? layer.color : undefined,
                      boxShadow: isActive ? `0 10px 40px ${layer.color}15` : undefined,
                      animationDelay: `${index * 150}ms`,
                    }}
                    onMouseEnter={() => setActiveLayer(layer.id)}
                    onMouseLeave={() => setActiveLayer(null)}
                  >
                    {/* Shimmer effect on active */}
                    {isActive && (
                      <div className="absolute inset-0 animate-shimmer opacity-20 pointer-events-none" />
                    )}

                    {/* Left accent bar with pulse */}
                    <div
                      className={`absolute left-0 top-0 bottom-0 w-1 transition-all duration-300 ${isActive ? 'animate-pulse' : ''
                        }`}
                      style={{
                        background: layer.color,
                        opacity: isActive ? 1 : 0.3,
                        boxShadow: isActive ? `0 0 15px ${layer.color}` : undefined,
                      }}
                    />

                    <div className="p-6 md:p-8 pl-8">
                      <div className="flex flex-col md:flex-row md:items-center gap-6">
                        {/* Icon and title */}
                        <div className="flex items-center gap-4 md:w-72">
                          <div
                            className={`w-14 h-14 rounded-xl flex items-center justify-center shrink-0 transition-all duration-500 ${isActive ? 'scale-110' : ''
                              }`}
                            style={{
                              background: isActive ? `${layer.color}30` : `${layer.color}15`,
                              boxShadow: isActive ? `0 0 25px ${layer.color}40` : undefined,
                            }}
                          >
                            <IconComponent
                              className={`w-7 h-7 transition-all duration-300 ${isActive ? 'animate-pulse' : ''}`}
                              style={{ color: layer.color }}
                            />
                          </div>
                          <div>
                            <h3 className="font-semibold text-ivory text-lg flex items-center gap-2" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
                              {layer.label}
                              {isActive && <Sparkles className="w-4 h-4 text-amber animate-pulse" />}
                            </h3>
                            <p className="text-ivory/50 text-sm hidden md:block" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
                              {layer.description}
                            </p>
                          </div>
                        </div>

                        {/* Tags with stagger animation */}
                        <div className="flex flex-wrap gap-2 flex-1">
                          {layer.items.map((item, itemIndex) => (
                            <span
                              key={item}
                              className={`px-4 py-2 text-sm rounded-full transition-all duration-300 cursor-default ${hoveredTag === `${layer.id}-${item}`
                                ? 'scale-110 shadow-lg'
                                : isActive
                                  ? 'text-ivory bg-midnight/30'
                                  : 'text-ivory/60 bg-slate/10'
                                }`}
                              style={{
                                borderColor: hoveredTag === `${layer.id}-${item}` ? layer.color : isActive ? `${layer.color}40` : 'transparent',
                                borderWidth: '1px',
                                boxShadow: hoveredTag === `${layer.id}-${item}` ? `0 0 15px ${layer.color}30` : undefined,
                                animationDelay: isActive ? `${itemIndex * 50}ms` : '0ms',
                                fontFamily: 'DM Sans, system-ui, sans-serif'
                              }}
                              onMouseEnter={() => setHoveredTag(`${layer.id}-${item}`)}
                              onMouseLeave={() => setHoveredTag(null)}
                            >
                              {item}
                            </span>
                          ))}
                        </div>

                        {/* Arrow with bounce */}
                        <ChevronRight
                          className={`w-5 h-5 shrink-0 transition-all duration-300 hidden md:block ${isActive ? 'translate-x-2 text-ivory' : 'text-ivory/30'
                            }`}
                        />
                      </div>
                    </div>

                    {/* Connection line to next layer */}
                    {index < layers.length - 1 && (
                      <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-px h-4 bg-gradient-to-b from-slate/30 to-transparent z-10" />
                    )}
                  </div>
                );
              })}
            </div>
          </ScrollReveal>

          {/* Bottom decoration with animation */}
          <ScrollReveal animation="fadeUp" delay={200}>
            <div className="mt-12 flex items-center justify-center gap-4 text-ivory/40 text-sm">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-slate/30" />
              <Layers className="w-5 h-5 animate-pulse" />
              <span>Fully integrated stack</span>
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-slate/30" />
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* Add keyframe for data flow animation */}
      <style>{`
        @keyframes dataFlowDown {
          0% { top: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
      `}</style>
    </section>
  );
};

export default TechStack;
