import React from 'react';
import { MozuraLogo } from './MozuraLogo';
import { ArrowRight, Compass, ShieldCheck, Waves } from 'lucide-react';

interface HeroProps {
  onExploreCatalog: () => void;
  onExploreGallery: () => void;
  onOpenWhatsApp: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreCatalog,
  onExploreGallery,
  onOpenWhatsApp,
}) => {
  return (
    <section className="relative bg-[#F5F2EC] overflow-hidden pt-8 pb-20 sm:pb-28">
      {/* Subtle architectural hairline grid background */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Tagline & Editorial Index */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[#D8C8B2]/60 pb-6 mb-10 gap-4">
          <div>
            <span className="text-[11px] sm:text-xs tracking-[0.3em] font-medium uppercase text-[#8C877E] block mb-1">
              ARCHITECTURAL STONE SURFACES
            </span>
            <p className="font-['Marcellus',serif] text-xl sm:text-2xl text-[#353633] tracking-[0.08em]">
              THE AURA OF NATURAL BEAUTY
            </p>
          </div>
          <div className="text-xs text-[#8C877E] tracking-widest font-mono">
            EST. 2026 · INDONESIAN QUARRIES & EXPORTS
          </div>
        </div>

        {/* Hero Headline & Intro Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-12 items-baseline">
          <div className="lg:col-span-8">
            <h1 className="font-['Marcellus',serif] text-3xl sm:text-5xl lg:text-6xl text-[#353633] tracking-[0.02em] leading-[1.15] text-balance">
              Formed by millennia. Sculpted for architectural serenity.
            </h1>
          </div>
          <div className="lg:col-span-4 flex flex-col justify-between">
            <p className="text-sm sm:text-base text-[#353633]/85 leading-relaxed font-normal">
              Hand-sorted river pebble mosaics, tumbled highland travertines, and chiseled volcanic basalt. 
              Designed for luxury resort pools, tranquil courtyards, and minimalist indoor sanctuaries.
            </p>
            <div className="mt-6 flex items-center gap-4">
              <button
                onClick={onExploreCatalog}
                className="px-6 py-3 text-xs uppercase tracking-[0.2em] font-medium text-[#F5F2EC] bg-[#353633] hover:bg-[#20211f] transition-all cursor-pointer flex items-center gap-2"
              >
                <span>View Stone Catalog</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={onExploreGallery}
                className="px-6 py-3 text-xs uppercase tracking-[0.2em] font-medium text-[#353633] border border-[#353633]/30 hover:border-[#353633] hover:bg-[#D8C8B2]/15 transition-all cursor-pointer"
              >
                Application Gallery
              </button>
            </div>
          </div>
        </div>

        {/* Hero Visual Focal: Large Architectural Photograph */}
        <div className="relative border border-[#D8C8B2]/60 overflow-hidden bg-[#E8E2D8] shadow-sm">
          <div className="aspect-[16/9] w-full relative">
            <img
              src="/src/assets/images/hero_stone_villa_1792387806180.jpg"
              alt="Luxury stone villa featuring natural stone pebble mosaics and tumbled travertine poolside terrace"
              className="w-full h-full object-cover object-center"
              referrerPolicy="no-referrer"
            />
            {/* Soft architectural overlay vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#353633]/50 via-transparent to-transparent pointer-events-none" />

            {/* In-photo Architectural Caption */}
            <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between text-[#F5F2EC] gap-4">
              <div className="max-w-md">
                <span className="text-[10px] tracking-[0.25em] uppercase text-[#D8C8B2] block mb-1">
                  CASE STUDY · BALI CLIFF RESIDENCE
                </span>
                <p className="font-['Marcellus',serif] text-lg sm:text-xl text-[#F5F2EC]">
                  Antico Travertine Pavers & River Pebble Pool Coping
                </p>
              </div>

              <div className="hidden md:flex items-center gap-6 text-xs text-[#F5F2EC]/90 tracking-wider">
                <span>Natural Daylight Tested</span>
                <span>·</span>
                <span>Class C Submersion Slip-Resistant</span>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Architectural Standards Strip */}
        <div className="grid grid-cols-1 md:grid-cols-4 border-x border-b border-[#D8C8B2]/60 bg-[#F5F2EC] divide-y md:divide-y-0 md:divide-x divide-[#D8C8B2]/60">
          <div className="p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-2 text-[#353633]">
              <Compass className="w-4 h-4 text-[#A69B8B]" />
              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#353633]">
                Ethical Quarry Extraction
              </span>
            </div>
            <p className="text-xs text-[#8C877E] leading-relaxed">
              Direct provenance from certified East Java riverbeds and sustainable volcanic basalt quarries.
            </p>
          </div>

          <div className="p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-2 text-[#353633]">
              <Waves className="w-4 h-4 text-[#A69B8B]" />
              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#353633]">
                Submerged & Wet Rated
              </span>
            </div>
            <p className="text-xs text-[#8C877E] leading-relaxed">
              Marine-grade flexible mesh backing with non-water-soluble resin bonding for lifetime swimming pool durability.
            </p>
          </div>

          <div className="p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-2 text-[#353633]">
              <ShieldCheck className="w-4 h-4 text-[#A69B8B]" />
              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#353633]">
                Hand-Culled Uniformity
              </span>
            </div>
            <p className="text-xs text-[#8C877E] leading-relaxed">
              Every river pebble and tumbled paver is calibrated manually for consistent thickness and flat foot-feel.
            </p>
          </div>

          <div className="p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <span className="text-[10px] tracking-[0.25em] uppercase text-[#A69B8B] block mb-1">
                ARCHITECT CONCIERGE
              </span>
              <p className="text-xs text-[#353633] font-medium leading-relaxed">
                Direct export specifications & container shipping worldwide.
              </p>
            </div>
            <button
              onClick={onOpenWhatsApp}
              className="mt-3 text-xs tracking-wider uppercase text-[#353633] font-semibold underline underline-offset-4 hover:text-[#8C877E] cursor-pointer text-left"
            >
              Consult with specialist →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
