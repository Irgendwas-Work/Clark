import { useEffect, useState, useRef } from "react";
import { ArrowRight, Sparkles, Zap, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";
import ScrollReveal from "@/components/ui/ScrollReveal";

const Hero = () => {
  const [scrollY, setScrollY] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLElement>(null);
  const [typedText, setTypedText] = useState("");
  const fullText = "AI-native execution";
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Mouse parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setMousePos({
          x: (e.clientX - rect.left - rect.width / 2) / rect.width,
          y: (e.clientY - rect.top - rect.height / 2) / rect.height,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Typewriter effect
  useEffect(() => {
    let charIndex = 0;
    const typeInterval = setInterval(() => {
      if (charIndex <= fullText.length) {
        setTypedText(fullText.slice(0, charIndex));
        charIndex++;
      } else {
        clearInterval(typeInterval);
        setTimeout(() => setShowCursor(false), 1000);
      }
    }, 80);

    return () => clearInterval(typeInterval);
  }, []);

  // Cursor blink
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      if (typedText.length < fullText.length) {
        setShowCursor(prev => !prev);
      }
    }, 500);
    return () => clearInterval(blinkInterval);
  }, [typedText]);

  return (
    <section ref={heroRef} className="hero-gradient relative min-h-screen flex items-center justify-center overflow-hidden particles-bg">
      {/* Interactive mouse-following orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute w-[700px] h-[700px] rounded-full opacity-25 blur-3xl transition-transform duration-1000 ease-out"
          style={{ 
            background: 'radial-gradient(circle, hsl(160 84% 39%) 0%, transparent 70%)',
            top: '5%',
            right: '5%',
            transform: `translate(${mousePos.x * -30 + scrollY * 0.3}px, ${mousePos.y * -30}px)`,
          }}
        />
        <div 
          className="absolute w-[600px] h-[600px] rounded-full opacity-20 blur-3xl transition-transform duration-1000 ease-out"
          style={{ 
            background: 'radial-gradient(circle, hsl(215 25% 50%) 0%, transparent 70%)',
            bottom: '15%',
            left: '0%',
            transform: `translate(${mousePos.x * 40}px, ${mousePos.y * 40 + scrollY * -0.2}px)`,
          }}
        />
        <div 
          className="absolute w-[500px] h-[500px] rounded-full opacity-15 blur-2xl transition-transform duration-700 ease-out"
          style={{ 
            background: 'radial-gradient(circle, hsl(38 92% 50%) 0%, transparent 70%)',
            top: '35%',
            left: '35%',
            transform: `translate(${mousePos.x * -20}px, ${mousePos.y * -20 + scrollY * 0.15}px) rotate(${scrollY * 0.02}deg)`,
          }}
        />
      </div>

      {/* Animated floating elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-emerald/10 animate-pulse"
            style={{
              width: `${8 + i * 4}px`,
              height: `${8 + i * 4}px`,
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
              animation: `float ${4 + i * 0.5}s ease-in-out infinite`,
              animationDelay: `${i * 0.5}s`,
            }}
          />
        ))}
      </div>

      {/* Parallax grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(hsl(215 25% 27%) 1px, transparent 1px),
            linear-gradient(90deg, hsl(215 25% 27%) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          transform: `translateY(${scrollY * 0.1}px)`,
        }}
      />

      {/* Animated connection lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-10">
        <defs>
          <linearGradient id="heroLineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(160 84% 39%)" stopOpacity="0" />
            <stop offset="50%" stopColor="hsl(160 84% 39%)" stopOpacity="1" />
            <stop offset="100%" stopColor="hsl(160 84% 39%)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M0,400 Q400,300 800,400 T1600,400"
          stroke="url(#heroLineGradient)"
          strokeWidth="1"
          fill="none"
          className="animate-flow-path"
        />
        <path
          d="M0,500 Q500,400 1000,500 T2000,500"
          stroke="url(#heroLineGradient)"
          strokeWidth="1"
          fill="none"
          className="animate-flow-path"
          style={{ animationDelay: "1.5s" }}
        />
      </svg>

      {/* Content */}
      <div 
        className="relative z-10 container mx-auto px-6 text-center"
        style={{ transform: `translateY(${scrollY * -0.15}px)` }}
      >
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Badge with shimmer */}
          <ScrollReveal animation="fadeUp" delay={0}>
            <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-slate/40 bg-slate/10 backdrop-blur-sm group hover:border-emerald/30 transition-colors duration-500">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald"></span>
              </span>
              <span className="text-sm text-ivory/80 font-medium tracking-wide flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber" />
                Enterprise AI Platform
              </span>
            </div>
          </ScrollReveal>

          {/* Headline with typewriter effect */}
          <ScrollReveal animation="fadeUp" delay={100}>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-ivory leading-[1.1] tracking-tight">
              From operational blind spots to{" "}
              <span className="text-gradient-primary relative">
                {typedText}
                {(typedText.length < fullText.length || showCursor) && (
                  <span className={`inline-block w-[3px] h-[1em] bg-emerald ml-1 align-middle ${showCursor ? 'opacity-100' : 'opacity-0'}`} />
                )}
              </span>
            </h1>
          </ScrollReveal>

          {/* Animated feature badges */}
          <ScrollReveal animation="fadeUp" delay={200}>
            <div className="flex flex-wrap justify-center gap-4 mb-4">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate/20 border border-slate/30 hover:border-emerald/40 transition-colors">
                <Brain className="w-4 h-4 text-emerald" />
                <span className="text-sm text-ivory/70">Self-Learning</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate/20 border border-slate/30 hover:border-amber/40 transition-colors">
                <Zap className="w-4 h-4 text-amber" />
                <span className="text-sm text-ivory/70">Real-Time Processing</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate/20 border border-slate/30 hover:border-emerald/40 transition-colors">
                <Sparkles className="w-4 h-4 text-emerald" />
                <span className="text-sm text-ivory/70">Multi-Agent Orchestration</span>
              </div>
            </div>
          </ScrollReveal>

          {/* Subheadline */}
          <ScrollReveal animation="fadeUp" delay={250}>
            <p className="text-lg md:text-xl text-ivory/60 max-w-2xl mx-auto leading-relaxed">
              Transform your enterprise operations with intelligent AI agents that learn, 
              adapt, and execute complex workflows autonomously.
            </p>
          </ScrollReveal>

          {/* CTA Button with enhanced glow */}
          <ScrollReveal animation="fadeUp" delay={300}>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button 
                className="btn-glow bg-emerald hover:bg-emerald/90 text-midnight font-semibold text-lg px-8 py-6 rounded-full gap-2 group animate-pulse-glow"
                size="lg"
              >
                Request Demo
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button 
                variant="outline"
                className="border-slate/40 text-ivory hover:bg-slate/20 text-lg px-8 py-6 rounded-full gap-2 group"
                size="lg"
              >
                Watch Demo
                <div className="w-6 h-6 rounded-full bg-ivory/10 flex items-center justify-center group-hover:bg-ivory/20 transition-colors">
                  <div className="w-0 h-0 border-l-[6px] border-l-ivory border-y-[4px] border-y-transparent ml-0.5" />
                </div>
              </Button>
            </div>
          </ScrollReveal>

          {/* Trust badges with stagger animation */}
          <ScrollReveal animation="fadeUp" delay={400}>
            <div className="pt-16 space-y-4">
              <p className="text-sm text-ivory/40 uppercase tracking-widest font-medium">
                Loved by AI builders. Trusted by AI leaders.
              </p>
              <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 stagger-children">
                {['Oracle', 'TikTok', 'Microsoft', 'Salesforce', 'SAP', 'Adobe'].map((company) => (
                  <span 
                    key={company} 
                    className="text-ivory/40 font-display text-lg md:text-xl font-medium hover:text-ivory hover:scale-110 transition-all duration-300 cursor-default"
                  >
                    {company}
                  </span>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-midnight to-transparent" />
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-ivory/30 text-xs uppercase tracking-widest">Scroll</span>
        <div className="w-6 h-10 rounded-full border-2 border-ivory/20 flex justify-center pt-2">
          <div className="w-1 h-2 rounded-full bg-ivory/40 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
