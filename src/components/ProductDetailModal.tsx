import React, { useState } from 'react';
import { Product, BrandSettings } from '../types';
import { X, MessageSquare, Check, Layers, Shield, Box, Globe, Copy, ArrowUpRight } from 'lucide-react';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  brandSettings: BrandSettings;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  brandSettings,
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [copiedLink, setCopiedLink] = useState(false);
  const [customArea, setCustomArea] = useState('');

  if (!product) return null;

  const images = [product.image, ...(product.secondaryImage ? [product.secondaryImage] : [])];
  const activeImage = images[activeImageIndex] || product.image;

  const handleWhatsAppInquiry = (isSampleRequest: boolean = false) => {
    const phone = brandSettings.whatsappNumber.replace(/[^0-9]/g, '');
    let text = '';
    if (isSampleRequest) {
      text = `Hello MOZURASTONE, I would like to request a physical architectural sample swatch box for [${product.code} - ${product.name}]. My project location and details:`;
    } else {
      text = `Hello MOZURASTONE, I am interested in [${product.code} - ${product.name}] for an upcoming project${
        customArea ? ` (Estimated area: ${customArea} m²)` : ''
      }. Please share technical data and export availability.`;
    }
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#353633]/70 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 lg:p-10 animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-5xl bg-[#F5F2EC] border border-[#D8C8B2] shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#D8C8B2]/60 bg-[#F5F2EC]">
          <div className="flex items-center gap-3">
            <span className="text-[11px] font-mono tracking-widest text-[#353633] px-2 py-0.5 border border-[#D8C8B2]">
              {product.code}
            </span>
            <span className="text-xs uppercase tracking-[0.2em] text-[#8C877E] font-medium">
              {product.category}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyLink}
              className="p-2 text-[#8C877E] hover:text-[#353633] text-xs flex items-center gap-1 cursor-pointer transition-colors"
              title="Copy link"
            >
              {copiedLink ? <Check className="w-4 h-4 text-emerald-700" /> : <Copy className="w-4 h-4" />}
            </button>
            <button
              onClick={onClose}
              className="p-2 text-[#353633] hover:text-black cursor-pointer transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="grid grid-cols-1 lg:grid-cols-12 max-h-[80vh] overflow-y-auto">
          {/* Left Column: Large Photography & Gallery */}
          <div className="lg:col-span-7 p-6 sm:p-8 border-b lg:border-b-0 lg:border-r border-[#D8C8B2]/60 flex flex-col justify-between bg-[#EFEAE2]">
            <div>
              {/* Main Photo View */}
              <div className="aspect-[4/3] w-full border border-[#D8C8B2] overflow-hidden bg-[#E2DBD1] shadow-xs relative">
                <img
                  src={activeImage}
                  alt={product.name}
                  className="w-full h-full object-cover object-center"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="flex items-center gap-3 mt-4">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`aspect-[4/3] w-20 overflow-hidden border-2 cursor-pointer transition-all ${
                        activeImageIndex === idx
                          ? 'border-[#353633] opacity-100'
                          : 'border-[#D8C8B2] opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={img}
                        alt={`${product.name} view ${idx + 1}`}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* In-photo note */}
            <div className="mt-6 pt-6 border-t border-[#D8C8B2]/60 text-xs text-[#8C877E] leading-relaxed">
              <span className="font-semibold text-[#353633]">Natural Material Note: </span>
              Each piece exhibits genuine mineral variation, tonal gradients, and textural nuances. 
              Photographed under balanced 5000K daylight.
            </div>
          </div>

          {/* Right Column: Architectural Specifications & Inquiry */}
          <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between bg-[#F5F2EC]">
            <div>
              <span className="text-[11px] tracking-[0.24em] font-medium uppercase text-[#8C877E] block mb-1">
                {product.finish} Finish
              </span>
              <h2 className="font-['Marcellus',serif] text-2xl sm:text-3xl text-[#353633] tracking-[0.02em] mb-4">
                {product.name}
              </h2>
              <p className="text-xs sm:text-sm text-[#353633]/85 leading-relaxed mb-6 font-normal">
                {product.description}
              </p>

              {/* Technical Specifications Table */}
              <div className="border border-[#D8C8B2]/70 divide-y divide-[#D8C8B2]/50 text-xs mb-6 bg-[#F5F2EC]">
                <div className="flex justify-between py-2.5 px-3">
                  <span className="text-[#8C877E] uppercase tracking-wider">Format / Sheet</span>
                  <span className="font-mono text-[#353633] font-medium text-right">{product.format}</span>
                </div>
                <div className="flex justify-between py-2.5 px-3">
                  <span className="text-[#8C877E] uppercase tracking-wider">Thickness</span>
                  <span className="font-mono text-[#353633] font-medium text-right">{product.thickness}</span>
                </div>
                <div className="flex justify-between py-2.5 px-3">
                  <span className="text-[#8C877E] uppercase tracking-wider">Quarry Origin</span>
                  <span className="text-[#353633] font-medium text-right">{product.origin}</span>
                </div>
                <div className="flex justify-between py-2.5 px-3">
                  <span className="text-[#8C877E] uppercase tracking-wider">Weight / m²</span>
                  <span className="font-mono text-[#353633] font-medium text-right">{product.weightPerSqm}</span>
                </div>
                <div className="flex justify-between py-2.5 px-3">
                  <span className="text-[#8C877E] uppercase tracking-wider">Packaging</span>
                  <span className="text-[#353633] text-right">{product.packaging}</span>
                </div>
              </div>

              {/* Suitable Applications */}
              <div className="mb-6">
                <span className="text-[11px] tracking-[0.2em] uppercase text-[#8C877E] font-medium block mb-2">
                  Suitable Environments
                </span>
                <div className="flex flex-wrap gap-2 text-xs text-[#353633]">
                  {product.applications.map((app, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 bg-[#EBE5DB] border border-[#D8C8B2]/60 font-medium"
                    >
                      {app}
                    </span>
                  ))}
                </div>
              </div>

              {/* Key Features List */}
              <div className="mb-6">
                <span className="text-[11px] tracking-[0.2em] uppercase text-[#8C877E] font-medium block mb-2">
                  Performance Attributes
                </span>
                <ul className="space-y-1.5 text-xs text-[#353633]/85">
                  {product.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-[#A69B8B] font-bold">·</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Direct Inquiry & Sample Ordering Box */}
            <div className="pt-6 border-t border-[#D8C8B2]/70 space-y-3">
              {/* Optional Project Area Estimator */}
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={customArea}
                  onChange={(e) => setCustomArea(e.target.value)}
                  placeholder="Estimated project area (e.g. 80 sqm)..."
                  className="flex-1 bg-[#F5F2EC] border border-[#D8C8B2] px-3 py-2 text-xs text-[#353633] placeholder-[#8C877E] focus:outline-none focus:border-[#353633]"
                />
              </div>

              {/* Primary Action: Direct WhatsApp Technical Concierge */}
              <button
                onClick={() => handleWhatsAppInquiry(false)}
                className="w-full py-3 px-4 text-xs uppercase tracking-[0.2em] font-medium text-[#F5F2EC] bg-[#353633] hover:bg-[#20211f] transition-all cursor-pointer flex items-center justify-center gap-2 shadow-xs"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Inquire via WhatsApp</span>
              </button>

              {/* Secondary Action: Request Architect Swatch Box */}
              <button
                onClick={() => handleWhatsAppInquiry(true)}
                className="w-full py-2.5 px-4 text-xs uppercase tracking-[0.18em] font-medium text-[#353633] border border-[#353633]/40 hover:border-[#353633] hover:bg-[#D8C8B2]/20 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Box className="w-4 h-4 text-[#8C877E]" />
                <span>Request Sample Swatch Box</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
