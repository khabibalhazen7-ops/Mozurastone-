export interface Product {
  id: string;
  name: string;
  code: string;
  category: 'Pebble Mosaic' | 'Marble Mosaic' | 'Travertine' | 'Stacked Stone' | 'Pavers & Cobbles' | 'Limestone';
  finish: 'Honed' | 'Tumbled' | 'Split-Face' | 'Natural River-Worn' | 'Brushed' | 'Polished';
  format: string;
  thickness: string;
  origin: string;
  applications: string[];
  description: string;
  features: string[];
  image: string;
  secondaryImage?: string;
  weightPerSqm: string;
  packaging: string;
  featured?: boolean;
  createdAt: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Swimming Pools' | 'Gardens & Patios' | 'Bathrooms & Spas' | 'Walls & Facades' | 'Flooring';
  location: string;
  stoneUsed: string;
  productCode?: string;
  description: string;
  image: string;
  year: string;
}

export interface BrandSettings {
  brandName: string;
  tagline: string;
  whatsappNumber: string;
  email: string;
  location: string;
  customLogoUrl: string;
  catalogPdfUrl: string;
}
