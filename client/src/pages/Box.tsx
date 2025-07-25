import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Sparkles, Star, MapPin, Phone, Mail, Clock, Menu, X, CheckCircle, Instagram, Facebook } from "lucide-react";
import { Link } from "wouter";
import logoPath from "@assets/image_1752511415001.png";
import { useLanguage } from "@/contexts/LanguageContext";
import { NO_IMAGE } from "@/lib/constants";

export const Box = (): JSX.Element => {
  const [activeTab, setActiveTab] = useState<'services' | 'pricing'>('services');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
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
      hero: {
        title: "NAILS OF THE NETHERLANDS",
        subtitle: "Een moderne nagelsalon in Leeuwarden",
        description: "Kwaliteit – Prestige – Verantwoordelijkheid definiëren ons merk",
        bookAppointment: "AFSPRAAK MAKEN"
      },
             about: {
         title: "OVER ONS",
         description: "Welkom bij Nails of The Netherlands – Jouw nagelbestemming in het hart van Leeuwarden!\n\nGelegen in het bruisende stadscentrum van Leeuwarden, op slechts een paar stappen van McDonald's, ICI Paris en Kruidvat, biedt onze nagelsalon de perfecte combinatie van gemak, comfort en kwaliteit. Of je nu op zoek bent naar een snelle manicure, een ontspannende pedicure of een unieke nail art – ons proffesionele en vriendelijke team staat voor je klaar.\n\nHeb je moeite om een keuze te maken? Geen zorgen – ons ervaren team adviseert je graag!\n\nIn een moderne, schone omgeving met oog voor detail en hygiëne zorgen wij ervoor dat jij niet alleen prachtige nagels krijgt, maar ook een ontspannen en fijne ervaring beleeft.\n\nKom langs en laat je nagels stralen!",
         address: "Adres",
         addressValue: "Wirdumerdijk 29, 8911 CC Leeuwarden",
         hotline: "Telefoon",
         hotlineValue: "+31 62 869 9827",
         openingHours: "Openingstijden",
         openingHoursValue: "Maandag tot en met Zaterdag: 10.00 - 18.00",
         contactUs: "CONTACT OPNEMEN"
       },
      safety: {
        title: "JE BENT IN\nVEILIGE HANDEN",
        description1: "Onze gediplomeerde nageltechnici gebruiken alleen de hoogste kwaliteit, gesteriliseerde gereedschappen en hoogwaardig producten. Wij hanteren de strengste hygiënenormen om uw veiligheid en welzijn te waarborgen.",
        description2: "Van ons ziekenhuiswaardige sterilisatieproces tot onze milieuvriendelijke nagellakken, elk detail wordt zorgvuldig overwogen voor uw gezondheid en het milieu.",
        licensed: "Gediplomeerd & Gecertificeerd",
        licensedDesc: "Al onze technici zijn professioneel opgeleid en gecertificeerd",
        experience: "Jaar Ervaring"
      },
      lookbook: {
        title: "BEKIJK ONS LOOKBOOK",
        subtitle: "Ontdek de nieuwste nagelkunsttrends en klassieke elegantie in onze samengestelde collectie van prachtige nagelontwerpen.",
        artistic: "Artistieke Ontwerpen",
        artisticDesc: "Handbeschilderde nagelkunst meesterwerken",
        classic: "Klassieke Elegantie",
        classicDesc: "Tijdloze stijlen voor elke gelegenheid",
        seasonal: "Seizoenstrends",
        seasonalDesc: "Frisse looks voor elk seizoen",
        viewGallery: "BEKIJK VOLLEDIGE GALERIJ"
      },
      feelBetter: {
        title: "MOOI UITZIEN.\nBETER VOELEN.",
        description1: "Bij Nails of the Netherlands geloven we dat mooie nagels meer zijn dan alleen een esthetische keuze – het is een uitdrukking van zelfzorg en vertrouwen.",
        description2: "Onze behandelingen zijn ontworpen om niet alleen uw uiterlijk te verbeteren, maar ook om een moment van ontspanning en verjonging te bieden in uw drukke leven.",
        bookNow: "NU BOEKEN"
      },
      servicesSection: {
        title: "DIENSTEN & PRIJZEN",
        ourServices: "Onze Diensten",
        pricingPackages: "Prijzen & Pakketten",
        nailCare: "Nagelzorg",
        nailCareDesc: "Nieuwe modellering gel/acryl, manicure, nagelontwerp, Shellac",
        footCare: "Voetverzorging",
        footCareDesc: "Voeten reinigen, scrubben, teennagels lakken, ontspannende behandelingen",
        eyelashExtensions: "Wimperextensies",
        eyelashDesc: "Volume Lashes, Mega Volume Lashes, professionele applicatie",
        waxing: "Harsen",
        waxingDesc: "Professionele harsservices met warme was, zacht en effectief",
        newAcryl: "Nieuwe Acryl/Gel met kleur",
        newAcrylDesc: "Professionele applicatie",
        fillAcryl: "Bijvullen Acryl/Gel met kleur",
        fillAcrylDesc: "Onderhoudsservice",
        ombreFrench: "Ombre/Franse Ontwerp",
        ombreFrenchDesc: "Verloop & Franse tips",
        pedicureShellac: "Pedicure met Shellac",
        pedicureShellacDesc: "Complete voetbehandeling",
        manicureShellac: "Manicure met Shellac",
        manicureShellacDesc: "Handverzorging & lak",
        specialPackage: "Speciale Pakketdeal",
        specialDesc: "Krijg een volledige manicure + pedicure combo voor de beste waarde!",
        bookSave: "Boek Nu & Bespaar €20"
      },
      gallery: {
        title: "ONZE GALERIJ",
        creative: "Creatieve Ontwerpen",
        elegant: "Elegante Stijlen",
        modern: "Moderne Looks",
        vibrant: "Levendige Kleuren"
      },
      products: {
        title: "UITGELICHTE PRODUCTEN",
        nailPolish: "Nagellak",
        nailPolishDesc: "Premium Collectie",
        careTools: "Verzorgingstools",
        careToolsDesc: "Professionele Kit",
        gelPolish: "Gel Lak",
        gelPolishDesc: "Langdurige Glans",
        artSupplies: "Kunstbenodigdheden",
        artSuppliesDesc: "Creatieve Tools",
        booking: "BOEKING"
      },
      styledBy: {
        title: "GESTYLED DOOR ONS, GEDRAGEN DOOR JOU",
        subtitle: "Echte klanten, echte resultaten",
        tagUs: "Tag ons @nailsofthenetherlands om in beeld te komen!",
        followUs: "VOLG ONS",
        instagram: "Volg op Instagram",
        facebook: "Volg op Facebook"
      },
      testimonials: {
        title: "KLANTENFEEDBACK",
        testimonial1: "Fantastische service en prachtige nagels! Ik ben nog nooit zo blij geweest met de resultaten.",
        testimonial2: "De sfeer is zo kalmerend, en het personeel is absoluut professioneel. Zeer aanbevolen!",
        testimonial3: "Een perfecte ervaring! Mijn nagels zien er vlekkeloos uit, en het personeel was zo gastvrij.",
        testimonial4: "Elk detail was perfect. De kwaliteit van service hier is ongeëvenaard. Ik kom terug!",
        testimonial5: "Deze plek is geweldig! Mijn nagels hebben er nog nooit zo goed uitgezien, en het team is zo vriendelijk.",
        testimonial6: "Zo'n geweldige ervaring elke keer dat ik hier kom. Geweldige resultaten en fantastische service!"
      },
      footer: {
        title: "NAILS OF THE NETHERLANDS",
        description: "Premium nagelstudio in Leeuwarden die uitzonderlijke schoonheidsdiensten biedt met kwaliteit en prestige.",
                 contact: "Contact",
         openingHours: "Openingstijden",
         monday: "Maandag tot en met Zaterdag: 10.00 - 18.00",
         saturday: "",
         sunday: "Zondag: Gesloten",
         copyright: "© 2024 Nails of the Netherlands Leeuwarden. Alle rechten voorbehouden."
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
      hero: {
        title: "NAILS OF THE NETHERLANDS",
        subtitle: "A modern nail salon in Leeuwarden",
        description: "Quality - Prestige - Responsibility define our brand",
        bookAppointment: "BOOK APPOINTMENT"
      },
             about: {
         title: "ABOUT US",
         description: "Welcome to Nails of The Netherlands – Your Nail Destination in the Heart of Leeuwarden!\n\nLocated in the vibrant city center of Leeuwarden, just steps away from McDonald's, ICI Paris, and Kruidvat, our nail salon offers the perfect combination of convenience, comfort, and quality. Whether you're looking for a quick manicure, a relaxing pedicure, or a custom nail design – our professional and friendly team is here for you.\n\nHaving trouble making up your mind? No worries – our experienced team will be happy to advise you!\n\nWith a clean, modern space and strong attention to detail and hygiene, we're committed to giving you not only beautiful nails but also a relaxing and enjoyable experience.\n\nCome visit us and let your nails shine!",
         address: "Address",
         addressValue: "Wirdumerdijk 29, 8911 CC Leeuwarden",
         hotline: "Hotline",
         hotlineValue: "+31 62 869 9827",
         openingHours: "Opening Hours",
         openingHoursValue: "Monday to Saturday: 10.00 - 18.00",
         contactUs: "CONTACT US"
       },
      safety: {
        title: "YOU'RE IN\nSAFE HANDS",
        description1: "Our licensed nail technicians use only the highest quality, sterilized tools and premium products. We maintain the strictest hygiene standards to ensure your safety and well-being.",
        description2: "From our hospital-grade sterilization process to our eco-friendly nail polishes, every detail is carefully considered for your health and the environment.",
        licensed: "Licensed & Certified",
        licensedDesc: "All our technicians are professionally trained and certified",
        experience: ""
      },
      lookbook: {
        title: "VIEW OUR LOOKBOOK",
        subtitle: "Discover the latest nail art trends and classic elegance in our curated collection of stunning nail designs.",
        artistic: "<Title>",
        artisticDesc: "<Sub-Title>",
        classic: "<Title>",
        classicDesc: "<Sub-Title>",
        seasonal: "<Title>",
        seasonalDesc: "<Sub-Title>",
        viewGallery: "VIEW FULL GALLERY"
      },
      feelBetter: {
        title: "LOOK GOOD.\nFEEL BETTER.",
        description1: "At Nails of the Netherlands, we believe that beautiful nails are more than just an aesthetic choice – they're an expression of self-care and confidence.",
        description2: "Our treatments are designed not just to enhance your appearance, but to provide a moment of relaxation and rejuvenation in your busy life.",
        bookNow: "BOOK NOW"
      },
      servicesSection: {
        title: "SERVICES & PRICING",
        ourServices: "Our Services",
        pricingPackages: "Pricing & Packages",
        nailCare: "Nail Care",
        nailCareDesc: "New modelling gel/acrylic, manicure, nail design, Shellac",
        footCare: "Foot Care",
        footCareDesc: "Clean feet, exfoliate, paint toenails, relaxing treatments",
        eyelashExtensions: "Acrylic/Gel",
        eyelashDesc: "Artificial nails and extensions",
        waxing: "BIAB",
        waxingDesc: "Builder In A Bottle technique",
        newAcryl: "Gel polish feet",
        newAcrylDesc: "----",
        fillAcryl: "Gel polish hands",
        fillAcrylDesc: "----",
        ombreFrench: "Gel polish French",
        ombreFrenchDesc: "----",
        pedicureShellac: "Gel polish removal",
        pedicureShellacDesc: "----",
        manicureShellac: "Gel polish removal +reapplication",
        manicureShellacDesc: "----",
        specialPackage: "Special Package Deal",
        specialDesc: "Get a full manicure + pedicure combo for the best value!",
        bookSave: "Book Now & Save €"
      },
      gallery: {
        title: "OUR GALLERY",
        creative: "Title",
        elegant: "Title",
        modern: "Title",
        vibrant: "Title"
      },
      products: {
        title: "FEATURED PRODUCTS",
        nailPolish: "Title",
        nailPolishDesc: "Sub-Title",
        careTools: "Title",
        careToolsDesc: "Sub-Title",
        gelPolish: "Title",
        gelPolishDesc: "Sub-Title",
        artSupplies: "Title",
        artSuppliesDesc: "Sub-Title",
        booking: "BOOKING"
      },
      styledBy: {
        title: "STYLED BY US, WORN BY YOU",
        subtitle: "Real clients, real results",
        tagUs: "Tag us @nailsofthenetherlands to be featured!",
        followUs: "FOLLOW US",
        instagram: "Follow on Instagram",
        facebook: "Follow on Facebook"
      },
      testimonials: {
        title: "CUSTOMER FEEDBACK",
        testimonial1: "Fantastic service and beautiful nails! I've never been happier with the results.",
        testimonial2: "The ambiance is so calming, and the staff are absolute professionals. Highly recommended!",
        testimonial3: "A perfect experience! My nails look flawless, and the staff were so welcoming.",
        testimonial4: "Every detail was perfect. The quality of service here is unmatched. I'll be back!",
        testimonial5: "This place is amazing! My nails have never looked this good, and the team is so friendly.",
        testimonial6: "Such a wonderful experience every time I come here. Great results and fantastic service!"
      },
      footer: {
        title: "NAILS OF THE NETHERLANDS",
        description: "Premium nail salon in Leeuwarden providing exceptional beauty services with quality and prestige.",
                 contact: "Contact",
         openingHours: "Opening Hours",
         monday: "Monday to Saturday: 10.00 - 18.00",
         saturday: "",
         sunday: "Sunday: Closed",
         copyright: "© 2024 Nails of the Netherlands Leeuwarden. All rights reserved."
      }
    }
  };

  const t = translations[currentLanguage];

  // Hero images
  const heroImages = [
    NO_IMAGE,
    NO_IMAGE,
    NO_IMAGE,
    NO_IMAGE,
    NO_IMAGE
  ];

  // Auto-cycle through carousel images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [heroImages.length]);



  const scrollToSection = (sectionId: string) => {
    if (sectionId === 'pricing') {
      setActiveTab('pricing');
      const element = document.getElementById('services');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 relative overflow-hidden">
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
                    className="text-beige-700 dark:text-beige-300 hover:text-beige-500 dark:hover:text-beige-400 font-medium text-left transition-colors duration-200"
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

      {/* Hero Banner Section */}
      <section id="home" className="relative min-h-[600px] h-[calc(100vh-4rem)] flex items-center justify-center bg-gradient-to-br from-beige-100 via-beige-50 to-beige-200 dark:from-gray-800 dark:to-gray-900 overflow-hidden pt-16">
        {/* Carousel Background Images */}
        <div className="absolute inset-0">
          {heroImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === currentImageIndex ? 'opacity-20' : 'opacity-0'
              }`}
            >
              <img 
                src={image}
                alt={`Luxury nail spa background ${index + 1}`} 
            className="w-full h-full object-cover"
          />
            </div>
          ))}
        </div>
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/60"></div>
        {/* Floating decorative elements */}
        <div className="absolute inset-0 pointer-events-none">
          <Heart className="absolute top-[10%] left-[5%] text-beige-300 w-8 h-8 animate-float opacity-40" />
          <Sparkles className="absolute top-[20%] right-[10%] text-beige-400 w-6 h-6 animate-bounce-gentle opacity-50" />
          <Star className="absolute bottom-[30%] left-[10%] text-beige-300 w-5 h-5 animate-pulse-gentle opacity-30" />
          <Heart className="absolute bottom-[15%] right-[5%] text-beige-400 w-6 h-6 animate-float animation-delay-2000 opacity-40" />
        </div>
        
        <div className="text-center z-10 w-full max-w-4xl px-4 sm:px-6 py-8 sm:py-12">
          <div className="flex justify-center mb-6 sm:mb-8">
            <div className="relative">
              <img 
                src={logoPath} 
                alt="Nails of the Netherlands Leeuwarden Logo" 
                className="h-32 w-32 sm:h-40 sm:w-40 md:h-48 md:w-48 lg:h-56 lg:w-56 object-contain animate-pulse-gentle rounded-full border-4 border-beige-300 p-3 sm:p-4 md:p-5 bg-white shadow-2xl"
              />
              <div className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3">
                <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 md:w-9 md:h-9 text-beige-500 animate-bounce-gentle" />
              </div>
            </div>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white dark:text-white mb-4 sm:mb-5 animate-fade-in-up drop-shadow-2xl">
            {t.hero.title}
          </h1>
          
          <p className="text-xl sm:text-2xl text-beige-200 dark:text-beige-200 font-medium mb-4 sm:mb-6 animate-fade-in-up animation-delay-200 drop-shadow-lg">
            {t.hero.subtitle}
          </p>
          
          <p className="text-base sm:text-lg text-beige-100 dark:text-beige-100 mb-6 sm:mb-8 max-w-2xl mx-auto animate-fade-in-up animation-delay-400 drop-shadow-lg">
            {t.hero.description}
          </p>
          
          <Button 
            onClick={() => window.open('https://wa.me/31628699827', '_blank')}
            size="lg" 
            className="bg-gradient-to-r from-beige-500 to-beige-600 hover:from-beige-600 hover:to-beige-700 text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 px-6 sm:px-8 md:px-10 py-2 sm:py-3 text-base sm:text-lg rounded-full animate-fade-in-up animation-delay-400"
          >
            {t.hero.bookAppointment}
          </Button>
        </div>
        
        {/* Carousel Indicators */}
        <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 z-20">
          <div className="flex space-x-2 sm:space-x-3">
            {heroImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                  index === currentImageIndex 
                    ? 'bg-beige-300 scale-125' 
                    : 'bg-white/50 hover:bg-white/70'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="contact" className="py-20 bg-gradient-to-br from-beige-50 via-beige-100 to-beige-200 dark:from-gray-800 dark:to-gray-700 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-32 h-32 bg-beige-300 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
          <div className="absolute top-40 right-20 w-32 h-32 bg-beige-400 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-32 h-32 bg-beige-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
          <div className="absolute bottom-20 right-10 w-32 h-32 bg-beige-400 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-1000"></div>
        </div>
        
        {/* Floating Hearts */}
        <div className="absolute inset-0 pointer-events-none">
          <Heart className="absolute top-32 left-1/4 text-beige-200 w-6 h-6 animate-float opacity-20" />
          <Heart className="absolute top-20 right-1/3 text-beige-300 w-4 h-4 animate-bounce-gentle opacity-30" />
          <Sparkles className="absolute bottom-32 left-1/3 text-beige-200 w-5 h-5 animate-pulse-gentle opacity-25" />
          <Star className="absolute bottom-20 right-1/4 text-beige-200 w-6 h-6 animate-float animation-delay-1000 opacity-20" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="animate-fade-in-up">
              <h2 className="text-5xl font-bold text-beige-800 dark:text-beige-200 mb-8">{t.about.title}</h2>
              <p className="text-lg text-beige-700 dark:text-beige-300 mb-8 leading-relaxed">
                {t.about.description}
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-beige-500 rounded-full flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-beige-800 dark:text-beige-200">{t.about.address}</h3>
                    <p className="text-beige-600 dark:text-beige-400">{t.about.addressValue}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-beige-500 rounded-full flex items-center justify-center">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-beige-800 dark:text-beige-200">{t.about.hotline}</h3>
                    <p className="text-beige-600 dark:text-beige-400">{t.about.hotlineValue}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-beige-500 rounded-full flex items-center justify-center">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-beige-800 dark:text-beige-200">{t.about.openingHours}</h3>
                    <p className="text-beige-600 dark:text-beige-400">{t.about.openingHoursValue}</p>
                  </div>
                </div>
              </div>
              
              <Button 
                onClick={() => window.open('https://wa.me/31628699827', '_blank')}
                className="mt-8 bg-gradient-to-r from-beige-500 to-beige-600 hover:from-beige-600 hover:to-beige-700 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105"
              >
                {t.about.contactUs}
              </Button>
            </div>
            
            <div className="relative animate-fade-in-up animation-delay-200">
              <div className="w-full h-96 bg-gradient-to-br from-beige-200 to-beige-300 rounded-3xl shadow-2xl overflow-hidden">
                <img 
                  src={NO_IMAGE} 
                  alt="Elegant spa room with modern décor and relaxing ambiance" 
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Elegant overlay with spa room details */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-3xl"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-2xl font-bold mb-2 drop-shadow-lg">Title</h3>
                <p className="text-beige-100 drop-shadow-md">Sub Title</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* You're in Safe Hands Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <img 
                src={NO_IMAGE}
                alt="Professional nail technician at work" 
                className="w-full h-96 object-cover rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-beige-500 text-white p-6 rounded-2xl shadow-xl">
                <div className="text-4xl font-bold"></div>
                <div className="text-sm uppercase tracking-wide">{t.safety.experience}</div>
              </div>
            </div>
            
            <div>
              <h2 className="text-5xl font-bold text-beige-800 dark:text-beige-200 mb-6 leading-tight">
                {t.safety.title}
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                {t.safety.description1}
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                {t.safety.description2}
              </p>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-beige-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-beige-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-beige-800 dark:text-beige-200 text-lg">{t.safety.licensed}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{t.safety.licensedDesc}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lookbook Section */}
      <section className="py-20 bg-gradient-to-r from-beige-50 to-beige-100 dark:from-gray-800 dark:to-gray-700">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-beige-800 dark:text-beige-200 mb-6">{t.lookbook.title}</h2>
            <p className="text-xl text-beige-600 dark:text-beige-300 max-w-3xl mx-auto">
              {t.lookbook.subtitle}
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500">
              <img 
                src={NO_IMAGE}
                alt="Elegant nail art designs" 
                className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent">
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">{t.lookbook.artistic}</h3>
                  <p className="text-beige-100">{t.lookbook.artisticDesc}</p>
                </div>
              </div>
            </div>
            
            <div className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500">
              <img 
                src={NO_IMAGE}
                alt="Classic nail styles" 
                className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent">
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">{t.lookbook.classic}</h3>
                  <p className="text-beige-100">{t.lookbook.classicDesc}</p>
                </div>
              </div>
            </div>
            
            <div className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500">
              <img 
                src={NO_IMAGE}
                alt="Seasonal nail trends" 
                className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent">
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">{t.lookbook.seasonal}</h3>
                  <p className="text-beige-100">{t.lookbook.seasonalDesc}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Button className="bg-beige-500 hover:bg-beige-600 text-white px-12 py-4 rounded-full text-lg font-semibold">
              {t.lookbook.viewGallery}
            </Button>
          </div>
        </div>
      </section>

      {/* Look Good Feel Better Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-5xl font-bold text-beige-800 dark:text-beige-200 mb-6 leading-tight">
                {t.feelBetter.title}
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                {t.feelBetter.description1}
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                {t.feelBetter.description2}
              </p>
              <Button className="bg-beige-500 hover:bg-beige-600 text-white px-8 py-3 rounded-full font-semibold">
                {t.feelBetter.bookNow}
              </Button>
            </div>
            
            <div className="relative">
              <img 
                src={NO_IMAGE}
                alt="Relaxing salon interior" 
                className="w-full h-96 object-cover rounded-2xl shadow-2xl"
              />
              <div className="absolute -top-6 -left-6 bg-beige-500 text-white p-6 rounded-2xl shadow-xl">
                <div className="text-4xl font-bold"></div>
                <div className="text-sm uppercase tracking-wide"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services & Pricing Section with Tabs */}
      <section id="services" className="py-20 bg-gradient-to-tr from-beige-50 via-beige-100 to-beige-200 dark:from-gray-800 dark:to-gray-900 relative overflow-hidden">
        {/* Geometric Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23C8A876' fill-opacity='0.3'%3E%3Cpath d='m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>
        
        {/* Floating Service Icons */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-12 w-16 h-16 bg-beige-200 rounded-full flex items-center justify-center animate-float opacity-20">
            <Heart className="w-8 h-8 text-beige-600" />
          </div>
          <div className="absolute top-32 right-16 w-12 h-12 bg-beige-300 rounded-full flex items-center justify-center animate-bounce-gentle opacity-25">
            <Sparkles className="w-6 h-6 text-beige-600" />
          </div>
          <div className="absolute bottom-40 left-20 w-14 h-14 bg-beige-200 rounded-full flex items-center justify-center animate-pulse-gentle opacity-20">
            <Star className="w-7 h-7 text-beige-600" />
          </div>
          <div className="absolute bottom-20 right-24 w-18 h-18 bg-beige-200 rounded-full flex items-center justify-center animate-float animation-delay-2000 opacity-15">
            <Heart className="w-9 h-9 text-beige-600" />
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <h2 className="text-5xl font-bold text-beige-800 dark:text-beige-200 text-center mb-16">{t.servicesSection.title}</h2>
          
          <div className="w-full">
            <div className="flex justify-center mb-12">
              <div className="grid w-full max-w-md grid-cols-2 h-14 bg-white dark:bg-gray-700 rounded-full p-2 shadow-lg">
                <button 
                  onClick={() => setActiveTab('services')}
                  className={`rounded-full text-lg font-semibold transition-all duration-300 ${
                    activeTab === 'services' 
                      ? 'bg-beige-500 text-white' 
                      : 'text-gray-600 dark:text-gray-300 hover:text-beige-500'
                  }`}
                >
                  {t.servicesSection.ourServices}
                </button>
                <button 
                  onClick={() => setActiveTab('pricing')}
                  className={`rounded-full text-lg font-semibold transition-all duration-300 ${
                    activeTab === 'pricing' 
                      ? 'bg-beige-500 text-white' 
                      : 'text-gray-600 dark:text-gray-300 hover:text-beige-500'
                  }`}
                >
                  {t.servicesSection.pricingPackages}
                </button>
              </div>
            </div>

            <div id="pricing"></div>

            {activeTab === 'services' && (
            <div className="space-y-8">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Nail Care */}
            <Card className="bg-gradient-to-br from-beige-50 to-beige-100 dark:from-gray-800 dark:to-gray-700 border-none shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 text-center p-6 group overflow-hidden">
              <div className="flex justify-center mb-4">
                <div className="w-24 h-24 bg-gradient-to-br from-beige-100 to-beige-200 rounded-full flex items-center justify-center group-hover:animate-bounce-gentle overflow-hidden">
                  <img 
                    src={NO_IMAGE} 
                    alt="Nail care" 
                    className="w-16 h-16 object-cover rounded-full"
                  />
                </div>
              </div>
              <CardTitle className="text-xl font-bold text-beige-800 dark:text-beige-200 mb-4">
                {t.servicesSection.nailCare}
              </CardTitle>
              <CardDescription className="text-beige-600 dark:text-beige-300 mb-4">
                {t.servicesSection.nailCareDesc}
              </CardDescription>
            </Card>

            {/* Foot Care */}
            <Card className="bg-gradient-to-br from-beige-50 to-beige-100 dark:from-gray-800 dark:to-gray-700 border-none shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 text-center p-6 group overflow-hidden">
              <div className="flex justify-center mb-4">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-cyan-200 rounded-full flex items-center justify-center group-hover:animate-bounce-gentle overflow-hidden">
                  <img 
                    src={NO_IMAGE} 
                    alt="Foot care spa" 
                    className="w-20 h-16 object-cover rounded-full"
                  />
                </div>
              </div>
              <CardTitle className="text-xl font-bold text-beige-800 dark:text-beige-200 mb-4">
                {t.servicesSection.footCare}
              </CardTitle>
              <CardDescription className="text-beige-600 dark:text-beige-300 mb-4">
                {t.servicesSection.footCareDesc}
              </CardDescription>
            </Card>

            {/* Eyelash Extensions */}
            <Card className="bg-gradient-to-br from-beige-50 to-beige-100 dark:from-gray-800 dark:to-gray-700 border-none shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 text-center p-8 group">
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-beige-500 rounded-full flex items-center justify-center group-hover:animate-bounce-gentle overflow-hidden">
                  <img 
                    src={NO_IMAGE} 
                    alt="Eyelash extensions" 
                    className="w-10 h-10 object-cover rounded-full"
                  />
                </div>
              </div>
              <CardTitle className="text-xl font-bold text-beige-800 dark:text-beige-200 mb-4">
                {t.servicesSection.eyelashExtensions}
              </CardTitle>
              <CardDescription className="text-beige-600 dark:text-beige-300 mb-4">
                {t.servicesSection.eyelashDesc}
              </CardDescription>
            </Card>

            {/* Waxing */}
            <Card className="bg-gradient-to-br from-beige-50 to-beige-100 dark:from-gray-800 dark:to-gray-700 border-none shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 text-center p-8 group">
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-beige-500 rounded-full flex items-center justify-center group-hover:animate-bounce-gentle overflow-hidden">
                  <img 
                    src={NO_IMAGE} 
                    alt="Waxing services" 
                    className="w-10 h-10 object-cover rounded-full"
                  />
                </div>
              </div>
              <CardTitle className="text-xl font-bold text-beige-800 dark:text-beige-200 mb-4">
                {t.servicesSection.waxing}
              </CardTitle>
              <CardDescription className="text-beige-600 dark:text-beige-300 mb-4">
                {t.servicesSection.waxingDesc}
              </CardDescription>
            </Card>
              </div>
            </div>

            )}

            {activeTab === 'pricing' && (
            <div className="space-y-8">
              <div className="grid md:grid-cols-2 gap-12 items-start">
                <div className="space-y-6">
                  <Card className="bg-white dark:bg-gray-800 border-none shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-102">
                      <CardHeader className="bg-gradient-to-r from-beige-500 to-beige-600 text-white rounded-t-xl">
                        <CardTitle className="text-2xl font-bold text-center">{t.servicesSection.nailCare}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="space-y-4">
                          <div className="flex justify-between items-center py-3 border-b border-beige-200 dark:border-gray-600">
                          <div>
                              <span className="text-beige-700 dark:text-beige-300 font-medium">{t.servicesSection.newAcryl}</span>
                              <p className="text-sm text-gray-500 dark:text-gray-400">{t.servicesSection.newAcrylDesc}</p>
                          </div>
                            <Badge className="bg-beige-500 text-white text-lg px-3 py-1">€30</Badge>
                        </div>
                          <div className="flex justify-between items-center py-3 border-b border-beige-200 dark:border-gray-600">
                          <div>
                              <span className="text-beige-700 dark:text-beige-300 font-medium">{t.servicesSection.fillAcryl}</span>
                              <p className="text-sm text-gray-500 dark:text-gray-400">{t.servicesSection.fillAcrylDesc}</p>
                          </div>
                            <Badge className="bg-beige-500 text-white text-lg px-3 py-1">€35</Badge>
                        </div>
                          <div className="flex justify-between items-center py-3 border-b border-beige-200 dark:border-gray-600">
                          <div>
                              <span className="text-beige-700 dark:text-beige-300 font-medium">{t.servicesSection.ombreFrench}</span>
                              <p className="text-sm text-gray-500 dark:text-gray-400">{t.servicesSection.ombreFrenchDesc}</p>
                          </div>
                            <Badge className="bg-beige-500 text-white text-lg px-3 py-1">€45</Badge>
                        </div>
                          <div className="flex justify-between items-center py-3 border-b border-beige-200 dark:border-gray-600">
                          <div>
                              <span className="text-beige-700 dark:text-beige-300 font-medium">{t.servicesSection.pedicureShellac}</span>
                              <p className="text-sm text-gray-500 dark:text-gray-400">{t.servicesSection.pedicureShellacDesc}</p>
                          </div>
                            <Badge className="bg-beige-500 text-white text-lg px-3 py-1">€15</Badge>
                        </div>
                        <div className="flex justify-between items-center py-3">
                          <div>
                              <span className="text-beige-700 dark:text-beige-300 font-medium">{t.servicesSection.manicureShellac}</span>
                              <p className="text-sm text-gray-500 dark:text-gray-400">{t.servicesSection.manicureShellacDesc}</p>
                          </div>
                            <Badge className="bg-beige-500 text-white text-lg px-3 py-1">+€5</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                    <Card className="bg-gradient-to-br from-beige-500 to-beige-600 text-white border-none shadow-2xl">
                    <CardContent className="p-6 text-center">
                        <h3 className="text-2xl font-bold mb-4">{t.servicesSection.specialPackage}</h3>
                        <p className="text-beige-100 mb-4">
                          {t.servicesSection.specialDesc}
                      </p>
                      <div className="flex items-center justify-center space-x-2 mb-4">
                          <span className="text-lg line-through opacity-70"></span>
                          <span className="text-3xl font-bold">Public Soon</span>
                      </div>
                        <Button className="bg-white text-beige-500 hover:bg-beige-50 font-semibold px-6 py-2 rounded-full transition-all duration-300 hover:scale-105">
                          {t.servicesSection.bookSave}
                      </Button>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="space-y-6">
                  <div className="relative animate-fade-in-up">
                      <div className="w-full h-80 bg-gradient-to-br from-beige-200 to-beige-300 rounded-3xl shadow-2xl overflow-hidden">
                      <img 
                          src={NO_IMAGE} 
                        alt="Elegant spa room with modern décor and relaxing ambiance" 
                        className="w-full h-full object-cover"
                      />
                      {/* Elegant overlay with spa room details */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                      <div className="absolute bottom-6 left-6 text-white">
                          <h3 className="text-2xl font-bold mb-2 drop-shadow-lg">Title</h3>
                          <p className="text-beige-100 drop-shadow-md">Sub-Title</p>
                      </div>
                    </div>
                  </div>

                  <div className="text-center">
                      <Button className="bg-gradient-to-r from-beige-500 to-beige-600 hover:from-beige-600 hover:to-beige-700 text-white px-12 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:scale-105 shadow-2xl">
                      <Clock className="w-5 h-5 mr-2" />
                      BOOK APPOINTMENT
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            )}
          </div>
        </div>
      </section>

      {/* Our Gallery Section */}
      <section className="py-20 bg-gradient-to-bl from-beige-50 via-beige-100 to-beige-200 dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">
        {/* Radial Gradient Overlays */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-72 h-72 bg-gradient-radial from-beige-200/30 to-transparent rounded-full animate-pulse-slow"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-gradient-radial from-beige-300/20 to-transparent rounded-full animate-pulse-slow animation-delay-3000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-radial from-beige-200/25 to-transparent rounded-full animate-pulse-slow animation-delay-1500"></div>
        </div>
        
        {/* Sparkle Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <Sparkles className="absolute top-16 left-1/4 text-beige-300 w-4 h-4 animate-twinkle opacity-40" />
          <Sparkles className="absolute top-24 right-1/3 text-beige-400 w-3 h-3 animate-twinkle animation-delay-1000 opacity-50" />
          <Sparkles className="absolute bottom-24 left-1/3 text-beige-300 w-5 h-5 animate-twinkle animation-delay-2000 opacity-30" />
          <Sparkles className="absolute bottom-16 right-1/4 text-beige-300 w-4 h-4 animate-twinkle animation-delay-500 opacity-45" />
          <Star className="absolute top-32 left-2/3 text-beige-400 w-3 h-3 animate-twinkle animation-delay-3000 opacity-35" />
          <Star className="absolute bottom-32 left-1/5 text-beige-300 w-4 h-4 animate-twinkle animation-delay-1500 opacity-40" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <h2 className="text-5xl font-bold text-beige-800 dark:text-beige-200 text-center mb-16">{t.gallery.title}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-3xl transition-all duration-300">
              <img 
                src={NO_IMAGE} 
                alt="Creative nail art designs" 
                className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-white text-xl font-bold">{t.gallery.creative}</p>
              </div>
            </div>
            <div className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-3xl transition-all duration-300">
              <img 
                src={NO_IMAGE} 
                alt="Elegant nail styles" 
                className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-110"
              />
               <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-white text-xl font-bold">{t.gallery.elegant}</p>
              </div>
            </div>
            <div className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-3xl transition-all duration-300">
              <img 
                src={NO_IMAGE} 
                alt="Modern nail looks" 
                className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-110"
              />
               <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-white text-xl font-bold">{t.gallery.modern}</p>
              </div>
            </div>
            <div className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-3xl transition-all duration-300">
              <img 
                src={NO_IMAGE} 
                alt="Vibrant nail colors" 
                className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-110"
              />
               <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-white text-xl font-bold">{t.gallery.vibrant}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-20 bg-gradient-to-r from-amber-50 via-beige-50 to-beige-100 dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">
        {/* Diagonal Stripes Background */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(200, 168, 118, 0.1) 10px, rgba(200, 168, 118, 0.1) 20px)`
          }}></div>
        </div>
        
        {/* Floating Product Icons */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-24 left-16 w-8 h-8 bg-beige-300 rounded-full animate-bounce-gentle opacity-20"></div>
          <div className="absolute top-16 right-20 w-6 h-6 bg-beige-400 rounded-full animate-float opacity-25"></div>
          <div className="absolute bottom-32 left-24 w-10 h-10 bg-amber-300 rounded-full animate-pulse-gentle opacity-20"></div>
          <div className="absolute bottom-16 right-16 w-7 h-7 bg-beige-300 rounded-full animate-bounce-gentle animation-delay-1000 opacity-30"></div>
          <div className="absolute top-1/2 left-12 w-5 h-5 bg-beige-400 rounded-full animate-float animation-delay-2000 opacity-25"></div>
          <div className="absolute top-1/3 right-12 w-9 h-9 bg-beige-400 rounded-full animate-pulse-gentle animation-delay-3000 opacity-20"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <h2 className="text-5xl font-bold text-beige-800 dark:text-beige-200 text-center mb-16">{t.products.title}</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {/* Nail Polish Collection */}
            <div className="relative group overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <div className="aspect-square bg-gradient-to-br from-beige-100 to-beige-200 overflow-hidden">
                <img 
                  src={NO_IMAGE} 
                  alt="Premium nail polish collection" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="font-bold text-lg">{t.products.nailPolish}</h3>
                <p className="text-sm opacity-90">{t.products.nailPolishDesc}</p>
              </div>
            </div>
            
            {/* Nail Care Tools */}
            <div className="relative group overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <div className="aspect-square bg-gradient-to-br from-beige-100 to-beige-200 overflow-hidden">
                <img 
                  src={NO_IMAGE} 
                  alt="Professional nail care tools" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="font-bold text-lg">{t.products.careTools}</h3>
                <p className="text-sm opacity-90">{t.products.careToolsDesc}</p>
              </div>
            </div>

            {/* Gel Polish Collection */}
            <div className="relative group overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <div className="aspect-square bg-gradient-to-br from-beige-100 to-beige-200 overflow-hidden">
                <img 
                  src={NO_IMAGE} 
                  alt="Gel polish collection" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="font-bold text-lg">{t.products.gelPolish}</h3>
                <p className="text-sm opacity-90">{t.products.gelPolishDesc}</p>
              </div>
            </div>

            {/* Nail Art Accessories */}
            <div className="relative group overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <div className="aspect-square bg-gradient-to-br from-orange-100 to-amber-200 overflow-hidden">
                <img 
                  src={NO_IMAGE} 
                  alt="Nail art accessories and decorations" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="font-bold text-lg">{t.products.artSupplies}</h3>
                <p className="text-sm opacity-90">{t.products.artSuppliesDesc}</p>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <Button className="bg-beige-500 hover:bg-beige-600 text-white px-12 py-4 rounded-full text-lg font-semibold">
              {t.products.booking}
            </Button>
          </div>
        </div>
      </section>

      {/* Styled by Us, Worn by You Section */}
      <section className="py-20 bg-beige-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-beige-800 dark:text-beige-200 mb-4">{t.styledBy.title}</h2>
            <p className="text-xl text-beige-600 dark:text-beige-300">{t.styledBy.subtitle}</p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-6">
            <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300">
              <img 
                src={NO_IMAGE}
                alt="Client nail work showcase" 
                className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4 text-white">
                  <p className="text-sm font-medium">@sarah_nails</p>
                </div>
              </div>
            </div>
            
            <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300">
              <img 
                src={NO_IMAGE}
                alt="Pedicure results showcase" 
                className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4 text-white">
                  <p className="text-sm font-medium">@emma_beauty</p>
                </div>
              </div>
            </div>
            
            <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300">
              <img 
                src={NO_IMAGE}
                alt="Nail art showcase" 
                className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4 text-white">
                  <p className="text-sm font-medium">@lisa_style</p>
                </div>
              </div>
            </div>
            
            <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300">
              <img 
                src={NO_IMAGE}
                alt="Classic nail style showcase" 
                className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4 text-white">
                  <p className="text-sm font-medium">@anna_nails</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <p className="text-beige-600 dark:text-beige-400 mb-4">{t.styledBy.tagUs}</p>
            <h3 className="text-xl font-bold text-beige-800 dark:text-beige-200 mb-2">{t.styledBy.followUs}</h3>
            <div className="flex justify-center gap-4">
              <Button
                onClick={() => window.open('https://www.instagram.com/nailsofthenetherlands/', '_blank')}
                className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white p-3 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg"
                title="Follow on Instagram"
              >
                <Instagram className="w-6 h-6" />
              </Button>
              <Button
                onClick={() => window.open('https://www.facebook.com/share/199bqR8uAA/?mibextid=wwXIfr', '_blank')}
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white p-3 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg"
                title="Follow on Facebook"
              >
                <Facebook className="w-6 h-6" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Testimonials */}
      <section className="py-20 bg-gradient-to-tl from-beige-100 via-beige-50 to-amber-50 dark:from-gray-800 dark:to-gray-700 relative overflow-hidden">
        {/* Wave Pattern Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='20' viewBox='0 0 100 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M21.184 20c.357-.13.72-.264 1.088-.402l1.768-.661C33.64 15.347 39.647 14 50 14c10.271 0 15.362 1.222 24.629 4.928.955.383 1.869.74 2.75 1.072h6.225c-2.51-.73-5.139-1.691-8.233-2.928C65.888 13.278 60.562 12 50 12c-10.626 0-16.855 1.397-26.66 5.063l-1.767.662c-2.475.923-4.66 1.674-6.724 2.275h6.335zm0-20C13.258 2.892 8.077 4 0 4V2c5.744 0 9.951-.574 14.85-2h6.334zM77.38 0C85.239 2.966 90.502 4 100 4V2c-6.842 0-11.386-.542-16.396-2h-6.225zM0 14c8.44 0 13.718-1.21 22.272-4.402l1.768-.661C33.64 5.347 39.647 4 50 4c10.271 0 15.362 1.222 24.629 4.928C84.112 12.722 89.438 14 100 14v-2c-10.271 0-15.362-1.222-24.629-4.928C65.888 3.278 60.562 2 50 2 39.374 2 33.145 3.397 23.34 7.063l-1.767.662C13.223 10.84 8.163 12 0 12v2z' fill='%23C8A876' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E")`
          }}></div>
        </div>
        
        {/* Testimonial Hearts */}
        <div className="absolute inset-0 pointer-events-none">
          <Heart className="absolute top-20 left-16 text-beige-200 w-5 h-5 animate-pulse-gentle opacity-30" />
          <Heart className="absolute top-32 right-20 text-beige-300 w-4 h-4 animate-float opacity-25" />
          <Heart className="absolute bottom-24 left-20 text-amber-200 w-6 h-6 animate-bounce-gentle opacity-20" />
          <Heart className="absolute bottom-16 right-16 text-beige-200 w-4 h-4 animate-pulse-gentle animation-delay-1000 opacity-35" />
          <Star className="absolute top-1/3 left-1/4 text-beige-300 w-3 h-3 animate-twinkle animation-delay-2000 opacity-40" />
          <Star className="absolute bottom-1/3 right-1/4 text-amber-200 w-5 h-5 animate-twinkle animation-delay-3000 opacity-30" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <h2 className="text-5xl font-bold text-beige-800 dark:text-beige-200 text-center mb-16">{t.testimonials.title}</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: "Emma S.", text: t.testimonials.testimonial1 },
              { name: "Lisa M.", text: t.testimonials.testimonial2 },
              { name: "Sarah K.", text: t.testimonials.testimonial3 },
              { name: "Anna B.", text: t.testimonials.testimonial4 },
              { name: "Julia H.", text: t.testimonials.testimonial5 },
              { name: "Nina L.", text: t.testimonials.testimonial6 }
            ].map((testimonial, index) => (
              <Card key={index} className="bg-white dark:bg-gray-800 border-none shadow-xl p-6 hover:shadow-2xl transition-all duration-300">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-beige-500 rounded-full flex items-center justify-center">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold text-beige-800 dark:text-beige-200">{testimonial.name}</h3>
                </div>
                <p className="text-beige-600 dark:text-beige-300 italic">"{testimonial.text}"</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 bg-beige-800 dark:bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12">
            <div>
              <h3 className="text-2xl font-bold mb-6">{t.footer.title}</h3>
              <p className="text-beige-200 mb-6">{t.footer.description}</p>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-6">{t.footer.contact}</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5" />
                  <span className="text-beige-200">nailofthenetherlands@gmail.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5" />
                  <span className="text-beige-200">+31 62 869 9827</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5" />
                  <span className="text-beige-200">Wirdumerdijk 29, 8911 CC Leeuwarden</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-6">{t.footer.openingHours}</h3>
              <div className="space-y-2 text-beige-200">
                <p>{t.footer.monday}</p>
                {t.footer.saturday && <p>{t.footer.saturday}</p>}
                <p>{t.footer.sunday}</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-beige-700 mt-12 pt-8 text-center">
            <p className="text-beige-200">{t.footer.copyright}</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
