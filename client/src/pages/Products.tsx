import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Star, Heart, Sparkles, CheckCircle, Menu, X } from "lucide-react";
import { Link } from "wouter";
import logoPath from "@assets/image_1752511415001.png";

export const Products = (): JSX.Element => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState<'nl' | 'en'>('nl');

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
        description: "Shop vandaag nog onze premium nagelzorgproducten en ervaar professionele kwaliteit thuis. Ontdek waarom professionals onze producten vertrouwen voor uitstekende resultaten.",
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
        description: "Shop our premium nail care products today and experience professional quality at home. Discover why professionals trust our products for excellent results.",
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



  const products = [
    {
      id: 1,
      title: t.products.gelPolishCollection.title,
      subtitle: t.products.gelPolishCollection.subtitle,
      image: "https://images.unsplash.com/photo-1632345031435-8727f6897d53?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      price: "€12 - €45",
      duration: "Professional Quality",
      description: t.products.gelPolishCollection.description,
      features: t.products.gelPolishCollection.features,
      popular: true
    },
    {
      id: 2,
      title: t.products.nailCareEssentials.title,
      subtitle: t.products.nailCareEssentials.subtitle,
      image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      price: "€15 - €35",
      duration: "Complete Set",
      description: t.products.nailCareEssentials.description,
      features: t.products.nailCareEssentials.features,
      popular: false
    },
    {
      id: 3,
      title: t.products.acrylicSystem.title,
      subtitle: t.products.acrylicSystem.subtitle,
      image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      price: "€75 - €150",
      duration: "Professional Kit",
      description: t.products.acrylicSystem.description,
      features: t.products.acrylicSystem.features,
      popular: true
    },
    {
      id: 4,
      title: t.products.nailArtSupplies.title,
      subtitle: t.products.nailArtSupplies.subtitle,
      image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      price: "€5 - €25",
      duration: "Creative Tools",
      description: t.products.nailArtSupplies.description,
      features: t.products.nailArtSupplies.features,
      popular: false
    }
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

      {/* Products Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="space-y-16">
            {products.map((product, index) => (
              <div key={product.id} className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
                {/* Image */}
                <div className={`relative group ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                  <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                    <img 
                      src={product.image}
                      alt={product.title}
                      className="w-full h-96 object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    
                    {product.popular && (
                      <div className="absolute top-6 left-6">
                        <Badge className="bg-beige-500 text-white px-4 py-2 text-sm font-semibold">
                          <Star className="w-4 h-4 mr-1" />
                          Most Popular
                        </Badge>
                      </div>
                    )}
                    
                    <div className="absolute bottom-6 left-6 text-white">
                      <div className="flex items-center gap-4 mb-2">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span className="text-sm">{product.duration}</span>
                        </div>
                        <div className="text-2xl font-bold">{product.price}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className={`space-y-6 ${index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                  <div>
                    <h2 className="text-4xl font-bold text-beige-800 dark:text-beige-200 mb-2">
                      {product.title}
                    </h2>
                    <p className="text-xl text-beige-600 dark:text-beige-300 font-medium mb-4">
                      {product.subtitle}
                    </p>
                    <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-xl font-semibold text-beige-800 dark:text-beige-200 flex items-center gap-2">
                      <Sparkles className="w-5 h-5" />
                      {currentLanguage === 'nl' ? "Wat is inbegrepen:" : "What's Included:"}
                    </h3>
                    <ul className="space-y-2">
                      {product.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                          <CheckCircle className="w-5 h-5 text-beige-500 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 pt-6">
                    <Button className="bg-gradient-to-r from-beige-500 to-beige-600 hover:from-beige-600 hover:to-beige-700 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-lg">
                      <Heart className="w-4 h-4 mr-2" />
                      {currentLanguage === 'nl' ? 'Koop Dit Product' : 'Buy This Product'}
                    </Button>
                    <Button variant="outline" className="border-beige-400 text-beige-700 hover:bg-beige-50 dark:hover:bg-gray-700 px-8 py-3 rounded-full font-semibold">
                      {currentLanguage === 'nl' ? 'Meer Info' : 'Learn More'}
                    </Button>
                  </div>
                </div>
              </div>
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
              <Clock className="w-5 h-5 mr-2" />
              {t.cta.shopNow}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}; 