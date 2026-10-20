/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Product, GalleryItem, BrandSettings } from './types';
import {
  INITIAL_PRODUCTS,
  INITIAL_GALLERY,
  INITIAL_BRAND_SETTINGS,
} from './data/initialData';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductCatalog } from './components/ProductCatalog';
import { ProductDetailModal } from './components/ProductDetailModal';
import { ApplicationGallery } from './components/ApplicationGallery';
import { BrandStory } from './components/BrandStory';
import { WhatsAppConcierge } from './components/WhatsAppConcierge';
import { AdminDashboard } from './components/AdminDashboard';
import { Footer } from './components/Footer';
import { MessageSquare, ArrowRight, ShieldCheck, Sparkles, SlidersHorizontal } from 'lucide-react';

export default function App() {
  // Navigation view state
  const [activeView, setActiveView] = useState<
    'storefront' | 'catalog' | 'gallery' | 'about' | 'admin'
  >('storefront');

  // Selected product for detail modal
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // WhatsApp concierge modal open/close
  const [isWhatsAppOpen, setIsWhatsAppOpen] = useState(false);

  // Persistent Products State
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('mozurastone_products_v2');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed reading products from localStorage', e);
    }
    return INITIAL_PRODUCTS;
  });

  // Persistent Gallery State
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(() => {
    try {
      const saved = localStorage.getItem('mozurastone_gallery_v2');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed reading gallery from localStorage', e);
    }
    return INITIAL_GALLERY;
  });

  // Persistent Brand Settings State
  const [brandSettings, setBrandSettings] = useState<BrandSettings>(() => {
    try {
      const saved = localStorage.getItem('mozurastone_brand_v2');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed reading brand settings from localStorage', e);
    }
    return INITIAL_BRAND_SETTINGS;
  });

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('mozurastone_products_v2', JSON.stringify(products));
    } catch (e) {
      console.error('Failed saving products to localStorage', e);
    }
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem('mozurastone_gallery_v2', JSON.stringify(galleryItems));
    } catch (e) {
      console.error('Failed saving gallery to localStorage', e);
    }
  }, [galleryItems]);

  useEffect(() => {
    try {
      localStorage.setItem('mozurastone_brand_v2', JSON.stringify(brandSettings));
    } catch (e) {
      console.error('Failed saving brand settings to localStorage', e);
    }
  }, [brandSettings]);

  // Handle direct inquiry on a product
  const handleInquireProduct = (prod: Product) => {
    const phone = brandSettings.whatsappNumber.replace(/[^0-9]/g, '');
    const text = `Hello MOZURASTONE, I would like to inquire about [${prod.code} - ${prod.name}] (${prod.format}, ${prod.finish}). Please share architectural specifications and availability:`;
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  // Reset to initial factory presets
  const handleResetToDefaults = () => {
    setProducts(INITIAL_PRODUCTS);
    setGalleryItems(INITIAL_GALLERY);
    setBrandSettings(INITIAL_BRAND_SETTINGS);
    try {
      localStorage.removeItem('mozurastone_products_v2');
      localStorage.removeItem('mozurastone_gallery_v2');
      localStorage.removeItem('mozurastone_brand_v2');
    } catch (e) {
      console.error('Error clearing localStorage', e);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F2EC] text-[#353633] flex flex-col font-sans selection:bg-[#D8C8B2] selection:text-[#353633]">
      {/* Top Navbar */}
      <Navbar
        brandSettings={brandSettings}
        activeView={activeView}
        setActiveView={setActiveView}
        onOpenWhatsAppModal={() => setIsWhatsAppOpen(true)}
      />

      {/* Main View Router */}
      <main className="flex-grow">
        {activeView === 'storefront' && (
          <>
            {/* Hero Section */}
            <Hero
              onExploreCatalog={() => {
                setActiveView('catalog');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onExploreGallery={() => {
                setActiveView('gallery');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onOpenWhatsApp={() => setIsWhatsAppOpen(true)}
            />

            {/* Featured Stones Showcase */}
            <ProductCatalog
              products={products}
              onSelectProduct={(prod) => setSelectedProduct(prod)}
              onInquireProduct={handleInquireProduct}
            />

            {/* Architectural Application Preview */}
            <ApplicationGallery
              galleryItems={galleryItems}
              brandSettings={brandSettings}
              onSelectProductCode={(code) => {
                const found = products.find((p) => p.code === code);
                if (found) setSelectedProduct(found);
              }}
            />

            {/* Material Aura & Brand Essence */}
            <BrandStory />

            {/* Architectural Inquiry Banner */}
            <section className="bg-[#EFEAE2] border-t border-b border-[#D8C8B2]/70 py-16 sm:py-20">
              <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <span className="text-[11px] tracking-[0.28em] font-medium uppercase text-[#8C877E] block mb-2">
                  ARCHITECT & DESIGNER SERVICES
                </span>
                <h2 className="font-['Marcellus',serif] text-3xl sm:text-4xl text-[#353633] mb-4">
                  Request Bespoke Quarry Specifications
                </h2>
                <p className="text-sm text-[#353633]/80 max-w-xl mx-auto leading-relaxed mb-8">
                  From custom mosaic mesh sheet dimensions to volume sea-freight container orders for hotel developments, 
                  our stone specialists coordinate directly with your project architects.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <button
                    onClick={() => setIsWhatsAppOpen(true)}
                    className="w-full sm:w-auto px-8 py-3.5 text-xs uppercase tracking-[0.2em] font-medium text-[#F5F2EC] bg-[#353633] hover:bg-black transition-all cursor-pointer flex items-center justify-center gap-2 shadow-xs"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Inquire via WhatsApp</span>
                  </button>
                  <button
                    onClick={() => {
                      setActiveView('catalog');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="w-full sm:w-auto px-8 py-3.5 text-xs uppercase tracking-[0.2em] font-medium text-[#353633] border border-[#353633]/30 hover:border-[#353633] hover:bg-[#D8C8B2]/20 transition-all cursor-pointer"
                  >
                    Explore Complete Archive
                  </button>
                </div>
              </div>
            </section>
          </>
        )}

        {activeView === 'catalog' && (
          <ProductCatalog
            products={products}
            onSelectProduct={(prod) => setSelectedProduct(prod)}
            onInquireProduct={handleInquireProduct}
          />
        )}

        {activeView === 'gallery' && (
          <ApplicationGallery
            galleryItems={galleryItems}
            brandSettings={brandSettings}
            onSelectProductCode={(code) => {
              const found = products.find((p) => p.code === code);
              if (found) setSelectedProduct(found);
            }}
          />
        )}

        {activeView === 'about' && <BrandStory />}

        {activeView === 'admin' && (
          <AdminDashboard
            products={products}
            galleryItems={galleryItems}
            brandSettings={brandSettings}
            onUpdateProducts={setProducts}
            onUpdateGallery={setGalleryItems}
            onUpdateBrandSettings={setBrandSettings}
            onResetToDefaults={handleResetToDefaults}
            onCloseAdmin={() => setActiveView('storefront')}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        brandSettings={brandSettings}
        onNavigate={(view) => {
          setActiveView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenWhatsApp={() => setIsWhatsAppOpen(true)}
      />

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          brandSettings={brandSettings}
        />
      )}

      {/* WhatsApp Inquiry Modal */}
      <WhatsAppConcierge
        isOpen={isWhatsAppOpen}
        onClose={() => setIsWhatsAppOpen(false)}
        brandSettings={brandSettings}
      />

      {/* Floating Discreet WhatsApp Button (Touch-friendly & non-intrusive) */}
      <div className="fixed bottom-6 right-6 z-30">
        <button
          onClick={() => setIsWhatsAppOpen(true)}
          className="group flex items-center gap-2.5 bg-[#353633] text-[#F5F2EC] px-4 py-3 border border-[#D8C8B2]/40 shadow-xl hover:bg-black transition-all cursor-pointer active:scale-95"
          aria-label="Direct Stone Concierge"
        >
          <div className="relative">
            <MessageSquare className="w-4 h-4 text-[#D8C8B2]" />
          </div>
          <span className="text-xs uppercase tracking-[0.16em] font-medium hidden sm:inline-block">
            Stone Concierge
          </span>
        </button>
      </div>
    </div>
  );
}
