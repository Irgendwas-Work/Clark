import { Linkedin, Twitter, Youtube, Instagram } from "lucide-react";

const footerLinks = {
  product: {
    title: "Product",
    links: ["Customer Service", "Pricing", "Security", "Integrations", "API"],
  },
  resources: {
    title: "Resources",
    links: ["Contact us", "API Docs", "Guide", "Blog", "Changelog"],
  },
  company: {
    title: "Company",
    links: ["Careers", "Privacy Policy", "Terms of Service", "Trust Center"],
  },
};

const socialLinks = [
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Youtube, href: "#", label: "YouTube" },
];

const Footer = () => {
  return (
    <footer className="bg-midnight border-t border-slate/20 pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Brand column */}
          <div className="col-span-2">
            <div className="mb-6">
              <span className="font-display text-2xl font-semibold text-ivory">
                AgentFlow
              </span>
            </div>
            <p className="text-ivory/50 text-sm mb-6 max-w-xs font-light">
              Enterprise AI platform for intelligent automation and AI-native execution.
            </p>
            
            {/* Social links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full border border-slate/30 flex items-center justify-center text-ivory/50 hover:text-ivory hover:border-ivory/30 hover:bg-slate/10 transition-all duration-300"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>

            {/* Compliance badges */}
            <div className="flex gap-4 mt-6">
              <div className="w-12 h-12 rounded-full border border-slate/30 flex items-center justify-center">
                <span className="text-xs text-ivory/50 font-semibold">SOC 2</span>
              </div>
              <div className="w-12 h-12 rounded-full border border-slate/30 flex items-center justify-center">
                <span className="text-xs text-ivory/50 font-semibold">GDPR</span>
              </div>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([key, section]) => (
            <div key={key}>
              <h4 className="font-semibold text-ivory mb-4 text-sm uppercase tracking-widest">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-ivory/50 hover:text-ivory text-sm transition-colors duration-300"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-slate/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-ivory/40 text-sm">
            © 2026 AgentFlow, Inc. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-ivory/40 hover:text-ivory text-sm transition-colors duration-300">
              Privacy Policy
            </a>
            <a href="#" className="text-ivory/40 hover:text-ivory text-sm transition-colors duration-300">
              Terms of Service
            </a>
            <a href="#" className="text-ivory/40 hover:text-ivory text-sm transition-colors duration-300">
              Cookie Settings
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
