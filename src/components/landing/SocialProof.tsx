import { Star, Quote } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";

import oracleLogo from "@/assets/logos/oracle.svg";
import tiktokLogo from "@/assets/logos/tiktok.svg";
import microsoftLogo from "@/assets/logos/microsoft.svg";
import salesforceLogo from "@/assets/logos/salesforce.svg";
import sapLogo from "@/assets/logos/sap.svg";
import adobeLogo from "@/assets/logos/adobe.svg";

const logos = [
  { name: "Oracle", src: oracleLogo },
  { name: "TikTok", src: tiktokLogo },
  { name: "Microsoft", src: microsoftLogo },
  { name: "Salesforce", src: salesforceLogo },
  { name: "SAP", src: sapLogo },
  { name: "Adobe", src: adobeLogo },
];

const testimonials = [
  {
    quote: "This platform transformed how we handle enterprise operations. The AI agents work 24/7 and have reduced our response times dramatically.",
    author: "Sarah Chen",
    role: "VP of Operations",
    company: "Fortune 500 Tech",
    avatar: "SC",
  },
  {
    quote: "The multi-agent system understands our complex workflows like no other solution we've tried. Implementation was seamless.",
    author: "Marcus Johnson",
    role: "CTO",
    company: "Global Retail Corp",
    avatar: "MJ",
  },
  {
    quote: "15x ROI in the first quarter. The AI agents handle what used to require an entire department.",
    author: "Elena Rodriguez",
    role: "Director of Innovation",
    company: "Financial Services Inc",
    avatar: "ER",
  },
];

const SocialProof = () => {
  return (
    <section className="bg-midnight py-24 relative overflow-hidden">
      {/* Subtle top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate/30 to-transparent" />

      <div className="container mx-auto px-6">
        {/* Section header */}
        <ScrollReveal animation="fadeUp">
          <div className="text-center mb-16 space-y-4">
            <span className="text-amber text-sm font-semibold uppercase tracking-widest">
              Trusted Worldwide
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-ivory tracking-tight">
              Powering Enterprise Leaders
            </h2>
          </div>
        </ScrollReveal>

        {/* Logo grid */}
        <ScrollReveal animation="fadeUp" delay={100}>
          <div className="mb-20">
            <div className="flex flex-wrap justify-center items-center gap-10 md:gap-16 lg:gap-20">
              {logos.map((logo) => (
                <div
                  key={logo.name}
                  className="group flex items-center justify-center h-12 w-28 md:w-36 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                >
                  <img 
                    src={logo.src} 
                    alt={`${logo.name} logo`}
                    className="h-8 md:h-10 w-auto object-contain brightness-0 invert group-hover:brightness-100 group-hover:invert-0 transition-all duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Testimonials grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <ScrollReveal key={testimonial.author} animation="fadeUp" delay={index * 100}>
              <div
                className="card-hover relative bg-ivory rounded-2xl p-8 group h-full"
              >
                {/* Quote icon */}
                <div className="absolute -top-4 left-8">
                  <div className="w-10 h-10 rounded-full bg-emerald flex items-center justify-center shadow-glow-emerald">
                    <Quote className="w-5 h-5 text-midnight" />
                  </div>
                </div>

                {/* Stars */}
                <div className="flex gap-1 mb-4 pt-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber text-amber" />
                  ))}
                </div>

                {/* Quote text */}
                <p className="text-midnight/70 leading-relaxed mb-6">
                  "{testimonial.quote}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-4">
                  {/* Avatar */}
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-slate to-emerald flex items-center justify-center">
                    <span className="text-ivory font-semibold text-sm">
                      {testimonial.avatar}
                    </span>
                  </div>
                  
                  <div>
                    <p className="font-semibold text-midnight">
                      {testimonial.author}
                    </p>
                    <p className="text-sm text-midnight/50">
                      {testimonial.role}, {testimonial.company}
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
