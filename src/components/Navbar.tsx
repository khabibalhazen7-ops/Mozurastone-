import React, { useState } from 'react';
import { MozuraLogo } from './MozuraLogo';
import { BrandSettings } from '../types';
import { Menu, X, MessageSquare, SlidersHorizontal, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  brandSettings: BrandSettings;
  activeView: 'storefront' | 'catalog' | 'gallery' | 'about' | 'admin';
  setActiveView: (view: 'storefront' | 'catalog' | 'gallery' | 'about' | 'admin') => void;
  onOpenWhatsAppModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  brandSettings,
  activeView,
  setActiveView,
  onOpenWhatsAppModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (view: 'storefront' | 'catalog' | 'gallery' | 'about' | 'admin') => {
    setActiveView(view);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-[#F5F2EC]/92 backdrop-blur-md border-b border-[#D8C8B2]/50 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-20">
          {/* Zone 1: Brand element */}
          <button
            onClick={() => handleNavClick('storefront')}
            className="flex items-center text-left focus:outline-none cursor-pointer group"
            aria-label="MOZURASTONE Home"
          >
            <MozuraLogo
              variant="horizontal"
              customLogoUrl={brandSettings.customLogoUrl}
              size="md"
              showTagline={true}
            />
          </button>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 text-[13px] tracking-[0.14em] uppercase font-medium text-[#353633]/80">
            <button
              onClick={() => handleNavClick('storefront')}
              className={`hover:text-[#353633] transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeView === 'storefront'
                  ? 'text-[#353633] font-semibold border-b border-[#353633] pb-0.5'
                  : ''
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => handleNavClick('catalog')}
              className={`hover:text-[#353633] transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeView === 'catalog'
                  ? 'text-[#353633] font-semibold border-b border-[#353633] pb-0.5'
                  : ''
              }`}
            >
              Stone Catalog
            </button>
            <button
              onClick={() => handleNavClick('gallery')}
              className={`hover:text-[#353633] transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeView === 'gallery'
                  ? 'text-[#353633] font-semibold border-b border-[#353633] pb-0.5'
                  : ''
              }`}
            >
              Application Gallery
            </button>
            <button
              onClick={() => handleNavClick('about')}
              className={`hover:text-[#353633] transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeView === 'about'
                  ? 'text-[#353633] font-semibold border-b border-[#353633] pb-0.5'
                  : ''
              }`}
            >
              Material Aura
            </button>
            <button
              onClick={() => handleNavClick('admin')}
              className={`hover:text-[#353633] transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer text-[#8C877E] hover:text-[#353633] ${
                activeView === 'admin'
                  ? 'text-[#353633] font-semibold border-b border-[#353633] pb-0.5'
                  : ''
              }`}
              title="Admin Dashboard"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Admin</span>
            </button>
          </nav>

          {/* Zone 3: Primary Action */}
          <div className="hidden sm:flex items-center gap-4 shrink-0">
            <button
              onClick={onOpenWhatsAppModal}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs uppercase tracking-[0.18em] font-medium text-[#F5F2EC] bg-[#353633] hover:bg-[#20211f] transition-all cursor-pointer shadow-xs active:scale-98"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span className="whitespace-nowrap shrink-0">Direct Inquiry</span>
            </button>
          </div>

          {/* Mobile hamburger button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={onOpenWhatsAppModal}
              className="p-2 text-[#353633] hover:text-black"
              aria-label="Direct Inquiry"
            >
              <MessageSquare className="w-5 h-5" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#353633] hover:text-black focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#D8C8B2]/50 bg-[#F5F2EC] px-6 py-6 space-y-4">
          <nav className="flex flex-col space-y-4 text-sm uppercase tracking-[0.18em] font-medium text-[#353633]">
            <button
              onClick={() => handleNavClick('storefront')}
              className={`text-left py-1 hover:text-black ${
                activeView === 'storefront' ? 'font-bold text-[#353633]' : 'text-[#353633]/70'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => handleNavClick('catalog')}
              className={`text-left py-1 hover:text-black ${
                activeView === 'catalog' ? 'font-bold text-[#353633]' : 'text-[#353633]/70'
              }`}
            >
              Stone Catalog
            </button>
            <button
              onClick={() => handleNavClick('gallery')}
              className={`text-left py-1 hover:text-black ${
                activeView === 'gallery' ? 'font-bold text-[#353633]' : 'text-[#353633]/70'
              }`}
            >
              Application Gallery
            </button>
            <button
              onClick={() => handleNavClick('about')}
              className={`text-left py-1 hover:text-black ${
                activeView === 'about' ? 'font-bold text-[#353633]' : 'text-[#353633]/70'
              }`}
            >
              Material Aura & Story
            </button>
            <button
              onClick={() => handleNavClick('admin')}
              className={`text-left py-1 flex items-center justify-between text-[#8C877E] hover:text-[#353633] ${
                activeView === 'admin' ? 'font-bold text-[#353633]' : ''
              }`}
            >
              <span>Admin Management</span>
              <SlidersHorizontal className="w-4 h-4" />
            </button>
          </nav>
          <div className="pt-4 border-t border-[#D8C8B2]/40">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenWhatsAppModal();
              }}
              className="w-full py-3 px-4 text-xs uppercase tracking-[0.2em] font-medium text-[#F5F2EC] bg-[#353633] flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Inquire via WhatsApp</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
