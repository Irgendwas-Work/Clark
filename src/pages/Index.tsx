import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import AgentDemo from "@/components/landing/AgentDemo";
import DataFlowAnimation from "@/components/landing/DataFlowAnimation";
import ProductSuites from "@/components/landing/ProductSuites";
import Differentiators from "@/components/landing/Differentiators";
import KPIResults from "@/components/landing/KPIResults";
import SocialProof from "@/components/landing/SocialProof";
import TechStack from "@/components/landing/TechStack";
import ROICalculator from "@/components/landing/ROICalculator";
import FinalCTA from "@/components/landing/FinalCTA";
import Footer from "@/components/landing/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-midnight">
      <Navbar />
      <Hero />
      <AgentDemo />
      <DataFlowAnimation />
      <ProductSuites />
      <Differentiators />
      <KPIResults />
      <SocialProof />
      <TechStack />
      <ROICalculator />
      <FinalCTA />
      <Footer />
    </div>
  );
};

export default Index;
