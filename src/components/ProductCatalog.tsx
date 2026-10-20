import React, { useState, useMemo } from 'react';
import { Product } from '../types';
import { MessageSquare, ArrowRight, Search, Eye, Filter } from 'lucide-react';

interface ProductCatalogProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onInquireProduct: (product: Product) => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  products,
  onSelectProduct,
  onInquireProduct,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = useMemo(() => {
    const list = Array.from(new Set(products.map((p) => p.category)));
    return ['All', ...list];
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
      const matchesSearch =
        searchQuery.trim() === '' ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.finish.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.applications.some((app) => app.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [products, selectedCategory, searchQuery]);

  return (
    <section id="catalog" className="bg-[#F5F2EC] py-16 sm:py-24 border-t border-[#D8C8B2]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-[#D8C8B2]/60 gap-6">
          <div>
            <span className="text-[11px] tracking-[0.28em] font-medium uppercase text-[#8C877E] block mb-2">
              NATURAL STONE ARCHIVE
            </span>
            <h2 className="font-['Marcellus',serif] text-3xl sm:text-4xl text-[#353633] tracking-[0.02em]">
              The Material Collection
            </h2>
          </div>
          <p className="text-sm text-[#353633]/80 max-w-md leading-relaxed">
            Every stone is individually quarried, graded, and finished for high architectural performance. 
            All items are available in standard pallets or custom architectural dimensions.
          </p>
        </div>

        {/* Filter Bar & Search */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-12">
          {/* Functional Category Filter Buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 text-xs uppercase tracking-[0.16em] font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0 border ${
                  selectedCategory === cat
                    ? 'bg-[#353633] text-[#F5F2EC] border-[#353633]'
                    : 'bg-[#F5F2EC] text-[#353633]/80 border-[#D8C8B2]/60 hover:border-[#353633]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full lg:w-72 shrink-0">
            <Search className="w-4 h-4 text-[#8C877E] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by code or name..."
              className="w-full bg-[#F5F2EC] border border-[#D8C8B2]/70 pl-10 pr-4 py-2 text-xs tracking-wider text-[#353633] placeholder-[#8C877E] focus:outline-none focus:border-[#353633] transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#8C877E] hover:text-[#353633]"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="py-20 text-center border border-dashed border-[#D8C8B2] p-8">
            <p className="font-['Marcellus',serif] text-xl text-[#353633] mb-2">No stones matching your criteria</p>
            <p className="text-xs text-[#8C877E] mb-6">Try clearing the search query or selecting a different category filter.</p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="px-5 py-2 text-xs uppercase tracking-widest bg-[#353633] text-[#F5F2EC]"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="group flex flex-col bg-[#F5F2EC] border border-[#D8C8B2]/70 hover:border-[#353633] transition-all duration-300"
              >
                {/* Product Image with consistent 4:3 ratio */}
                <div
                  onClick={() => onSelectProduct(product)}
                  className="relative aspect-[4/3] w-full overflow-hidden bg-[#EAE4D9] cursor-pointer"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-500 ease-out"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      // Fallback styled surface
                      const target = e.currentTarget;
                      target.style.display = 'none';
                    }}
                  />

                  {/* Top Product Code Tag (Unboxed clean text) */}
                  <div className="absolute top-4 left-4 bg-[#F5F2EC]/95 backdrop-blur-xs px-2.5 py-1 text-[11px] font-mono tracking-widest text-[#353633] border border-[#D8C8B2]/60">
                    {product.code}
                  </div>

                  {/* Hover Quick View Overlay */}
                  <div className="absolute inset-0 bg-[#353633]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                    <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#F5F2EC] text-[#353633] text-xs uppercase tracking-widest font-medium shadow-sm">
                      <Eye className="w-3.5 h-3.5" />
                      <span>Inspect Details</span>
                    </span>
                  </div>
                </div>

                {/* Product Card Content */}
                <div className="p-6 flex flex-col flex-grow justify-between border-t border-[#D8C8B2]/50">
                  <div>
                    {/* Clean unboxed metadata with dot separators */}
                    <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-[#8C877E] mb-2 font-medium">
                      <span>{product.category}</span>
                      <span aria-hidden="true">·</span>
                      <span>{product.finish}</span>
                    </div>

                    {/* Product Name */}
                    <h3
                      onClick={() => onSelectProduct(product)}
                      className="font-['Marcellus',serif] text-xl text-[#353633] hover:text-[#8C877E] transition-colors cursor-pointer mb-2 leading-snug"
                    >
                      {product.name}
                    </h3>

                    {/* Brief Dimension & Format Spec */}
                    <p className="text-xs text-[#8C877E] mb-4 line-clamp-2 leading-relaxed">
                      {product.format} · {product.thickness}
                    </p>
                  </div>

                  {/* Actions Bar (WhatsApp direct inquiry & Details) */}
                  <div className="pt-4 border-t border-[#D8C8B2]/40 flex items-center justify-between gap-4">
                    <button
                      onClick={() => onSelectProduct(product)}
                      className="text-xs uppercase tracking-[0.16em] font-medium text-[#353633] hover:text-[#8C877E] flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <span>Specifications</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>

                    {/* Discreet WhatsApp Inquiry Link */}
                    <button
                      onClick={() => onInquireProduct(product)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] uppercase tracking-[0.14em] font-medium text-[#353633] border border-[#353633]/30 hover:border-[#353633] hover:bg-[#D8C8B2]/20 transition-all cursor-pointer"
                      title="Direct WhatsApp inquiry for this product"
                    >
                      <MessageSquare className="w-3 h-3 text-[#353633]" />
                      <span>Inquire</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
