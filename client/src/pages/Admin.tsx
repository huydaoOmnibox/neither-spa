import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { 
  Plus, 
  Edit2, 
  Trash2, 
  Save, 
  X, 
  Home,
  DollarSign,
  Image,
  Package,
  Settings,
  Users,
  User,
  Eye,
  EyeOff,
  Loader2,
  Image as ImageIcon,
  CheckCircle,
  Heart,
  Star
} from "lucide-react";
import { Link, useLocation } from "wouter";
import logoPath from "@assets/image_1752511415001.png";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";
import type { Product, Gallery, Pricing, HomeContent } from "@shared/schema";

// Helper function to convert Google Drive URLs to direct image URLs
const convertGoogleDriveUrl = (url: string | null): string => {
  if (!url) return '';
  
  // If it's already a direct Google Drive URL, return as is
  if (url.includes('drive.google.com/uc')) {
    return url;
  }

  // Extract the file ID from the sharing URL
  const match = url.match(/\/d\/(.*?)\/view/);
  if (match && match[1]) {
    return `https://drive.google.com/uc?export=view&id=${match[1]}`;
  }

  return url;
};

// Helper function to format price with Euro symbol
const formatPriceForBackend = (price: string): string => {
  if (!price) return price;
  
  // Remove any existing Euro symbols and whitespace
  const cleanPrice = price.replace(/[€\s]/g, '');
  
  // If it's a number, add Euro symbol
  if (/^\d+(\.\d{1,2})?$/.test(cleanPrice)) {
    return `€${cleanPrice}`;
  }
  
  // If it already has Euro symbol or other text, return as is
  return price;
};

// Image URL cache to prevent repeated proxy calls
const imageUrlCache = new Map<string, string>();

// Helper function to get image URL (proxy for Google Drive) with caching
const getImageUrl = (url: string | null): string => {
  if (!url) return '';
  
  // Check cache first
  if (imageUrlCache.has(url)) {
    return imageUrlCache.get(url)!;
  }
  
  const convertedUrl = convertGoogleDriveUrl(url);
  let finalUrl: string;
  
  // If it's a Google Drive URL, use our proxy
  if (convertedUrl.includes('drive.google.com')) {
    finalUrl = `/api/proxy-image?url=${encodeURIComponent(convertedUrl)}`;
  } else {
    // For other URLs, use directly
    finalUrl = convertedUrl;
  }
  
  // Cache the result
  imageUrlCache.set(url, finalUrl);
  return finalUrl;
};

// Failed URLs cache to prevent retry loops
const failedUrlsCache = new Set<string>();

// Data URL for gray placeholder (1x1 gray pixel)
const GRAY_PIXEL_DATA_URL = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChAI9jINpPwAAAABJRU5ErkJggg==';

// Optimized Image component with error handling and retry prevention
const OptimizedImage = ({ src, alt, className, ...props }: { src: string | null; alt: string; className?: string; [key: string]: any }) => {
  const [imageSrc, setImageSrc] = useState<string>('');
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (src) {
      // Check if this URL has already failed
      if (failedUrlsCache.has(src)) {
        setImageSrc(GRAY_PIXEL_DATA_URL);
        setHasError(true);
        setIsLoading(false);
        return;
      }

      const imageUrl = getImageUrl(src);
      setImageSrc(imageUrl);
      setHasError(false);
      setIsLoading(true);
    } else {
      setImageSrc('');
      setHasError(false);
      setIsLoading(false);
    }
  }, [src]);

  const handleError = useCallback(() => {
    console.log(`Image failed to load: ${imageSrc}`);
    
    // Add to failed cache to prevent future retries
    if (src) {
      failedUrlsCache.add(src);
    }
    
    setHasError(true);
    setIsLoading(false);
    
    // Use data URL as final fallback instead of API endpoint
    setImageSrc(GRAY_PIXEL_DATA_URL);
  }, [imageSrc, src]);

  const handleLoad = useCallback(() => {
    setIsLoading(false);
    setHasError(false);
  }, []);

  if (!src) {
    return (
      <div className={`bg-gray-200 flex items-center justify-center text-gray-500 text-xs ${className}`}>
        No Image
      </div>
    );
  }

  return (
    <div className="relative">
      {isLoading && !hasError && (
        <div className={`absolute inset-0 bg-gray-200 flex items-center justify-center ${className}`}>
          <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
        </div>
      )}
      <img
        src={imageSrc}
        alt={alt}
        className={`${className} ${hasError ? 'opacity-50' : ''}`}
        onError={handleError}
        onLoad={handleLoad}
        style={{ display: isLoading && !hasError ? 'none' : 'block' }}
        {...props}
      />
      {hasError && (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center text-gray-400 text-xs">
          <X className="h-4 w-4" />
        </div>
      )}
    </div>
  );
};

