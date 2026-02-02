import { useState, useEffect } from "react";
import { Bot, Zap, CheckCircle2, ArrowRight, Sparkles } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";

const agentSteps = [
  { id: 1, agent: "Analyst Agent", action: "Analyzing customer request...", duration: 2000 },
  { id: 2, agent: "Data Agent", action: "Fetching relevant data from CRM...", duration: 1800 },
  { id: 3, agent: "Decision Agent", action: "Processing with GPT-4 Turbo...", duration: 2200 },
  { id: 4, agent: "Action Agent", action: "Executing automated response...", duration: 1500 },
];

const AgentDemo = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([]);

  // Generate floating particles
  useEffect(() => {
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 5,
    }));
    setParticles(newParticles);
  }, []);

  // Cycle through agent steps
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => {
        if (prev >= agentSteps.length - 1) {
          setIsComplete(true);
          setTimeout(() => {
            setIsComplete(false);
            setActiveStep(0);
          }, 2000);
          return prev;
        }
        return prev + 1;
      });
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  // Typing animation for current step
  useEffect(() => {
    if (isComplete) return;

    const currentAction = agentSteps[activeStep]?.action || "";
    setTypedText("");

    let charIndex = 0;
    const typeInterval = setInterval(() => {
      if (charIndex < currentAction.length) {
        setTypedText(currentAction.slice(0, charIndex + 1));
        charIndex++;
      } else {
        clearInterval(typeInterval);
      }
    }, 30);

    return () => clearInterval(typeInterval);
  }, [activeStep, isComplete]);

  return (
    <section id="demo" className="bg-midnight py-24 relative overflow-hidden">
      {/* Animated particle background */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute w-1 h-1 rounded-full bg-emerald/30"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              animation: `float ${3 + particle.delay}s ease-in-out infinite`,
              animationDelay: `${particle.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Flowing connection lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
        <defs>
          <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(160 84% 39%)" stopOpacity="0" />
            <stop offset="50%" stopColor="hsl(160 84% 39%)" stopOpacity="1" />
            <stop offset="100%" stopColor="hsl(160 84% 39%)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M0,200 Q400,100 800,200 T1600,200"
          stroke="url(#flowGradient)"
          strokeWidth="2"
          fill="none"
          className="animate-flow-path"
        />
        <path
          d="M0,300 Q400,400 800,300 T1600,300"
          stroke="url(#flowGradient)"
          strokeWidth="2"
          fill="none"
          className="animate-flow-path"
          style={{ animationDelay: "1s" }}
        />
      </svg>

      <div className="container mx-auto px-6 relative z-10">
        <ScrollReveal animation="fadeUp">
          <div className="text-center mb-16 space-y-4">
            <span className="text-emerald text-sm font-semibold uppercase tracking-widest flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4 animate-pulse" />
              Live Agent Demo
              <Sparkles className="w-4 h-4 animate-pulse" />
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-semibold text-ivory">
              Watch Our Agents in Action
            </h2>
          </div>
        </ScrollReveal>

        <ScrollReveal animation="scaleIn" delay={200}>
          <div className="max-w-4xl mx-auto">
            {/* Main demo container */}
            <div className="relative bg-gradient-to-br from-slate/40 to-slate/20 rounded-3xl border border-slate/30 p-8 md:p-12 backdrop-blur-sm overflow-hidden">
              {/* Animated glow effect */}
              <div
                className="absolute inset-0 opacity-30 pointer-events-none transition-all duration-1000"
                style={{
                  background: `radial-gradient(circle at ${30 + activeStep * 15}% 50%, hsl(160 84% 39% / 0.3), transparent 50%)`,
                }}
              />

              {/* Terminal-style header */}
              <div className="flex items-center gap-2 mb-8 pb-4 border-b border-slate/30">
                <div className="flex gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500/80" />
                  <span className="w-3 h-3 rounded-full bg-amber/80" />
                  <span className="w-3 h-3 rounded-full bg-emerald/80" />
                </div>
                <span className="text-ivory/40 text-sm ml-4 font-mono">agentflow-orchestrator.exe</span>
              </div>

              {/* Agent workflow visualization */}
              <div className="grid md:grid-cols-4 gap-4 mb-8">
                {agentSteps.map((step, index) => (
                  <div
                    key={step.id}
                    className={`relative p-4 rounded-xl border transition-all duration-500 ${index === activeStep
                        ? "bg-emerald/10 border-emerald/50 scale-105"
                        : index < activeStep || isComplete
                          ? "bg-slate/20 border-emerald/30"
                          : "bg-slate/10 border-slate/30"
                      }`}
                  >
                    {/* Connection line */}
                    {index < agentSteps.length - 1 && (
                      <div className="hidden md:block absolute top-1/2 -right-4 w-4 h-0.5">
                        <div
                          className={`h-full transition-all duration-500 ${index < activeStep || isComplete ? "bg-emerald" : "bg-slate/30"
                            }`}
                          style={{
                            width: index < activeStep || isComplete ? "100%" : "0%",
                          }}
                        />
                        <ArrowRight
                          className={`absolute -right-2 -top-2 w-4 h-4 transition-colors duration-500 ${index < activeStep || isComplete ? "text-emerald" : "text-slate/30"
                            }`}
                        />
                      </div>
                    )}

                    {/* Agent icon */}
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 transition-all duration-500 ${index === activeStep
                          ? "bg-emerald text-midnight animate-pulse"
                          : index < activeStep || isComplete
                            ? "bg-emerald/20 text-emerald"
                            : "bg-slate/30 text-ivory/40"
                        }`}
                    >
                      {index < activeStep || isComplete ? (
                        <CheckCircle2 className="w-5 h-5" />
                      ) : index === activeStep ? (
                        <Zap className="w-5 h-5 animate-pulse" />
                      ) : (
                        <Bot className="w-5 h-5" />
                      )}
                    </div>

                    {/* Agent name */}
                    <p
                      className={`text-sm font-medium transition-colors duration-300 ${index === activeStep ? "text-emerald" : "text-ivory/70"
                        }`}
                    >
                      {step.agent}
                    </p>
                  </div>
                ))}
              </div>

              {/* Typing animation display */}
              <div className="bg-midnight/50 rounded-xl p-6 border border-slate/20">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald/20 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-emerald" />
                  </div>
                  <div className="flex-1">
                    <p className="text-ivory/40 text-xs mb-2 font-mono">
                      {agentSteps[activeStep]?.agent || "System"}
                    </p>
                    <p className="text-ivory font-mono text-sm min-h-[1.5rem]">
                      {isComplete ? (
                        <span className="text-emerald flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4" />
                          Task completed successfully! Response sent to customer.
                        </span>
                      ) : (
                        <>
                          {typedText}
                          <span className="inline-block w-2 h-4 bg-emerald ml-1 animate-blink" />
                        </>
                      )}
                    </p>
                  </div>
                </div>
              </div>

              {/* Processing indicators */}
              <div className="flex items-center justify-between mt-6 pt-6 border-t border-slate/20">
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald animate-pulse" />
                    <span className="text-ivory/50 text-xs">4 Agents Active</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-amber animate-pulse" />
                    <span className="text-ivory/50 text-xs">Processing: GPT-4 Turbo</span>
                  </div>
                </div>
                <div className="text-ivory/40 text-xs font-mono">
                  Latency: <span className="text-emerald">42ms</span>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default AgentDemo;
