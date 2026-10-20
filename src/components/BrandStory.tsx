import React from 'react';
import { MozuraLogo } from './MozuraLogo';
import { Layers, Sparkles, ShieldCheck, Gem } from 'lucide-react';

export const BrandStory: React.FC = () => {
  const brandColors = [
    { name: 'Ivory', hex: '#F5F2EC', desc: 'Canvas of quiet serenity and natural light.' },
    { name: 'Natural Beige', hex: '#D8C8B2', desc: 'Warm limestone sands and honed riverbed tones.' },
    { name: 'Stone Taupe', hex: '#A69B8B', desc: 'Tactile earth minerals and weathered canyon hues.' },
    { name: 'Charcoal', hex: '#353633', desc: 'Deep volcanic basalt and architectural shadows.' },
    { name: 'Warm Grey', hex: '#8C877E', desc: 'Muted slate striations and river-smoothed pebbles.' },
  ];

  return (
    <section id="about" className="bg-[#F5F2EC] py-20 sm:py-28 border-t border-[#D8C8B2]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Brand Philosophy Intro */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
          <div className="lg:col-span-5 flex flex-col items-start">
            <span className="text-[11px] tracking-[0.28em] font-medium uppercase text-[#8C877E] block mb-3">
              THE BRAND IDENTITY
            </span>
            <h2 className="font-['Marcellus',serif] text-3xl sm:text-5xl text-[#353633] tracking-[0.02em] leading-tight mb-6">
              The Aura of Natural Beauty
            </h2>
            <p className="text-sm text-[#353633]/85 leading-relaxed font-normal mb-6">
              At MOZURASTONE, stone is not merely raw construction material. It is a living geological testament, 
              formed over geological epochs and polished by mountain currents. We curate, calibrate, and articulate 
              these natural gifts into surfaces that endow modern architecture with enduring calm.
            </p>
            <div className="flex items-center gap-6 pt-4 border-t border-[#D8C8B2]/70 w-full text-xs text-[#8C877E]">
              <div>
                <span className="font-mono text-base font-semibold text-[#353633] block">100%</span>
                <span>Natural Mineral Stone</span>
              </div>
              <div className="h-8 w-px bg-[#D8C8B2]/70" />
              <div>
                <span className="font-mono text-base font-semibold text-[#353633] block">Marine</span>
                <span>Bonded Mesh Technology</span>
              </div>
              <div className="h-8 w-px bg-[#D8C8B2]/70" />
              <div>
                <span className="font-mono text-base font-semibold text-[#353633] block">Worldwide</span>
                <span>Palletized Delivery</span>
              </div>
            </div>
          </div>

          {/* Right Brand Showcase: Circular Seal & Signage Identity */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Dark Charcoal Identity Card */}
            <div className="bg-[#353633] p-8 border border-[#353633] flex flex-col justify-between items-center text-center text-[#F5F2EC]">
              <span className="text-[9.5px] uppercase tracking-[0.26em] text-[#D8C8B2] self-start mb-6">
                ARCHITECTURAL MARK
              </span>
              <MozuraLogo variant="stacked" theme="dark" size="lg" />
              <p className="text-[11px] text-[#A69B8B] mt-6 tracking-wide">
                Interlocking Stone Facets Forming The Structural 'M'
              </p>
            </div>

            {/* Circular Stamp Badge */}
            <div className="bg-[#EFEAE2] p-8 border border-[#D8C8B2] flex flex-col justify-between items-center text-center">
              <span className="text-[9.5px] uppercase tracking-[0.26em] text-[#8C877E] self-start mb-4">
                AUTHENTICITY SEAL
              </span>
              <div className="my-2">
                <MozuraLogo variant="circularStamp" size="md" />
              </div>
              <p className="text-[11px] text-[#8C877E] mt-4 tracking-wide">
                Certified Provenance & Hand-Graded Calibration
              </p>
            </div>
          </div>
        </div>

        {/* Official Color Palette Section (As depicted in brand identity reference) */}
        <div className="border border-[#D8C8B2]/70 bg-[#F5F2EC] p-8 sm:p-12 mb-20">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[#D8C8B2]/60 pb-6 mb-8 gap-4">
            <div>
              <span className="text-[11px] tracking-[0.28em] font-medium uppercase text-[#8C877E] block mb-1">
                MINERAL COLOR CODEX
              </span>
              <h3 className="font-['Marcellus',serif] text-2xl sm:text-3xl text-[#353633]">
                Official Brand Palette
              </h3>
            </div>
            <span className="text-xs font-mono text-[#8C877E] tracking-wider">
              NATURAL EARTH TONALITIES
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
            {brandColors.map((color) => (
              <div key={color.hex} className="flex flex-col">
                {/* Color Swatch Circle */}
                <div
                  className="aspect-square w-full rounded-full border border-[#D8C8B2] shadow-xs mb-3 transition-transform hover:scale-105"
                  style={{ backgroundColor: color.hex }}
                />
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#353633]">{color.name}</span>
                  <span className="text-[11px] font-mono text-[#8C877E]">{color.hex}</span>
                </div>
                <p className="text-[11px] text-[#8C877E] mt-1 leading-snug">
                  {color.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Craftsmanship Triad */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 border border-[#D8C8B2]/70 bg-[#F5F2EC]">
            <Gem className="w-5 h-5 text-[#A69B8B] mb-4" />
            <h4 className="font-['Marcellus',serif] text-xl text-[#353633] mb-2">
              01. Raw Quarry Selection
            </h4>
            <p className="text-xs text-[#8C877E] leading-relaxed">
              We extract only from veins that meet strict density, compressive strength, and mineral purity standards. 
              Zero synthetic fillers, artificial coatings, or color-enhancing dyes.
            </p>
          </div>

          <div className="p-8 border border-[#D8C8B2]/70 bg-[#F5F2EC]">
            <Layers className="w-5 h-5 text-[#A69B8B] mb-4" />
            <h4 className="font-['Marcellus',serif] text-xl text-[#353633] mb-2">
              02. Artisan Sorting & Assembly
            </h4>
            <p className="text-xs text-[#8C877E] leading-relaxed">
              Skilled stone artisans arrange each pebble and cut tile by hand on fiberglass mesh, ensuring interlocking perimeter edges that make joints virtually disappear upon grouting.
            </p>
          </div>

          <div className="p-8 border border-[#D8C8B2]/70 bg-[#F5F2EC]">
            <ShieldCheck className="w-5 h-5 text-[#A69B8B] mb-4" />
            <h4 className="font-['Marcellus',serif] text-xl text-[#353633] mb-2">
              03. Architectural Calibration
            </h4>
            <p className="text-xs text-[#8C877E] leading-relaxed">
              Whether specified for wet-barefoot pool walkways or vertical exterior facade cladding, our materials pass slip resistance, water absorption, and shear testing.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
