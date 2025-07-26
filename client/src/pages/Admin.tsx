import { useState, useEffect, useCallback, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
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
  BarChart3,
  Upload,
  Eye,
  EyeOff,
  Loader2
} from "lucide-react";
import { Link } from "wouter";
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

// Optimized Image component with error handling
const OptimizedImage = ({ src, alt, className, ...props }: { src: string | null; alt: string; className?: string; [key: string]: any }) => {
  const [imageSrc, setImageSrc] = useState<string>('');
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (src) {
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
    setHasError(true);
    setIsLoading(false);
    setImageSrc('/api/placeholder-image');
  }, []);

  const handleLoad = useCallback(() => {
    setIsLoading(false);
  }, []);

  if (!src) {
    return <div className={`bg-gray-200 flex items-center justify-center ${className}`}>No Image</div>;
  }

  return (
    <div className="relative">
      {isLoading && (
        <div className={`absolute inset-0 bg-gray-200 flex items-center justify-center ${className}`}>
          <Loader2 className="h-4 w-4 animate-spin" />
        </div>
      )}
      <img
        src={imageSrc}
        alt={alt}
        className={className}
        onError={handleError}
        onLoad={handleLoad}
        style={{ display: isLoading ? 'none' : 'block' }}
        {...props}
      />
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
    setFormData(item || {});
    setIsDialogOpen(true);
  }, []);

  const handleSave = useCallback(async () => {
    setSaving(true);
    try {
      const endpoint = `/api/${currentSection === 'home' ? 'home-content' : currentSection}`;
      const method = editingItem ? 'PUT' : 'POST';
      const url = editingItem ? `${endpoint}/${editingItem.id}` : endpoint;

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
      const response = await fetch(`/api/${endpoint}/${id}`, {
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
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {t.fields.category}: {item.category}
                  </span>
                  <span className="text-sm text-gray-500">Order: {item.sortOrder}</span>
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

  const renderHomeTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-beige-800 dark:text-beige-200">{t.tabs.home}</h2>
        <Button 
          onClick={() => handleOpenDialog('home')}
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
          {homeContent.map((item) => (
            <Card key={item.id} className="bg-white dark:bg-gray-800">
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{item.title}</CardTitle>
                    <CardDescription>
                      {t.fields.section}: {item.section}
                      {item.subtitle && ` • ${item.subtitle}`}
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant={item.isActive ? "default" : "secondary"}>
                      {item.isActive ? <Eye className="w-3 h-3 mr-1" /> : <EyeOff className="w-3 h-3 mr-1" />}
                      {item.isActive ? "Active" : "Inactive"}
                    </Badge>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleOpenDialog('home', item)}
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
                          <AlertDialogTitle>Delete Content Section</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete the "{item.section}" section? This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDelete('home', item.id)}>
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                  {item.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );

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
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">{t.fields.category}</label>
                  <Input 
                    value={formData.category || ''} 
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    placeholder="Category"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">{t.fields.image}</label>
                  <Input 
                    value={formData.image || ''} 
                    onChange={(e) => setFormData({...formData, image: convertGoogleDriveUrl(e.target.value)})}
                    placeholder="Image URL"
                  />
                </div>
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
              <div>
                <label className="text-sm font-medium">{t.fields.section}</label>
                <Input 
                  value={formData.section || ''} 
                  onChange={(e) => setFormData({...formData, section: e.target.value})}
                  placeholder="hero, about, services, etc."
                />
              </div>
              <div>
                <label className="text-sm font-medium">{t.fields.title}</label>
                <Input 
                  value={formData.title || ''} 
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  placeholder="Section title"
                />
              </div>
              <div>
                <label className="text-sm font-medium">{t.fields.subtitle}</label>
                <Input 
                  value={formData.subtitle || ''} 
                  onChange={(e) => setFormData({...formData, subtitle: e.target.value})}
                  placeholder="Section subtitle"
                />
              </div>
              <div>
                <label className="text-sm font-medium">{t.fields.description}</label>
                <Textarea 
                  value={formData.description || ''} 
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Section description"
                  rows={4}
                />
              </div>
            </>
          )}
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">{t.fields.sortOrder}</label>
              <Input 
                type="number"
                value={formData.sortOrder || 0} 
                onChange={(e) => setFormData({...formData, sortOrder: parseInt(e.target.value) || 0})}
                placeholder="0"
              />
            </div>
            <div className="flex items-center space-x-2 pt-6">
              <input
                type="checkbox"
                id="isActive"
                checked={formData.isActive !== false}
                onChange={(e) => setFormData({...formData, isActive: e.target.checked})}
                className="rounded"
              />
              <label htmlFor="isActive" className="text-sm font-medium">{t.fields.active}</label>
            </div>
          </div>
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
              
              <Button variant="outline">
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