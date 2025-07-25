import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Menu, X, Heart, Eye, Sparkles, Filter } from "lucide-react";
import { Link } from "wouter";
import logoPath from "@assets/image_1752511415001.png";

export const Gallery = (): JSX.Element => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState<'nl' | 'en'>('nl');
  const [activeFilter, setActiveFilter] = useState<string>('all');

  // Translation content
  const translations = {
    nl: {
      nav: {
        home: "Home",
        services: "Diensten",
        products: "Producten",
        gallery: "Galerij",
        pricing: "Prijzen",
        pricelist: "Prijslijst",
        contact: "Contact",
        bookNow: "AFSPRAAK MAKEN"
      },
      header: {
        title: "ONZE GALERIJ",
        subtitle: "Ontdek onze prachtige nagelkunstwerken en professionele behandelingen. Van elegante gellak tot ingewikkelde nail art - bekijk onze portfolio van tevreden klanten."
      },
      filters: {
        all: "Alles",
        gellac: "Gellak",
        nailArt: "Nail Art",
        acrylic: "Acryl",
        biab: "BIAB",
        pedicure: "Pedicure",
        special: "Speciaal"
      },
      categories: {
        gellac: "Gellak Ontwerpen",
        nailArt: "Nail Art Creaties",
        acrylic: "Acryl Extensions",
        biab: "BIAB Behandelingen",
        pedicure: "Pedicure Werken",
        special: "Speciale Ontwerpen"
      }
    },
    en: {
      nav: {
        home: "Home",
        services: "Services",
        products: "Products",
        gallery: "Gallery",
        pricing: "Pricing",
        pricelist: "Price List",
        contact: "Contact",
        bookNow: "BOOK NOW"
      },
      header: {
        title: "OUR GALLERY",
        subtitle: "Discover our beautiful nail art works and professional treatments. From elegant gel polish to intricate nail art - view our portfolio of satisfied clients."
      },
      filters: {
        all: "All",
        gellac: "Gel Polish",
        nailArt: "Nail Art",
        acrylic: "Acrylic",
        biab: "BIAB",
        pedicure: "Pedicure",
        special: "Special"
      },
      categories: {
        gellac: "Gel Polish Designs",
        nailArt: "Nail Art Creations",
        acrylic: "Acrylic Extensions",
        biab: "BIAB Treatments",
        pedicure: "Pedicure Works",
        special: "Special Designs"
      }
    }
  };

  const t = translations[currentLanguage];

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

  // Gallery items with categories
  const galleryItems = [
    // Gel Polish
    {
      id: 1,
      category: "gellac",
      image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      title: currentLanguage === 'nl' ? "Elegante Franse Manicure" : "Elegant French Manicure",
      description: currentLanguage === 'nl' ? "Klassieke Franse stijl met perfecte witte tips" : "Classic French style with perfect white tips"
    },
    {
      id: 2,
      category: "gellac",
      image: "https://images.unsplash.com/photo-1632345031435-8727f6897d53?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      title: currentLanguage === 'nl' ? "Pastel Gellak Collectie" : "Pastel Gel Polish Collection",
      description: currentLanguage === 'nl' ? "Zachte pastelkleuren perfect voor de lente" : "Soft pastel colors perfect for spring"
    },
    {
      id: 3,
      category: "gellac",
      image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      title: currentLanguage === 'nl' ? "Rode Klassiekers" : "Red Classics",
      description: currentLanguage === 'nl' ? "Tijdloze rode tinten voor elke gelegenheid" : "Timeless red shades for any occasion"
    },
    
    // Nail Art
    {
      id: 4,
      category: "nailArt",
      image: "https://images.unsplash.com/photo-1610992015732-2449b76344bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      title: currentLanguage === 'nl' ? "Bloemen Nail Art" : "Floral Nail Art",
      description: currentLanguage === 'nl' ? "Handgeschilderde bloemenpatronen" : "Hand-painted floral patterns"
    },
    {
      id: 5,
      category: "nailArt",
      image: "https://images.unsplash.com/photo-1594736797933-d0df8d6e5d8d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      title: currentLanguage === 'nl' ? "Geometrische Ontwerpen" : "Geometric Designs",
      description: currentLanguage === 'nl' ? "Moderne geometrische patronen" : "Modern geometric patterns"
    },
    {
      id: 6,
      category: "nailArt",
      image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      title: currentLanguage === 'nl' ? "Glitter & Rhinestones" : "Glitter & Rhinestones",
      description: currentLanguage === 'nl' ? "Luxe accenten voor speciale gelegenheden" : "Luxury accents for special occasions"
    },

    // Acrylic
    {
      id: 7,
      category: "acrylic",
      image: "https://images.unsplash.com/photo-1562904732-a5d6d57bb203?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      title: currentLanguage === 'nl' ? "Lange Acryl Extensions" : "Long Acrylic Extensions",
      description: currentLanguage === 'nl' ? "Dramatische lengtes met perfecte vorm" : "Dramatic lengths with perfect shape"
    },
    {
      id: 8,
      category: "acrylic",
      image: "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      title: currentLanguage === 'nl' ? "Natuurlijke Acryl Look" : "Natural Acrylic Look",
      description: currentLanguage === 'nl' ? "Subtiele verlenging voor dagelijks gebruik" : "Subtle extension for daily wear"
    },

    // BIAB
    {
      id: 9,
      category: "biab",
      image: "https://images.unsplash.com/photo-1560869713-bf17eeb44aca?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      title: currentLanguage === 'nl' ? "BIAB Natural Look" : "BIAB Natural Look",
      description: currentLanguage === 'nl' ? "Versterkende behandeling voor natuurlijke nagels" : "Strengthening treatment for natural nails"
    },
    {
      id: 10,
      category: "biab",
      image: "https://images.unsplash.com/photo-1513594736602-b21ab73eba6a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      title: currentLanguage === 'nl' ? "BIAB met Kleur" : "BIAB with Color",
      description: currentLanguage === 'nl' ? "Gekleurde BIAB voor extra glamour" : "Colored BIAB for extra glamour"
    },

    // Pedicure
    {
      id: 11,
      category: "pedicure",
      image: "https://images.unsplash.com/photo-1595187729633-5ee2d3604e59?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      title: currentLanguage === 'nl' ? "Luxe Pedicure" : "Luxury Pedicure",
      description: currentLanguage === 'nl' ? "Complete voetverzorging met perfecte afwerking" : "Complete foot care with perfect finish"
    },
    {
      id: 12,
      category: "pedicure",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      title: currentLanguage === 'nl' ? "Zomer Pedicure" : "Summer Pedicure",
      description: currentLanguage === 'nl' ? "Frisse kleuren voor de zomermaanden" : "Fresh colors for summer months"
    },

    // Special
    {
      id: 13,
      category: "special",
      image: "https://images.unsplash.com/photo-1600334129128-685c5582fd35?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      title: currentLanguage === 'nl' ? "Bruiloft Nagels" : "Wedding Nails",
      description: currentLanguage === 'nl' ? "Elegante ontwerpen voor jullie speciale dag" : "Elegant designs for your special day"
    },
    {
      id: 14,
      category: "special",
      image: "https://images.unsplash.com/photo-1609205883892-98a9de7ae739?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      title: currentLanguage === 'nl' ? "Feestelijke Ontwerpen" : "Festive Designs",
      description: currentLanguage === 'nl' ? "Perfect voor feesten en speciale gelegenheden" : "Perfect for parties and special occasions"
    },
    {
      id: 15,
      category: "special",
      image: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      title: currentLanguage === 'nl' ? "Chrome Effect" : "Chrome Effect",
      description: currentLanguage === 'nl' ? "Futuristische chromen afwerking" : "Futuristic chrome finish"
    }
  ];

  const filteredItems = activeFilter === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeFilter);

  const filters = [
    { key: 'all', label: t.filters.all },
    { key: 'gellac', label: t.filters.gellac },
    { key: 'nailArt', label: t.filters.nailArt },
    { key: 'acrylic', label: t.filters.acrylic },
    { key: 'biab', label: t.filters.biab },
    { key: 'pedicure', label: t.filters.pedicure },
    { key: 'special', label: t.filters.special }
  ];

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
              <Link href="/products">
                <button className="text-beige-700 dark:text-beige-300 hover:text-beige-500 dark:hover:text-beige-400 font-medium transition-colors duration-200">
                  {t.nav.products}
                </button>
              </Link>
              <Link href="/gallery">
                <button className="text-beige-500 dark:text-beige-400 font-semibold transition-colors duration-200 border-b-2 border-beige-500">
                  {t.nav.gallery}
                </button>
              </Link>
              <button 
                onClick={() => scrollToSection('pricing')}
                className="text-beige-700 dark:text-beige-300 hover:text-beige-500 dark:hover:text-beige-400 font-medium transition-colors duration-200"
              >
                {t.nav.pricing}
              </button>
              <Link href="/pricelist">
                <button className="text-beige-700 dark:text-beige-300 hover:text-beige-500 dark:hover:text-beige-400 font-medium transition-colors duration-200">
                  {t.nav.pricelist}
                </button>
              </Link>
              <button 
                onClick={() => scrollToSection('contact')}
                className="text-beige-700 dark:text-beige-300 hover:text-beige-500 dark:hover:text-beige-400 font-medium transition-colors duration-200"
              >
                {t.nav.contact}
              </button>
              
              <Button 
                onClick={() => scrollToSection('contact')}
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
                <Link href="/products">
                  <button 
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-beige-700 dark:text-beige-300 hover:text-beige-500 dark:hover:text-beige-400 font-medium text-left transition-colors duration-200"
                  >
                    {t.nav.products}
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
                <button 
                  onClick={() => scrollToSection('pricing')}
                  className="text-beige-700 dark:text-beige-300 hover:text-beige-500 dark:hover:text-beige-400 font-medium text-left transition-colors duration-200"
                >
                  {t.nav.pricing}
                </button>
                <Link href="/pricelist">
                  <button 
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-beige-700 dark:text-beige-300 hover:text-beige-500 dark:hover:text-beige-400 font-medium text-left transition-colors duration-200"
                  >
                    {t.nav.pricelist}
                  </button>
                </Link>
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="text-beige-700 dark:text-beige-300 hover:text-beige-500 dark:hover:text-beige-400 font-medium text-left transition-colors duration-200"
                >
                  {t.nav.contact}
                </button>
                
                <Button 
                  onClick={() => scrollToSection('contact')}
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

      {/* Filter Section */}
      <section className="py-8 bg-beige-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-center mb-6">
            <Filter className="w-5 h-5 text-beige-600 mr-2" />
            <span className="text-lg font-semibold text-beige-800 dark:text-beige-200">
              {currentLanguage === 'nl' ? 'Filter op Categorie' : 'Filter by Category'}
            </span>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {filters.map((filter) => (
              <button
                key={filter.key}
                onClick={() => setActiveFilter(filter.key)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-200 hover:scale-105 ${
                  activeFilter === filter.key
                    ? 'bg-beige-500 text-white shadow-md'
                    : 'bg-white text-beige-700 border border-beige-300 hover:bg-beige-100'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <Card key={item.id} className="group overflow-hidden border-none shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105">
                <div className="relative">
                  <img 
                    src={item.image}
                    alt={item.title}
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-white font-bold text-lg mb-2">{item.title}</h3>
                      <p className="text-white/90 text-sm">{item.description}</p>
                    </div>
                  </div>
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button size="sm" className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-white/30">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="absolute top-3 left-3">
                    <Badge className="bg-beige-500/90 text-white">
                      {t.filters[item.category as keyof typeof t.filters]}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-beige-800 dark:text-beige-200 mb-2">{item.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">{item.description}</p>
                  <div className="flex items-center justify-between mt-3">
                    <Button variant="outline" size="sm" className="text-beige-600 border-beige-300 hover:bg-beige-50">
                      <Heart className="w-4 h-4 mr-1" />
                      {currentLanguage === 'nl' ? 'Bewaren' : 'Save'}
                    </Button>
                    <Button size="sm" className="bg-beige-500 hover:bg-beige-600 text-white">
                      <Sparkles className="w-4 h-4 mr-1" />
                      {currentLanguage === 'nl' ? 'Boek Nu' : 'Book Now'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
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
            <Button className="bg-gradient-to-r from-beige-500 to-beige-600 hover:from-beige-600 hover:to-beige-700 text-white px-12 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:scale-105 shadow-xl">
              <Sparkles className="w-5 h-5 mr-2" />
              {currentLanguage === 'nl' ? 'AFSPRAAK MAKEN' : 'BOOK APPOINTMENT'}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}; 