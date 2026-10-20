import React from 'react';

interface MozuraLogoProps {
  variant?: 'horizontal' | 'stacked' | 'markOnly' | 'circularStamp';
  theme?: 'light' | 'dark';
  customLogoUrl?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showTagline?: boolean;
}

export const MozuraLogo: React.FC<MozuraLogoProps> = ({
  variant = 'horizontal',
  theme = 'light',
  customLogoUrl,
  size = 'md',
  className = '',
  showTagline = true,
}) => {
  // If custom logo image is provided in admin settings, display that
  if (customLogoUrl && customLogoUrl.trim().length > 0) {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        <img
          src={customLogoUrl}
          alt="MOZURASTONE"
          className={`object-contain ${
            size === 'sm' ? 'h-8' : size === 'lg' ? 'h-14' : size === 'xl' ? 'h-20' : 'h-10'
          }`}
          referrerPolicy="no-referrer"
        />
        {variant !== 'markOnly' && (
          <div className="flex flex-col">
            <span
              className={`font-['Marcellus',serif] tracking-[0.22em] font-normal uppercase leading-tight ${
                theme === 'dark' ? 'text-[#F5F2EC]' : 'text-[#353633]'
              } ${size === 'sm' ? 'text-base' : size === 'lg' ? 'text-2xl' : 'text-lg'}`}
            >
              MOZURASTONE
            </span>
            {showTagline && (
              <span
                className={`text-[9px] tracking-[0.28em] font-medium uppercase ${
                  theme === 'dark' ? 'text-[#D8C8B2]' : 'text-[#8C877E]'
                }`}
              >
                THE AURA OF NATURAL BEAUTY
              </span>
            )}
          </div>
        )}
      </div>
    );
  }

  // Dimension scaling for the vector stone "M" mark
  const markDimensions = {
    sm: { width: 34, height: 26 },
    md: { width: 44, height: 34 },
    lg: { width: 68, height: 52 },
    xl: { width: 100, height: 78 },
  }[size];

  // SVG representation of the MOZURASTONE interlocking stone mosaic "M" mark
  const StoneMosaicMark = ({ w, h }: { w: number; h: number }) => (
    <svg
      width={w}
      height={h}
      viewBox="0 0 120 92"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0 drop-shadow-[0_1px_2px_rgba(53,54,51,0.08)]"
      aria-label="MOZURASTONE Emblem"
    >
      <defs>
        {/* Stone facet gradients simulating natural travertine & marble veining */}
        <linearGradient id="stone-facet-1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E8DFD3" />
          <stop offset="45%" stopColor="#D8C8B2" />
          <stop offset="100%" stopColor="#BAA995" />
        </linearGradient>

        <linearGradient id="stone-facet-2" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#4A4B46" />
          <stop offset="50%" stopColor="#353633" />
          <stop offset="100%" stopColor="#2A2B28" />
        </linearGradient>

        <linearGradient id="stone-facet-3" x1="0%" y1="0%" x2="100%" y2="80%">
          <stop offset="0%" stopColor="#DFD3C3" />
          <stop offset="50%" stopColor="#C4B49F" />
          <stop offset="100%" stopColor="#A69B8B" />
        </linearGradient>

        <linearGradient id="stone-facet-4" x1="0%" y1="50%" x2="100%" y2="50%">
          <stop offset="0%" stopColor="#C8BCAB" />
          <stop offset="60%" stopColor="#A69B8B" />
          <stop offset="100%" stopColor="#8C877E" />
        </linearGradient>

        <linearGradient id="stone-facet-5" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#F0E8DC" />
          <stop offset="50%" stopColor="#D8C8B2" />
          <stop offset="100%" stopColor="#BAA995" />
        </linearGradient>

        {/* Subtle stone texture noise pattern overlay */}
        <filter id="stoneGrain" x="0%" y="0%" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" result="noise" />
          <feColorMatrix type="matrix" values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.12 0" />
          <feComposite in2="SourceGraphic" in="glare" operator="in" />
        </filter>
      </defs>

      {/* Group containing the 5 stone mosaic pieces of the 'M' */}
      <g>
        {/* Piece 1: Upper Left Stone Wedge (Warm Beige Travertine) */}
        <path
          d="M 23 10 L 44 10 C 45 10, 46 11, 46 12 L 46 36 L 23 25 C 22 24.5, 21 23.5, 21 22 L 21 12 C 21 11, 22 10, 23 10 Z"
          fill="url(#stone-facet-1)"
        />

        {/* Piece 2: Lower Left Stone Pillar (Charcoal Basalt with vein) */}
        <path
          d="M 21 32 L 44 43 L 42 74 C 41.8 77, 39 79, 36 78 L 25 72 C 22.5 70.5, 21 68, 21 65 Z"
          fill="url(#stone-facet-2)"
        />

        {/* Piece 3: Center Keystone Diagonal Slab (Natural Beige honed limestone) */}
        <path
          d="M 48 15 L 72 44 L 69 77 C 68.7 78.5, 67 79.5, 65.5 79 L 45 52 L 48 18 C 48 16.5, 47.5 15.5, 48 15 Z"
          fill="url(#stone-facet-3)"
        />

        {/* Piece 4: Upper Right Stone Wedge (Natural Stone Taupe) */}
        <path
          d="M 52 10 L 97 10 C 98.5 10, 99.5 11, 99.5 12.5 L 99.5 35 L 75 42 L 53 14 C 52 12.5, 51.5 10, 52 10 Z"
          fill="url(#stone-facet-4)"
        />

        {/* Piece 5: Lower Right Stone Pillar (Deep Stone Charcoal/Taupe) */}
        <path
          d="M 78 47 L 99.5 40 L 99.5 66 C 99.5 68.5, 98 71, 95.5 72.5 L 84 79 C 81.5 80.5, 78 78.5, 78 75.5 Z"
          fill="url(#stone-facet-2)"
        />

        {/* Fine mosaic grout lines accentuating the stone interlocking joints */}
        <path
          d="M 21 28 L 45 40 M 47 12 L 74 44 L 68 78 M 76 43 L 99.5 38"
          stroke={theme === 'dark' ? '#2A2B28' : '#F5F2EC'}
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );

  if (variant === 'markOnly') {
    return (
      <div className={`inline-flex items-center justify-center ${className}`}>
        <StoneMosaicMark w={markDimensions.width} h={markDimensions.height} />
      </div>
    );
  }

  if (variant === 'circularStamp') {
    return (
      <div
        className={`relative flex items-center justify-center rounded-full border border-[#D8C8B2] p-4 text-center ${
          theme === 'dark' ? 'bg-[#353633] text-[#F5F2EC]' : 'bg-[#F5F2EC] text-[#353633]'
        } ${className}`}
        style={{ width: markDimensions.width * 2.8, height: markDimensions.width * 2.8 }}
      >
        {/* Circular text simulation */}
        <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full">
          <path
            id="textPathTop"
            d="M 30,100 A 70,70 0 0,1 170,100"
            fill="none"
          />
          <path
            id="textPathBottom"
            d="M 170,100 A 70,70 0 0,1 30,100"
            fill="none"
          />
          <text
            className="text-[13px] font-['Marcellus',serif] tracking-[0.28em] uppercase"
            fill={theme === 'dark' ? '#F5F2EC' : '#353633'}
          >
            <textPath href="#textPathTop" startOffset="50%" textAnchor="middle">
              MOZURASTONE
            </textPath>
          </text>
          <text
            className="text-[8.5px] font-sans font-medium tracking-[0.24em] uppercase"
            fill={theme === 'dark' ? '#D8C8B2' : '#8C877E'}
          >
            <textPath href="#textPathBottom" startOffset="50%" textAnchor="middle">
              THE AURA OF NATURAL BEAUTY
            </textPath>
          </text>
        </svg>
        <div className="relative z-10 scale-90">
          <StoneMosaicMark w={markDimensions.width * 1.1} h={markDimensions.height * 1.1} />
        </div>
      </div>
    );
  }

  if (variant === 'stacked') {
    return (
      <div className={`flex flex-col items-center text-center gap-3 ${className}`}>
        <StoneMosaicMark w={markDimensions.width * 1.4} h={markDimensions.height * 1.4} />
        <div className="flex flex-col items-center">
          <span
            className={`font-['Marcellus',serif] tracking-[0.26em] font-normal uppercase leading-tight ${
              theme === 'dark' ? 'text-[#F5F2EC]' : 'text-[#353633]'
            } ${size === 'sm' ? 'text-lg' : size === 'lg' ? 'text-3xl' : size === 'xl' ? 'text-4xl' : 'text-2xl'}`}
          >
            MOZURASTONE
          </span>
          {showTagline && (
            <span
              className={`mt-1 text-[10px] sm:text-[11px] tracking-[0.32em] font-medium uppercase ${
                theme === 'dark' ? 'text-[#D8C8B2]' : 'text-[#8C877E]'
              }`}
            >
              THE AURA OF NATURAL BEAUTY
            </span>
          )}
        </div>
      </div>
    );
  }

  // Horizontal layout (default for header)
  return (
    <div className={`inline-flex items-center gap-3 sm:gap-4 shrink-0 ${className}`}>
      <StoneMosaicMark w={markDimensions.width} h={markDimensions.height} />
      <div className="flex flex-col shrink-0">
        <span
          className={`font-['Marcellus',serif] tracking-[0.22em] font-normal uppercase leading-none ${
            theme === 'dark' ? 'text-[#F5F2EC]' : 'text-[#353633]'
          } ${
            size === 'sm'
              ? 'text-base tracking-[0.18em]'
              : size === 'lg'
              ? 'text-2xl tracking-[0.24em]'
              : 'text-lg sm:text-xl'
          }`}
        >
          MOZURASTONE
        </span>
        {showTagline && (
          <span
            className={`mt-1 text-[8.5px] sm:text-[9.5px] tracking-[0.26em] font-medium uppercase leading-tight ${
              theme === 'dark' ? 'text-[#D8C8B2]' : 'text-[#8C877E]'
            }`}
          >
            THE AURA OF NATURAL BEAUTY
          </span>
        )}
      </div>
    </div>
  );
};
