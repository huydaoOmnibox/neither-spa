import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Menu, X, MapPin, Clock, Phone, Mail, Calendar, Navigation, Sparkles } from "lucide-react";
import { Link } from "wouter";
import logoPath from "@assets/image_1752511415001.png";
import { useLanguage } from "@/contexts/LanguageContext";

export const Contact = (): JSX.Element => {
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
        title: "CONTACT",
        subtitle: "Neem contact met ons op voor een afspraak of vragen. We staan klaar om u te helpen met al uw nagelzorgbehoeften."
      },
      contactInfo: {
        title: "Contactgegevens",
        address: {
          title: "Adres",
          street: "Wirdumerdijk 29",
          city: "8911 CC Leeuwarden",
          country: "Nederland"
        },
        phone: {
          title: "Telefoon",
          number: "+31 62 869 9827"
        },
        email: {
          title: "E-mail",
          address: "nailofthenetherlands@gmail.com"
        },
        hours: {
          title: "Openingstijden",
          weekdays: "Maandag tot en met Zaterdag: 10.00 - 18.00",
          sunday: "Zondag: Gesloten",
          note: "Afspraken buiten openingstijden op verzoek mogelijk"
        }
      },
      location: {
        title: "Onze Locatie",
        description: "We bevinden ons in het hart van Leeuwarden, op slechts een paar stappen van McDonald's, ICI Paris en Kruidvat. Makkelijk bereikbaar met openbaar vervoer en parkeren in de buurt.",
        directions: "Route Plannen"
      },
      bookingInfo: {
        title: "Afspraak Maken",
        description: "Maak eenvoudig een afspraak via telefoon of e-mail. We raden aan om van tevoren te reserveren om teleurstelling te voorkomen.",
        emergency: "Voor spoedgevallen kunt u altijd bellen.",
        bookButton: "AFSPRAAK MAKEN"
      },
      mapSection: {
        title: "Vind Ons Gemakkelijk",
        subtitle: "Centraal gelegen in Leeuwarden voor uw gemak"
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
        title: "CONTACT",
        subtitle: "Get in touch with us for appointments or questions. We're here to help with all your nail care needs."
      },
      contactInfo: {
        title: "Contact Information",
        address: {
          title: "Address",
          street: "Wirdumerdijk 29",
          city: "8911 CC Leeuwarden",
          country: "Netherlands"
        },
        phone: {
          title: "Phone",
          number: "+31 62 869 9827"
        },
        email: {
          title: "Email",
          address: "info@nailsofthenetherlands.nl"
        },
        hours: {
          title: "Opening Hours",
          weekdays: "Monday - Saturday: 10.00 - 18.00",
          sunday: "Sunday: Closed",
          note: "Appointments outside opening hours available upon request"
        }
      },
      location: {
        title: "Our Location",
        description: "We are located in the heart of Leeuwarden, just steps away from McDonald's, ICI Paris, and Kruidvat. Easily accessible by public transport with nearby parking.",
        directions: "Get Directions"
      },
      bookingInfo: {
        title: "Book Appointment",
        description: "Easily book an appointment via phone or email. We recommend booking in advance to avoid disappointment.",
        emergency: "For emergencies, you can always call us.",
        bookButton: "BOOK APPOINTMENT"
      },
      mapSection: {
        title: "Find Us Easily",
        subtitle: "Centrally located in Leeuwarden for your convenience"
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

  // Opening hours data
  const openingHours = [
    { day: currentLanguage === 'nl' ? 'Maandag' : 'Monday', hours: '10.00 - 18.00', open: true },
    { day: currentLanguage === 'nl' ? 'Dinsdag' : 'Tuesday', hours: '10.00 - 18.00', open: true },
    { day: currentLanguage === 'nl' ? 'Woensdag' : 'Wednesday', hours: '10.00 - 18.00', open: true },
    { day: currentLanguage === 'nl' ? 'Donderdag' : 'Thursday', hours: '10.00 - 18.00', open: true },
    { day: currentLanguage === 'nl' ? 'Vrijdag' : 'Friday', hours: '10.00 - 18.00', open: true },
    { day: currentLanguage === 'nl' ? 'Zaterdag' : 'Saturday', hours: '10.00 - 18.00', open: true },
    { day: currentLanguage === 'nl' ? 'Zondag' : 'Sunday', hours: currentLanguage === 'nl' ? 'Gesloten' : 'Closed', open: false }
  ];

  const googleMapsUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2389.123456789!2d5.7946!3d53.2012!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c9cd26e2c4c2ff%3A0x1234567890!2sWirdumerdijk%2029%2C%208911%20CC%20Leeuwarden%2C%20Netherlands!5e0!3m2!1sen!2snl!4v1234567890!5m2!1sen!2snl";

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
                <button className="text-beige-500 dark:text-beige-400 font-semibold transition-colors duration-200 border-b-2 border-beige-500">
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
                    className="text-beige-500 dark:text-beige-400 font-semibold text-left transition-colors duration-200"
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

      {/* Contact Information Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-beige-800 dark:text-beige-200 mb-4">
              {t.contactInfo.title}
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            
            {/* Left Column - Contact Details */}
            <div className="space-y-6">
              
              {/* Address Card */}
              <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader className="bg-gradient-to-r from-beige-400 to-beige-500 text-white">
                  <CardTitle className="flex items-center gap-3 text-lg">
                    <MapPin className="w-5 h-5" />
                    {t.contactInfo.address.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-1">
                    <p className="text-lg font-medium text-gray-800 dark:text-gray-200">
                      {t.contactInfo.address.street}
                    </p>
                    <p className="text-gray-600 dark:text-gray-300">
                      {t.contactInfo.address.city}
                    </p>
                    <p className="text-gray-600 dark:text-gray-300">
                      {t.contactInfo.address.country}
                    </p>
                  </div>
                  <Button 
                    className="mt-4 bg-beige-500 hover:bg-beige-600 text-white text-sm"
                    onClick={() => window.open(`https://maps.google.com/?q=Wirdumerdijk+29,+8911+CC+Leeuwarden`, '_blank')}
                  >
                    <Navigation className="w-4 h-4 mr-2" />
                    {t.location.directions}
                  </Button>
                </CardContent>
              </Card>

              {/* Contact Methods Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Phone */}
                <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3">
                      <div className="bg-beige-100 p-2 rounded-full cursor-pointer hover:bg-beige-200 transition-all duration-300"
                           onClick={() => window.open('https://wa.me/31628699827', '_blank')}>
                        <Phone className="w-5 h-5 text-beige-600" />
                      </div>
                      <div className="cursor-pointer hover:text-beige-600 transition-colors duration-300"
                           onClick={() => window.open('https://wa.me/31628699827', '_blank')}>
                        <h3 className="font-semibold text-beige-800 dark:text-beige-200 text-sm">
                          {t.contactInfo.phone.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">
                          {t.contactInfo.phone.number}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Email */}
                <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3">
                      <div className="bg-beige-100 p-2 rounded-full">
                        <Mail className="w-5 h-5 text-beige-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-beige-800 dark:text-beige-200 text-sm">
                          {t.contactInfo.email.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">
                          {t.contactInfo.email.address}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

            </div>

            {/* Right Column - Opening Hours & Booking */}
            <div className="space-y-6">
              
              {/* Opening Hours */}
              <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader className="bg-gradient-to-r from-beige-400 to-beige-500 text-white">
                  <CardTitle className="flex items-center gap-3 text-lg">
                    <Clock className="w-5 h-5" />
                    {t.contactInfo.hours.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-3">
                    {openingHours.map((day, index) => (
                      <div key={index} className="flex justify-between items-center py-2 border-b border-beige-100 last:border-b-0">
                        <span className="font-medium text-gray-700 dark:text-gray-300">
                          {day.day}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className={`${day.open ? 'text-green-600' : 'text-red-500'} font-medium text-sm`}>
                            {day.hours}
                          </span>
                          <Badge className={`${day.open ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'} text-xs`}>
                            {day.open ? (currentLanguage === 'nl' ? 'Open' : 'Open') : (currentLanguage === 'nl' ? 'Gesloten' : 'Closed')}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 p-3 bg-beige-50 dark:bg-gray-800 rounded-lg">
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {t.contactInfo.hours.note}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Booking Information */}
              <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader className="bg-gradient-to-r from-beige-400 to-beige-500 text-white">
                  <CardTitle className="flex items-center gap-3 text-lg">
                    <Calendar className="w-5 h-5" />
                    {t.bookingInfo.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {t.bookingInfo.description}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {t.bookingInfo.emergency}
                    </p>
                    <Button 
                      onClick={() => window.open('https://wa.me/31628699827', '_blank')}
                      className="w-full bg-gradient-to-r from-beige-500 to-beige-600 hover:from-beige-600 hover:to-beige-700 text-white py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-lg"
                    >
                      <Calendar className="w-5 h-5 mr-2" />
                      {t.bookingInfo.bookButton}
                    </Button>
                  </div>
                </CardContent>
              </Card>

            </div>
          </div>

          {/* Location Description */}
          <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 mb-8">
            <CardHeader className="bg-gradient-to-r from-beige-400 to-beige-500 text-white">
              <CardTitle className="flex items-center gap-3 text-lg">
                <MapPin className="w-5 h-5" />
                {t.location.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {t.location.description}
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Google Maps Section */}
      <section className="py-20 bg-beige-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-beige-800 dark:text-beige-200 mb-4">
              {t.mapSection.title}
            </h2>
            <p className="text-xl text-beige-600 dark:text-beige-300">
              {t.mapSection.subtitle}
            </p>
          </div>
          
          <Card className="border-none shadow-2xl overflow-hidden">
            <div className="relative">
              <iframe
                src={googleMapsUrl}
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-96 lg:h-[500px]"
                title="Nails of the Netherlands Location"
              ></iframe>
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-beige-600" />
                  <div>
                    <p className="font-semibold text-beige-800 text-sm">Nails of the Netherlands</p>
                    <p className="text-gray-600 text-xs">Wirdumerdijk 29, Leeuwarden</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-beige-50 to-beige-100 dark:from-gray-800 dark:to-gray-700">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-4xl font-bold text-beige-800 dark:text-beige-200 mb-6">
            {currentLanguage === 'nl' ? 'Klaar voor Prachtige Nagels?' : 'Ready for Beautiful Nails?'}
          </h2>
          <p className="text-xl text-beige-600 dark:text-beige-300 mb-8 leading-relaxed">
            {currentLanguage === 'nl' 
              ? 'Bezoek ons in het hart van Leeuwarden of maak een afspraak. We kijken ernaar uit u te verwelkomen!'
              : 'Visit us in the heart of Leeuwarden or book an appointment. We look forward to welcoming you!'
            }
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => window.open('https://wa.me/31628699827', '_blank')}
              className="bg-gradient-to-r from-beige-500 to-beige-600 hover:from-beige-600 hover:to-beige-700 text-white px-12 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:scale-105 shadow-xl"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              {currentLanguage === 'nl' ? 'AFSPRAAK MAKEN' : 'BOOK APPOINTMENT'}
            </Button>
            <Button 
              variant="outline" 
              className="border-beige-400 text-beige-700 hover:bg-beige-50 px-12 py-4 rounded-full text-lg font-semibold"
              onClick={() => window.open(`https://maps.google.com/?q=Wirdumerdijk+29,+8911+CC+Leeuwarden`, '_blank')}
            >
              <Navigation className="w-5 h-5 mr-2" />
              {t.location.directions}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}; 