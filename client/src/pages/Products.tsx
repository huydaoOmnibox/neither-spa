import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Star, Heart, Sparkles, CheckCircle, Menu, X, ShoppingCart, Filter } from "lucide-react";
import { Link } from "wouter";
import logoPath from "@assets/image_1752511415001.png";

export const Products = (): JSX.Element => {
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
        title: "ONZE PRODUCTEN",
        subtitle: "Ontdek onze premium nagelzorgproducten die gebruikt worden in onze salon. Hoogwaardige producten voor professionele resultaten thuis of voor gebruik door professionals."
      },
      filters: {
        all: "Alles",
        gelPolish: "Gellak",
        nailCare: "Nagelzorg", 
        acrylicSystems: "Acryl Systemen",
        nailArt: "Nail Art",
        tools: "Tools",
        treatments: "Behandelingen"
      },
      products: {
        gelPolishCollection: {
          title: "Gellak Collectie",
          subtitle: "Langdurige Kleur & Glans",
          description: "Onze premium gellak collectie biedt langdurige kleur tot 3 weken. Professionele kwaliteit met UV/LED aushärting voor een perfecte finish die niet afbladdert of vervaagt.",
          features: [
            "Tot 3 weken lang houdbaar",
            "Meer dan 200 kleuren beschikbaar",
            "Geen beschadiging van natuurlijke nagel",
            "UV/LED lamp vereist",
            "Professionele salonkwaliteit"
          ]
        },
        nailCareEssentials: {
          title: "Nagelzorg Essentials",
          subtitle: "Dagelijkse Verzorging",
          description: "Complete verzorgingsset voor gezonde, sterke nagels. Inclusief nagelriemolie, versterkende behandeling en hydraterende handcrème voor optimale nagelgezondheid.",
          features: [
            "Nagelriemolie met vitamine E",
            "Versterkende nagelbehandeling",
            "Hydraterende handcrème",
            "Nagelvijl en buffer set",
            "Dagelijks gebruik aanbevolen"
          ]
        },
        acrylicSystem: {
          title: "Acryl Systeem",
          subtitle: "Professionele Nagelverlenging",
          description: "Complete acryl set voor prachtige, sterke nagelextensies. Bevat poeder, vloeistof en alle benodigdheden voor professionele acryl applicatie met langdurige resultaten.",
          features: [
            "Clear, pink en white acryl poeder",
            "Professionele monomeer vloeistof",
            "Tips in verschillende maten",
            "Vormen en vijlen inbegrepen",
            "Voor professionals en ervaren gebruikers"
          ]
        },
        nailArtSupplies: {
          title: "Nail Art Benodigdheden",
          subtitle: "Creatieve Nagelkunst",
          description: "Alles voor prachtige nail art creaties. Van glitters tot chrome poeders, rhinestones tot stickers - laat uw creativiteit de vrije loop met onze uitgebreide nail art collectie.",
          features: [
            "Glitters in alle kleuren",
            "Chrome en holographic poeders",
            "Rhinestones en decoraties",
            "Nail art penselen",
            "Transfer foils en stickers"
          ]
        }
      },
      cta: {
        title: "Klaar om te Bestellen?",
        description: "Shop vandaag nog onze premium nagelzorgproducten en ervaar professionele kwaliteit thuis. Gratis verzending bij bestellingen boven €50.",
        shopNow: "SHOP NU"
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
        title: "OUR PRODUCTS",
        subtitle: "Discover our premium nail care products used in our salon. High-quality products for professional results at home or for use by professionals."
      },
      filters: {
        all: "All",
        gelPolish: "Gel Polish",
        nailCare: "Nail Care",
        acrylicSystems: "Acrylic Systems", 
        nailArt: "Nail Art",
        tools: "Tools",
        treatments: "Treatments"
      },
      products: {
        gelPolishCollection: {
          title: "Gel Polish Collection",
          subtitle: "Long-Lasting Color & Shine",
          description: "Our premium gel polish collection offers long-lasting color up to 3 weeks. Professional quality with UV/LED curing for a perfect finish that won't chip or fade.",
          features: [
            "Lasts up to 3 weeks",
            "Over 200 colors available",
            "No damage to natural nail",
            "UV/LED lamp required",
            "Professional salon quality"
          ]
        },
        nailCareEssentials: {
          title: "Nail Care Essentials",
          subtitle: "Daily Care Routine",
          description: "Complete care set for healthy, strong nails. Includes cuticle oil, strengthening treatment and moisturizing hand cream for optimal nail health.",
          features: [
            "Cuticle oil with vitamin E",
            "Strengthening nail treatment",
            "Moisturizing hand cream",
            "File and buffer set",
            "Daily use recommended"
          ]
        },
        acrylicSystem: {
          title: "Acrylic System",
          subtitle: "Professional Nail Extensions",
          description: "Complete acrylic set for beautiful, strong nail extensions. Contains powder, liquid and all necessities for professional acrylic application with long-lasting results.",
          features: [
            "Clear, pink and white acrylic powder",
            "Professional monomer liquid",
            "Tips in various sizes",
            "Forms and files included",
            "For professionals and experienced users"
          ]
        },
        nailArtSupplies: {
          title: "Nail Art Supplies",
          subtitle: "Creative Nail Art",
          description: "Everything for beautiful nail art creations. From glitters to chrome powders, rhinestones to stickers - let your creativity run wild with our extensive nail art collection.",
          features: [
            "Glitters in all colors",
            "Chrome and holographic powders",
            "Rhinestones and decorations",
            "Nail art brushes",
            "Transfer foils and stickers"
          ]
        }
      },
      cta: {
        title: "Ready to Shop?",
        description: "Shop our premium nail care products today and experience professional quality at home. Free shipping on orders over €50.",
        shopNow: "SHOP NOW"
      }
    }
  };

  const t = translations[currentLanguage];

  const scrollToSection = (sectionId: string) => {
    if (sectionId === 'pricing') {
      // Navigate to home page and scroll to pricing section
      window.location.href = '/#pricing';
    } else if (sectionId === 'contact') {
      // Navigate to home page and scroll to contact section
      window.location.href = '/#contact';
    } else if (sectionId === 'home') {
      // Navigate to home page
      window.location.href = '/';
    }
    setMobileMenuOpen(false);
  };



  // Products organized by categories like the Gallery
  const products = [
    // Gel Polish Products
    {
      id: 1,
      category: "gelPolish",
      image: "https://images.unsplash.com/photo-1632345031435-8727f6897d53?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      title: currentLanguage === 'nl' ? "Premium Gellak Set" : "Premium Gel Polish Set",
      description: currentLanguage === 'nl' ? "Complete gellak collectie met 12 populaire kleuren" : "Complete gel polish collection with 12 popular colors",
      price: "€45.99",
      originalPrice: "€59.99",
      popular: true
    },
    {
      id: 2,
      category: "gelPolish",
      image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      title: currentLanguage === 'nl' ? "Rode Klassiekers" : "Red Classics",
      description: currentLanguage === 'nl' ? "5 tijdloze rode gellak kleuren" : "5 timeless red gel polish colors",
      price: "€24.99",
      originalPrice: "",
      popular: false
    },
    {
      id: 3,
      category: "gelPolish",
      image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      title: currentLanguage === 'nl' ? "Franse Manicure Kit" : "French Manicure Kit",
      description: currentLanguage === 'nl' ? "Professionele kit voor perfecte Franse manicure" : "Professional kit for perfect French manicure",
      price: "€18.99",
      originalPrice: "",
      popular: false
    },

    // Nail Care Products
    {
      id: 4,
      category: "nailCare",
      image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      title: currentLanguage === 'nl' ? "Nagelzorg Essentials" : "Nail Care Essentials",
      description: currentLanguage === 'nl' ? "Complete set met nagelriemolie, handcrème en versterkingsbehandeling" : "Complete set with cuticle oil, hand cream and strengthening treatment",
      price: "€32.99",
      originalPrice: "€39.99",
      popular: true
    },
    {
      id: 5,
      category: "nailCare",
      image: "https://images.unsplash.com/photo-1560869713-bf17eeb44aca?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      title: currentLanguage === 'nl' ? "Nagelriemolie Set" : "Cuticle Oil Set",
      description: currentLanguage === 'nl' ? "3 verschillende nagelriemoliën met vitamine E" : "3 different cuticle oils with vitamin E",
      price: "€16.99",
      originalPrice: "",
      popular: false
    },

    // Acrylic Systems
    {
      id: 6,
      category: "acrylicSystems",
      image: "https://images.unsplash.com/photo-1562904732-a5d6d57bb203?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      title: currentLanguage === 'nl' ? "Professioneel Acryl Systeem" : "Professional Acrylic System",
      description: currentLanguage === 'nl' ? "Complete acryl kit met poeder, vloeistof en tips" : "Complete acrylic kit with powder, liquid and tips",
      price: "€149.99",
      originalPrice: "€189.99",
      popular: true
    },
    {
      id: 7,
      category: "acrylicSystems",
      image: "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      title: currentLanguage === 'nl' ? "Acryl Starterskit" : "Acrylic Starter Kit",
      description: currentLanguage === 'nl' ? "Ideaal voor beginners in acryl nagelverlenging" : "Ideal for beginners in acrylic nail extensions",
      price: "€79.99",
      originalPrice: "",
      popular: false
    },

    // Nail Art
    {
      id: 8,
      category: "nailArt",
      image: "https://images.unsplash.com/photo-1610992015732-2449b76344bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      title: currentLanguage === 'nl' ? "Nail Art Mega Set" : "Nail Art Mega Set",
      description: currentLanguage === 'nl' ? "Grote collectie glitters, rhinestones en decoraties" : "Large collection of glitters, rhinestones and decorations",
      price: "€24.99",
      originalPrice: "€34.99",
      popular: true
    },
    {
      id: 9,
      category: "nailArt",
      image: "https://images.unsplash.com/photo-1594736797933-d0df8d6e5d8d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      title: currentLanguage === 'nl' ? "Chrome Poeders" : "Chrome Powders",
      description: currentLanguage === 'nl' ? "5 verschillende chrome poeders voor spiegeleffect" : "5 different chrome powders for mirror effect",
      price: "€12.99",
      originalPrice: "",
      popular: false
    },
    {
      id: 10,
      category: "nailArt",
      image: "https://images.unsplash.com/photo-1600334129128-685c5582fd35?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      title: currentLanguage === 'nl' ? "Transfer Foils Set" : "Transfer Foils Set",
      description: currentLanguage === 'nl' ? "20 verschillende transfer foils voor unieke ontwerpen" : "20 different transfer foils for unique designs",
      price: "€8.99",
      originalPrice: "",
      popular: false
    },

    // Tools
    {
      id: 11,
      category: "tools",
      image: "https://images.unsplash.com/photo-1513594736602-b21ab73eba6a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      title: currentLanguage === 'nl' ? "Professionele Nagelvijlen Set" : "Professional Nail Files Set",
      description: currentLanguage === 'nl' ? "10 verschillende nagelvijlen voor alle nageltypen" : "10 different nail files for all nail types",
      price: "€14.99",
      originalPrice: "",
      popular: false
    },
    {
      id: 12,
      category: "tools",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      title: currentLanguage === 'nl' ? "UV/LED Lamp" : "UV/LED Lamp",
      description: currentLanguage === 'nl' ? "36W professionele lamp voor perfecte uitharding" : "36W professional lamp for perfect curing",
      price: "€89.99",
      originalPrice: "€109.99",
      popular: true
    },

    // Treatments
    {
      id: 13,
      category: "treatments",
      image: "https://images.unsplash.com/photo-1595187729633-5ee2d3604e59?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      title: currentLanguage === 'nl' ? "BIAB Behandeling Kit" : "BIAB Treatment Kit",
      description: currentLanguage === 'nl' ? "Complete kit voor nagelversterking met BIAB techniek" : "Complete kit for nail strengthening with BIAB technique",
      price: "€67.99",
      originalPrice: "",
      popular: false
    },
    {
      id: 14,
      category: "treatments",
      image: "https://images.unsplash.com/photo-1609205883892-98a9de7ae739?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      title: currentLanguage === 'nl' ? "Nagelverharder Behandeling" : "Nail Hardener Treatment",
      description: currentLanguage === 'nl' ? "Intensieve kuur voor zwakke en breekbare nagels" : "Intensive treatment for weak and brittle nails",
      price: "€19.99",
      originalPrice: "",
      popular: false
    }
  ];

  const filteredProducts = activeFilter === 'all' 
    ? products 
    : products.filter(product => product.category === activeFilter);

  const filters = [
    { key: 'all', label: t.filters.all },
    { key: 'gelPolish', label: t.filters.gelPolish },
    { key: 'nailCare', label: t.filters.nailCare },
    { key: 'acrylicSystems', label: t.filters.acrylicSystems },
    { key: 'nailArt', label: t.filters.nailArt },
    { key: 'tools', label: t.filters.tools },
    { key: 'treatments', label: t.filters.treatments }
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
                <button className="text-beige-500 dark:text-beige-400 font-semibold transition-colors duration-200 border-b-2 border-beige-500">
                  {t.nav.products}
                </button>
              </Link>
              <Link href="/gallery">
                <button className="text-beige-700 dark:text-beige-300 hover:text-beige-500 dark:hover:text-beige-400 font-medium transition-colors duration-200">
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
                    className="text-beige-500 dark:text-beige-400 font-semibold text-left transition-colors duration-200"
                  >
                    {t.nav.products}
                  </button>
                </Link>
                <Link href="/gallery">
                  <button 
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-beige-700 dark:text-beige-300 hover:text-beige-500 dark:hover:text-beige-400 font-medium text-left transition-colors duration-200"
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

      {/* Products Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="group overflow-hidden border-none shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105">
                <div className="relative">
                  <img 
                    src={product.image}
                    alt={product.title}
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-white font-bold text-lg mb-2">{product.title}</h3>
                      <p className="text-white/90 text-sm">{product.description}</p>
                    </div>
                  </div>
                  
                  {product.popular && (
                    <div className="absolute top-3 left-3">
                      <Badge className="bg-beige-500 text-white px-3 py-1 text-xs font-semibold">
                        <Star className="w-3 h-3 mr-1" />
                        {currentLanguage === 'nl' ? 'Populair' : 'Popular'}
                      </Badge>
                    </div>
                  )}
                  
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-beige-500/90 text-white">
                      {t.filters[product.category as keyof typeof t.filters]}
                    </Badge>
                  </div>
                  
                  {/* Price Badge */}
                  <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1">
                    {product.originalPrice && (
                      <span className="text-xs text-gray-500 line-through mr-2">{product.originalPrice}</span>
                    )}
                    <span className="font-bold text-beige-600">{product.price}</span>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-beige-800 dark:text-beige-200 mb-2">{product.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-2">{product.description}</p>
                  
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      {product.originalPrice && (
                        <span className="text-sm text-gray-500 line-through mr-2">{product.originalPrice}</span>
                      )}
                      <span className="text-lg font-bold text-beige-600">{product.price}</span>
                    </div>
                    {product.originalPrice && (
                      <Badge className="bg-red-100 text-red-600 text-xs">
                        {currentLanguage === 'nl' ? 'Korting' : 'Sale'}
                      </Badge>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Button variant="outline" size="sm" className="text-beige-600 border-beige-300 hover:bg-beige-50">
                      <Heart className="w-4 h-4 mr-1" />
                      {currentLanguage === 'nl' ? 'Bewaren' : 'Save'}
                    </Button>
                    <Button size="sm" className="bg-beige-500 hover:bg-beige-600 text-white">
                      <ShoppingCart className="w-4 h-4 mr-1" />
                      {currentLanguage === 'nl' ? 'Kopen' : 'Buy'}
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
            {t.cta.title}
          </h2>
          <p className="text-xl text-beige-600 dark:text-beige-300 mb-8 leading-relaxed">
            {t.cta.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-gradient-to-r from-beige-500 to-beige-600 hover:from-beige-600 hover:to-beige-700 text-white px-12 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:scale-105 shadow-xl">
              <ShoppingCart className="w-5 h-5 mr-2" />
              {t.cta.shopNow}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}; 