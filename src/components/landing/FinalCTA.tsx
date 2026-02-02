import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import ScrollReveal from "@/components/ui/ScrollReveal";

const FinalCTA = () => {
  return (
    <section className="light-section bg-ivory py-24 relative overflow-hidden">
      {/* Decorative gradient orbs */}
      <div 
        className="absolute top-0 left-0 w-[400px] h-[400px] opacity-20 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, hsl(160 84% 50%), transparent 60%)',
          transform: 'translate(-50%, -50%)'
        }}
      />
      <div 
        className="absolute bottom-0 right-0 w-[500px] h-[500px] opacity-15 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, hsl(38 92% 50%), transparent 60%)',
          transform: 'translate(30%, 30%)'
        }}
      />

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

            {/* CTA Button */}
            <div className="pt-4">
              <Button 
                className="bg-midnight hover:bg-midnight/90 text-ivory font-semibold text-lg px-10 py-7 rounded-full gap-3 group shadow-elevated transition-all duration-400 hover:shadow-2xl hover:-translate-y-1"
                size="lg"
              >
                Get Started Today
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>

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
