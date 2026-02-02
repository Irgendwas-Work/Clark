import { useState } from "react";
import { ArrowRight, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import ScrollReveal from "@/components/ui/ScrollReveal";

const FinalCTA = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle email submission
    console.log("Email submitted:", email);
    setEmail("");
  };

  return (
    <section className="light-section bg-ivory py-24 md:py-32 relative overflow-hidden">
      {/* Large organic shape - Left (Emerald) */}
      <div
        className="absolute -left-64 top-0 w-[600px] h-[600px] pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, hsl(160 84% 50%) 0%, hsl(160 84% 60%) 100%)',
          borderRadius: '45% 55% 60% 40% / 50% 45% 55% 50%',
          opacity: 0.15,
          transform: 'rotate(-15deg)',
        }}
      />

      {/* Large organic shape - Right (Amber/Coral) */}
      <div
        className="absolute -right-48 -bottom-32 w-[700px] h-[700px] pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, hsl(38 92% 60%) 0%, hsl(10 80% 60%) 100%)',
          borderRadius: '60% 40% 45% 55% / 55% 60% 40% 45%',
          opacity: 0.12,
          transform: 'rotate(25deg)',
        }}
      />

      {/* Secondary organic shapes for depth */}
      <div
        className="absolute left-20 bottom-20 w-[300px] h-[300px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, hsl(160 84% 50%) 0%, transparent 70%)',
          borderRadius: '50% 45% 55% 50% / 45% 60% 40% 55%',
          opacity: 0.08,
        }}
      />

      <div
        className="absolute right-32 top-32 w-[250px] h-[250px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, hsl(215 50% 55%) 0%, transparent 70%)',
          borderRadius: '45% 55% 50% 50% / 60% 40% 60% 40%',
          opacity: 0.06,
        }}
      />

      {/* Floating decorative dots pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-pulse"
            style={{
              width: `${5 + (i % 3) * 3}px`,
              height: `${5 + (i % 3) * 3}px`,
              left: `${10 + i * 6}%`,
              top: `${15 + (i % 7) * 12}%`,
              background: i % 3 === 0 ? 'hsl(160 84% 50%)' : i % 3 === 1 ? 'hsl(38 92% 60%)' : 'hsl(215 50% 55%)',
              opacity: 0.3,
              animationDelay: `${i * 0.2}s`,
              animationDuration: `${3 + i * 0.2}s`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <ScrollReveal animation="fadeUp">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            {/* Headline */}
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-midnight leading-tight">
              Make customer experience your{" "}
              <span className="text-gradient-subtle">competitive edge</span>
            </h2>

            {/* Subheadline */}
            <p className="text-lg md:text-xl text-midnight/50 max-w-2xl mx-auto font-light">
              Join leading enterprises transforming their operations with AI-native execution
            </p>

            {/* Email Form with CTA Button */}
            <form onSubmit={handleSubmit} className="pt-4 max-w-2xl mx-auto">
              <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-center">
                <div className="relative flex-1 max-w-md">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-midnight/40" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your work email"
                    required
                    className="w-full pl-12 pr-4 py-4 rounded-full bg-white border-2 border-midnight/10 text-midnight placeholder:text-midnight/40 text-base focus:outline-none focus:border-emerald/50 focus:ring-2 focus:ring-emerald/20 transition-all duration-300 shadow-sm hover:shadow-md"
                    style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}
                  />
                </div>
                <Button
                  type="submit"
                  className="bg-midnight hover:bg-midnight/90 text-ivory font-semibold text-lg px-10 py-7 rounded-full gap-3 group shadow-elevated transition-all duration-400 hover:shadow-2xl hover:-translate-y-1 whitespace-nowrap"
                  size="lg"
                >
                  Request a Demo
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </form>

            {/* Trust note */}
            <p className="text-sm text-midnight/40 flex items-center justify-center gap-2 font-light">
              <span className="w-2 h-2 rounded-full bg-emerald" />
              No credit card required • Free trial available
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default FinalCTA;
