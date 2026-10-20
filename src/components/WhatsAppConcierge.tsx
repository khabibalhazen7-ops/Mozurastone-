import React, { useState } from 'react';
import { BrandSettings } from '../types';
import { MessageSquare, X, Send, BookOpen, Box, Ruler, CheckCircle2 } from 'lucide-react';

interface WhatsAppConciergeProps {
  isOpen: boolean;
  onClose: () => void;
  brandSettings: BrandSettings;
}

export const WhatsAppConcierge: React.FC<WhatsAppConciergeProps> = ({
  isOpen,
  onClose,
  brandSettings,
}) => {
  const [inquiryType, setInquiryType] = useState<
    'catalog' | 'sample' | 'custom' | 'consultation'
  >('sample');
  const [projectName, setProjectName] = useState('');
  const [projectLocation, setProjectLocation] = useState('');
  const [estimatedArea, setEstimatedArea] = useState('');
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const handleLaunchWhatsApp = () => {
    const phone = brandSettings.whatsappNumber.replace(/[^0-9]/g, '');

    let subject = '';
    if (inquiryType === 'catalog') subject = 'Digital Stone Catalog Request (PDF)';
    if (inquiryType === 'sample') subject = 'Physical Architectural Sample Box Request';
    if (inquiryType === 'custom') subject = 'Custom Sizing & Volume Export Quotation';
    if (inquiryType === 'consultation') subject = 'Technical Architectural Consultation';

    const textLines = [
      `*MOZURASTONE ARCHITECTURAL INQUIRY*`,
      `*Subject:* ${subject}`,
      projectName ? `*Project:* ${projectName}` : null,
      projectLocation ? `*Location:* ${projectLocation}` : null,
      estimatedArea ? `*Scope / Area:* ${estimatedArea} m²` : null,
      notes ? `*Notes:* ${notes}` : null,
      ``,
      `Hello MOZURASTONE team, please connect me with a stone specialist.`,
    ].filter(Boolean);

    const fullMessage = textLines.join('\n');
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(fullMessage)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#353633]/70 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-lg bg-[#F5F2EC] border border-[#D8C8B2] shadow-2xl p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-[#D8C8B2]/60 pb-4 mb-6">
          <div>
            <span className="text-[10px] tracking-[0.25em] uppercase text-[#8C877E] font-medium block mb-1">
              DIRECT STONE CONCIERGE
            </span>
            <h3 className="font-['Marcellus',serif] text-2xl text-[#353633]">
              WhatsApp Consultation
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#353633] hover:text-black cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Inquiry Type Selector */}
        <div className="space-y-4 mb-6">
          <label className="text-xs uppercase tracking-wider font-semibold text-[#353633] block">
            Select Inquiry Intent
          </label>
          <div className="grid grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={() => setInquiryType('sample')}
              className={`p-3 text-left border text-xs cursor-pointer transition-colors flex flex-col justify-between h-20 ${
                inquiryType === 'sample'
                  ? 'bg-[#353633] text-[#F5F2EC] border-[#353633]'
                  : 'bg-[#F5F2EC] text-[#353633] border-[#D8C8B2]/70 hover:border-[#353633]'
              }`}
            >
              <Box className="w-4 h-4 mb-1" />
              <span className="font-medium tracking-wide">Sample Swatch Box</span>
            </button>

            <button
              type="button"
              onClick={() => setInquiryType('catalog')}
              className={`p-3 text-left border text-xs cursor-pointer transition-colors flex flex-col justify-between h-20 ${
                inquiryType === 'catalog'
                  ? 'bg-[#353633] text-[#F5F2EC] border-[#353633]'
                  : 'bg-[#F5F2EC] text-[#353633] border-[#D8C8B2]/70 hover:border-[#353633]'
              }`}
            >
              <BookOpen className="w-4 h-4 mb-1" />
              <span className="font-medium tracking-wide">Full PDF Catalog</span>
            </button>

            <button
              type="button"
              onClick={() => setInquiryType('custom')}
              className={`p-3 text-left border text-xs cursor-pointer transition-colors flex flex-col justify-between h-20 ${
                inquiryType === 'custom'
                  ? 'bg-[#353633] text-[#F5F2EC] border-[#353633]'
                  : 'bg-[#F5F2EC] text-[#353633] border-[#D8C8B2]/70 hover:border-[#353633]'
              }`}
            >
              <Ruler className="w-4 h-4 mb-1" />
              <span className="font-medium tracking-wide">Custom Sizing / Export</span>
            </button>

            <button
              type="button"
              onClick={() => setInquiryType('consultation')}
              className={`p-3 text-left border text-xs cursor-pointer transition-colors flex flex-col justify-between h-20 ${
                inquiryType === 'consultation'
                  ? 'bg-[#353633] text-[#F5F2EC] border-[#353633]'
                  : 'bg-[#F5F2EC] text-[#353633] border-[#D8C8B2]/70 hover:border-[#353633]'
              }`}
            >
              <MessageSquare className="w-4 h-4 mb-1" />
              <span className="font-medium tracking-wide">Stone Specialist Chat</span>
            </button>
          </div>
        </div>

        {/* Inputs */}
        <div className="space-y-3 mb-6">
          <div>
            <label className="text-[11px] uppercase tracking-wider text-[#8C877E] font-medium block mb-1">
              Project Name / Firm (Optional)
            </label>
            <input
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder="e.g. Villa Nusa Dua / Studio K Architecture"
              className="w-full bg-[#F5F2EC] border border-[#D8C8B2] px-3 py-2 text-xs text-[#353633] placeholder-[#8C877E] focus:outline-none focus:border-[#353633]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] uppercase tracking-wider text-[#8C877E] font-medium block mb-1">
                Project City / Country
              </label>
              <input
                type="text"
                value={projectLocation}
                onChange={(e) => setProjectLocation(e.target.value)}
                placeholder="e.g. Bali, Singapore, Sydney"
                className="w-full bg-[#F5F2EC] border border-[#D8C8B2] px-3 py-2 text-xs text-[#353633] placeholder-[#8C877E] focus:outline-none focus:border-[#353633]"
              />
            </div>
            <div>
              <label className="text-[11px] uppercase tracking-wider text-[#8C877E] font-medium block mb-1">
                Approx. Area (m²)
              </label>
              <input
                type="text"
                value={estimatedArea}
                onChange={(e) => setEstimatedArea(e.target.value)}
                placeholder="e.g. 150"
                className="w-full bg-[#F5F2EC] border border-[#D8C8B2] px-3 py-2 text-xs text-[#353633] placeholder-[#8C877E] focus:outline-none focus:border-[#353633]"
              />
            </div>
          </div>

          <div>
            <label className="text-[11px] uppercase tracking-wider text-[#8C877E] font-medium block mb-1">
              Stone Requirements / Questions
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Tell us about your stone mosaic or paver requirements..."
              className="w-full bg-[#F5F2EC] border border-[#D8C8B2] px-3 py-2 text-xs text-[#353633] placeholder-[#8C877E] focus:outline-none focus:border-[#353633]"
            />
          </div>
        </div>

        {/* WhatsApp Launch CTA */}
        <button
          onClick={handleLaunchWhatsApp}
          className="w-full py-3.5 px-4 text-xs uppercase tracking-[0.2em] font-medium text-[#F5F2EC] bg-[#353633] hover:bg-[#20211f] transition-all cursor-pointer flex items-center justify-center gap-2 shadow-xs"
        >
          <Send className="w-3.5 h-3.5" />
          <span>Launch WhatsApp Inquiry</span>
        </button>

        <p className="mt-4 text-center text-[11px] text-[#8C877E]">
          Official Concierge: +{brandSettings.whatsappNumber} · Typically responds within 30 minutes
        </p>
      </div>
    </div>
  );
};
