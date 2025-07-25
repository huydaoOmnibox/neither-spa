import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Menu, X, Sparkles, Star, Heart, CheckCircle } from "lucide-react";
import { Link } from "wouter";
import logoPath from "@assets/image_1752511415001.png";
import { useLanguage } from "@/contexts/LanguageContext";
import { NO_IMAGE } from "@/lib/constants";

export const Pricelist = (): JSX.Element => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { currentLanguage, setCurrentLanguage } = useLanguage();

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
        title: "PRIJSLIJST",
        subtitle: "Transparante prijzen voor alle nagelbehandelingen en diensten"
      },
      categories: {
        gellak: "Gellak",
        biab: "BIAB",
        pedicure: "Pedicure",
        gelBuilder: "Gel Builder",
        acrylic: "Acryl",
        other: "Overige"
      },
      services: {
        // Gellak
        gellakVoeten: "Gellak voeten",
        gellakHanden: "Gellak handen",
        gellakFrench: "Gellak French",
        gellakVerwijderen: "Gellak verwijderen",
        gellakVerwijderenOpnieuw: "Gellak verwijderen +opnieuw",
        gellakVerwijderenAndereSalon: "Gellak verwijderen andere salon+opnieuw",
        
        // BIAB
        biabNaturel: "Biab naturel",
        biabMetGellak: "Biab met Gellak",
        biabFrench: "Biab French",
        biabKortVerlenging: "Biab met kort verlenging",
        biabVerwijderen: "Biab verwijderen",
        biabVerwijderenOpnieuw: "Biab verwijderen+opnieuw",
        biabVerwijderenAndereSalon: "Biab verwijderen andere salon+opnieuw",
        
        // Pedicure
        signaturePedicureZonderKleur: "Signature pedicure zonder kleur",
        signaturePedicureMetKleur: "Signature pedicure met kleur",
        signaturePedicureMetFrench: "Signature pedicure met French",
        deluxePedicureZonderKleur: "Deluxe pedicure zonder kleur",
        deluxePedicureMetKleur: "Deluxe pedicure met kleur",
        deluxePedicureMetFrench: "Deluxe pedicure met French",
        
        // Gel Builder
        gelBuilderNaturel: "Gel builder naturel",
        gelBuilderMetGellak: "Gel builder met Gellak",
        gelBuilderFrench: "Gel builder French",
        gelBuilderOpvullen: "Gel builder opvullen",
        gelBuilderMetGellakOpvullen: "Gel builder met Gellak opvullen",
        gelBuilderMetFrenchOpvullen: "Gel builder met French opvullen",
        gelBuilderAfhalen: "Gel builder afhalen",
        gelBuilderAfhalenAndereSalon: "Gel builder afhalen andere salon",
        gelBuilderAfhalenOpnieuw: "Gel builder afhalen+opnieuw",
        
        // Acrylic
        acrylNaturel: "Acryl naturel",
        acrylRozePoeder: "Acryl roze poeder",
        acrylMetGellak: "Acryl met Gellak",
        acrylMetFrench: "Acryl met French",
        opvullenNaturel: "Opvullen naturel",
        opvullenRozePoeder: "Opvullen roze poeder",
        opvullenMetGellak: "Opvullen met Gellak",
        opvullenMetFrench: "Opvullen met French",
        acrylAfhalen: "Acryl afhalen",
        acrylAfhalenAnderSalon: "Acryl afhalen andersalon",
        acrylAfhalenOpnieuw: "Acryl afhalen+opnieuw",
        acrylAfhalenAndereSalonOpnieuw: "Acryl afhalen andere salon+opnieuw",
        
        // Other
        steentje: "Steentje",
        vanaf2Kleuren: "Vanaf 2 kleuren",
        nagelReparatie: "Nagel reparatie",
        nailFoil: "Nail foil",
        glitterDoorlopen: "Glitter doorlopen",
        nailArt: "Nail art",
        catEye: "Cat eye",
        chrome: "Chrome",
        langeNagelVerlengen: "Lange nagel verlengen",
        nagelKnippen: "Nagel knippen",
        manicureAlleen: "Manicure alleen",
        gellakAfhalenManicure: "Gellak afhalen+Manicure",
        biabAfhalenManicure: "Biab afhalen+Manicure",
        acrylAfhalenManicure: "Acryl afhalen+Manicure",
        manicureNewset: "Manicure+newset",
        babyboom: "Babyboom"
      },
      detailedServices: {
        nailCare: {
          title: "Nagelzorg",
          subtitle: "Professionele verzorging voor natuurlijke nagels",
          description: "Uitgebreide nagelzorg met focus op de gezondheid en schoonheid van uw natuurlijke nagels. Van basis manicure tot gellak behandelingen, wij zorgen voor het beste resultaat.",
          features: [
            "Professionele manicure behandelingen",
            "Gellak applicaties",
            "Nagelversterking",
            "Nagelriem verzorging",
            "Handverzorging en massage"
          ]
        },
        footCare: {
          title: "Voetverzorging",
          subtitle: "Complete pedicure en voetverzorging",
          description: "Uitgebreide voetverzorging voor gezonde en verzorgde voeten. Onze pedicure behandelingen combineren professionele zorg met ontspanning.",
          features: [
            "Professionele pedicure",
            "Eeltverwijdering",
            "Voetmassage",
            "Nagelverzorging",
            "Gellak voor teennagels"
          ]
        },
        acrylGel: {
          title: "Acryl/Gel",
          subtitle: "Kunstnagels en verlengingen",
          description: "Professionele kunstnagels met acryl of gel systemen. Perfect voor sterke, duurzame en natuurlijk ogende nagels met de gewenste lengte en vorm.",
          features: [
            "Nieuwe sets acryl of gel",
            "Navullingen",
            "French manicure optie",
            "Natuurlijke look mogelijk",
            "Reparaties en onderhoud"
          ]
        },
        biab: {
          title: "BIAB",
          subtitle: "Builder In A Bottle techniek",
          description: "BIAB is de perfecte oplossing voor natuurlijke nagelversterking. Deze innovatieve techniek biedt bescherming en versteviging zonder de natuurlijke nagel te beschadigen.",
          features: [
            "Natuurlijke versterking",
            "Duurzame bescherming",
            "Flexibel en sterk",
            "Ideaal voor zwakke nagels",
            "Makkelijk te onderhouden"
          ]
        },
        nailArt: {
          title: "Nagelkunst",
          subtitle: "Creatieve en unieke designs",
          description: "Laat uw nagels spreken met onze artistieke nagelkunst. Van subtiele accenten tot uitgebreide designs, wij maken uw nagelkunst wensen werkelijkheid.",
          features: [
            "Hand-geschilderde designs",
            "Swarovski kristallen",
            "Chrome en glitter effecten",
            "Seizoensgebonden designs",
            "Gepersonaliseerde artwork"
          ]
        }
      },
      cta: {
        title: "Klaar om een Afspraak te Maken?",
        description: "Boek vandaag nog en ervaar onze professionele nagelbehandelingen met transparante prijzen.",
        bookAppointment: "AFSPRAAK MAKEN"
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
        title: "PRICE LIST",
        subtitle: "Transparent pricing for all nail treatments and services"
      },
      categories: {
        gellak: "Gel Polish",
        biab: "BIAB",
        pedicure: "Pedicure",
        gelBuilder: "Gel Builder",
        acrylic: "Acrylic",
        other: "Other Services"
      },
      services: {
        // Gel Polish
        gellakVoeten: "Gel polish feet",
        gellakHanden: "Gel polish hands",
        gellakFrench: "Gel polish French",
        gellakVerwijderen: "Gel polish removal",
        gellakVerwijderenOpnieuw: "Gel polish removal +reapplication",
        gellakVerwijderenAndereSalon: "Gel polish removal other salon+reapplication",
        
        // BIAB
        biabNaturel: "BIAB natural",
        biabMetGellak: "BIAB with gel polish",
        biabFrench: "BIAB French",
        biabKortVerlenging: "BIAB with short extension",
        biabVerwijderen: "BIAB removal",
        biabVerwijderenOpnieuw: "BIAB removal+reapplication",
        biabVerwijderenAndereSalon: "BIAB removal other salon+reapplication",
        
        // Pedicure
        signaturePedicureZonderKleur: "Signature pedicure without color",
        signaturePedicureMetKleur: "Signature pedicure with color",
        signaturePedicureMetFrench: "Signature pedicure with French",
        deluxePedicureZonderKleur: "Deluxe pedicure without color",
        deluxePedicureMetKleur: "Deluxe pedicure with color",
        deluxePedicureMetFrench: "Deluxe pedicure with French",
        
        // Gel Builder
        gelBuilderNaturel: "Gel builder natural",
        gelBuilderMetGellak: "Gel builder with gel polish",
        gelBuilderFrench: "Gel builder French",
        gelBuilderOpvullen: "Gel builder infill",
        gelBuilderMetGellakOpvullen: "Gel builder with gel polish infill",
        gelBuilderMetFrenchOpvullen: "Gel builder with French infill",
        gelBuilderAfhalen: "Gel builder removal",
        gelBuilderAfhalenAndereSalon: "Gel builder removal other salon",
        gelBuilderAfhalenOpnieuw: "Gel builder removal+reapplication",
        
        // Acrylic
        acrylNaturel: "Acrylic natural",
        acrylRozePoeder: "Acrylic pink powder",
        acrylMetGellak: "Acrylic with gel polish",
        acrylMetFrench: "Acrylic with French",
        opvullenNaturel: "Infill natural",
        opvullenRozePoeder: "Infill pink powder",
        opvullenMetGellak: "Infill with gel polish",
        opvullenMetFrench: "Infill with French",
        acrylAfhalen: "Acrylic removal",
        acrylAfhalenAnderSalon: "Acrylic removal other salon",
        acrylAfhalenOpnieuw: "Acrylic removal+reapplication",
        acrylAfhalenAndereSalonOpnieuw: "Acrylic removal other salon+reapplication",
        
        // Other
        steentje: "Rhinestone",
        vanaf2Kleuren: "From 2 colors",
        nagelReparatie: "Nail repair",
        nailFoil: "Nail foil",
        glitterDoorlopen: "Glitter fade",
        nailArt: "Nail art",
        catEye: "Cat eye",
        chrome: "Chrome",
        langeNagelVerlengen: "Long nail extension",
        nagelKnippen: "Nail trimming",
        manicureAlleen: "Manicure only",
        gellakAfhalenManicure: "Gel polish removal+Manicure",
        biabAfhalenManicure: "BIAB removal+Manicure",
        acrylAfhalenManicure: "Acrylic removal+Manicure",
        manicureNewset: "Manicure+new set",
        babyboom: "Baby boom"
      },
      detailedServices: {
        nailCare: {
          title: "Nail Care",
          subtitle: "Professional care for natural nails",
          description: "Comprehensive nail care focusing on the health and beauty of your natural nails. From basic manicures to gel polish treatments, we ensure the best results.",
          features: [
            "Professional manicure treatments",
            "Gel polish applications",
            "Nail strengthening",
            "Cuticle care",
            "Hand care and massage"
          ]
        },
        footCare: {
          title: "Foot Care",
          subtitle: "Complete pedicure and foot care",
          description: "Comprehensive foot care for healthy and well-maintained feet. Our pedicure treatments combine professional care with relaxation.",
          features: [
            "Professional pedicure",
            "Callus removal",
            "Foot massage",
            "Nail care",
            "Gel polish for toenails"
          ]
        },
        acrylGel: {
          title: "Acrylic/Gel",
          subtitle: "Artificial nails and extensions",
          description: "Professional artificial nails with acrylic or gel systems. Perfect for strong, durable, and natural-looking nails with desired length and shape.",
          features: [
            "New sets acrylic or gel",
            "Refills",
            "French manicure option",
            "Natural look available",
            "Repairs and maintenance"
          ]
        },
        biab: {
          title: "BIAB",
          subtitle: "Builder In A Bottle technique",
          description: "BIAB is the perfect solution for natural nail strengthening. This innovative technique provides protection and reinforcement without damaging the natural nail.",
          features: [
            "Natural strengthening",
            "Durable protection",
            "Flexible and strong",
            "Ideal for weak nails",
            "Easy to maintain"
          ]
        },
        nailArt: {
          title: "Nail Art",
          subtitle: "Creative and unique designs",
          description: "Let your nails speak with our artistic nail designs. From subtle accents to elaborate designs, we make your nail art dreams come true.",
          features: [
            "Hand-painted designs",
            "Chrome and glitter effects",
            "Seasonal designs",
          ]
        }
      },
      cta: {
        title: "Ready to Book an Appointment?",
        description: "Book today and experience our professional nail treatments with transparent pricing.",
        bookAppointment: "BOOK APPOINTMENT"
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

  // Price data organized by category
  const priceData = {
    gellak: [
      { service: "gellakVoeten", price: "€30" },
      { service: "gellakHanden", price: "€35" },
      { service: "gellakFrench", price: "€45" },
      { service: "gellakVerwijderen", price: "€15" },
      { service: "gellakVerwijderenOpnieuw", price: "+€5" },
      { service: "gellakVerwijderenAndereSalon", price: "+€8" }
    ],
    biab: [
      { service: "biabNaturel", price: "€50" },
      { service: "biabMetGellak", price: "€60" },
      { service: "biabFrench", price: "€65" },
      { service: "biabKortVerlenging", price: "+€10" },
      { service: "biabVerwijderen", price: "€20" },
      { service: "biabVerwijderenOpnieuw", price: "+€5" },
      { service: "biabVerwijderenAndereSalon", price: "+€8" }
    ],
    pedicure: [
      { service: "signaturePedicureZonderKleur", price: "€45" },
      { service: "signaturePedicureMetKleur", price: "€60" },
      { service: "signaturePedicureMetFrench", price: "€70" },
      { service: "deluxePedicureZonderKleur", price: "€60" },
      { service: "deluxePedicureMetKleur", price: "€75" },
      { service: "deluxePedicureMetFrench", price: "€85" }
    ],
    gelBuilder: [
      { service: "gelBuilderNaturel", price: "€55" },
      { service: "gelBuilderMetGellak", price: "€60" },
      { service: "gelBuilderFrench", price: "€70" },
      { service: "gelBuilderOpvullen", price: "€45" },
      { service: "gelBuilderMetGellakOpvullen", price: "€55" },
      { service: "gelBuilderMetFrenchOpvullen", price: "€65" },
      { service: "gelBuilderAfhalen", price: "€20" },
      { service: "gelBuilderAfhalenAndereSalon", price: "€25" },
      { service: "gelBuilderAfhalenOpnieuw", price: "+€8" }
    ],
    acrylic: [
      { service: "acrylNaturel", price: "€50" },
      { service: "acrylRozePoeder", price: "€55" },
      { service: "acrylMetGellak", price: "€60" },
      { service: "acrylMetFrench", price: "€70" },
      { service: "opvullenNaturel", price: "€45" },
      { service: "opvullenRozePoeder", price: "€50" },
      { service: "opvullenMetGellak", price: "€55" },
      { service: "opvullenMetFrench", price: "€65" },
      { service: "acrylAfhalen", price: "€25" },
      { service: "acrylAfhalenAnderSalon", price: "€30" },
      { service: "acrylAfhalenOpnieuw", price: "+€8" },
      { service: "acrylAfhalenAndereSalonOpnieuw", price: "+€10" }
    ],
    other: [
      { service: "steentje", price: "€1" },
      { service: "vanaf2Kleuren", price: "€5" },
      { service: "nagelReparatie", price: "€5" },
      { service: "nailFoil", price: "€2,5/nagel" },
      { service: "glitterDoorlopen", price: "€2,5/nagel" },
      { service: "nailArt", price: "€5/nagel" },
      { service: "catEye", price: "€10" },
      { service: "chrome", price: "€10" },
      { service: "langeNagelVerlengen", price: "€10" },
      { service: "nagelKnippen", price: "€10" },
      { service: "manicureAlleen", price: "€25" },
      { service: "gellakAfhalenManicure", price: "€30" },
      { service: "biabAfhalenManicure", price: "€35" },
      { service: "acrylAfhalenManicure", price: "€40" },
      { service: "manicureNewset", price: "+€15" },
      { service: "babyboom", price: "€15" }
    ]
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
                <button className="text-beige-500 dark:text-beige-400 font-semibold transition-colors duration-200 border-b-2 border-beige-500">
                  {t.nav.pricelist}
                </button>
              </Link>
              <Link href="/gallery">
                <button className="text-beige-700 dark:text-beige-300 hover:text-beige-500 dark:hover:text-beige-400 font-medium transition-colors duration-200">
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
                    className="text-beige-500 dark:text-beige-400 font-semibold text-left transition-colors duration-200"
                  >
                    {t.nav.pricelist}
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

      {/* Price List Content */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Gellak */}
            <Card className="bg-gradient-to-br from-beige-50 to-beige-100 dark:from-gray-800 dark:to-gray-700 border-none shadow-xl hover:shadow-2xl transition-all duration-300">
              <CardHeader className="bg-gradient-to-r from-beige-500 to-beige-600 text-white rounded-t-xl">
                <CardTitle className="text-2xl font-bold text-center flex items-center justify-center gap-2">
                  <Sparkles className="w-6 h-6" />
                  {t.categories.gellak}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-3">
                  {priceData.gellak.map((item, index) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b border-beige-200 dark:border-gray-600 last:border-b-0">
                      <span className="text-gray-700 dark:text-gray-300">{t.services[item.service as keyof typeof t.services]}</span>
                      <Badge className="bg-beige-500 text-white font-semibold">{item.price}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* BIAB */}
            <Card className="bg-gradient-to-br from-beige-50 to-beige-100 dark:from-gray-800 dark:to-gray-700 border-none shadow-xl hover:shadow-2xl transition-all duration-300">
              <CardHeader className="bg-gradient-to-r from-beige-500 to-beige-600 text-white rounded-t-xl">
                <CardTitle className="text-2xl font-bold text-center flex items-center justify-center gap-2">
                  <Sparkles className="w-6 h-6" />
                  {t.categories.biab}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-3">
                  {priceData.biab.map((item, index) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b border-beige-200 dark:border-gray-600 last:border-b-0">
                      <span className="text-gray-700 dark:text-gray-300">{t.services[item.service as keyof typeof t.services]}</span>
                      <Badge className="bg-beige-500 text-white font-semibold">{item.price}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Pedicure */}
            <Card className="bg-gradient-to-br from-beige-50 to-beige-100 dark:from-gray-800 dark:to-gray-700 border-none shadow-xl hover:shadow-2xl transition-all duration-300">
              <CardHeader className="bg-gradient-to-r from-beige-500 to-beige-600 text-white rounded-t-xl">
                <CardTitle className="text-2xl font-bold text-center flex items-center justify-center gap-2">
                  <Sparkles className="w-6 h-6" />
                  {t.categories.pedicure}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-3">
                  {priceData.pedicure.map((item, index) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b border-beige-200 dark:border-gray-600 last:border-b-0">
                      <span className="text-gray-700 dark:text-gray-300">{t.services[item.service as keyof typeof t.services]}</span>
                      <Badge className="bg-beige-500 text-white font-semibold">{item.price}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Gel Builder */}
            <Card className="bg-gradient-to-br from-beige-50 to-beige-100 dark:from-gray-800 dark:to-gray-700 border-none shadow-xl hover:shadow-2xl transition-all duration-300">
              <CardHeader className="bg-gradient-to-r from-beige-500 to-beige-600 text-white rounded-t-xl">
                <CardTitle className="text-2xl font-bold text-center flex items-center justify-center gap-2">
                  <Sparkles className="w-6 h-6" />
                  {t.categories.gelBuilder}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-3">
                  {priceData.gelBuilder.map((item, index) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b border-beige-200 dark:border-gray-600 last:border-b-0">
                      <span className="text-gray-700 dark:text-gray-300">{t.services[item.service as keyof typeof t.services]}</span>
                      <Badge className="bg-beige-500 text-white font-semibold">{item.price}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Acrylic */}
            <Card className="bg-gradient-to-br from-beige-50 to-beige-100 dark:from-gray-800 dark:to-gray-700 border-none shadow-xl hover:shadow-2xl transition-all duration-300">
              <CardHeader className="bg-gradient-to-r from-beige-500 to-beige-600 text-white rounded-t-xl">
                <CardTitle className="text-2xl font-bold text-center flex items-center justify-center gap-2">
                  <Sparkles className="w-6 h-6" />
                  {t.categories.acrylic}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-3">
                  {priceData.acrylic.map((item, index) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b border-beige-200 dark:border-gray-600 last:border-b-0">
                      <span className="text-gray-700 dark:text-gray-300">{t.services[item.service as keyof typeof t.services]}</span>
                      <Badge className="bg-beige-500 text-white font-semibold">{item.price}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Other Services */}
            <Card className="bg-gradient-to-br from-beige-50 to-beige-100 dark:from-gray-800 dark:to-gray-700 border-none shadow-xl hover:shadow-2xl transition-all duration-300">
              <CardHeader className="bg-gradient-to-r from-beige-500 to-beige-600 text-white rounded-t-xl">
                <CardTitle className="text-2xl font-bold text-center flex items-center justify-center gap-2">
                  <Sparkles className="w-6 h-6" />
                  {t.categories.other}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-3">
                  {priceData.other.map((item, index) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b border-beige-200 dark:border-gray-600 last:border-b-0">
                      <span className="text-gray-700 dark:text-gray-300">{t.services[item.service as keyof typeof t.services]}</span>
                      <Badge className="bg-beige-500 text-white font-semibold">{item.price}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

          </div>
        </div>
      </section>

      {/* Detailed Services Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-beige-800 dark:text-beige-200 mb-6">
              {currentLanguage === 'nl' ? 'ONZE DIENSTEN' : 'OUR SERVICES'}
            </h2>
            <p className="text-xl text-beige-600 dark:text-beige-300 max-w-3xl mx-auto leading-relaxed">
              {currentLanguage === 'nl' 
                ? 'Ontdek onze premium nagel- en spa-diensten die zijn ontworpen om u te verwennen en uw natuurlijke schoonheid te versterken.'
                : 'Discover our premium nail and spa services designed to pamper you and enhance your natural beauty.'
              }
            </p>
          </div>
          
          <div className="space-y-16">
            {/* Premium Nail Care */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="relative group">
                <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                  <img 
                    src={NO_IMAGE}
                    alt="Premium Nail Care"
                    className="w-full h-96 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute top-6 left-6">
                    <Badge className="bg-beige-500 text-white px-4 py-2 text-sm font-semibold">
                      <Star className="w-4 h-4 mr-1" />
                      Most Popular
                    </Badge>
                  </div>
                  <div className="absolute bottom-6 left-6 text-white">
                    <div className="flex items-center gap-4 mb-2">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm"></span> 
                      </div>
                      <div className="text-2xl font-bold"></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-4xl font-bold text-beige-800 dark:text-beige-200 mb-2">
                    {t.detailedServices.nailCare.title}
                  </h3>
                  <p className="text-xl text-beige-600 dark:text-beige-300 font-medium mb-4">
                    {t.detailedServices.nailCare.subtitle}
                  </p>
                  <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                    {t.detailedServices.nailCare.description}
                  </p>
                </div>

                <div className="space-y-3">
                  <h4 className="text-xl font-semibold text-beige-800 dark:text-beige-200 flex items-center gap-2">
                    <Sparkles className="w-5 h-5" />
                    {currentLanguage === 'nl' ? "Wat is inbegrepen:" : "What's Included:"}
                  </h4>
                  <ul className="space-y-2">
                    {t.detailedServices.nailCare.features.map((feature, idx) => (
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
                    {currentLanguage === 'nl' ? 'Boek Deze Service' : 'Book This Service'}
                  </Button>
                </div>
              </div>
            </div>

            {/* Luxury Pedicure */}
            <div className="grid lg:grid-cols-2 gap-12 items-center lg:grid-flow-col-dense">
              <div className="relative group lg:col-start-2">
                <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                  <img 
                    src={NO_IMAGE}
                    alt="Luxury Pedicure"
                    className="w-full h-96 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-6 left-6 text-white">
                    <div className="flex items-center gap-4 mb-2">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm"></span>
                      </div>
                      <div className="text-2xl font-bold"></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6 lg:col-start-1 lg:row-start-1">
                <div>
                  <h3 className="text-4xl font-bold text-beige-800 dark:text-beige-200 mb-2">
                    {t.detailedServices.footCare.title}
                  </h3>
                  <p className="text-xl text-beige-600 dark:text-beige-300 font-medium mb-4">
                    {t.detailedServices.footCare.subtitle}
                  </p>
                  <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                    {t.detailedServices.footCare.description}
                  </p>
                </div>

                <div className="space-y-3">
                  <h4 className="text-xl font-semibold text-beige-800 dark:text-beige-200 flex items-center gap-2">
                    <Sparkles className="w-5 h-5" />
                    {currentLanguage === 'nl' ? "Wat is inbegrepen:" : "What's Included:"}
                  </h4>
                  <ul className="space-y-2">
                    {t.detailedServices.footCare.features.map((feature, idx) => (
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
                    {currentLanguage === 'nl' ? 'Boek Deze Service' : 'Book This Service'}
                  </Button>
                </div>
              </div>
            </div>

            {/* Eyelash Extensions */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="relative group">
                <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                  <img 
                    src={NO_IMAGE}
                    alt="Eyelash Extensions"
                    className="w-full h-96 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute top-6 left-6">
                    <Badge className="bg-beige-500 text-white px-4 py-2 text-sm font-semibold">
                      <Star className="w-4 h-4 mr-1" />
                      Popular
                    </Badge>
                  </div>
                  <div className="absolute bottom-6 left-6 text-white">
                    <div className="flex items-center gap-4 mb-2">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm"></span>
                      </div>
                      <div className="text-2xl font-bold"></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-4xl font-bold text-beige-800 dark:text-beige-200 mb-2">
                    {t.detailedServices.acrylGel.title}
                  </h3>
                  <p className="text-xl text-beige-600 dark:text-beige-300 font-medium mb-4">
                    {t.detailedServices.acrylGel.subtitle}
                  </p>
                  <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                    {t.detailedServices.acrylGel.description}
                  </p>
                </div>

                <div className="space-y-3">
                  <h4 className="text-xl font-semibold text-beige-800 dark:text-beige-200 flex items-center gap-2">
                    <Sparkles className="w-5 h-5" />
                    {currentLanguage === 'nl' ? "Wat is inbegrepen:" : "What's Included:"}
                  </h4>
                  <ul className="space-y-2">
                    {t.detailedServices.acrylGel.features.map((feature, idx) => (
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
                    {currentLanguage === 'nl' ? 'Boek Deze Service' : 'Book This Service'}
                  </Button>
                </div>
              </div>
            </div>

            {/* Professional Waxing */}
            <div className="grid lg:grid-cols-2 gap-12 items-center lg:grid-flow-col-dense">
              <div className="relative group lg:col-start-2">
                <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                  <img 
                    src={NO_IMAGE}
                    alt="Professional Waxing"
                    className="w-full h-96 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-6 left-6 text-white">
                    <div className="flex items-center gap-4 mb-2">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm"></span>
                      </div>
                      <div className="text-2xl font-bold"></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6 lg:col-start-1 lg:row-start-1">
                <div>
                  <h3 className="text-4xl font-bold text-beige-800 dark:text-beige-200 mb-2">
                    {t.detailedServices.biab.title}
                  </h3>
                  <p className="text-xl text-beige-600 dark:text-beige-300 font-medium mb-4">
                    {t.detailedServices.biab.subtitle}
                  </p>
                  <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                    {t.detailedServices.biab.description}
                  </p>
                </div>

                <div className="space-y-3">
                  <h4 className="text-xl font-semibold text-beige-800 dark:text-beige-200 flex items-center gap-2">
                    <Sparkles className="w-5 h-5" />
                    {currentLanguage === 'nl' ? "Wat is inbegrepen:" : "What's Included:"}
                  </h4>
                  <ul className="space-y-2">
                    {t.detailedServices.biab.features.map((feature, idx) => (
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
                    {currentLanguage === 'nl' ? 'Boek Deze Service' : 'Book This Service'}
                  </Button>
                </div>
              </div>
            </div>

            {/* Eyelash Extensions */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="relative group">
                <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                  <img 
                    src={NO_IMAGE}
                    alt="Eyelash Extensions"
                    className="w-full h-96 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute top-6 left-6">
                    <Badge className="bg-beige-500 text-white px-4 py-2 text-sm font-semibold">
                      <Star className="w-4 h-4 mr-1" />
                      Popular
                    </Badge>
                  </div>
                  <div className="absolute bottom-6 left-6 text-white">
                    <div className="flex items-center gap-4 mb-2">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm"></span>
                      </div>
                      <div className="text-2xl font-bold"></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-4xl font-bold text-beige-800 dark:text-beige-200 mb-2">
                    {t.detailedServices.nailArt.title}
                  </h3>
                  <p className="text-xl text-beige-600 dark:text-beige-300 font-medium mb-4">
                    {t.detailedServices.nailArt.subtitle}
                  </p>
                  <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                    {t.detailedServices.nailArt.description}
                  </p>
                </div>

                <div className="space-y-3">
                  <h4 className="text-xl font-semibold text-beige-800 dark:text-beige-200 flex items-center gap-2">
                    <Sparkles className="w-5 h-5" />
                    {currentLanguage === 'nl' ? "Wat is inbegrepen:" : "What's Included:"}
                  </h4>
                  <ul className="space-y-2">
                    {t.detailedServices.nailArt.features.map((feature, idx) => (
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
                    {currentLanguage === 'nl' ? 'Boek Deze Service' : 'Book This Service'}
                  </Button>
                </div>
              </div>
            </div>
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
            <Button 
              onClick={() => window.open('https://wa.me/31628699827', '_blank')}
              className="bg-gradient-to-r from-beige-500 to-beige-600 hover:from-beige-600 hover:to-beige-700 text-white px-12 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:scale-105 shadow-xl"
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