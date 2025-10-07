import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Menu, X, Sparkles, Loader2, Image as ImageIcon } from "lucide-react";
import { Link } from "wouter";
import logoPath from "@assets/image_1752511415001.png";
import { useLanguage } from "@/contexts/LanguageContext";
import type { Gallery as GalleryItem } from "@shared/schema";

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

// Helper function to get the appropriate image URL (proxy for Google Drive)
const getImageUrl = (imageSrc: string): string => {
  if (!imageSrc) return '/api/placeholder-image';
  
  const convertedUrl = convertGoogleDriveUrl(imageSrc);
  
  // If it's a Google Drive URL, use our proxy
  if (convertedUrl.includes('drive.google.com')) {
    return `/api/proxy-image?url=${encodeURIComponent(convertedUrl)}`;
  }
  
  return convertedUrl;
};

export const Gallery = (): JSX.Element => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const { currentLanguage, setCurrentLanguage } = useLanguage();

  // Translation content
  const translations = {
    nl: {
      nav: {
        home: "Home",
        products: "Producten",
        gallery: "Galerij",
        pricing: "Prijzen",
        pricelist: "Prijslijst",
        policy: "Klantenbeleid",
        contact: "Contact",
        bookNow: "AFSPRAAK MAKEN"
      },
      header: {
        title: "GALERIJ",
        subtitle: "Bekijk onze collectie van prachtige nagelkunst en inspirerende designs"
      }
    },
    en: {
      nav: {
        home: "Home",
        products: "Products",
        gallery: "Gallery",
        pricing: "Pricing",
        pricelist: "Price List",
        policy: "Policy",
        contact: "Contact",
        bookNow: "BOOK NOW"
      },
      header: {
        title: "GALLERY",
        subtitle: "Explore our collection of beautiful nail art and inspiring designs"
      }
    }
  };

  const t = translations[currentLanguage];

  // Fetch gallery items from API
  useEffect(() => {
    const fetchGalleryItems = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/gallery');
        if (response.ok) {
          const data = await response.json();
          // Only show active items and sort by sortOrder
          const activeItems = data
            .filter((item: GalleryItem) => item.isActive !== false)
            .sort((a: GalleryItem, b: GalleryItem) => (a.sortOrder || 0) - (b.sortOrder || 0));
          setGalleryItems(activeItems);
        }
      } catch (error) {
        console.error('Failed to fetch gallery items:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGalleryItems();
  }, []);

  // Get unique categories
  const categories = ['all', ...Array.from(new Set(galleryItems.map(item => item.category).filter((cat): cat is string => Boolean(cat))))];

  // Filter items by category
  const filteredItems = selectedCategory === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === selectedCategory);

  const scrollToSection = (sectionId: string) => {
    if (sectionId === 'pricing') {
      window.location.href = '/#pricing';
    } else if (sectionId === 'contact') {
      window.location.href = '/#contact';
    } else if (sectionId === 'home') {
      window.location.href = '/';
    }
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-beige-300 dark:border-gray-700 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <img 
                src={logoPath} 
                alt="Nails of the Netherlands Logo" 
                className="h-14 w-14 object-contain rounded-full border-2 border-beige-400"
              />
              <span className="text-lg font-bold text-beige-800 dark:text-beige-200">
                NAILS OF THE NETHERLANDS
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <button 
                onClick={() => scrollToSection('home')}
                className="text-beige-700 dark:text-beige-300 hover:text-beige-500 dark:hover:text-beige-400 font-medium transition-colors duration-200"
              >
                {t.nav.home}
              </button>
              <Link href="/pricelist">
                <button className="text-beige-700 dark:text-beige-300 hover:text-beige-500 dark:hover:text-beige-400 font-medium transition-colors duration-200">
                  {t.nav.pricelist}
                </button>
              </Link>
              <Link href="/gallery">
                <button className="text-beige-500 dark:text-beige-400 font-semibold transition-colors duration-200 border-b-2 border-beige-500">
                  {t.nav.gallery}
                </button>
              </Link>
              <Link href="/products">
                <button className="text-beige-700 dark:text-beige-300 hover:text-beige-500 dark:hover:text-beige-400 font-medium transition-colors duration-200">
                  {t.nav.products}
                </button>
              </Link>
              <Link href="/klantenbeleid">
                <button className="text-beige-700 dark:text-beige-300 hover:text-beige-500 dark:hover:text-beige-400 font-medium transition-colors duration-200">
                  {t.nav.policy}
                </button>
              </Link>
              <Link href="/contact">
                <button className="text-beige-700 dark:text-beige-300 hover:text-beige-500 dark:hover:text-beige-400 font-medium transition-colors duration-200">
                  {t.nav.contact}
                </button>
              </Link>
              
              <Button 
                onClick={() => window.open('https://wa.me/31628699827', '_blank')}
                className="bg-gradient-to-r from-beige-500 to-beige-600 hover:from-beige-600 hover:to-beige-700 text-white px-6 py-2 rounded-full font-semibold"
              >
                {t.nav.bookNow}
              </Button>
              
              {/* Language Flags */}
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => setCurrentLanguage('en')}
                  className={`w-8 h-8 rounded-full overflow-hidden border-2 transition-all duration-200 hover:scale-110 ${
                    currentLanguage === 'en' ? 'border-beige-500 shadow-md' : 'border-gray-300 hover:border-beige-400'
                  }`}
                  title="English"
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
                  className={`w-8 h-8 rounded-full overflow-hidden border-2 transition-all duration-200 hover:scale-110 ${
                    currentLanguage === 'nl' ? 'border-beige-500 shadow-md' : 'border-gray-300 hover:border-beige-400'
                  }`}
                  title="Nederlands"
                >
                  <svg className="w-full h-full" viewBox="0 0 60 40" fill="none">
                    <rect width="60" height="13.33" fill="#AE1C28"/>
                    <rect y="13.33" width="60" height="13.33" fill="white"/>
                    <rect y="26.66" width="60" height="13.34" fill="#21468B"/>
                  </svg>
                </button>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-beige-700 dark:text-beige-300 hover:text-beige-500 dark:hover:text-beige-400"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden absolute top-16 left-0 right-0 bg-white dark:bg-gray-900 border-b border-beige-300 dark:border-gray-700 shadow-lg">
              <div className="flex flex-col space-y-4 p-6">
                <button 
                  onClick={() => scrollToSection('home')}
                  className="text-beige-700 dark:text-beige-300 hover:text-beige-500 dark:hover:text-beige-400 font-medium text-left transition-colors duration-200"
                >
                  {t.nav.home}
                </button>
                <Link href="/pricelist">
                  <button 
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-beige-700 dark:text-beige-300 hover:text-beige-500 dark:hover:text-beige-400 font-medium text-left transition-colors duration-200"
                  >
                    {t.nav.pricelist}
                  </button>
                </Link>
                <Link href="/gallery">
                  <button 
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-beige-500 dark:text-beige-400 font-semibold text-left transition-colors duration-200"
                  >
                    {t.nav.gallery}
                  </button>
                </Link>
                <Link href="/products">
                  <button 
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-beige-700 dark:text-beige-300 hover:text-beige-500 dark:hover:text-beige-400 font-medium text-left transition-colors duration-200"
                >
                  {t.nav.products}
                </button>
                </Link>
                <Link href="/klantenbeleid">
                  <button 
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-beige-700 dark:text-beige-300 hover:text-beige-500 dark:hover:text-beige-400 font-medium text-left transition-colors duration-200"
                  >
                    {t.nav.policy}
                  </button>
                </Link>
                <Link href="/contact">
                  <button 
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-beige-700 dark:text-beige-300 hover:text-beige-500 dark:hover:text-beige-400 font-medium text-left transition-colors duration-200"
                  >
                    {t.nav.contact}
                  </button>
                </Link>
                
                <Button 
                  onClick={() => window.open('https://wa.me/31628699827', '_blank')}
                  className="bg-gradient-to-r from-beige-500 to-beige-600 hover:from-beige-600 hover:to-beige-700 text-white px-6 py-2 rounded-full font-semibold w-full"
                >
                  {t.nav.bookNow}
                </Button>
                
                {/* Mobile Language Flags */}
                <div className="flex items-center justify-center space-x-4 pt-2">
                  <button 
                    onClick={() => setCurrentLanguage('en')}
                    className={`w-10 h-10 rounded-full overflow-hidden border-2 transition-all duration-200 hover:scale-110 ${
                      currentLanguage === 'en' ? 'border-beige-500 shadow-md' : 'border-gray-300 hover:border-beige-400'
                    }`}
                    title="English"
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
                    className={`w-10 h-10 rounded-full overflow-hidden border-2 transition-all duration-200 hover:scale-110 ${
                      currentLanguage === 'nl' ? 'border-beige-500 shadow-md' : 'border-gray-300 hover:border-beige-400'
                    }`}
                    title="Nederlands"
                  >
                    <svg className="w-full h-full" viewBox="0 0 60 40" fill="none">
                      <rect width="60" height="13.33" fill="#AE1C28"/>
                      <rect y="13.33" width="60" height="13.33" fill="white"/>
                      <rect y="26.66" width="60" height="13.34" fill="#21468B"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Header */}
      <div className="bg-gradient-to-r from-beige-100 to-beige-200 dark:from-gray-800 dark:to-gray-700 pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-6">          
          <div className="text-center">
            <h1 className="text-6xl font-bold text-beige-800 dark:text-beige-200 mb-6">
              {t.header.title}
            </h1>
            <p className="text-xl text-beige-600 dark:text-beige-300 max-w-3xl mx-auto leading-relaxed">
              {t.header.subtitle}
            </p>
          </div>
        </div>
      </div>

      {/* Gallery Content */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-beige-500" />
              <span className="ml-2 text-beige-600 dark:text-beige-300">
                {currentLanguage === 'nl' ? 'Laden...' : 'Loading...'}
              </span>
            </div>
          ) : galleryItems.length === 0 ? (
            <div className="text-center py-12">
              <ImageIcon className="w-16 h-16 text-beige-300 mx-auto mb-4" />
              <p className="text-lg text-beige-600 dark:text-beige-300">
                {currentLanguage === 'nl' 
                  ? 'Galerij wordt binnenkort bijgewerkt met nieuwe afbeeldingen.'
                  : 'Gallery will be updated with new images soon.'
                }
              </p>
            </div>
          ) : (
            <>
              {/* Category Filter */}
              {categories.length > 1 && (
                <div className="mb-8">
                  <div className="flex flex-wrap justify-center gap-2">
                    {categories.map((category) => (
                      <Button
                        key={category}
                        variant={selectedCategory === category ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedCategory(category)}
                        className={selectedCategory === category 
                          ? "bg-beige-500 hover:bg-beige-600" 
                          : "border-beige-300 text-beige-600 hover:bg-beige-50"
                        }
                      >
                        {category === 'all' 
                          ? (currentLanguage === 'nl' ? 'Alle' : 'All')
                          : category
                        }
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {/* Gallery Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredItems.map((item) => (
                  <Card key={item.id} className="bg-white dark:bg-gray-800 hover:shadow-lg transition-shadow duration-300 overflow-hidden group">
                    <div className="aspect-square relative overflow-hidden">
                      <img 
                        src={getImageUrl(item.image || '')}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        onError={(e) => {
                          e.currentTarget.src = '/api/placeholder-image';
                        }}
                      />
                      {item.category && (
                        <Badge className="absolute top-2 left-2 bg-beige-500 text-white">
                          {item.category}
                        </Badge>
                      )}
                    </div>
                    
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-lg text-beige-800 dark:text-beige-200 mb-2">
                        {item.title}
                      </h3>
                      {item.description && (
                        <p className="text-sm text-beige-600 dark:text-beige-300 line-clamp-2">
                          {item.description}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>

              {filteredItems.length === 0 && selectedCategory !== 'all' && (
                <div className="text-center py-8">
                  <p className="text-beige-600 dark:text-beige-300">
                    {currentLanguage === 'nl' 
                      ? `Geen afbeeldingen gevonden in categorie "${selectedCategory}".`
                      : `No images found in category "${selectedCategory}".`
                    }
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-beige-50 to-beige-100 dark:from-gray-800 dark:to-gray-700">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-4xl font-bold text-beige-800 dark:text-beige-200 mb-6">
            {currentLanguage === 'nl' ? 'Laat Je Inspireren?' : 'Ready to Get Inspired?'}
          </h2>
          <p className="text-xl text-beige-600 dark:text-beige-300 mb-8 leading-relaxed">
            {currentLanguage === 'nl' 
              ? 'Boek vandaag nog uw afspraak en laat ons van uw nagels een kunstwerk maken.'
              : 'Book your appointment today and let us turn your nails into a work of art.'
            }
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-gradient-to-r from-beige-500 to-beige-600 hover:from-beige-600 hover:to-beige-700 text-white px-12 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:scale-105 shadow-xl"
              onClick={() => window.open('https://wa.me/31628699827', '_blank')}
            >
              <Sparkles className="w-5 h-5 mr-2" />
              {currentLanguage === 'nl' ? 'AFSPRAAK MAKEN' : 'BOOK APPOINTMENT'}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}; 
