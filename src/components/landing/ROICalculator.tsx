import { useState, useEffect } from "react";
import { Calculator, Clock, DollarSign, Users } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import ScrollReveal from "@/components/ui/ScrollReveal";

const ROICalculator = () => {
  const [employees, setEmployees] = useState([100]);
  const [savings, setSavings] = useState({ money: 0, hours: 0 });

  // Calculate savings based on 80% automation
  useEffect(() => {
    const avgSalary = 75000; // Average annual salary
    const automationRate = 0.80; // 80% automation
    const hoursPerEmployee = 2080; // Annual work hours
    const efficiencyGain = 0.40; // 40% time savings on automated tasks

    const annualMoneySaved = employees[0] * avgSalary * automationRate * efficiencyGain;
    const annualHoursSaved = employees[0] * hoursPerEmployee * automationRate * efficiencyGain;

    setSavings({
      money: Math.round(annualMoneySaved),
      hours: Math.round(annualHoursSaved),
    });
  }, [employees]);

  const formatMoney = (value: number) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`;
    }
    return `$${(value / 1000).toFixed(0)}K`;
  };

  const formatHours = (value: number) => {
    if (value >= 1000) {
      return `${(value / 1000).toFixed(0)}K`;
    }
    return value.toString();
  };

  return (
    <section id="roi-calculator" className="bg-midnight py-24 relative overflow-hidden">
      {/* Decorative gradient orb */}
      <div
        className="absolute bottom-0 right-0 w-[500px] h-[500px] opacity-5 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, hsl(38 92% 50%), transparent 60%)'
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section header */}
        <ScrollReveal animation="fadeUp">
          <div className="text-center mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-amber/30 bg-amber/5">
              <Calculator className="w-4 h-4 text-amber" />
              <span className="text-sm text-amber font-medium tracking-wide">Interactive Calculator</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-semibold text-ivory">
              Calculate Your AI ROI
            </h2>
            <p className="text-ivory/50 max-w-2xl mx-auto text-lg font-light">
              See how much your organization can save by automating 80% of processes with our AI agents
            </p>
          </div>
        </ScrollReveal>

        {/* Calculator card */}
        <ScrollReveal animation="scaleIn" delay={100}>
          <div className="max-w-4xl mx-auto">
            <div className="bg-card border border-slate/20 rounded-3xl p-8 md:p-12 backdrop-blur-sm">
              {/* Slider section */}
              <div className="mb-12">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-slate/20 flex items-center justify-center">
                      <Users className="w-5 h-5 text-emerald" />
                    </div>
                    <span className="text-ivory font-medium">Number of Employees</span>
                  </div>
                  <span className="font-display text-3xl font-semibold text-emerald">
                    {employees[0].toLocaleString()}
                  </span>
                </div>

                {/* Custom styled slider */}
                <div className="relative">
                  <div className="slider-track">
                    <div
                      className="slider-fill"
                      style={{ width: `${(employees[0] / 1000) * 100}%` }}
                    />
                  </div>
                  <Slider
                    value={employees}
                    onValueChange={setEmployees}
                    min={10}
                    max={1000}
                    step={10}
                    className="absolute inset-0"
                  />
                </div>

                {/* Scale labels */}
                <div className="flex justify-between mt-3 text-sm text-ivory/40">
                  <span>10</span>
                  <span>250</span>
                  <span>500</span>
                  <span>750</span>
                  <span>1,000</span>
                </div>
              </div>

              {/* Results */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Money saved */}
                <div className="bg-slate/10 border border-slate/20 rounded-2xl p-6 text-center group hover:border-emerald/30 transition-all duration-300">
                  <div className="w-14 h-14 mx-auto rounded-full bg-emerald/15 flex items-center justify-center mb-4 group-hover:bg-emerald/20 transition-colors duration-300">
                    <DollarSign className="w-7 h-7 text-emerald" />
                  </div>
                  <p className="text-ivory/50 text-sm uppercase tracking-widest mb-2">
                    Annual Savings
                  </p>
                  <p className="font-display text-4xl md:text-5xl font-semibold text-gradient-primary">
                    {formatMoney(savings.money)}
                  </p>
                  <p className="text-ivory/40 text-sm mt-2">
                    Per Year
                  </p>
                </div>

                {/* Hours saved */}
                <div className="bg-slate/10 border border-slate/20 rounded-2xl p-6 text-center group hover:border-amber/30 transition-all duration-300">
                  <div className="w-14 h-14 mx-auto rounded-full bg-amber/15 flex items-center justify-center mb-4 group-hover:bg-amber/20 transition-colors duration-300">
                    <Clock className="w-7 h-7 text-amber" />
                  </div>
                  <p className="text-ivory/50 text-sm uppercase tracking-widest mb-2">
                    Hours Saved
                  </p>
                  <p className="font-display text-4xl md:text-5xl font-semibold text-amber">
                    {formatHours(savings.hours)}
                  </p>
                  <p className="text-ivory/40 text-sm mt-2">
                    Work Hours Annually
                  </p>
                </div>
              </div>

              {/* Footnote */}
              <p className="text-center text-ivory/30 text-sm mt-8 font-light">
                * Based on 80% process automation with 40% efficiency gains. Actual results may vary.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default ROICalculator;