export const Admin = (): JSX.Element => {
  const [activeTab, setActiveTab] = useState("home");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [currentSection, setCurrentSection] = useState<'products' | 'gallery' | 'pricing' | 'home'>('home');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const { currentLanguage, setCurrentLanguage } = useLanguage();
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  // Get current user from localStorage
  const getCurrentUser = () => {
    try {
      const userStr = localStorage.getItem('adminUser');
      return userStr ? JSON.parse(userStr) : null;
    } catch {
      return null;
    }
  };

  const currentUser = getCurrentUser();

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    setLocation('/login');
  };

  // Data states
  const [products, setProducts] = useState<Product[]>([]);
  const [gallery, setGallery] = useState<Gallery[]>([]);
  const [pricing, setPricing] = useState<Pricing[]>([]);
  const [homeContent, setHomeContent] = useState<HomeContent[]>([]);

  // Form states
  const [formData, setFormData] = useState<any>({});

  const translations = {
    nl: {
      nav: {
        admin: "Admin Dashboard",
        logout: "Uitloggen"
      },
      tabs: {
        home: "Home Pagina",
        pricelist: "Prijslijst",
        gallery: "Galerij",
        products: "Producten"
      },
      actions: {
        add: "Toevoegen",
        edit: "Bewerken",
        delete: "Verwijderen",
        save: "Opslaan",
        cancel: "Annuleren",
        confirm: "Bevestigen"
      },
      fields: {
        name: "Naam",
        title: "Titel",
        description: "Beschrijving",
        price: "Prijs",
        category: "Categorie",
        image: "Afbeelding",
        active: "Actief",
        sortOrder: "Volgorde",
        serviceName: "Service Naam",
        duration: "Duur",
        section: "Sectie",
        subtitle: "Ondertitel",
        content: "Inhoud"
      },
      messages: {
        loading: "Laden...",
        saving: "Opslaan...",
        success: "Succesvol opgeslagen",
        error: "Er is een fout opgetreden",
        deleteSuccess: "Succesvol verwijderd",
        deleteError: "Fout bij verwijderen"
      }
    },
    en: {
      nav: {
        admin: "Admin Dashboard",
        logout: "Logout"
      },
      tabs: {
        home: "Home Page",
        pricelist: "Price List",
        gallery: "Gallery",
        products: "Products"
      },
      actions: {
        add: "Add",
        edit: "Edit",
        delete: "Delete",
        save: "Save",
        cancel: "Cancel",
        confirm: "Confirm"
      },
      fields: {
        name: "Name",
        title: "Title",
        description: "Description",
        price: "Price",
        category: "Category",
        image: "Image",
        active: "Active",
        sortOrder: "Sort Order",
        serviceName: "Service Name",
        duration: "Duration",
        section: "Section",
        subtitle: "Subtitle",
        content: "Content"
      },
      messages: {
        loading: "Loading...",
        saving: "Saving...",
        success: "Successfully saved",
        error: "An error occurred",
        deleteSuccess: "Successfully deleted",
        deleteError: "Error deleting"
      }
    }
  };

  const t = translations[currentLanguage];

  // API functions with useCallback for performance
  const fetchProducts = useCallback(async () => {
    try {
      const response = await fetch('/api/products');
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      }
    } catch (error) {
      console.error('Failed to fetch products:', error);
    }
  }, []);

  const fetchGallery = useCallback(async () => {
    try {
      const response = await fetch('/api/gallery');
      if (response.ok) {
        const data = await response.json();
        setGallery(data);
      }
    } catch (error) {
      console.error('Failed to fetch gallery:', error);
    }
  }, []);

  const fetchPricing = useCallback(async () => {
    try {
      const response = await fetch('/api/pricing');
      if (response.ok) {
        const data = await response.json();
        setPricing(data);
      }
    } catch (error) {
      console.error('Failed to fetch pricing:', error);
    }
  }, []);

  const fetchHomeContent = useCallback(async () => {
    try {
      const response = await fetch('/api/home-content');
      if (response.ok) {
        const data = await response.json();
        setHomeContent(data);
      }
    } catch (error) {
      console.error('Failed to fetch home content:', error);
    }
  }, []);

  // Load data on component mount and tab change
  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetchProducts(),
      fetchGallery(),
      fetchPricing(),
      fetchHomeContent()
    ]).finally(() => {
      setLoading(false);
    });
  }, [fetchProducts, fetchGallery, fetchPricing, fetchHomeContent]);

  const handleOpenDialog = useCallback((section: 'products' | 'gallery' | 'pricing' | 'home', item?: any) => {
    setCurrentSection(section);
    setEditingItem(item || null);
    
    // For home sections that don't use content field, exclude it from form data
    let cleanFormData = item || {};
    if (item && item.section && ['about', 'safety', 'feel-better'].includes(item.section)) {
      const { content, ...dataWithoutContent } = item;
      cleanFormData = dataWithoutContent;
    }
    
    setFormData(cleanFormData);
    setIsDialogOpen(true);
  }, []);

  const handleSave = useCallback(async () => {
    setSaving(true);
    try {
      const endpoint = `/api/${currentSection === 'home' ? 'home-content' : currentSection}`;
      const method = editingItem?.id ? 'PUT' : 'POST';
      const url = editingItem?.id ? `${endpoint}?id=${editingItem.id}` : endpoint;


      // Prepare form data with proper formatting
      const processedFormData = { ...formData };

      // Convert Google Drive URLs and ensure image URLs are properly formatted
      if (processedFormData.image) {
        processedFormData.image = convertGoogleDriveUrl(processedFormData.image);
      }

      // Ensure price has Euro symbol for products and pricing
      if ((currentSection === 'products' || currentSection === 'pricing') && processedFormData.price) {
        processedFormData.price = formatPriceForBackend(processedFormData.price);
      }

      // For sections with array content, always stringify before sending
      const sectionsWithArrayContent = ['styled-by', 'products', 'lookbook'];
      if (sectionsWithArrayContent.includes(processedFormData.section) && Array.isArray(processedFormData.content)) {
        processedFormData.content = JSON.stringify(processedFormData.content);
      }

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(processedFormData),
      });

      if (response.ok) {
        toast({
          title: t.messages.success,
          description: `${currentSection} ${editingItem ? 'updated' : 'created'} successfully`,
        });
        
        // Refresh data
        switch (currentSection) {
          case 'products':
            await fetchProducts();
            break;
          case 'gallery':
            await fetchGallery();
            break;
          case 'pricing':
            await fetchPricing();
            break;
          case 'home':
            await fetchHomeContent();
            break;
        }
        
        setIsDialogOpen(false);
        setEditingItem(null);
        setFormData({});
      } else {
        throw new Error('Failed to save');
      }
    } catch (error) {
      toast({
        title: t.messages.error,
        description: "Failed to save item",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  }, [currentSection, editingItem, formData, fetchProducts, fetchGallery, fetchPricing, fetchHomeContent, toast, t.messages]);

  const handleDelete = useCallback(async (section: string, id: number) => {
    try {
      const endpoint = section === 'home' ? 'home-content' : section;
      const response = await fetch(`/api/${endpoint}?id=${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast({
          title: t.messages.deleteSuccess,
          description: `${section} item deleted successfully`,
        });
        
        // Refresh data
        switch (section) {
          case 'products':
            await fetchProducts();
            break;
          case 'gallery':
            await fetchGallery();
            break;
          case 'pricing':
            await fetchPricing();
            break;
          case 'home':
            await fetchHomeContent();
            break;
        }
      } else {
        throw new Error('Failed to delete');
      }
    } catch (error) {
      toast({
        title: t.messages.deleteError,
        description: "Failed to delete item",
        variant: "destructive",
      });
    }
  }, [fetchProducts, fetchGallery, fetchPricing, fetchHomeContent, toast, t.messages]);

  const renderProductsTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-beige-800 dark:text-beige-200">{t.tabs.products}</h2>
        <Button 
          onClick={() => handleOpenDialog('products')}
          className="bg-gradient-to-r from-beige-500 to-beige-600 hover:from-beige-600 hover:to-beige-700"
          disabled={loading}
        >
          <Plus className="w-4 h-4 mr-2" />
          {t.actions.add}
        </Button>
      </div>
      
      {loading ? (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="w-8 h-8 animate-spin text-beige-500" />
          <span className="ml-2">{t.messages.loading}</span>
        </div>
      ) : (
        <div className="grid gap-4">
          {products.map((product) => (
            <Card key={product.id} className="bg-white dark:bg-gray-800">
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start gap-4">
                  <div className="flex gap-4 flex-1">
                    {/* Product Image */}
                    <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden flex-shrink-0">
                      {product.image ? (
                        <img 
                          src={getImageUrl(product.image)} 
                          alt={product.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            console.log('Failed to load image:', getImageUrl(product.image));
                            // Set to a simple placeholder
                            e.currentTarget.src = '/api/placeholder-image';
                          }}
                          onLoad={() => {
                            console.log('Product image loaded:', getImageUrl(product.image));
                          }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400 dark:text-gray-500">
                          <Package className="w-6 h-6" />
                        </div>
                      )}
                    </div>
                    
                    {/* Product Info */}
                    <div className="flex-1">
                      <CardTitle className="text-lg">{product.name}</CardTitle>
                      <CardDescription className="line-clamp-2">{product.description}</CardDescription>
                    </div>
                  </div>
                  
                  {/* Actions */}
                  <div className="flex gap-2">
                    <Badge variant={product.isActive ? "default" : "secondary"}>
                      {product.isActive ? <Eye className="w-3 h-3 mr-1" /> : <EyeOff className="w-3 h-3 mr-1" />}
                      {product.isActive ? "Active" : "Inactive"}
                    </Badge>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleOpenDialog('products', product)}
                    >
                      <Edit2 className="w-3 h-3" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button size="sm" variant="destructive">
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Product</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete "{product.name}"? This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDelete('products', product.id)}>
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {t.fields.category}: {product.category || 'Uncategorized'}
                  </span>
                  <span className="font-semibold text-beige-600">{product.price}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );

  const renderGalleryTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-beige-800 dark:text-beige-200">{t.tabs.gallery}</h2>
        <Button 
          onClick={() => handleOpenDialog('gallery')}
          className="bg-gradient-to-r from-beige-500 to-beige-600 hover:from-beige-600 hover:to-beige-700"
          disabled={loading}
        >
          <Plus className="w-4 h-4 mr-2" />
          {t.actions.add}
        </Button>
      </div>
      
      {loading ? (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="w-8 h-8 animate-spin text-beige-500" />
          <span className="ml-2">{t.messages.loading}</span>
        </div>
      ) : (
        <div className="grid gap-4">
          {gallery.map((item) => (
            <Card key={item.id} className="bg-white dark:bg-gray-800">
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{item.title}</CardTitle>
                    <CardDescription>{item.description}</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant={item.isActive ? "default" : "secondary"}>
                      {item.isActive ? <Eye className="w-3 h-3 mr-1" /> : <EyeOff className="w-3 h-3 mr-1" />}
                      {item.isActive ? "Active" : "Inactive"}
                    </Badge>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleOpenDialog('gallery', item)}
                    >
                      <Edit2 className="w-3 h-3" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button size="sm" variant="destructive">
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Gallery Item</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete "{item.title}"? This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDelete('gallery', item.id)}>
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4">
                  {/* Image Display */}
                  <div className="w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden flex-shrink-0">
                    <OptimizedImage 
                      src={item.image || ''} 
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {t.fields.category}: {item.category || 'Uncategorized'}
                      </span>
                      <span className="text-sm text-gray-500">Order: {item.sortOrder}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                      {item.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );

  const renderPricingTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-beige-800 dark:text-beige-200">{t.tabs.pricelist}</h2>
        <Button 
          onClick={() => handleOpenDialog('pricing')}
          className="bg-gradient-to-r from-beige-500 to-beige-600 hover:from-beige-600 hover:to-beige-700"
          disabled={loading}
        >
          <Plus className="w-4 h-4 mr-2" />
          {t.actions.add}
        </Button>
      </div>
      
      {loading ? (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="w-8 h-8 animate-spin text-beige-500" />
          <span className="ml-2">{t.messages.loading}</span>
        </div>
      ) : (
        <div className="grid gap-4">
          {pricing.map((item) => (
            <Card key={item.id} className="bg-white dark:bg-gray-800">
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{item.serviceName}</CardTitle>
                    <CardDescription>{item.description}</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant={item.isActive ? "default" : "secondary"}>
                      {item.isActive ? <Eye className="w-3 h-3 mr-1" /> : <EyeOff className="w-3 h-3 mr-1" />}
                      {item.isActive ? "Active" : "Inactive"}
                    </Badge>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleOpenDialog('pricing', item)}
                    >
                      <Edit2 className="w-3 h-3" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button size="sm" variant="destructive">
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Service</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete "{item.serviceName}"? This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDelete('pricing', item.id)}>
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div className="flex gap-4">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {t.fields.category}: {item.category}
                    </span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {t.fields.duration}: {item.duration}
                    </span>
                  </div>
                  <span className="font-semibold text-beige-600">{item.price}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );

  const renderHomeTab = () => {
    const heroSection = homeContent.find(item => item.section === 'hero');
    const aboutSection = homeContent.find(item => item.section === 'about');
    const safetySection = homeContent.find(item => item.section === 'safety');
    const lookbookSection = homeContent.find(item => item.section === 'lookbook');
    const feelBetterSection = homeContent.find(item => item.section === 'feel-better');
    const servicesSection = homeContent.find(item => item.section === 'services');
    const productsSection = homeContent.find(item => item.section === 'products');
    const styledBySection = homeContent.find(item => item.section === 'styled-by');

    return (
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-beige-800 dark:text-beige-200">{t.tabs.home}</h2>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-8 h-8 animate-spin text-beige-500" />
            <span className="ml-2">{t.messages.loading}</span>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Hero Banner Section */}
            <Card className="bg-white dark:bg-gray-800">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <ImageIcon className="w-5 h-5" />
                      Hero Banner (5 Images)
                    </CardTitle>
                    <CardDescription>
                      Manage the hero banner carousel images (exactly 5 images required)
                    </CardDescription>
                  </div>
                  <Button 
                    size="sm" 
                    onClick={() => handleOpenDialog('home', heroSection || { section: 'hero' })}
                    className="bg-gradient-to-r from-beige-500 to-beige-600 hover:from-beige-600 hover:to-beige-700"
                  >
                    {heroSection ? <Edit2 className="w-3 h-3 mr-1" /> : <Plus className="w-3 h-3 mr-1" />}
                    {heroSection ? 'Edit' : 'Setup'} Hero
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500 dark:text-gray-400">
                  {heroSection?.content ? 'Hero banner configured' : 'No hero banner images configured'}
                </p>
              </CardContent>
            </Card>

            {/* About Section */}
            <Card className="bg-white dark:bg-gray-800">
              <CardHeader>
                <div className="flex justify-between items-center">
                                     <div>
                     <CardTitle className="flex items-center gap-2">
                       <User className="w-5 h-5" />
                       About Section
                     </CardTitle>
                     <CardDescription>
                       Manage the about section with image, title, and subtitle
                     </CardDescription>
                   </div>
                  <Button 
                    size="sm" 
                    onClick={() => handleOpenDialog('home', aboutSection || { section: 'about' })}
                    className="bg-gradient-to-r from-beige-500 to-beige-600 hover:from-beige-600 hover:to-beige-700"
                  >
                    {aboutSection ? <Edit2 className="w-3 h-3 mr-1" /> : <Plus className="w-3 h-3 mr-1" />}
                    {aboutSection ? 'Edit' : 'Setup'} About
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                                 {aboutSection ? (
                   <div className="flex gap-4">
                     <div className="w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden flex-shrink-0">
                       <img 
                         src={getImageUrl(aboutSection.image || '')}
                         alt="About Section"
                         className="w-full h-full object-cover"
                         onError={(e) => {
                           e.currentTarget.src = '/api/placeholder-image';
                         }}
                       />
                     </div>
                     <div className="flex-1">
                       <h3 className="font-semibold text-lg text-beige-800 dark:text-beige-200">
                         {aboutSection.title || 'No title'}
                       </h3>
                       <p className="text-beige-600 dark:text-beige-300">
                         {aboutSection.subtitle || 'No subtitle'}
                       </p>
                       {aboutSection.description && (
                         <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                           {aboutSection.description}
                         </p>
                       )}
                     </div>
                   </div>
                 ) : (
                   <div className="text-center py-4">
                     <div className="w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden mx-auto mb-2 flex items-center justify-center">
                       <ImageIcon className="w-8 h-8 text-gray-400" />
                     </div>
                     <p className="text-gray-500">No about section configured. Click "Setup About" to add content.</p>
                   </div>
                 )}
              </CardContent>
            </Card>

            {/* Safety Section */}
            <Card className="bg-white dark:bg-gray-800">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5" />
                      Safety Section
                    </CardTitle>
                    <CardDescription>
                      Manage the "You're in Safe Hands" section with professional image and experience details
                    </CardDescription>
                  </div>
                  <Button 
                    size="sm" 
                    onClick={() => handleOpenDialog('home', safetySection || { section: 'safety' })}
                    className="bg-gradient-to-r from-beige-500 to-beige-600 hover:from-beige-600 hover:to-beige-700"
                  >
                    {safetySection ? <Edit2 className="w-3 h-3 mr-1" /> : <Plus className="w-3 h-3 mr-1" />}
                    {safetySection ? 'Edit' : 'Setup'} Safety
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {safetySection ? (
                  <div className="flex gap-4">
                    <div className="w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden flex-shrink-0">
                      <img 
                        src={getImageUrl(safetySection.image || '')}
                        alt="Safety Section"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = '/api/placeholder-image';
                        }}
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-beige-800 dark:text-beige-200">
                        {safetySection.title || 'Professional Safety'}
                      </h3>
                      <p className="text-beige-600 dark:text-beige-300">
                        Experience: {safetySection.subtitle || 'Not set'}
                      </p>
                      {safetySection.content && (
                        <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                          {safetySection.content}
                        </p>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <div className="w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden mx-auto mb-2 flex items-center justify-center">
                      <CheckCircle className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-gray-500">No safety section configured. Click "Setup Safety" to add content.</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Lookbook Section */}
            <Card className="bg-white dark:bg-gray-800">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Eye className="w-5 h-5" />
                      Lookbook Section
                    </CardTitle>
                    <CardDescription>
                      Manage the lookbook gallery with 3 showcase images
                    </CardDescription>
                  </div>
                  <Button 
                    size="sm" 
                    onClick={() => handleOpenDialog('home', lookbookSection || { section: 'lookbook' })}
                    className="bg-gradient-to-r from-beige-500 to-beige-600 hover:from-beige-600 hover:to-beige-700"
                  >
                    {lookbookSection ? <Edit2 className="w-3 h-3 mr-1" /> : <Plus className="w-3 h-3 mr-1" />}
                    {lookbookSection ? 'Edit' : 'Setup'} Lookbook
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500 dark:text-gray-400">
                  {lookbookSection?.content ? 'Lookbook configured' : 'No lookbook images configured'}
                </p>
              </CardContent>
            </Card>

            {/* Feel Better Section */}
            <Card className="bg-white dark:bg-gray-800">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Heart className="w-5 h-5" />
                      Feel Better Section
                    </CardTitle>
                    <CardDescription>
                      Manage the "Look Good, Feel Better" section with relaxing salon image
                    </CardDescription>
                  </div>
                  <Button 
                    size="sm" 
                    onClick={() => handleOpenDialog('home', feelBetterSection || { section: 'feel-better' })}
                    className="bg-gradient-to-r from-beige-500 to-beige-600 hover:from-beige-600 hover:to-beige-700"
                  >
                    {feelBetterSection ? <Edit2 className="w-3 h-3 mr-1" /> : <Plus className="w-3 h-3 mr-1" />}
                    {feelBetterSection ? 'Edit' : 'Setup'} Feel Better
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {feelBetterSection ? (
                  <div className="flex gap-4">
                    <div className="w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden flex-shrink-0">
                      <img 
                        src={getImageUrl(feelBetterSection.image || '')}
                        alt="Feel Better Section"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = '/api/placeholder-image';
                        }}
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-beige-800 dark:text-beige-200">
                        {feelBetterSection.title || 'Feel Better Section'}
                      </h3>
                      <p className="text-beige-600 dark:text-beige-300">
                        {feelBetterSection.subtitle || 'No subtitle'}
                      </p>
                      {feelBetterSection.content && (
                        <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                          {feelBetterSection.content}
                        </p>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <div className="w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden mx-auto mb-2 flex items-center justify-center">
                      <Heart className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-gray-500">No feel better section configured. Click "Setup Feel Better" to add content.</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Services Section */}
            <Card className="bg-white dark:bg-gray-800">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Settings className="w-5 h-5" />
                      Services Section
                    </CardTitle>
                    <CardDescription>
                      Manage the services section with main image and 4 service icons
                    </CardDescription>
                  </div>
                  <Button 
                    size="sm" 
                    onClick={() => handleOpenDialog('home', servicesSection || { section: 'services' })}
                    className="bg-gradient-to-r from-beige-500 to-beige-600 hover:from-beige-600 hover:to-beige-700"
                  >
                    {servicesSection ? <Edit2 className="w-3 h-3 mr-1" /> : <Plus className="w-3 h-3 mr-1" />}
                    {servicesSection ? 'Edit' : 'Setup'} Services
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {servicesSection ? (
                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <div className="w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden flex-shrink-0">
                        <img 
                          src={getImageUrl(servicesSection.image || '')}
                          alt="Services Section"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src = '/api/placeholder-image';
                          }}
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg text-beige-800 dark:text-beige-200">
                          {servicesSection.title || 'Services Section'}
                        </h3>
                        <p className="text-beige-600 dark:text-beige-300">
                          {servicesSection.subtitle || 'No subtitle'}
                        </p>
                      </div>
                    </div>
                    {servicesSection.content && (
                      <div>
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Service Icons:</p>
                        <div className="grid grid-cols-4 gap-2">
                          {Array.from({ length: 4 }, (_, index) => {
                            let images = [];
                            try {
                              images = servicesSection.content ? JSON.parse(servicesSection.content) : [];
                              if (!Array.isArray(images)) images = [];
                            } catch (e) {
                              images = [];
                            }
                            const imageUrl = images[index] || '';
                            return (
                              <div key={index} className="aspect-square bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
                                {imageUrl ? (
                                  <img 
                                    src={getImageUrl(imageUrl)} 
                                    alt={`Service ${index + 1}`}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                      e.currentTarget.src = '/api/placeholder-image';
                                    }}
                                  />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                                    <Settings className="w-6 h-6" />
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <div className="w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden mx-auto mb-2 flex items-center justify-center">
                      <Settings className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-gray-500">No services section configured. Click "Setup Services" to add content.</p>
                  </div>
                )}
              </CardContent>
            </Card>


            {/* Products Section */}
            <Card className="bg-white dark:bg-gray-800">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Package className="w-5 h-5" />
                      Products Section
                    </CardTitle>
                    <CardDescription>
                      Manage the featured products section with 4 product category images
                    </CardDescription>
                  </div>
                  <Button 
                    size="sm" 
                    onClick={() => handleOpenDialog('home', productsSection || { section: 'products' })}
                    className="bg-gradient-to-r from-beige-500 to-beige-600 hover:from-beige-600 hover:to-beige-700"
                  >
                    {productsSection ? <Edit2 className="w-3 h-3 mr-1" /> : <Plus className="w-3 h-3 mr-1" />}
                    {productsSection ? 'Edit' : 'Setup'} Products
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {productsSection?.content ? (
                  <div className="grid grid-cols-4 gap-2">
                    {Array.from({ length: 4 }, (_, index) => {
                      let images = [];
                      try {
                        images = productsSection.content ? JSON.parse(productsSection.content) : [];
                        if (!Array.isArray(images)) images = [];
                      } catch (e) {
                        images = [];
                      }
                      const imageUrl = images[index] || '';
                      return (
                        <div key={index} className="aspect-square bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
                          {imageUrl ? (
                            <img 
                              src={getImageUrl(imageUrl)} 
                              alt={`Product ${index + 1}`}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.currentTarget.src = '/api/placeholder-image';
                              }}
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                              <Package className="w-6 h-6" />
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <p className="text-gray-500">No product images configured. Click "Setup Products" to add images.</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Styled by Us Section */}
            <Card className="bg-white dark:bg-gray-800">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Star className="w-5 h-5" />
                      Styled by Us Section
                    </CardTitle>
                    <CardDescription>
                      Manage the client showcase section with 4 before/after images
                    </CardDescription>
                  </div>
                  <Button 
                    size="sm" 
                    onClick={() => handleOpenDialog('home', styledBySection || { section: 'styled-by' })}
                    className="bg-gradient-to-r from-beige-500 to-beige-600 hover:from-beige-600 hover:to-beige-700"
                  >
                    {styledBySection ? <Edit2 className="w-3 h-3 mr-1" /> : <Plus className="w-3 h-3 mr-1" />}
                    {styledBySection ? 'Edit' : 'Setup'} Styled by Us
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {styledBySection?.content ? (
                  <div className="grid grid-cols-4 gap-2">
                    {Array.from({ length: 4 }, (_, index) => {
                      let images = [];
                      try {
                        images = styledBySection.content ? JSON.parse(styledBySection.content) : [];
                        if (!Array.isArray(images)) images = [];
                      } catch (e) {
                        images = [];
                      }
                      const imageUrl = images[index] || '';
                      return (
                        <div key={index} className="aspect-square bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
                          {imageUrl ? (
                            <img 
                              src={getImageUrl(imageUrl)} 
                              alt={`Client Work ${index + 1}`}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.currentTarget.src = '/api/placeholder-image';
                              }}
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                              <Star className="w-6 h-6" />
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <p className="text-gray-500">No client work images configured. Click "Setup Styled by Us" to add images.</p>
                  </div>
                )}
              </CardContent>
            </Card>

          </div>
        )}
      </div>
    );
  };

  const renderEditDialog = () => (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {editingItem ? t.actions.edit : t.actions.add} {
              currentSection === 'products' ? t.tabs.products :
              currentSection === 'gallery' ? t.tabs.gallery :
              currentSection === 'pricing' ? t.tabs.pricelist :
              t.tabs.home
            }
          </DialogTitle>
          <DialogDescription>
            {editingItem 
              ? `Edit the details for this ${currentSection.slice(0, -1)}.`
              : `Add a new ${currentSection.slice(0, -1)} to the ${currentSection} section.`
            }
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          {currentSection === 'products' && (
            <>
              <div>
                <label className="text-sm font-medium">{t.fields.name}</label>
                <Input 
                  value={formData.name || ''} 
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="Product name"
                />
              </div>
              <div>
                <label className="text-sm font-medium">{t.fields.description}</label>
                <Textarea 
                  value={formData.description || ''} 
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Product description"
                />
              </div>
              <div>
                <label className="text-sm font-medium">{t.fields.image}</label>
                                  <Input 
                    value={formData.image || ''} 
                    onChange={(e) => setFormData({...formData, image: convertGoogleDriveUrl(e.target.value)})}
                    placeholder="https://drive.google.com/file/d/YOUR_FILE_ID/preview (must be public) or https://imgur.com/image.jpg"
                    type="url"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    <strong>For Google Drive:</strong> Make sure the file is set to "Anyone with the link can view" for it to display properly.
                    <br />
                    <strong>Alternative:</strong> Upload to imgur.com, unsplash.com, or another image hosting service for better reliability.
                  </p>
                 {formData.image && (
                   <div className="mt-2">
                     <div className="w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
                       <img 
                         src={getImageUrl(formData.image)} 
                         alt="Preview"
                         className="w-full h-full object-cover"
                         onError={(e) => {
                           e.currentTarget.src = '/api/placeholder-image';
                         }}
                         onLoad={() => {
                           console.log('Image loaded successfully:', getImageUrl(formData.image));
                         }}
                       />
                     </div>
                     <p className="text-xs text-gray-500 mt-1">
                       {convertGoogleDriveUrl(formData.image).includes('drive.google.com') 
                         ? 'Using Google Drive URL' 
                         : 'Direct image URL'}
                     </p>
                   </div>
                 )}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">{t.fields.price}</label>
                                      <Input 
                      value={formData.price || ''} 
                      onChange={(e) => setFormData({...formData, price: formatPriceForBackend(e.target.value)})}
                      placeholder="25 (Euro symbol added automatically)"
                    />
                </div>
                <div>
                  <label className="text-sm font-medium">{t.fields.category}</label>
                  <Select value={formData.category || ''} onValueChange={(value) => setFormData({...formData, category: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Polish">Polish</SelectItem>
                      <SelectItem value="Kit">Kit</SelectItem>
                      <SelectItem value="Tools">Tools</SelectItem>
                      <SelectItem value="Care">Care</SelectItem>
                      <SelectItem value="Art">Art Supplies</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </>
          )}
          
          {currentSection === 'gallery' && (
            <>
              <div>
                <label className="text-sm font-medium">{t.fields.title}</label>
                <Input 
                  value={formData.title || ''} 
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  placeholder="Gallery item title"
                />
              </div>
              <div>
                <label className="text-sm font-medium">{t.fields.description}</label>
                <Textarea 
                  value={formData.description || ''} 
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Gallery item description"
                />
              </div>
              <div>
                <label className="text-sm font-medium">{t.fields.image}</label>
                <Input 
                  value={formData.image || ''} 
                  onChange={(e) => setFormData({...formData, image: convertGoogleDriveUrl(e.target.value)})}
                  placeholder="https://drive.google.com/file/d/YOUR_FILE_ID/preview (must be public) or https://imgur.com/image.jpg"
                  type="url"
                />
                <p className="text-xs text-gray-500 mt-1">
                  <strong>For Google Drive:</strong> Make sure the file is set to "Anyone with the link can view" for it to display properly.
                  <br />
                  <strong>Alternative:</strong> Upload to imgur.com, unsplash.com, or another image hosting service for better reliability.
                </p>
                {formData.image && (
                  <div className="mt-2">
                    <div className="w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
                      <img 
                        src={getImageUrl(formData.image)} 
                        alt="Preview"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = '/api/placeholder-image';
                        }}
                        onLoad={() => {
                          console.log('Image loaded successfully:', getImageUrl(formData.image));
                        }}
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {convertGoogleDriveUrl(formData.image).includes('drive.google.com') 
                        ? 'Using Google Drive URL' 
                        : 'Direct image URL'}
                    </p>
                  </div>
                )}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">{t.fields.category}</label>
                  <Select value={formData.category || ''} onValueChange={(value) => setFormData({...formData, category: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Nail Art">Nail Art</SelectItem>
                      <SelectItem value="Pedicure">Pedicure</SelectItem>
                      <SelectItem value="Manicure">Manicure</SelectItem>
                      <SelectItem value="Gel">Gel</SelectItem>
                      <SelectItem value="Polish">Polish</SelectItem>
                      <SelectItem value="Design">Design</SelectItem>
                      <SelectItem value="Before/After">Before/After</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium">{t.fields.sortOrder}</label>
                  <Input 
                    type="number"
                    value={formData.sortOrder || 0} 
                    onChange={(e) => setFormData({...formData, sortOrder: parseInt(e.target.value) || 0})}
                    placeholder="Display order (0-100)"
                  />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <input 
                  type="checkbox"
                  id="isActive"
                  checked={formData.isActive !== false}
                  onChange={(e) => setFormData({...formData, isActive: e.target.checked})}
                  className="rounded"
                />
                <label htmlFor="isActive" className="text-sm font-medium">{t.fields.active}</label>
              </div>
            </>
          )}
          
          {currentSection === 'pricing' && (
            <>
              <div>
                <label className="text-sm font-medium">{t.fields.serviceName}</label>
                <Input 
                  value={formData.serviceName || ''} 
                  onChange={(e) => setFormData({...formData, serviceName: e.target.value})}
                  placeholder="Service name"
                />
              </div>
              <div>
                <label className="text-sm font-medium">{t.fields.description}</label>
                <Textarea 
                  value={formData.description || ''} 
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Service description"
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium">{t.fields.price}</label>
                                      <Input 
                      value={formData.price || ''} 
                      onChange={(e) => setFormData({...formData, price: formatPriceForBackend(e.target.value)})}
                      placeholder="35 (Euro symbol added automatically)"
                    />
                </div>
                <div>
                  <label className="text-sm font-medium">{t.fields.category}</label>
                  <Select value={formData.category || ''} onValueChange={(value) => setFormData({...formData, category: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gellak">Gellak</SelectItem>
                      <SelectItem value="biab">BIAB</SelectItem>
                      <SelectItem value="pedicure">Pedicure</SelectItem>
                      <SelectItem value="gelBuilder">Gel Builder</SelectItem>
                      <SelectItem value="acrylic">Acrylic</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium">{t.fields.duration}</label>
                  <Input 
                    value={formData.duration || ''} 
                    onChange={(e) => setFormData({...formData, duration: e.target.value})}
                    placeholder="45 min"
                  />
                </div>
              </div>
            </>
          )}
          
          {currentSection === 'home' && (
            <>
              {formData.section === 'hero' ? (
                // Hero Banner Form
                <>
                  <div>
                    <label className="text-sm font-medium">Section</label>
                    <Input 
                      value="hero" 
                      disabled
                      className="bg-gray-100"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Hero Images (5 required)</label>
                    <p className="text-xs text-gray-500 mb-2">Add exactly 5 images for the hero banner carousel</p>
                                         <div className="space-y-3">
                       {Array.from({ length: 5 }, (_, index) => {
                         let images = [];
                         try {
                           if (typeof formData.content === 'string') {
                             images = JSON.parse(formData.content);
                           } else if (Array.isArray(formData.content)) {
                             images = formData.content;
                           }
                           if (!Array.isArray(images)) images = [];
                         } catch (e) {
                           images = [];
                         }
                         const imageValue = images[index] || '';
                         
                         return (
                           <div key={index} className="flex gap-2 items-center">
                             <span className="text-sm font-medium w-16">Image {index + 1}:</span>
                             <Input 
                               value={imageValue}
                               onChange={(e) => {
                                 const newImages = [...images];
                                 newImages[index] = convertGoogleDriveUrl(e.target.value);
                                 // Ensure array is exactly 5 elements
                                 while (newImages.length < 5) newImages.push('');
                                 setFormData({...formData, content: newImages.slice(0, 5)});
                               }}
                               placeholder="https://drive.google.com/file/d/YOUR_FILE_ID/view or direct image URL"
                               className="flex-1"
                             />
                             {imageValue && (
                               <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded overflow-hidden">
                                 <img 
                                   src={getImageUrl(imageValue)} 
                                   alt={`Hero ${index + 1}`}
                                   className="w-full h-full object-cover"
                                   onError={(e) => {
                                     e.currentTarget.src = '/api/placeholder-image';
                                   }}
                                 />
                               </div>
                             )}
                           </div>
                         );
                       })}
                    </div>
                  </div>
                </>
              ) : formData.section === 'about' ? (
                // About Section Form - Image, Title, and Subtitle
                <>
                  <div>
                    <label className="text-sm font-medium">Section</label>
                    <Input 
                      value="about" 
                      disabled
                      className="bg-gray-100"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Image Overlay Name</label>
                    <Input 
                      value={formData.title || ''} 
                      onChange={(e) => setFormData({
                        ...formData, 
                        title: e.target.value,
                        section: 'about',
                        isActive: true
                      })}
                      placeholder="Name shown on image overlay"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Image Overlay Subtitle</label>
                    <Input 
                      value={formData.subtitle || ''} 
                      onChange={(e) => setFormData({
                        ...formData, 
                        subtitle: e.target.value,
                        section: 'about',
                        isActive: true
                      })}
                      placeholder="Subtitle shown on image overlay"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">{t.fields.image}</label>
                    <Input 
                      value={formData.image || ''} 
                      onChange={(e) => setFormData({
                        ...formData, 
                        image: convertGoogleDriveUrl(e.target.value),
                        section: 'about',
                        isActive: true
                      })}
                      placeholder="https://drive.google.com/file/d/YOUR_FILE_ID/view or direct image URL"
                      type="url"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      <strong>For Google Drive:</strong> Make sure the file is set to "Anyone with the link can view"
                    </p>
                    {formData.image && (
                      <div className="mt-3">
                        <div className="w-32 h-32 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
                          <img 
                            src={getImageUrl(formData.image)} 
                            alt="About preview"
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.currentTarget.src = '/api/placeholder-image';
                            }}
                          />
                        </div>
                        <p className="text-xs text-gray-500 mt-1">Preview of About section image</p>
                      </div>
                    )}
                  </div>
                </>
              ) : formData.section === 'safety' ? (
                // Safety Section Form
                <>
                  <div>
                    <label className="text-sm font-medium">Section</label>
                    <Input 
                      value="safety" 
                      disabled
                      className="bg-gray-100"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Experience Number</label>
                    <Input 
                      value={formData.title || ''} 
                      onChange={(e) => setFormData({
                        ...formData, 
                        title: e.target.value,
                        section: 'safety',
                        isActive: true
                      })}
                      placeholder="5+ Years"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Experience Label</label>
                    <Input 
                      value={formData.subtitle || ''} 
                      onChange={(e) => setFormData({
                        ...formData, 
                        subtitle: e.target.value,
                        section: 'safety',
                        isActive: true
                      })}
                      placeholder="Years Experience"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">{t.fields.image}</label>
                    <Input 
                      value={formData.image || ''} 
                      onChange={(e) => setFormData({...formData, image: convertGoogleDriveUrl(e.target.value)})}
                      placeholder="Professional nail technician image URL"
                      type="url"
                    />
                    {formData.image && (
                      <div className="mt-3">
                        <div className="w-32 h-32 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
                          <img 
                            src={getImageUrl(formData.image)} 
                            alt="Safety section preview"
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.currentTarget.src = '/api/placeholder-image';
                            }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </>
              ) : formData.section === 'lookbook' ? (
                // Lookbook Section Form (3 images)
                <>
                  <div>
                    <label className="text-sm font-medium">Section</label>
                    <Input 
                      value="lookbook" 
                      disabled
                      className="bg-gray-100"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Lookbook Images (3 required)</label>
                    <p className="text-xs text-gray-500 mb-2">Add 3 images for the lookbook showcase</p>
                    <div className="space-y-3">
                      {Array.from({ length: 3 }, (_, index) => {
                        let lookbookItems = [];
                        try {
                          if (typeof formData.content === 'string') {
                            lookbookItems = JSON.parse(formData.content);
                          } else if (Array.isArray(formData.content)) {
                            lookbookItems = formData.content;
                          }
                          if (!Array.isArray(lookbookItems)) lookbookItems = [];
                        } catch (e) {
                          lookbookItems = [];
                        }
                        
                        // Ensure each item is an object with image, title, subtitle
                        const currentItem = lookbookItems[index] || {};
                        const imageValue = typeof currentItem === 'string' ? currentItem : (currentItem.image || '');
                        const titleValue = typeof currentItem === 'object' ? (currentItem.title || '') : '';
                        const subtitleValue = typeof currentItem === 'object' ? (currentItem.subtitle || '') : '';
                        
                        return (
                          <div key={index} className="space-y-3 p-4 border rounded-lg">
                            <h4 className="text-sm font-semibold">Lookbook Item {index + 1}</h4>
                            <div>
                              <label className="text-xs font-medium text-gray-600">Image URL</label>
                              <Input 
                                value={imageValue}
                                onChange={(e) => {
                                  const newItems = [...lookbookItems];
                                  while (newItems.length <= index) newItems.push({});
                                  newItems[index] = {
                                    ...newItems[index],
                                    image: convertGoogleDriveUrl(e.target.value),
                                    title: newItems[index]?.title || '',
                                    subtitle: newItems[index]?.subtitle || ''
                                  };
                                  while (newItems.length < 3) newItems.push({image: '', title: '', subtitle: ''});
                                  setFormData({...formData, content: newItems.slice(0, 3)});
                                }}
                                placeholder="Lookbook image URL"
                                className="text-sm"
                              />
                            </div>
                            <div>
                              <label className="text-xs font-medium text-gray-600">Title</label>
                              <Input 
                                value={titleValue}
                                onChange={(e) => {
                                  const newItems = [...lookbookItems];
                                  while (newItems.length <= index) newItems.push({});
                                  newItems[index] = {
                                    ...newItems[index],
                                    image: newItems[index]?.image || '',
                                    title: e.target.value,
                                    subtitle: newItems[index]?.subtitle || ''
                                  };
                                  while (newItems.length < 3) newItems.push({image: '', title: '', subtitle: ''});
                                  setFormData({...formData, content: newItems.slice(0, 3)});
                                }}
                                placeholder="Image title"
                                className="text-sm"
                              />
                            </div>
                            <div>
                              <label className="text-xs font-medium text-gray-600">Subtitle</label>
                              <Input 
                                value={subtitleValue}
                                onChange={(e) => {
                                  const newItems = [...lookbookItems];
                                  while (newItems.length <= index) newItems.push({});
                                  newItems[index] = {
                                    ...newItems[index],
                                    image: newItems[index]?.image || '',
                                    title: newItems[index]?.title || '',
                                    subtitle: e.target.value
                                  };
                                  while (newItems.length < 3) newItems.push({image: '', title: '', subtitle: ''});
                                  setFormData({...formData, content: newItems.slice(0, 3)});
                                }}
                                placeholder="Image subtitle"
                                className="text-sm"
                              />
                            </div>
                            {imageValue && (
                              <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded overflow-hidden">
                                <img 
                                  src={getImageUrl(imageValue)} 
                                  alt={`Lookbook ${index + 1}`}
                                  className="w-full h-full object-cover"
                                  onError={(e) => {
                                    e.currentTarget.src = '/api/placeholder-image';
                                  }}
                                />
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </>
              ) : formData.section === 'feel-better' ? (
                // Feel Better Section Form
                <>
                  <div>
                    <label className="text-sm font-medium">Section</label>
                    <Input 
                      value="feel-better" 
                      disabled
                      className="bg-gray-100"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Image Overlay Title</label>
                    <Input 
                      value={formData.title || ''} 
                      onChange={(e) => setFormData({
                        ...formData, 
                        title: e.target.value,
                        section: 'feel-better',
                        isActive: true
                      })}
                      placeholder="Years of Experience (e.g., 5+)"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Image Overlay Subtitle</label>
                    <Input 
                      value={formData.subtitle || ''} 
                      onChange={(e) => setFormData({
                        ...formData, 
                        subtitle: e.target.value,
                        section: 'feel-better',
                        isActive: true
                      })}
                      placeholder="Description (e.g., Years Experience)"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">{t.fields.image}</label>
                    <Input 
                      value={formData.image || ''} 
                      onChange={(e) => setFormData({
                        ...formData, 
                        image: convertGoogleDriveUrl(e.target.value),
                        section: 'feel-better',
                        isActive: true
                      })}
                      placeholder="https://drive.google.com/file/d/YOUR_FILE_ID/view or direct image URL"
                      type="url"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      <strong>For Google Drive:</strong> Make sure the file is set to "Anyone with the link can view"
                    </p>
                    {formData.image && (
                      <div className="mt-3">
                        <div className="w-32 h-32 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
                          <img 
                            src={getImageUrl(formData.image)} 
                            alt="Feel better section preview"
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.currentTarget.src = '/api/placeholder-image';
                            }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </>
              ) : formData.section === 'services' ? (
                // Services Section Form
                <>
                  <div>
                    <label className="text-sm font-medium">Section</label>
                    <Input 
                      value="services" 
                      disabled
                      className="bg-gray-100"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">{t.fields.title}</label>
                    <Input 
                      value={formData.title || ''} 
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      placeholder="Services section title"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">{t.fields.subtitle}</label>
                    <Input 
                      value={formData.subtitle || ''} 
                      onChange={(e) => setFormData({...formData, subtitle: e.target.value})}
                      placeholder="Services section subtitle"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Main Services Image</label>
                    <Input 
                      value={formData.image || ''} 
                      onChange={(e) => setFormData({...formData, image: convertGoogleDriveUrl(e.target.value)})}
                      placeholder="Main services section image URL"
                      type="url"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Service Icons (4 required)</label>
                    <p className="text-xs text-gray-500 mb-2">Add 4 service icons</p>
                    <div className="space-y-3">
                      {Array.from({ length: 4 }, (_, index) => {
                        let images = [];
                        try {
                          if (typeof formData.content === 'string') {
                            images = JSON.parse(formData.content);
                          } else if (Array.isArray(formData.content)) {
                            images = formData.content;
                          }
                          if (!Array.isArray(images)) images = [];
                        } catch (e) {
                          images = [];
                        }
                        const imageValue = images[index] || '';
                        
                        return (
                          <div key={index} className="flex gap-2 items-center">
                            <span className="text-sm font-medium w-16">Icon {index + 1}:</span>
                            <Input 
                              value={imageValue}
                              onChange={(e) => {
                                const newImages = [...images];
                                newImages[index] = convertGoogleDriveUrl(e.target.value);
                                while (newImages.length < 4) newImages.push('');
                                setFormData({...formData, content: newImages.slice(0, 4)});
                              }}
                              placeholder="Service icon image URL"
                              className="flex-1"
                            />
                            {imageValue && (
                              <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded overflow-hidden">
                                <img 
                                  src={getImageUrl(imageValue)} 
                                  alt={`Service ${index + 1}`}
                                  className="w-full h-full object-cover"
                                  onError={(e) => {
                                    e.currentTarget.src = '/api/placeholder-image';
                                  }}
                                />
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </>
              ) : formData.section === 'products' ? (
                // Products Section Form (4 images)
                <>
                  <div>
                    <label className="text-sm font-medium">Section</label>
                    <Input 
                      value="products" 
                      disabled
                      className="bg-gray-100"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Product Category Images (4 required)</label>
                    <p className="text-xs text-gray-500 mb-2">Add 4 images for featured product categories</p>
                    <div className="space-y-3">
                      {Array.from({ length: 4 }, (_, index) => {
                        let images = [];
                        try {
                          if (typeof formData.content === 'string') {
                            images = JSON.parse(formData.content);
                          } else if (Array.isArray(formData.content)) {
                            images = formData.content;
                          }
                          if (!Array.isArray(images)) images = [];
                        } catch (e) {
                          images = [];
                        }
                        const imageValue = images[index] || '';
                        
                        return (
                          <div key={index} className="flex gap-2 items-center">
                            <span className="text-sm font-medium w-16">Product {index + 1}:</span>
                            <Input 
                              value={imageValue}
                              onChange={(e) => {
                                const newImages = [...images];
                                newImages[index] = convertGoogleDriveUrl(e.target.value);
                                while (newImages.length < 4) newImages.push('');
                                setFormData({...formData, content: newImages.slice(0, 4)});
                              }}
                              placeholder="Product category image URL"
                              className="flex-1"
                            />
                            {imageValue && (
                              <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded overflow-hidden">
                                <img 
                                  src={getImageUrl(imageValue)} 
                                  alt={`Product ${index + 1}`}
                                  className="w-full h-full object-cover"
                                  onError={(e) => {
                                    e.currentTarget.src = '/api/placeholder-image';
                                  }}
                                />
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </>
              ) : formData.section === 'styled-by' ? (
                // Styled by Us Section Form (4 images)
                <>
                  <div>
                    <label className="text-sm font-medium">Section</label>
                    <Input 
                      value="styled-by" 
                      disabled
                      className="bg-gray-100"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Client Showcase Images (4 required)</label>
                    <p className="text-xs text-gray-500 mb-2">Add 4 client work showcase images</p>
                    <div className="space-y-3">
                      {Array.from({ length: 4 }, (_, index) => {
                        let images = [];
                        try {
                          if (typeof formData.content === 'string') {
                            images = JSON.parse(formData.content);
                          } else if (Array.isArray(formData.content)) {
                            images = formData.content;
                          }
                          if (!Array.isArray(images)) images = [];
                        } catch (e) {
                          images = [];
                        }
                        const imageValue = images[index] || '';
                        
                        return (
                          <div key={index} className="flex gap-2 items-center">
                            <span className="text-sm font-medium w-16">Client {index + 1}:</span>
                            <Input 
                              value={imageValue}
                              onChange={(e) => {
                                const newImages = [...images];
                                newImages[index] = convertGoogleDriveUrl(e.target.value);
                                while (newImages.length < 4) newImages.push('');
                                setFormData({...formData, content: newImages.slice(0, 4)});
                              }}
                              placeholder="Client work image URL"
                              className="flex-1"
                            />
                            {imageValue && (
                              <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded overflow-hidden">
                                <img 
                                  src={getImageUrl(imageValue)} 
                                  alt={`Client Work ${index + 1}`}
                                  className="w-full h-full object-cover"
                                  onError={(e) => {
                                    e.currentTarget.src = '/api/placeholder-image';
                                  }}
                                />
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </>
              ) : null}
            </>
          )}
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsDialogOpen(false)} disabled={saving}>
            <X className="w-4 h-4 mr-2" />
            {t.actions.cancel}
          </Button>
          <Button 
            onClick={handleSave} 
            className="bg-gradient-to-r from-beige-500 to-beige-600 hover:from-beige-600 hover:to-beige-700"
            disabled={saving}
          >
            {saving ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Save className="w-4 h-4 mr-2" />
            )}
            {saving ? t.messages.saving : t.actions.save}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img 
                src={logoPath} 
                alt="Logo" 
                className="h-10 w-10 object-contain rounded-full border-2 border-beige-400"
              />
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {t.nav.admin}
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Content Management System
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Language Selector */}
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => setCurrentLanguage('en')}
                  className={`w-8 h-8 rounded-full overflow-hidden border-2 transition-all duration-200 ${
                    currentLanguage === 'en' ? 'border-beige-500 shadow-md' : 'border-gray-300 hover:border-beige-400'
                  }`}
                >
                  <svg className="w-full h-full" viewBox="0 0 60 40" fill="none">
                    <rect width="60" height="40" fill="#012169"/>
                    <path d="M0 0L60 40M60 0L0 40" stroke="white" strokeWidth="6"/>
                    <path d="M0 0L60 40M60 0L0 40" stroke="#C8102E" strokeWidth="4"/>
                    <path d="M30 0V40M0 20H60" stroke="white" strokeWidth="12"/>
                    <path d="M30 0V40M0 20H60" stroke="#C8102E" strokeWidth="8"/>
                  </svg>
                </button>
                <button 
                  onClick={() => setCurrentLanguage('nl')}
                  className={`w-8 h-8 rounded-full overflow-hidden border-2 transition-all duration-200 ${
                    currentLanguage === 'nl' ? 'border-beige-500 shadow-md' : 'border-gray-300 hover:border-beige-400'
                  }`}
                >
                  <svg className="w-full h-full" viewBox="0 0 60 40" fill="none">
                    <rect width="60" height="13.33" fill="#AE1C28"/>
                    <rect y="13.33" width="60" height="13.33" fill="white"/>
                    <rect y="26.66" width="60" height="13.34" fill="#21468B"/>
                  </svg>
                </button>
              </div>
              
              <Link href="/">
                <Button variant="outline">
                  <Home className="w-4 h-4 mr-2" />
                  View Site
                </Button>
              </Link>
              
              {/* User Info */}
              {currentUser && (
                <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
                  <Users className="w-4 h-4" />
                  <span>Welcome, {currentUser.username}</span>
                </div>
              )}
              
              <Button variant="outline" onClick={handleLogout}>
                <Settings className="w-4 h-4 mr-2" />
                {t.nav.logout}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white dark:bg-gray-800 p-2 rounded-lg shadow-sm">
            <TabsTrigger 
              value="home" 
              className="flex items-center gap-2 data-[state=active]:bg-beige-500 data-[state=active]:text-white"
            >
              <Home className="w-4 h-4" />
              {t.tabs.home}
            </TabsTrigger>
            <TabsTrigger 
              value="pricelist"
              className="flex items-center gap-2 data-[state=active]:bg-beige-500 data-[state=active]:text-white"
            >
              <DollarSign className="w-4 h-4" />
              {t.tabs.pricelist}
            </TabsTrigger>
            <TabsTrigger 
              value="gallery"
              className="flex items-center gap-2 data-[state=active]:bg-beige-500 data-[state=active]:text-white"
            >
              <Image className="w-4 h-4" />
              {t.tabs.gallery}
            </TabsTrigger>
            <TabsTrigger 
              value="products"
              className="flex items-center gap-2 data-[state=active]:bg-beige-500 data-[state=active]:text-white"
            >
              <Package className="w-4 h-4" />
              {t.tabs.products}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="home" className="space-y-6">
            {renderHomeTab()}
          </TabsContent>

          <TabsContent value="pricelist" className="space-y-6">
            {renderPricingTab()}
          </TabsContent>

          <TabsContent value="gallery" className="space-y-6">
            {renderGalleryTab()}
          </TabsContent>

          <TabsContent value="products" className="space-y-6">
            {renderProductsTab()}
          </TabsContent>
        </Tabs>
      </main>

      {renderEditDialog()}
    </div>
  );
}; 