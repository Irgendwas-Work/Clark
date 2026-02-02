import { useEffect, useState, useRef } from "react";

interface Coin {
  id: number;
  x: number;
  y: number;
  rotation: number;
  opacity: number;
  scale: number;
  progress: number;
}

interface DataParticle {
  id: number;
  x: number;
  y: number;
  progress: number;
}

const MoneyGeneratorAnimation = () => {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [dataParticles, setDataParticles] = useState<DataParticle[]>([]);
  const coinIdRef = useRef(0);
  const particleIdRef = useRef(0);

  // Generate data particles flowing from left to agent
  useEffect(() => {
    const createDataParticle = () => {
      const newParticle: DataParticle = {
        id: particleIdRef.current++,
        x: 0,
        y: 30 + Math.random() * 40,
        progress: 0,
      };
      setDataParticles((prev) => [...prev.slice(-10), newParticle]);
    };

    const interval = setInterval(createDataParticle, 300);
    return () => clearInterval(interval);
  }, []);

  // Animate data particles
  useEffect(() => {
    const animate = () => {
      setDataParticles((prev) =>
        prev
          .map((particle) => ({
            ...particle,
            progress: particle.progress + 0.015,
          }))
          .filter((particle) => particle.progress <= 1)
      );
    };

    const animationFrame = setInterval(animate, 16);
    return () => clearInterval(animationFrame);
  }, []);

  // Generate coins from agent moving to right
  useEffect(() => {
    const createCoin = () => {
      const newCoin: Coin = {
        id: coinIdRef.current++,
        x: 0,
        y: 40 + Math.random() * 20,
        rotation: Math.random() * 360,
        opacity: 1,
        scale: 0.6 + Math.random() * 0.3,
        progress: 0,
      };
      setCoins((prev) => [...prev.slice(-40), newCoin]);
    };

    const interval = setInterval(createCoin, 600);
    return () => clearInterval(interval);
  }, []);

  // Animate coins moving right and fading out
  useEffect(() => {
    const animate = () => {
      setCoins((prev) =>
        prev
          .map((coin) => ({
            ...coin,
            progress: coin.progress + 0.015,
          }))
          .filter((coin) => coin.progress <= 1)
      );
    };

    const animationFrame = setInterval(animate, 16);
    return () => clearInterval(animationFrame);
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full opacity-20 pointer-events-none">
      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
        <defs>
          <filter id="neonGlow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <linearGradient id="dataGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(160 84% 39%)" stopOpacity="0.2" />
            <stop offset="50%" stopColor="hsl(160 84% 39%)" stopOpacity="0.8" />
            <stop offset="100%" stopColor="hsl(160 84% 39%)" stopOpacity="0.2" />
          </linearGradient>

          <g id="coin">
            <circle r="2.025" fill="none" stroke="hsl(38 92% 50%)" strokeWidth="0.405" />
            <text
              textAnchor="middle"
              dominantBaseline="central"
              fill="hsl(38 92% 50%)"
              fontSize="2.025"
              fontWeight="bold"
            >
              $
            </text>
          </g>

          <g id="dataDoc">
            <rect width="2.7" height="3.375" rx="0.27" fill="none" stroke="hsl(160 84% 39%)" strokeWidth="0.27" />
            <line x1="0.405" y1="0.81" x2="2.295" y2="0.81" stroke="hsl(160 84% 39%)" strokeWidth="0.2025" />
            <line x1="0.405" y1="1.62" x2="2.295" y2="1.62" stroke="hsl(160 84% 39%)" strokeWidth="0.2025" />
            <line x1="0.405" y1="2.43" x2="1.755" y2="2.43" stroke="hsl(160 84% 39%)" strokeWidth="0.2025" />
          </g>
        </defs>

        {/* Data source positioned at 20% from left, 40% from top - 35% larger */}
        <g filter="url(#neonGlow)">
          <rect
            x="10"
            y="35"
            width="10.8"
            height="13.5"
            rx="1.35"
            fill="none"
            stroke="hsl(160 84% 39%)"
            strokeWidth="0.405"
          />
          <line x1="12.6" y1="39.15" x2="17.4" y2="39.15" stroke="hsl(160 84% 39%)" strokeWidth="0.27" />
          <line x1="12.6" y1="42.3" x2="17.4" y2="42.3" stroke="hsl(160 84% 39%)" strokeWidth="0.27" />
          <line x1="12.6" y1="45.45" x2="16.2" y2="45.45" stroke="hsl(160 84% 39%)" strokeWidth="0.27" />
        </g>

        {/* Agent positioned at 50% center - 35% larger */}
        <g filter="url(#neonGlow)">
          <rect
            x="43.62"
            y="43.62"
            width="15.12"
            height="15.12"
            rx="2.835"
            fill="none"
            stroke="hsl(160 84% 39%)"
            strokeWidth="0.54"
          />
          <circle cx="47.61" cy="48.51" r="1.512" fill="hsl(160 84% 39%)" />
          <circle cx="52.39" cy="48.51" r="1.512" fill="hsl(160 84% 39%)" />
          <line x1="50" y1="43.62" x2="50" y2="39.78" stroke="hsl(160 84% 39%)" strokeWidth="0.405" />
          <circle cx="50" cy="38.52" r="1.512" fill="none" stroke="hsl(160 84% 39%)" strokeWidth="0.405" />
          <line x1="50" y1="58.74" x2="50" y2="62.58" stroke="hsl(160 84% 39%)" strokeWidth="0.405" />
          
          <circle
            cx="50"
            cy="53.32"
            r="1.89"
            fill="none"
            stroke="hsl(160 84% 39%)"
            strokeWidth="0.27"
            strokeDasharray="4.05 2.7"
          >
            <animateTransform
              attributeName="transform"
              attributeType="XML"
              type="rotate"
              from="0 50 53.32"
              to="360 50 53.32"
              dur="2s"
              repeatCount="indefinite"
            />
          </circle>
        </g>

        {/* Data particles from left to agent */}
        {dataParticles.map((particle) => {
          const x = 18 + (particle.progress * 27);
          const y = particle.y;
          const opacity = 1 - Math.abs(particle.progress - 0.5) * 2;

          return (
            <g key={particle.id} filter="url(#neonGlow)" opacity={opacity}>
              <use href="#dataDoc" x={x} y={y} />
            </g>
          );
        })}

        {/* Coins from agent to right */}
        {coins.map((coin) => {
          const x = 50 + (35 * coin.progress);
          const y = coin.y;
          const opacity = 1 - Math.abs(coin.progress - 0.5) * 2;

          return (
            <g
              key={coin.id}
              filter="url(#neonGlow)"
              opacity={opacity}
              transform={`translate(${x}, ${y}) rotate(${coin.rotation}) scale(${coin.scale})`}
            >
              <use href="#coin" />
            </g>
          );
        })}

        {/* Connection lines */}
        <line
          x1="18"
          y1="40"
          x2="43.62"
          y2="50"
          stroke="hsl(160 84% 39%)"
          strokeWidth="0.135"
          strokeDasharray="1.35 0.9"
          opacity="0.3"
        />
        <line
          x1="56.38"
          y1="50"
          x2="90"
          y2="50"
          stroke="hsl(38 92% 50%)"
          strokeWidth="0.135"
          strokeDasharray="1.35 0.9"
          opacity="0.3"
        />
      </svg>
    </div>
  );
};

export default MoneyGeneratorAnimation;
