import React, { useState, useMemo } from 'react';
import { GalleryItem, BrandSettings } from '../types';
import { Eye, X, MessageSquare, MapPin, Calendar, Sparkles, ArrowRight } from 'lucide-react';

interface ApplicationGalleryProps {
  galleryItems: GalleryItem[];
  brandSettings: BrandSettings;
  onSelectProductCode?: (code: string) => void;
}

export const ApplicationGallery: React.FC<ApplicationGalleryProps> = ({
  galleryItems,
  brandSettings,
  onSelectProductCode,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);

  const categories = ['All', 'Swimming Pools', 'Gardens & Patios', 'Bathrooms & Spas', 'Walls & Facades'];

  const filteredItems = useMemo(() => {
    if (activeCategory === 'All') return galleryItems;
    return galleryItems.filter((item) => item.category === activeCategory);
  }, [galleryItems, activeCategory]);

  const handleWhatsAppInquiry = (item: GalleryItem) => {
    const phone = brandSettings.whatsappNumber.replace(/[^0-9]/g, '');
    const text = `Hello MOZURASTONE, I was inspired by your application project "${item.title}" (${item.location}) using [${item.stoneUsed}]. I'd like to discuss a similar finish for my upcoming project:`;
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="gallery" className="bg-[#F5F2EC] py-16 sm:py-24 border-t border-[#D8C8B2]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-[#D8C8B2]/60 gap-6">
          <div>
            <span className="text-[11px] tracking-[0.28em] font-medium uppercase text-[#8C877E] block mb-2">
              REALIZED ARCHITECTURE
            </span>
            <h2 className="font-['Marcellus',serif] text-3xl sm:text-4xl text-[#353633] tracking-[0.02em]">
              Application Gallery
            </h2>
          </div>
          <p className="text-sm text-[#353633]/80 max-w-md leading-relaxed">
            From submerged lagoon sanctuaries to monolithic volcanic stone facades, explore how MOZURASTONE natural textures shape distinguished spaces.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 text-xs uppercase tracking-[0.16em] font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0 border ${
                activeCategory === cat
                  ? 'bg-[#353633] text-[#F5F2EC] border-[#353633]'
                  : 'bg-[#F5F2EC] text-[#353633]/80 border-[#D8C8B2]/60 hover:border-[#353633]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveItem(item)}
              className="group cursor-pointer bg-[#F5F2EC] border border-[#D8C8B2]/70 hover:border-[#353633] transition-all duration-300 flex flex-col"
            >
              {/* Photo */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#E2DBD1]">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover object-center group-hover:scale-104 transition-transform duration-500 ease-out"
                  referrerPolicy="no-referrer"
                />

                <div className="absolute top-4 left-4 bg-[#F5F2EC]/95 backdrop-blur-xs px-2.5 py-1 text-[10px] tracking-[0.2em] uppercase text-[#353633] border border-[#D8C8B2]/60">
                  {item.category}
                </div>

                <div className="absolute inset-0 bg-[#353633]/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="px-4 py-2 bg-[#F5F2EC] text-[#353633] text-xs uppercase tracking-widest font-medium shadow-sm flex items-center gap-1.5">
                    <Eye className="w-3.5 h-3.5" />
                    <span>View Project</span>
                  </span>
                </div>
              </div>

              {/* Caption */}
              <div className="p-6 flex flex-col justify-between flex-grow">
                <div>
                  <div className="flex items-center gap-3 text-[11px] text-[#8C877E] tracking-wider mb-2">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#A69B8B]" />
                      {item.location}
                    </span>
                    <span>·</span>
                    <span>{item.year}</span>
                  </div>

                  <h3 className="font-['Marcellus',serif] text-lg text-[#353633] mb-2 group-hover:text-[#8C877E] transition-colors leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-xs text-[#8C877E] line-clamp-2 leading-relaxed">
                    <span className="font-semibold text-[#353633]/90">Stone: </span>
                    {item.stoneUsed}
                  </p>
                </div>

                <div className="mt-4 pt-4 border-t border-[#D8C8B2]/40 flex items-center justify-between text-xs text-[#353633] font-medium tracking-wider">
                  <span className="uppercase text-[11px]">Inspect Architecture</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Project Modal */}
      {activeItem && (
        <div
          className="fixed inset-0 z-50 overflow-y-auto bg-[#353633]/75 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 lg:p-10 animate-in fade-in duration-200"
          onClick={() => setActiveItem(null)}
        >
          <div
            className="relative w-full max-w-4xl bg-[#F5F2EC] border border-[#D8C8B2] shadow-2xl overflow-hidden my-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#D8C8B2]/60 bg-[#F5F2EC]">
              <div className="flex items-center gap-3">
                <span className="text-[11px] uppercase tracking-[0.2em] font-medium text-[#8C877E]">
                  {activeItem.category}
                </span>
                <span className="text-xs text-[#A69B8B]">·</span>
                <span className="text-xs text-[#353633] font-mono">{activeItem.location}</span>
              </div>
              <button
                onClick={() => setActiveItem(null)}
                className="p-1.5 text-[#353633] hover:text-black cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 sm:p-8 space-y-6">
              {/* Large Image */}
              <div className="aspect-[16/9] w-full border border-[#D8C8B2] overflow-hidden bg-[#E2DBD1] relative shadow-xs">
                <img
                  src={activeItem.image}
                  alt={activeItem.title}
                  className="w-full h-full object-cover object-center"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Project Details */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                <div className="md:col-span-8">
                  <h3 className="font-['Marcellus',serif] text-2xl sm:text-3xl text-[#353633] mb-3">
                    {activeItem.title}
                  </h3>
                  <p className="text-sm text-[#353633]/85 leading-relaxed font-normal">
                    {activeItem.description}
                  </p>
                </div>

                <div className="md:col-span-4 bg-[#EFEAE2] p-5 border border-[#D8C8B2]/70 space-y-4">
                  <div>
                    <span className="text-[10px] tracking-[0.2em] uppercase text-[#8C877E] font-medium block mb-1">
                      Material Specified
                    </span>
                    <p className="text-xs font-semibold text-[#353633]">
                      {activeItem.stoneUsed}
                    </p>
                    {activeItem.productCode && (
                      <span className="text-[11px] font-mono text-[#8C877E] block mt-0.5">
                        Code: {activeItem.productCode}
                      </span>
                    )}
                  </div>

                  <div>
                    <span className="text-[10px] tracking-[0.2em] uppercase text-[#8C877E] font-medium block mb-1">
                      Year Completed
                    </span>
                    <p className="text-xs text-[#353633]">
                      {activeItem.year}
                    </p>
                  </div>

                  <button
                    onClick={() => handleWhatsAppInquiry(activeItem)}
                    className="w-full py-2.5 px-3 text-xs uppercase tracking-[0.18em] font-medium text-[#F5F2EC] bg-[#353633] hover:bg-[#20211f] transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Inquire About Finish</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
