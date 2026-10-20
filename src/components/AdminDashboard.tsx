import React, { useState } from 'react';
import { Product, GalleryItem, BrandSettings } from '../types';
import { MozuraLogo } from './MozuraLogo';
import {
  Plus,
  Trash2,
  Edit2,
  Upload,
  Save,
  Check,
  AlertCircle,
  Image as ImageIcon,
  Sliders,
  Layers,
  Settings,
  Lock,
  Unlock,
  Eye,
  RefreshCw,
  LogOut,
} from 'lucide-react';

interface AdminDashboardProps {
  products: Product[];
  galleryItems: GalleryItem[];
  brandSettings: BrandSettings;
  onUpdateProducts: (products: Product[]) => void;
  onUpdateGallery: (items: GalleryItem[]) => void;
  onUpdateBrandSettings: (settings: BrandSettings) => void;
  onResetToDefaults: () => void;
  onCloseAdmin: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  products,
  galleryItems,
  brandSettings,
  onUpdateProducts,
  onUpdateGallery,
  onUpdateBrandSettings,
  onResetToDefaults,
  onCloseAdmin,
}) => {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true); // Default unlocked for seamless demonstration
  const [adminPin, setAdminPin] = useState('');
  const [authError, setAuthError] = useState('');

  // Active Tab: 'products' | 'gallery' | 'settings'
  const [activeTab, setActiveTab] = useState<'products' | 'gallery' | 'settings'>('products');

  // Product Form State
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [productForm, setProductForm] = useState<Partial<Product>>({
    name: '',
    code: '',
    category: 'Pebble Mosaic',
    finish: 'Natural River-Worn',
    format: '300 × 300 mm Mesh Sheet',
    thickness: '10 mm',
    origin: 'East Java Quarry, Indonesia',
    applications: ['Swimming Pool Interiors', 'Shower Floors'],
    description: '',
    features: ['Interlocking mesh backing', 'Naturally slip-resistant'],
    image: '',
    weightPerSqm: '21 kg/m²',
    packaging: '11 sheets / box (0.99 m²)',
    featured: false,
  });

  // Gallery Form State
  const [editingGallery, setEditingGallery] = useState<GalleryItem | null>(null);
  const [isAddingGallery, setIsAddingGallery] = useState(false);
  const [galleryForm, setGalleryForm] = useState<Partial<GalleryItem>>({
    title: '',
    category: 'Swimming Pools',
    location: '',
    stoneUsed: '',
    productCode: '',
    description: '',
    image: '',
    year: '2026',
  });

  // Settings Form State
  const [tempSettings, setTempSettings] = useState<BrandSettings>({ ...brandSettings });
  const [savedSettingsNotice, setSavedSettingsNotice] = useState(false);

  // Authentication check
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminPin === 'admin' || adminPin === '1234' || adminPin === '') {
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Invalid passcode. (Use demo passcode: admin)');
    }
  };

  // Image Upload Handler converting file to Data URL for persistent storage
  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: 'product' | 'gallery' | 'logo'
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      if (type === 'product') {
        setProductForm((prev) => ({ ...prev, image: result }));
      } else if (type === 'gallery') {
        setGalleryForm((prev) => ({ ...prev, image: result }));
      } else if (type === 'logo') {
        setTempSettings((prev) => ({ ...prev, customLogoUrl: result }));
      }
    };
    reader.readAsDataURL(file);
  };

  // Save Product (Create or Update)
  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productForm.name || !productForm.code) return;

    if (editingProduct) {
      const updated = products.map((p) =>
        p.id === editingProduct.id
          ? ({
              ...p,
              ...productForm,
              applications: Array.isArray(productForm.applications)
                ? productForm.applications
                : (productForm.applications as unknown as string).split(',').map((s) => s.trim()),
              features: Array.isArray(productForm.features)
                ? productForm.features
                : (productForm.features as unknown as string).split(',').map((s) => s.trim()),
            } as Product)
          : p
      );
      onUpdateProducts(updated);
      setEditingProduct(null);
    } else {
      const newProduct: Product = {
        id: `prod-${Date.now()}`,
        name: productForm.name || 'Unnamed Stone',
        code: productForm.code || 'MZ-000',
        category: productForm.category || 'Pebble Mosaic',
        finish: productForm.finish || 'Natural River-Worn',
        format: productForm.format || '300 × 300 mm',
        thickness: productForm.thickness || '10 mm',
        origin: productForm.origin || 'East Java, Indonesia',
        applications: Array.isArray(productForm.applications)
          ? productForm.applications
          : (productForm.applications as unknown as string).split(',').map((s) => s.trim()),
        description: productForm.description || '',
        features: Array.isArray(productForm.features)
          ? productForm.features
          : (productForm.features as unknown as string).split(',').map((s) => s.trim()),
        image: productForm.image || '/src/assets/images/pebble_mosaic_tile_1792387807714.jpg',
        weightPerSqm: productForm.weightPerSqm || '22 kg/m²',
        packaging: productForm.packaging || '10 sheets / box',
        featured: !!productForm.featured,
        createdAt: new Date().toISOString().split('T')[0],
      };
      onUpdateProducts([newProduct, ...products]);
      setIsAddingProduct(false);
    }

    // Reset form
    setProductForm({
      name: '',
      code: '',
      category: 'Pebble Mosaic',
      finish: 'Natural River-Worn',
      format: '300 × 300 mm Mesh Sheet',
      thickness: '10 mm',
      origin: 'East Java Quarry, Indonesia',
      applications: ['Swimming Pool Interiors', 'Shower Floors'],
      description: '',
      features: ['Interlocking mesh backing'],
      image: '',
      weightPerSqm: '21 kg/m²',
      packaging: '11 sheets / box',
      featured: false,
    });
  };

  // Delete Product
  const handleDeleteProduct = (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      onUpdateProducts(products.filter((p) => p.id !== id));
    }
  };

  // Start Editing Product
  const handleStartEditProduct = (prod: Product) => {
    setEditingProduct(prod);
    setProductForm({ ...prod });
    setIsAddingProduct(true);
  };

  // Save Gallery Item
  const handleSaveGallery = (e: React.FormEvent) => {
    e.preventDefault();
    if (!galleryForm.title) return;

    if (editingGallery) {
      const updated = galleryItems.map((g) =>
        g.id === editingGallery.id ? ({ ...g, ...galleryForm } as GalleryItem) : g
      );
      onUpdateGallery(updated);
      setEditingGallery(null);
    } else {
      const newItem: GalleryItem = {
        id: `gal-${Date.now()}`,
        title: galleryForm.title || 'Untitled Project',
        category: galleryForm.category || 'Swimming Pools',
        location: galleryForm.location || 'Indonesia',
        stoneUsed: galleryForm.stoneUsed || 'Natural Stone Mosaic',
        productCode: galleryForm.productCode || '',
        description: galleryForm.description || '',
        image: galleryForm.image || '/src/assets/images/pool_stone_retreat_1792387809551.jpg',
        year: galleryForm.year || '2026',
      };
      onUpdateGallery([newItem, ...galleryItems]);
      setIsAddingGallery(false);
    }

    setGalleryForm({
      title: '',
      category: 'Swimming Pools',
      location: '',
      stoneUsed: '',
      productCode: '',
      description: '',
      image: '',
      year: '2026',
    });
  };

  const handleDeleteGallery = (id: string) => {
    if (window.confirm('Delete this gallery project?')) {
      onUpdateGallery(galleryItems.filter((g) => g.id !== id));
    }
  };

  const handleStartEditGallery = (item: GalleryItem) => {
    setEditingGallery(item);
    setGalleryForm({ ...item });
    setIsAddingGallery(true);
  };

  // Save Brand Settings
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateBrandSettings(tempSettings);
    setSavedSettingsNotice(true);
    setTimeout(() => setSavedSettingsNotice(false), 2500);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-6 bg-[#F5F2EC]">
        <div className="w-full max-w-md bg-[#F5F2EC] border border-[#D8C8B2] p-8 shadow-sm text-center">
          <div className="mb-6 flex justify-center">
            <MozuraLogo variant="markOnly" size="lg" />
          </div>
          <h2 className="font-['Marcellus',serif] text-2xl text-[#353633] mb-2">
            Architectural Admin Portal
          </h2>
          <p className="text-xs text-[#8C877E] mb-6">
            Enter authorized passcode to manage stone catalog, gallery, and brand settings.
          </p>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={adminPin}
              onChange={(e) => setAdminPin(e.target.value)}
              placeholder="Passcode (Default: admin)"
              className="w-full bg-[#F5F2EC] border border-[#D8C8B2] px-3 py-2 text-xs text-center tracking-widest text-[#353633] focus:outline-none focus:border-[#353633]"
            />
            {authError && <p className="text-xs text-amber-700">{authError}</p>}
            <button
              type="submit"
              className="w-full py-2.5 px-4 text-xs uppercase tracking-widest bg-[#353633] text-[#F5F2EC] hover:bg-black cursor-pointer"
            >
              Sign In to Dashboard
            </button>
            <button
              type="button"
              onClick={() => setIsAuthenticated(true)}
              className="w-full py-2 text-[11px] uppercase tracking-wider text-[#8C877E] hover:text-[#353633] cursor-pointer"
            >
              Quick Demonstration Bypass →
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F2EC] py-12 px-4 sm:px-6 lg:px-8 border-t border-[#D8C8B2]/50">
      <div className="max-w-7xl mx-auto">
        {/* Top Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#D8C8B2]/70 pb-6 mb-8 gap-4">
          <div>
            <span className="text-[10px] tracking-[0.26em] uppercase text-[#8C877E] font-medium block mb-1">
              CONTROL SUITE
            </span>
            <h1 className="font-['Marcellus',serif] text-3xl text-[#353633]">
              MOZURASTONE Administration
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onCloseAdmin}
              className="px-4 py-2 text-xs uppercase tracking-wider text-[#353633] border border-[#353633]/30 hover:border-[#353633] cursor-pointer flex items-center gap-1.5"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>View Public Site</span>
            </button>
            <button
              onClick={() => setIsAuthenticated(false)}
              className="p-2 text-[#8C877E] hover:text-[#353633] cursor-pointer"
              title="Lock Admin"
            >
              <Lock className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-[#D8C8B2]/60 mb-8 pb-px">
          <button
            onClick={() => {
              setActiveTab('products');
              setIsAddingProduct(false);
              setEditingProduct(null);
            }}
            className={`px-5 py-2.5 text-xs uppercase tracking-[0.18em] font-medium transition-colors cursor-pointer border-b-2 -mb-px flex items-center gap-2 ${
              activeTab === 'products'
                ? 'border-[#353633] text-[#353633] font-semibold'
                : 'border-transparent text-[#8C877E] hover:text-[#353633]'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Products ({products.length})</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('gallery');
              setIsAddingGallery(false);
              setEditingGallery(null);
            }}
            className={`px-5 py-2.5 text-xs uppercase tracking-[0.18em] font-medium transition-colors cursor-pointer border-b-2 -mb-px flex items-center gap-2 ${
              activeTab === 'gallery'
                ? 'border-[#353633] text-[#353633] font-semibold'
                : 'border-transparent text-[#8C877E] hover:text-[#353633]'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Application Gallery ({galleryItems.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`px-5 py-2.5 text-xs uppercase tracking-[0.18em] font-medium transition-colors cursor-pointer border-b-2 -mb-px flex items-center gap-2 ${
              activeTab === 'settings'
                ? 'border-[#353633] text-[#353633] font-semibold'
                : 'border-transparent text-[#8C877E] hover:text-[#353633]'
            }`}
          >
            <Settings className="w-3.5 h-3.5" />
            <span>Brand & Logo Settings</span>
          </button>
        </div>

        {/* TAB 1: PRODUCTS MANAGEMENT */}
        {activeTab === 'products' && (
          <div>
            {/* Header Action */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-xs text-[#8C877E]">
                Manage natural stone collections, specifications, and photography.
              </p>
              {!isAddingProduct && (
                <button
                  onClick={() => {
                    setIsAddingProduct(true);
                    setEditingProduct(null);
                  }}
                  className="px-4 py-2 text-xs uppercase tracking-widest bg-[#353633] text-[#F5F2EC] hover:bg-black transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Stone Product</span>
                </button>
              )}
            </div>

            {/* Product Add/Edit Form */}
            {isAddingProduct && (
              <div className="mb-10 bg-[#EFEAE2] border border-[#D8C8B2] p-6 sm:p-8">
                <div className="flex items-center justify-between border-b border-[#D8C8B2]/60 pb-4 mb-6">
                  <h3 className="font-['Marcellus',serif] text-xl text-[#353633]">
                    {editingProduct ? `Edit Stone: ${editingProduct.code}` : 'Add New Stone Product'}
                  </h3>
                  <button
                    onClick={() => {
                      setIsAddingProduct(false);
                      setEditingProduct(null);
                    }}
                    className="text-xs text-[#8C877E] hover:text-[#353633] uppercase tracking-wider"
                  >
                    Cancel
                  </button>
                </div>

                <form onSubmit={handleSaveProduct} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="text-[11px] uppercase tracking-wider text-[#8C877E] font-medium block mb-1">
                        Product Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={productForm.name || ''}
                        onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                        placeholder="e.g. Alabaster River Pebble Mosaic"
                        className="w-full bg-[#F5F2EC] border border-[#D8C8B2] px-3 py-2 text-xs text-[#353633] focus:outline-none focus:border-[#353633]"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] uppercase tracking-wider text-[#8C877E] font-medium block mb-1">
                        Product Code *
                      </label>
                      <input
                        type="text"
                        required
                        value={productForm.code || ''}
                        onChange={(e) => setProductForm({ ...productForm, code: e.target.value })}
                        placeholder="e.g. MZ-105"
                        className="w-full bg-[#F5F2EC] border border-[#D8C8B2] px-3 py-2 text-xs font-mono text-[#353633] focus:outline-none focus:border-[#353633]"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] uppercase tracking-wider text-[#8C877E] font-medium block mb-1">
                        Category
                      </label>
                      <select
                        value={productForm.category || 'Pebble Mosaic'}
                        onChange={(e) =>
                          setProductForm({
                            ...productForm,
                            category: e.target.value as Product['category'],
                          })
                        }
                        className="w-full bg-[#F5F2EC] border border-[#D8C8B2] px-3 py-2 text-xs text-[#353633] focus:outline-none focus:border-[#353633]"
                      >
                        <option value="Pebble Mosaic">Pebble Mosaic</option>
                        <option value="Marble Mosaic">Marble Mosaic</option>
                        <option value="Travertine">Travertine</option>
                        <option value="Stacked Stone">Stacked Stone</option>
                        <option value="Pavers & Cobbles">Pavers & Cobbles</option>
                        <option value="Limestone">Limestone</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div>
                      <label className="text-[11px] uppercase tracking-wider text-[#8C877E] font-medium block mb-1">
                        Surface Finish
                      </label>
                      <select
                        value={productForm.finish || 'Natural River-Worn'}
                        onChange={(e) =>
                          setProductForm({
                            ...productForm,
                            finish: e.target.value as Product['finish'],
                          })
                        }
                        className="w-full bg-[#F5F2EC] border border-[#D8C8B2] px-3 py-2 text-xs text-[#353633] focus:outline-none focus:border-[#353633]"
                      >
                        <option value="Natural River-Worn">Natural River-Worn</option>
                        <option value="Tumbled">Tumbled</option>
                        <option value="Honed">Honed</option>
                        <option value="Split-Face">Split-Face</option>
                        <option value="Brushed">Brushed</option>
                        <option value="Polished">Polished</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-[11px] uppercase tracking-wider text-[#8C877E] font-medium block mb-1">
                        Sheet / Tile Format
                      </label>
                      <input
                        type="text"
                        value={productForm.format || ''}
                        onChange={(e) => setProductForm({ ...productForm, format: e.target.value })}
                        placeholder="e.g. 300 × 300 mm Mesh Sheet"
                        className="w-full bg-[#F5F2EC] border border-[#D8C8B2] px-3 py-2 text-xs text-[#353633] focus:outline-none focus:border-[#353633]"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] uppercase tracking-wider text-[#8C877E] font-medium block mb-1">
                        Thickness
                      </label>
                      <input
                        type="text"
                        value={productForm.thickness || ''}
                        onChange={(e) =>
                          setProductForm({ ...productForm, thickness: e.target.value })
                        }
                        placeholder="e.g. 10 – 12 mm"
                        className="w-full bg-[#F5F2EC] border border-[#D8C8B2] px-3 py-2 text-xs text-[#353633] focus:outline-none focus:border-[#353633]"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] uppercase tracking-wider text-[#8C877E] font-medium block mb-1">
                        Quarry Origin
                      </label>
                      <input
                        type="text"
                        value={productForm.origin || ''}
                        onChange={(e) => setProductForm({ ...productForm, origin: e.target.value })}
                        placeholder="e.g. East Java Quarry"
                        className="w-full bg-[#F5F2EC] border border-[#D8C8B2] px-3 py-2 text-xs text-[#353633] focus:outline-none focus:border-[#353633]"
                      />
                    </div>
                  </div>

                  {/* Image input & file upload */}
                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-[#8C877E] font-medium block mb-1">
                      Product Photography (Image URL or File Upload)
                    </label>
                    <div className="flex flex-col sm:flex-row items-center gap-4">
                      <input
                        type="text"
                        value={productForm.image || ''}
                        onChange={(e) => setProductForm({ ...productForm, image: e.target.value })}
                        placeholder="Image path or https://..."
                        className="flex-1 w-full bg-[#F5F2EC] border border-[#D8C8B2] px-3 py-2 text-xs text-[#353633] focus:outline-none focus:border-[#353633]"
                      />
                      <label className="px-4 py-2 border border-[#353633] text-xs uppercase tracking-wider text-[#353633] hover:bg-[#353633] hover:text-[#F5F2EC] transition-colors cursor-pointer flex items-center gap-2 shrink-0">
                        <Upload className="w-3.5 h-3.5" />
                        <span>Upload File</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleImageUpload(e, 'product')}
                        />
                      </label>
                    </div>
                    {productForm.image && (
                      <div className="mt-3 aspect-[4/3] w-32 border border-[#D8C8B2] overflow-hidden bg-white">
                        <img
                          src={productForm.image}
                          alt="Preview"
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-[#8C877E] font-medium block mb-1">
                      Description
                    </label>
                    <textarea
                      rows={3}
                      value={productForm.description || ''}
                      onChange={(e) =>
                        setProductForm({ ...productForm, description: e.target.value })
                      }
                      placeholder="Detailed architectural description of stone character..."
                      className="w-full bg-[#F5F2EC] border border-[#D8C8B2] px-3 py-2 text-xs text-[#353633] focus:outline-none focus:border-[#353633]"
                    />
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#D8C8B2]/60">
                    <button
                      type="button"
                      onClick={() => {
                        setIsAddingProduct(false);
                        setEditingProduct(null);
                      }}
                      className="px-4 py-2 text-xs uppercase tracking-wider text-[#8C877E] hover:text-[#353633]"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2.5 text-xs uppercase tracking-widest bg-[#353633] text-[#F5F2EC] hover:bg-black transition-colors"
                    >
                      {editingProduct ? 'Save Stone Updates' : 'Add Stone to Archive'}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Product Table */}
            <div className="border border-[#D8C8B2]/70 overflow-x-auto bg-[#F5F2EC]">
              <table className="w-full text-left text-xs divide-y divide-[#D8C8B2]/60">
                <thead className="bg-[#EFEAE2] text-[10.5px] uppercase tracking-wider text-[#8C877E] font-medium">
                  <tr>
                    <th className="py-3 px-4">Photo</th>
                    <th className="py-3 px-4">Code</th>
                    <th className="py-3 px-4">Stone Name</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Finish</th>
                    <th className="py-3 px-4">Format</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#D8C8B2]/40">
                  {products.map((prod) => (
                    <tr key={prod.id} className="hover:bg-[#EFEAE2]/60 transition-colors">
                      <td className="py-2.5 px-4">
                        <div className="aspect-[4/3] w-12 border border-[#D8C8B2] overflow-hidden bg-[#E2DBD1]">
                          <img
                            src={prod.image}
                            alt={prod.name}
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                      </td>
                      <td className="py-2.5 px-4 font-mono font-medium text-[#353633]">
                        {prod.code}
                      </td>
                      <td className="py-2.5 px-4 font-semibold text-[#353633]">{prod.name}</td>
                      <td className="py-2.5 px-4 text-[#8C877E]">{prod.category}</td>
                      <td className="py-2.5 px-4 text-[#8C877E]">{prod.finish}</td>
                      <td className="py-2.5 px-4 font-mono text-[#8C877E]">{prod.format}</td>
                      <td className="py-2.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleStartEditProduct(prod)}
                            className="p-1.5 text-[#8C877E] hover:text-[#353633] cursor-pointer"
                            title="Edit"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(prod.id)}
                            className="p-1.5 text-[#8C877E] hover:text-red-700 cursor-pointer"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: GALLERY MANAGEMENT */}
        {activeTab === 'gallery' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <p className="text-xs text-[#8C877E]">
                Manage architectural project showcases and application photography.
              </p>
              {!isAddingGallery && (
                <button
                  onClick={() => {
                    setIsAddingGallery(true);
                    setEditingGallery(null);
                  }}
                  className="px-4 py-2 text-xs uppercase tracking-widest bg-[#353633] text-[#F5F2EC] hover:bg-black transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Project Photo</span>
                </button>
              )}
            </div>

            {/* Gallery Form */}
            {isAddingGallery && (
              <div className="mb-10 bg-[#EFEAE2] border border-[#D8C8B2] p-6 sm:p-8">
                <div className="flex items-center justify-between border-b border-[#D8C8B2]/60 pb-4 mb-6">
                  <h3 className="font-['Marcellus',serif] text-xl text-[#353633]">
                    {editingGallery ? 'Edit Project Photography' : 'Add Application Project'}
                  </h3>
                  <button
                    onClick={() => {
                      setIsAddingGallery(false);
                      setEditingGallery(null);
                    }}
                    className="text-xs text-[#8C877E] hover:text-[#353633] uppercase tracking-wider"
                  >
                    Cancel
                  </button>
                </div>

                <form onSubmit={handleSaveGallery} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="text-[11px] uppercase tracking-wider text-[#8C877E] font-medium block mb-1">
                        Project Title *
                      </label>
                      <input
                        type="text"
                        required
                        value={galleryForm.title || ''}
                        onChange={(e) => setGalleryForm({ ...galleryForm, title: e.target.value })}
                        placeholder="e.g. Cliffside Lagoon Pool"
                        className="w-full bg-[#F5F2EC] border border-[#D8C8B2] px-3 py-2 text-xs text-[#353633] focus:outline-none focus:border-[#353633]"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] uppercase tracking-wider text-[#8C877E] font-medium block mb-1">
                        Category
                      </label>
                      <select
                        value={galleryForm.category || 'Swimming Pools'}
                        onChange={(e) =>
                          setGalleryForm({
                            ...galleryForm,
                            category: e.target.value as GalleryItem['category'],
                          })
                        }
                        className="w-full bg-[#F5F2EC] border border-[#D8C8B2] px-3 py-2 text-xs text-[#353633] focus:outline-none focus:border-[#353633]"
                      >
                        <option value="Swimming Pools">Swimming Pools</option>
                        <option value="Gardens & Patios">Gardens & Patios</option>
                        <option value="Bathrooms & Spas">Bathrooms & Spas</option>
                        <option value="Walls & Facades">Walls & Facades</option>
                        <option value="Flooring">Flooring</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-[11px] uppercase tracking-wider text-[#8C877E] font-medium block mb-1">
                        Location
                      </label>
                      <input
                        type="text"
                        value={galleryForm.location || ''}
                        onChange={(e) =>
                          setGalleryForm({ ...galleryForm, location: e.target.value })
                        }
                        placeholder="e.g. Uluwatu, Bali"
                        className="w-full bg-[#F5F2EC] border border-[#D8C8B2] px-3 py-2 text-xs text-[#353633] focus:outline-none focus:border-[#353633]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="text-[11px] uppercase tracking-wider text-[#8C877E] font-medium block mb-1">
                        Stone Specification Used
                      </label>
                      <input
                        type="text"
                        value={galleryForm.stoneUsed || ''}
                        onChange={(e) =>
                          setGalleryForm({ ...galleryForm, stoneUsed: e.target.value })
                        }
                        placeholder="e.g. Alabaster River Pebble Mosaic"
                        className="w-full bg-[#F5F2EC] border border-[#D8C8B2] px-3 py-2 text-xs text-[#353633] focus:outline-none focus:border-[#353633]"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] uppercase tracking-wider text-[#8C877E] font-medium block mb-1">
                        Product Code Tag
                      </label>
                      <input
                        type="text"
                        value={galleryForm.productCode || ''}
                        onChange={(e) =>
                          setGalleryForm({ ...galleryForm, productCode: e.target.value })
                        }
                        placeholder="e.g. MZ-101"
                        className="w-full bg-[#F5F2EC] border border-[#D8C8B2] px-3 py-2 text-xs font-mono text-[#353633] focus:outline-none focus:border-[#353633]"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] uppercase tracking-wider text-[#8C877E] font-medium block mb-1">
                        Year Completed
                      </label>
                      <input
                        type="text"
                        value={galleryForm.year || '2026'}
                        onChange={(e) => setGalleryForm({ ...galleryForm, year: e.target.value })}
                        className="w-full bg-[#F5F2EC] border border-[#D8C8B2] px-3 py-2 text-xs text-[#353633] focus:outline-none focus:border-[#353633]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-[#8C877E] font-medium block mb-1">
                      Architectural Photo (URL or Upload)
                    </label>
                    <div className="flex flex-col sm:flex-row items-center gap-4">
                      <input
                        type="text"
                        value={galleryForm.image || ''}
                        onChange={(e) => setGalleryForm({ ...galleryForm, image: e.target.value })}
                        placeholder="Image URL..."
                        className="flex-1 w-full bg-[#F5F2EC] border border-[#D8C8B2] px-3 py-2 text-xs text-[#353633] focus:outline-none focus:border-[#353633]"
                      />
                      <label className="px-4 py-2 border border-[#353633] text-xs uppercase tracking-wider text-[#353633] hover:bg-[#353633] hover:text-[#F5F2EC] transition-colors cursor-pointer flex items-center gap-2 shrink-0">
                        <Upload className="w-3.5 h-3.5" />
                        <span>Upload File</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleImageUpload(e, 'gallery')}
                        />
                      </label>
                    </div>
                    {galleryForm.image && (
                      <div className="mt-3 aspect-[16/9] w-48 border border-[#D8C8B2] overflow-hidden bg-white">
                        <img
                          src={galleryForm.image}
                          alt="Preview"
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-[#8C877E] font-medium block mb-1">
                      Project Architectural Context
                    </label>
                    <textarea
                      rows={3}
                      value={galleryForm.description || ''}
                      onChange={(e) =>
                        setGalleryForm({ ...galleryForm, description: e.target.value })
                      }
                      placeholder="Describe the application, installation context, and stone performance..."
                      className="w-full bg-[#F5F2EC] border border-[#D8C8B2] px-3 py-2 text-xs text-[#353633] focus:outline-none focus:border-[#353633]"
                    />
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#D8C8B2]/60">
                    <button
                      type="button"
                      onClick={() => {
                        setIsAddingGallery(false);
                        setEditingGallery(null);
                      }}
                      className="px-4 py-2 text-xs uppercase tracking-wider text-[#8C877E] hover:text-[#353633]"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2.5 text-xs uppercase tracking-widest bg-[#353633] text-[#F5F2EC] hover:bg-black transition-colors"
                    >
                      {editingGallery ? 'Update Project' : 'Publish to Gallery'}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Gallery Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {galleryItems.map((item) => (
                <div
                  key={item.id}
                  className="border border-[#D8C8B2]/70 bg-[#F5F2EC] overflow-hidden flex flex-col justify-between"
                >
                  <div>
                    <div className="aspect-[4/3] w-full bg-[#E2DBD1] overflow-hidden relative">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <span className="absolute top-3 left-3 bg-[#F5F2EC] px-2 py-0.5 text-[10px] uppercase tracking-wider text-[#353633] border border-[#D8C8B2]">
                        {item.category}
                      </span>
                    </div>
                    <div className="p-4">
                      <h4 className="font-['Marcellus',serif] text-base text-[#353633] mb-1">
                        {item.title}
                      </h4>
                      <p className="text-xs text-[#8C877E] mb-2">{item.location} · {item.year}</p>
                      <p className="text-xs text-[#353633]/80 line-clamp-2">
                        {item.stoneUsed}
                      </p>
                    </div>
                  </div>

                  <div className="p-4 border-t border-[#D8C8B2]/40 flex items-center justify-between">
                    <span className="text-[11px] font-mono text-[#8C877E]">
                      {item.productCode || 'Custom'}
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleStartEditGallery(item)}
                        className="p-1.5 text-[#8C877E] hover:text-[#353633]"
                        title="Edit"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteGallery(item.id)}
                        className="p-1.5 text-[#8C877E] hover:text-red-700"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: BRAND & LOGO SETTINGS */}
        {activeTab === 'settings' && (
          <div className="max-w-3xl bg-[#EFEAE2] border border-[#D8C8B2] p-8">
            <div className="flex items-center justify-between border-b border-[#D8C8B2]/60 pb-4 mb-6">
              <div>
                <h3 className="font-['Marcellus',serif] text-2xl text-[#353633]">
                  Brand Identity & Concierge Settings
                </h3>
                <p className="text-xs text-[#8C877E] mt-1">
                  Configure live header logo, tagline, WhatsApp connection, and factory presets.
                </p>
              </div>
              {savedSettingsNotice && (
                <span className="text-xs font-semibold text-emerald-800 flex items-center gap-1 bg-emerald-50 px-3 py-1 border border-emerald-300">
                  <Check className="w-3.5 h-3.5" />
                  <span>Saved successfully!</span>
                </span>
              )}
            </div>

            <form onSubmit={handleSaveSettings} className="space-y-6">
              {/* Logo customization (Prompt requirement: "Allow the logo to be replaced through the existing admin dashboard.") */}
              <div className="p-5 border border-[#D8C8B2] bg-[#F5F2EC]">
                <label className="text-xs uppercase tracking-wider font-semibold text-[#353633] block mb-2">
                  Header & Site Logo Replacement
                </label>
                <p className="text-xs text-[#8C877E] mb-4">
                  Provide an image URL or upload a custom brand mark/PNG/SVG. Leave blank to use the official MOZURASTONE interlocking stone mosaic mark.
                </p>

                <div className="flex flex-col sm:flex-row items-center gap-4 mb-4">
                  <input
                    type="text"
                    value={tempSettings.customLogoUrl}
                    onChange={(e) =>
                      setTempSettings({ ...tempSettings, customLogoUrl: e.target.value })
                    }
                    placeholder="Custom logo image URL (or upload below)..."
                    className="flex-1 w-full bg-[#F5F2EC] border border-[#D8C8B2] px-3 py-2 text-xs text-[#353633] focus:outline-none focus:border-[#353633]"
                  />
                  <label className="px-4 py-2 border border-[#353633] text-xs uppercase tracking-wider text-[#353633] hover:bg-[#353633] hover:text-[#F5F2EC] transition-colors cursor-pointer flex items-center gap-2 shrink-0">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload Logo Image</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleImageUpload(e, 'logo')}
                    />
                  </label>
                  {tempSettings.customLogoUrl && (
                    <button
                      type="button"
                      onClick={() => setTempSettings({ ...tempSettings, customLogoUrl: '' })}
                      className="text-xs text-red-700 hover:underline"
                    >
                      Reset to Official Mark
                    </button>
                  )}
                </div>

                {/* Logo Preview */}
                <div className="p-4 border border-dashed border-[#D8C8B2] bg-[#F5F2EC] flex items-center justify-between">
                  <span className="text-[11px] uppercase tracking-wider text-[#8C877E]">
                    Current Live Header Preview:
                  </span>
                  <MozuraLogo
                    variant="horizontal"
                    customLogoUrl={tempSettings.customLogoUrl}
                    size="md"
                    showTagline={true}
                  />
                </div>
              </div>

              {/* Tagline & Brand Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="text-[11px] uppercase tracking-wider text-[#8C877E] font-medium block mb-1">
                    Brand Name
                  </label>
                  <input
                    type="text"
                    value={tempSettings.brandName}
                    onChange={(e) =>
                      setTempSettings({ ...tempSettings, brandName: e.target.value })
                    }
                    className="w-full bg-[#F5F2EC] border border-[#D8C8B2] px-3 py-2 text-xs text-[#353633] focus:outline-none focus:border-[#353633]"
                  />
                </div>

                <div>
                  <label className="text-[11px] uppercase tracking-wider text-[#8C877E] font-medium block mb-1">
                    Official Tagline
                  </label>
                  <input
                    type="text"
                    value={tempSettings.tagline}
                    onChange={(e) => setTempSettings({ ...tempSettings, tagline: e.target.value })}
                    className="w-full bg-[#F5F2EC] border border-[#D8C8B2] px-3 py-2 text-xs text-[#353633] focus:outline-none focus:border-[#353633]"
                  />
                </div>
              </div>

              {/* WhatsApp Contact */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="text-[11px] uppercase tracking-wider text-[#8C877E] font-medium block mb-1">
                    WhatsApp Number (International format with country code)
                  </label>
                  <input
                    type="text"
                    value={tempSettings.whatsappNumber}
                    onChange={(e) =>
                      setTempSettings({ ...tempSettings, whatsappNumber: e.target.value })
                    }
                    placeholder="e.g. 6281234567890"
                    className="w-full bg-[#F5F2EC] border border-[#D8C8B2] px-3 py-2 text-xs text-[#353633] focus:outline-none focus:border-[#353633]"
                  />
                </div>

                <div>
                  <label className="text-[11px] uppercase tracking-wider text-[#8C877E] font-medium block mb-1">
                    Concierge Email
                  </label>
                  <input
                    type="email"
                    value={tempSettings.email}
                    onChange={(e) => setTempSettings({ ...tempSettings, email: e.target.value })}
                    className="w-full bg-[#F5F2EC] border border-[#D8C8B2] px-3 py-2 text-xs text-[#353633] focus:outline-none focus:border-[#353633]"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] uppercase tracking-wider text-[#8C877E] font-medium block mb-1">
                  Quarry Studio / Export Location Description
                </label>
                <input
                  type="text"
                  value={tempSettings.location}
                  onChange={(e) => setTempSettings({ ...tempSettings, location: e.target.value })}
                  className="w-full bg-[#F5F2EC] border border-[#D8C8B2] px-3 py-2 text-xs text-[#353633] focus:outline-none focus:border-[#353633]"
                />
              </div>

              <div className="pt-6 border-t border-[#D8C8B2]/60 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => {
                    if (window.confirm('Reset all catalog and settings to initial factory state?')) {
                      onResetToDefaults();
                    }
                  }}
                  className="px-4 py-2 text-xs uppercase tracking-wider text-red-700 hover:text-red-900 border border-red-300 hover:border-red-500 cursor-pointer flex items-center gap-1.5"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Restore Archetypes</span>
                </button>

                <button
                  type="submit"
                  className="px-6 py-2.5 text-xs uppercase tracking-widest bg-[#353633] text-[#F5F2EC] hover:bg-black transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Brand Settings</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
