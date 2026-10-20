import React from 'react';
import { BrandSettings } from '../types';
import { MozuraLogo } from './MozuraLogo';
import { MessageSquare, ArrowUpRight, MapPin, Mail, Phone } from 'lucide-react';

interface FooterProps {
  brandSettings: BrandSettings;
  onNavigate: (view: 'storefront' | 'catalog' | 'gallery' | 'about' | 'admin') => void;
  onOpenWhatsApp: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  brandSettings,
  onNavigate,
  onOpenWhatsApp,
}) => {
  return (
    <footer className="bg-[#353633] text-[#F5F2EC] pt-20 pb-12 border-t border-[#353633]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-[#8C877E]/30">
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-6">
            <MozuraLogo
              variant="horizontal"
              theme="dark"
              customLogoUrl={brandSettings.customLogoUrl}
              size="lg"
              showTagline={true}
            />
            <p className="text-xs sm:text-sm text-[#A69B8B] leading-relaxed max-w-sm font-normal">
              Purveyors of hand-graded Indonesian river pebble mosaics, tumbled highland travertines, 
              and architectural basalt surfaces. Calibrated for bespoke residential architecture and luxury hospitality.
            </p>

            <div className="pt-2">
              <button
                onClick={onOpenWhatsApp}
                className="inline-flex items-center gap-2 px-5 py-3 text-xs uppercase tracking-[0.2em] font-medium text-[#353633] bg-[#F5F2EC] hover:bg-white transition-all cursor-pointer shadow-xs"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Direct WhatsApp Inquiries</span>
              </button>
            </div>
          </div>

          {/* Nav Col: Collections */}
          <div className="md:col-span-2 space-y-4">
            <span className="text-[10px] tracking-[0.26em] uppercase text-[#D8C8B2] font-semibold block">
              COLLECTIONS
            </span>
            <ul className="space-y-2.5 text-xs text-[#A69B8B]">
              <li>
                <button
                  onClick={() => onNavigate('catalog')}
                  className="hover:text-[#F5F2EC] transition-colors cursor-pointer text-left"
                >
                  River Pebble Mosaics
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('catalog')}
                  className="hover:text-[#F5F2EC] transition-colors cursor-pointer text-left"
                >
                  Tumbled Travertine Pavers
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('catalog')}
                  className="hover:text-[#F5F2EC] transition-colors cursor-pointer text-left"
                >
                  Basalt Split-Face Ledgers
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('catalog')}
                  className="hover:text-[#F5F2EC] transition-colors cursor-pointer text-left"
                >
                  Honed Marble Chevrons
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('catalog')}
                  className="hover:text-[#F5F2EC] transition-colors cursor-pointer text-left"
                >
                  Garden Stepping Flagstones
                </button>
              </li>
            </ul>
          </div>

          {/* Nav Col: Applications */}
          <div className="md:col-span-2 space-y-4">
            <span className="text-[10px] tracking-[0.26em] uppercase text-[#D8C8B2] font-semibold block">
              APPLICATIONS
            </span>
            <ul className="space-y-2.5 text-xs text-[#A69B8B]">
              <li>
                <button
                  onClick={() => onNavigate('gallery')}
                  className="hover:text-[#F5F2EC] transition-colors cursor-pointer text-left"
                >
                  Swimming Pools & Spas
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('gallery')}
                  className="hover:text-[#F5F2EC] transition-colors cursor-pointer text-left"
                >
                  Zen Gardens & Walkways
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('gallery')}
                  className="hover:text-[#F5F2EC] transition-colors cursor-pointer text-left"
                >
                  Luxury Bathroom Walls
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('gallery')}
                  className="hover:text-[#F5F2EC] transition-colors cursor-pointer text-left"
                >
                  Exterior Monolith Facades
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('gallery')}
                  className="hover:text-[#F5F2EC] transition-colors cursor-pointer text-left"
                >
                  Sun Terraces & Patios
                </button>
              </li>
            </ul>
          </div>

          {/* Contact & Studio Col */}
          <div className="md:col-span-3 space-y-4">
            <span className="text-[10px] tracking-[0.26em] uppercase text-[#D8C8B2] font-semibold block">
              QUARRY STUDIO
            </span>
            <div className="space-y-3 text-xs text-[#A69B8B]">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#D8C8B2] shrink-0 mt-0.5" />
                <span>{brandSettings.location}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#D8C8B2] shrink-0" />
                <a href={`mailto:${brandSettings.email}`} className="hover:text-[#F5F2EC]">
                  {brandSettings.email}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#D8C8B2] shrink-0" />
                <span>+{brandSettings.whatsappNumber}</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => onNavigate('admin')}
                className="text-[11px] tracking-wider uppercase text-[#8C877E] hover:text-[#D8C8B2] transition-colors flex items-center gap-1 cursor-pointer"
              >
                <span>Studio Admin Portal</span>
                <ArrowUpRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Brand Palette Dots */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#8C877E] gap-4">
          <p>© {new Date().getFullYear()} MOZURASTONE. All rights reserved. The Aura of Natural Beauty.</p>
          <div className="flex items-center gap-3">
            <span className="text-[10px] tracking-widest uppercase">Palette:</span>
            <div className="flex items-center gap-1.5" title="Official MOZURASTONE Color Palette">
              <div className="w-2.5 h-2.5 rounded-full bg-[#F5F2EC] border border-[#8C877E]/50" title="Ivory #F5F2EC" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#D8C8B2]" title="Natural Beige #D8C8B2" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#A69B8B]" title="Stone Taupe #A69B8B" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#353633] border border-[#8C877E]" title="Charcoal #353633" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#8C877E]" title="Warm Grey #8C877E" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
