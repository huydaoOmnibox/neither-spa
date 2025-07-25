import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Menu, X, Heart, Eye, Sparkles, Filter } from "lucide-react";
import { Link } from "wouter";
import logoPath from "@assets/image_1752511415001.png";
import { useLanguage } from "@/contexts/LanguageContext";
import { NO_IMAGE } from "@/lib/constants";

export const Gallery = (): JSX.Element => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { currentLanguage, setCurrentLanguage } = useLanguage();
  const [activeFilter, setActiveFilter] = useState<string>('all');

  // Translation content
  const translations = {
    nl: {
      nav: {
        home: "Home",
        products: "Producten",
        gallery: "Galerij",
        pricing: "Prijzen",
        pricelist: "Prijslijst",
        contact: "Contact",
        bookNow: "AFSPRAAK MAKEN"
      },
      header: {
        title: "GALERIJ",
        subtitle: "Bekijk onze collectie van prachtige nagelkunst en inspirerende designs"
      },
      filters: {
        all: "Alles",
        gellac: "Gellak",
        nailart: "Nail Art",
        acrylic: "Acryl",
        biab: "BIAB",
        pedicure: "Pedicure",
        special: "Speciaal"
      }
    },
    en: {
      nav: {
        home: "Home",
        products: "Products",
        gallery: "Gallery",
        pricing: "Pricing",
        pricelist: "Price List",
        contact: "Contact",
        bookNow: "BOOK NOW"
      },
      header: {
        title: "GALLERY",
        subtitle: "Explore our collection of beautiful nail art and inspiring designs"
      },
      filters: {
        all: "All",
        gellac: "Gel Polish",
        nailart: "Nail Art",
        acrylic: "Acrylic",
        biab: "BIAB",
        pedicure: "Pedicure",
        special: "Special"
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

  // Gallery items data
  const galleryItems = [
    // Gel Polish
    {
      id: 1,
      category: "gellac",
      image: NO_IMAGE,
      title: currentLanguage === 'nl' ? "Elegante Franse Manicure" : "Elegant French Manicure",
      description: currentLanguage === 'nl' ? "Klassieke Franse stijl met perfecte witte tips" : "Classic French style with perfect white tips"
    },
    {
      id: 2,
      category: "gellac",
      image: NO_IMAGE,
      title: currentLanguage === 'nl' ? "Pastel Gellak Collectie" : "Pastel Gel Polish Collection",
      description: currentLanguage === 'nl' ? "Zachte pastelkleuren perfect voor de lente" : "Soft pastel colors perfect for spring"
    },
    {
      id: 3,
      category: "gellac",
      image: NO_IMAGE,
      title: currentLanguage === 'nl' ? "Rode Klassiekers" : "Red Classics",
      description: currentLanguage === 'nl' ? "Tijdloze rode tinten voor elke gelegenheid" : "Timeless red shades for any occasion"
    },
    // Nail Art
    {
      id: 4,
      category: "nailart",
      image: NO_IMAGE,
      title: currentLanguage === 'nl' ? "Glitter & Glamour" : "Glitter & Glamour",
      description: currentLanguage === 'nl' ? "Sprankelende designs met premium glitters" : "Sparkling designs with premium glitters"
    },
    {
      id: 5,
      category: "nailart",
      image: NO_IMAGE,
      title: currentLanguage === 'nl' ? "Bloemen Designs" : "Floral Designs",
      description: currentLanguage === 'nl' ? "Delicate bloemenpatronen met handgeschilderde details" : "Delicate floral patterns with hand-painted details"
    },
    {
      id: 6,
      category: "nailart",
      image: NO_IMAGE,
      title: currentLanguage === 'nl' ? "Geometrische Patronen" : "Geometric Patterns",
      description: currentLanguage === 'nl' ? "Moderne geometrische kunst voor een unieke look" : "Modern geometric art for a unique look"
    },
    // Acrylic
    {
      id: 7,
      category: "acrylic",
      image: NO_IMAGE,
      title: currentLanguage === 'nl' ? "Acryl Extensies" : "Acrylic Extensions",
      description: currentLanguage === 'nl' ? "Perfecte vorm en lengte met duurzame acryl" : "Perfect shape and length with durable acrylic"
    },
    {
      id: 8,
      category: "acrylic",
      image: NO_IMAGE,
      title: currentLanguage === 'nl' ? "Naturel Look" : "Natural Look",
      description: currentLanguage === 'nl' ? "Natuurlijk ogende acrylnagels" : "Natural-looking acrylic nails"
    },
    // BIAB
    {
      id: 9,
      category: "biab",
      image: NO_IMAGE,
      title: currentLanguage === 'nl' ? "BIAB Versterking" : "BIAB Strengthening",
      description: currentLanguage === 'nl' ? "Sterke en gezonde natuurlijke nagels" : "Strong and healthy natural nails"
    },
    {
      id: 10,
      category: "biab",
      image: NO_IMAGE,
      title: currentLanguage === 'nl' ? "BIAB French" : "BIAB French",
      description: currentLanguage === 'nl' ? "Franse manicure met BIAB techniek" : "French manicure with BIAB technique"
    },
    // Pedicure
    {
      id: 11,
      category: "pedicure",
      image: NO_IMAGE,
      title: currentLanguage === 'nl' ? "Spa Pedicure" : "Spa Pedicure",
      description: currentLanguage === 'nl' ? "Luxe voetverzorging met gellak" : "Luxury foot care with gel polish"
    },
    {
      id: 12,
      category: "pedicure",
      image: NO_IMAGE,
      title: currentLanguage === 'nl' ? "Medische Pedicure" : "Medical Pedicure",
      description: currentLanguage === 'nl' ? "Professionele voetverzorging voor probleemvoeten" : "Professional foot care for problem feet"
    },
    // Special
    {
      id: 13,
      category: "special",
      image: NO_IMAGE,
      title: currentLanguage === 'nl' ? "Bruidsnagels" : "Bridal Nails",
      description: currentLanguage === 'nl' ? "Speciale designs voor je grote dag" : "Special designs for your big day"
    },
    {
      id: 14,
      category: "special",
      image: NO_IMAGE,
      title: currentLanguage === 'nl' ? "Feestdagen Collectie" : "Holiday Collection",
      description: currentLanguage === 'nl' ? "Feestelijke designs voor speciale gelegenheden" : "Festive designs for special occasions"
    },
    {
      id: 15,
      category: "special",
      image: NO_IMAGE,
      title: currentLanguage === 'nl' ? "Swarovski Kristallen" : "Swarovski Crystals",
      description: currentLanguage === 'nl' ? "Luxe designs met echte kristallen" : "Luxury designs with genuine crystals"
    }
  ];

  const filteredItems = activeFilter === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeFilter);

  const filters = [
    { key: 'all', label: t.filters.all },
    { key: 'gellac', label: t.filters.gellac },
    { key: 'nailart', label: t.filters.nailart },
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
              <Link href="/contact">
                <button className="text-beige-700 dark:text-beige-300 hover:text-beige-500 dark:hover:text-beige-400 font-medium transition-colors duration-200">
                  {t.nav.contact}
                </button>
              </Link>
              
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
                <Link href="/contact">
                  <button 
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-beige-700 dark:text-beige-300 hover:text-beige-500 dark:hover:text-beige-400 font-medium text-left transition-colors duration-200"
                  >
                    {t.nav.contact}
                  </button>
                </Link>
                
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