import { useEffect, useState, useRef } from "react";
import ScrollReveal from "@/components/ui/ScrollReveal";

interface DataNode {
  id: string;
  label: string;
  x: number;
  y: number;
  type: "source" | "process" | "output";
}

interface DataPacket {
  id: number;
  fromNode: string;
  toNode: string;
  progress: number;
}

const nodes: DataNode[] = [
  { id: "crm", label: "CRM Data", x: 10, y: 30, type: "source" },
  { id: "erp", label: "ERP System", x: 10, y: 50, type: "source" },
  { id: "emails", label: "Email Stream", x: 10, y: 70, type: "source" },
  { id: "ai", label: "AI Engine", x: 50, y: 50, type: "process" },
  { id: "insights", label: "Insights", x: 90, y: 30, type: "output" },
  { id: "actions", label: "Auto-Actions", x: 90, y: 50, type: "output" },
  { id: "reports", label: "Reports", x: 90, y: 70, type: "output" },
];

const connections = [
  { from: "crm", to: "ai" },
  { from: "erp", to: "ai" },
  { from: "emails", to: "ai" },
  { from: "ai", to: "insights" },
  { from: "ai", to: "actions" },
  { from: "ai", to: "reports" },
];

const DataFlowAnimation = () => {
  const [packets, setPackets] = useState<DataPacket[]>([]);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const packetIdRef = useRef(0);

  useEffect(() => {
    const createPacket = () => {
      const randomConnection = connections[Math.floor(Math.random() * connections.length)];
      const newPacket: DataPacket = {
        id: packetIdRef.current++,
        fromNode: randomConnection.from,
        toNode: randomConnection.to,
        progress: 0,
      };
      setPackets((prev) => [...prev.slice(-15), newPacket]);
    };

    const interval = setInterval(createPacket, 400);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const animate = () => {
      setPackets((prev) =>
        prev
          .map((packet) => ({
            ...packet,
            progress: packet.progress + 0.02,
          }))
          .filter((packet) => packet.progress <= 1)
      );
    };

    const animationFrame = setInterval(animate, 16);
    return () => clearInterval(animationFrame);
  }, []);

  const getNodePosition = (nodeId: string) => {
    const node = nodes.find((n) => n.id === nodeId);
    return node ? { x: node.x, y: node.y } : { x: 0, y: 0 };
  };

  const getPacketPosition = (packet: DataPacket) => {
    const from = getNodePosition(packet.fromNode);
    const to = getNodePosition(packet.toNode);
    return {
      x: from.x + (to.x - from.x) * packet.progress,
      y: from.y + (to.y - from.y) * packet.progress,
    };
  };

  return (
    <section className="bg-midnight py-24 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <ScrollReveal animation="fadeUp">
          <div className="text-center mb-16 space-y-4">
            <span className="text-amber text-sm font-semibold uppercase tracking-widest">
              Data Intelligence
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-semibold text-ivory">
              Real-Time Data Orchestration
            </h2>
            <p className="text-ivory/50 max-w-2xl mx-auto text-lg font-light">
              Watch as our AI processes and transforms your enterprise data in real-time
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal animation="scaleIn" delay={200}>
          <div className="relative max-w-5xl mx-auto h-[400px] bg-gradient-to-br from-slate/20 to-slate/10 rounded-3xl border border-slate/30 overflow-hidden">
            {/* SVG for connections and packets */}
            <svg className="absolute inset-0 w-full h-full">
              <defs>
                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="hsl(160 84% 39%)" stopOpacity="0.3" />
                  <stop offset="50%" stopColor="hsl(160 84% 39%)" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="hsl(160 84% 39%)" stopOpacity="0.3" />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Connection lines */}
              {connections.map((conn, i) => {
                const from = getNodePosition(conn.from);
                const to = getNodePosition(conn.to);
                return (
                  <line
                    key={i}
                    x1={`${from.x}%`}
                    y1={`${from.y}%`}
                    x2={`${to.x}%`}
                    y2={`${to.y}%`}
                    stroke="hsl(215 25% 27% / 0.5)"
                    strokeWidth="2"
                    strokeDasharray="5,5"
                  />
                );
              })}

              {/* Animated data packets */}
              {packets.map((packet) => {
                const pos = getPacketPosition(packet);
                return (
                  <g key={packet.id} filter="url(#glow)">
                    <circle
                      cx={`${pos.x}%`}
                      cy={`${pos.y}%`}
                      r="6"
                      fill="hsl(160 84% 39%)"
                      opacity={1 - packet.progress * 0.5}
                    />
                    <circle
                      cx={`${pos.x}%`}
                      cy={`${pos.y}%`}
                      r="3"
                      fill="white"
                      opacity={0.8}
                    />
                  </g>
                );
              })}
            </svg>

            {/* Nodes */}
            {nodes.map((node) => (
              <div
                key={node.id}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 cursor-pointer ${
                  hoveredNode === node.id ? "scale-110 z-10" : ""
                }`}
                style={{ left: `${node.x}%`, top: `${node.y}%` }}
                onMouseEnter={() => setHoveredNode(node.id)}
                onMouseLeave={() => setHoveredNode(null)}
              >
                <div
                  className={`px-4 py-3 rounded-xl border backdrop-blur-sm transition-all duration-300 ${
                    node.type === "source"
                      ? "bg-slate/40 border-slate/40 hover:border-amber/50"
                      : node.type === "process"
                      ? "bg-emerald/20 border-emerald/50 hover:bg-emerald/30"
                      : "bg-slate/40 border-slate/40 hover:border-emerald/50"
                  } ${hoveredNode === node.id ? "shadow-lg shadow-emerald/20" : ""}`}
                >
                  {node.type === "process" && (
                    <div className="absolute inset-0 rounded-xl animate-pulse bg-emerald/10" />
                  )}
                  <span className="text-ivory text-sm font-medium relative z-10">
                    {node.label}
                  </span>
                </div>
              </div>
            ))}

            {/* Central AI Engine decoration */}
            <div
              className="absolute transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
              style={{ left: "50%", top: "50%" }}
            >
              <div className="w-32 h-32 rounded-full border border-emerald/20 animate-spin-slow" />
              <div className="absolute inset-4 rounded-full border border-emerald/30 animate-spin-reverse" />
              <div className="absolute inset-8 rounded-full border border-emerald/40" />
            </div>

            {/* Stats overlay */}
            <div className="absolute bottom-4 left-4 right-4 flex justify-between text-xs font-mono">
              <span className="text-ivory/40">
                Packets/sec: <span className="text-emerald">2.5k</span>
              </span>
              <span className="text-ivory/40">
                Latency: <span className="text-emerald">12ms</span>
              </span>
              <span className="text-ivory/40">
                Throughput: <span className="text-emerald">1.2 GB/s</span>
              </span>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default DataFlowAnimation;
