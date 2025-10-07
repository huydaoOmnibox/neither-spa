import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Menu, X, Heart } from "lucide-react";
import { Link } from "wouter";
import logoPath from "@assets/image_1752511415001.png";
import { useLanguage } from "@/contexts/LanguageContext";

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
      title: "ONS KLANTENBELEID",
      subtitle: "Voor een prettige, veilige en ontspannen ervaring",
      intro:
        "Welkom bij Nails of The Netherlands. Om iedereen een prettige, veilige en ontspannen ervaring te bieden, vragen we je vriendelijk om de volgende regels in acht te nemen:"
    },
    sections: [
      {
        title: "Afspraken",
        items: [
          "De tijd van de afspraak is de tijd waarop we beginnen. Wil je rustig een kleur uitkiezen, kom dan 5 tot 10 minuten eerder.",
          "Ben je meer dan 10 minuten te laat, dan kan je afspraak worden ingekort of verplaatst."
        ]
      },
      {
        title: "Annuleringen",
        items: [
          "Annuleer of verzet je afspraak minstens 24 uur van tevoren.",
          "Bij no-shows of late annuleringen wordt \u20ac15,- in rekening gebracht per service."
        ]
      },
      {
        title: "Hygi\u00ebne en veiligheid",
        items: [
          "Was je handen voor je afspraak.",
          "Eten wordt om hygi\u00ebnische redenen afgeraden tijdens behandelingen.",
          "Kom bij voorkeur alleen. Kinderen zijn wel welkom onder toezicht, zolang andere gasten niet worden gestoord."
        ]
      },
      {
        title: "Reparaties en garanties",
        items: [
          "Wij bieden gratis reparaties aan binnen 7 dagen na je afspraak, mits de juiste nazorg is gevolgd.",
          "Schade door verkeerd gebruik (bijten, zwaar werk, enz.) valt niet onder de dekking."
        ]
      }
    ],
    closing: "Door een afspraak te maken ga je akkoord met ons beleid. Hartelijk dank en geniet van je ervaring!"
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
      title: "OUR CUSTOMER POLICY",
      subtitle: "Ensuring a pleasant, safe, and relaxing experience",
      intro:
        "Welcome to Nails of The Netherlands. To ensure every visit feels pleasant, safe, and relaxing, we kindly ask you to keep the following guidelines in mind:"
    },
    sections: [
      {
        title: "Appointments",
        items: [
          "Your appointment time is when we begin. If you would like extra time to choose a color, please arrive 5 to 10 minutes earlier.",
          "Arriving more than 10 minutes late may shorten your service or require rescheduling."
        ]
      },
      {
        title: "Cancellations",
        items: [
          "Please cancel or reschedule at least 24 hours in advance.",
          "No-shows or late cancellations incur a \u20ac15 fee per service."
        ]
      },
      {
        title: "Hygiene & Safety",
        items: [
          "Please wash your hands before the appointment.",
          "We kindly ask that you refrain from eating during services for hygiene reasons.",
          "We recommend coming alone. Children are welcome with supervision as long as other guests are not disturbed."
        ]
      },
      {
        title: "Repairs & Guarantees",
        items: [
          "Complimentary repairs are available within 7 days of your visit when proper aftercare is followed.",
          "Damage caused by misuse (biting, heavy labor, etc.) is not covered."
        ]
      }
    ],
    closing: "By booking an appointment you agree to our policy. Thank you, and enjoy your experience!"
  }
};

export const Policy = (): JSX.Element => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { currentLanguage, setCurrentLanguage } = useLanguage();
  const t = translations[currentLanguage];

  const scrollToSection = (sectionId: string) => {
    if (sectionId === "pricing") {
      window.location.href = "/#pricing";
    } else if (sectionId === "contact") {
      window.location.href = "/#contact";
    } else if (sectionId === "home") {
      window.location.href = "/";
    }
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-pink-100 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-pink-200 dark:border-gray-700 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <img
                src={logoPath}
                alt="Nails of the Netherlands Logo"
                className="h-14 w-14 object-contain rounded-full border-2 border-pink-300"
              />
              <span className="text-lg font-bold text-pink-800 dark:text-beige-200">
                NAILS OF THE NETHERLANDS
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => scrollToSection("home")}
                className="text-pink-700 dark:text-beige-300 hover:text-pink-500 dark:hover:text-beige-400 font-medium transition-colors duration-200"
              >
                {t.nav.home}
              </button>
              <Link href="/pricelist">
                <button className="text-pink-700 dark:text-beige-300 hover:text-pink-500 dark:hover:text-beige-400 font-medium transition-colors duration-200">
                  {t.nav.pricelist}
                </button>
              </Link>
              <Link href="/gallery">
                <button className="text-pink-700 dark:text-beige-300 hover:text-pink-500 dark:hover:text-beige-400 font-medium transition-colors duration-200">
                  {t.nav.gallery}
                </button>
              </Link>
              <Link href="/products">
                <button className="text-pink-700 dark:text-beige-300 hover:text-pink-500 dark:hover:text-beige-400 font-medium transition-colors duration-200">
                  {t.nav.products}
                </button>
              </Link>
              <Link href="/klantenbeleid">
                <button className="text-pink-500 dark:text-beige-400 font-semibold transition-colors duration-200 border-b-2 border-pink-500">
                  {t.nav.policy}
                </button>
              </Link>
              <Link href="/contact">
                <button className="text-pink-700 dark:text-beige-300 hover:text-pink-500 dark:hover:text-beige-400 font-medium transition-colors duration-200">
                  {t.nav.contact}
                </button>
              </Link>

              <Button
                onClick={() => window.open("https://wa.me/31628699827", "_blank")}
                className="bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white px-6 py-2 rounded-full font-semibold shadow-md shadow-pink-200"
              >
                {t.nav.bookNow}
              </Button>

              {/* Language Flags */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setCurrentLanguage("en")}
                  className={`w-8 h-8 rounded-full overflow-hidden border-2 transition-all duration-200 hover:scale-110 ${
                    currentLanguage === "en" ? "border-pink-500" : "border-transparent opacity-70"
                  }`}
                  aria-label="Switch to English"
                >
                  <img
                    src="https://flagcdn.com/w40/gb.png"
                    alt="English"
                    className="w-full h-full object-cover"
                  />
                </button>
                <button
                  onClick={() => setCurrentLanguage("nl")}
                  className={`w-8 h-8 rounded-full overflow-hidden border-2 transition-all duration-200 hover:scale-110 ${
                    currentLanguage === "nl" ? "border-pink-500" : "border-transparent opacity-70"
                  }`}
                  aria-label="Switch to Dutch"
                >
                  <img
                    src="https://flagcdn.com/w40/nl.png"
                    alt="Dutch"
                    className="w-full h-full object-cover"
                  />
                </button>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-pink-600 dark:text-beige-200 hover:text-pink-500 transition-colors duration-200"
              >
                {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white/95 dark:bg-gray-900/95 border-t border-pink-200 dark:border-gray-700">
            <div className="px-6 py-4 space-y-3">
              <button
                onClick={() => scrollToSection("home")}
                className="block w-full text-left text-pink-700 dark:text-beige-300 hover:text-pink-500 dark:hover:text-beige-400 font-medium transition-colors duration-200"
              >
                {t.nav.home}
              </button>
              <Link href="/pricelist">
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full text-left text-pink-700 dark:text-beige-300 hover:text-pink-500 dark:hover:text-beige-400 font-medium transition-colors duration-200"
                >
                  {t.nav.pricelist}
                </button>
              </Link>
              <Link href="/gallery">
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full text-left text-pink-700 dark:text-beige-300 hover:text-pink-500 dark:hover:text-beige-400 font-medium transition-colors duration-200"
                >
                  {t.nav.gallery}
                </button>
              </Link>
              <Link href="/products">
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full text-left text-pink-700 dark:text-beige-300 hover:text-pink-500 dark:hover:text-beige-400 font-medium transition-colors duration-200"
                >
                  {t.nav.products}
                </button>
              </Link>
              <Link href="/klantenbeleid">
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full text-left text-pink-500 dark:text-beige-400 font-semibold transition-colors duration-200"
                >
                  {t.nav.policy}
                </button>
              </Link>
              <Link href="/contact">
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full text-left text-pink-700 dark:text-beige-300 hover:text-pink-500 dark:hover:text-beige-400 font-medium transition-colors duration-200"
                >
                  {t.nav.contact}
                </button>
              </Link>
              <Button
                onClick={() => window.open("https://wa.me/31628699827", "_blank")}
                className="w-full bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white py-2 rounded-full font-semibold"
              >
                {t.nav.bookNow}
              </Button>

              {/* Mobile Language Flags */}
              <div className="flex items-center justify-center space-x-4 pt-2">
                <button
                  onClick={() => setCurrentLanguage("en")}
                  className={`w-10 h-10 rounded-full overflow-hidden border-2 transition-all duration-200 hover:scale-110 ${
                    currentLanguage === "en" ? "border-pink-500" : "border-transparent opacity-70"
                  }`}
                  aria-label="Switch to English"
                >
                  <img
                    src="https://flagcdn.com/w40/gb.png"
                    alt="English"
                    className="w-full h-full object-cover"
                  />
                </button>
                <button
                  onClick={() => setCurrentLanguage("nl")}
                  className={`w-10 h-10 rounded-full overflow-hidden border-2 transition-all duration-200 hover:scale-110 ${
                    currentLanguage === "nl" ? "border-pink-500" : "border-transparent opacity-70"
                  }`}
                  aria-label="Switch to Dutch"
                >
                  <img
                    src="https://flagcdn.com/w40/nl.png"
                    alt="Dutch"
                    className="w-full h-full object-cover"
                  />
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Content */}
      <main className="max-w-3xl mx-auto px-6 pt-28 pb-16">
        <div className="relative">
          <div className="absolute -top-10 right-1/2 translate-x-1/2 w-32 h-32 bg-pink-200/50 rounded-full blur-3xl" />
          <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-40 h-40 bg-pink-100/60 rounded-full blur-3xl" />

          <Card className="relative bg-white/90 dark:bg-gray-900/90 border border-pink-200 shadow-xl">
            <CardHeader className="text-center space-y-4">
              <div className="flex justify-center">
                <Badge className="px-4 py-2 rounded-full bg-pink-100 text-pink-700 border-pink-200 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide">
                  <Heart className="h-4 w-4" />
                  Nails of the Netherlands
                </Badge>
              </div>
              <CardTitle className="text-3xl md:text-4xl font-extrabold text-pink-800 dark:text-beige-100 tracking-wide">
                {t.header.title}
              </CardTitle>
              <CardDescription className="text-lg text-pink-700/80 dark:text-beige-300 font-medium uppercase tracking-[0.3em]">
                {t.header.subtitle}
              </CardDescription>
              <p className="text-base md:text-lg text-pink-700 dark:text-beige-200 leading-relaxed">
                {t.header.intro}
              </p>
            </CardHeader>
            <CardContent className="space-y-8">
              {t.sections.map((section) => (
                <section key={section.title} className="bg-pink-50/60 dark:bg-gray-800/60 rounded-xl p-6 border border-pink-100 dark:border-gray-700 shadow-inner">
                  <h2 className="text-2xl font-bold text-pink-800 dark:text-beige-100 mb-4">{section.title}</h2>
                  <ul className="space-y-3 text-pink-700 dark:text-beige-200 leading-relaxed">
                    {section.items.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span className="mt-1 h-2 w-2 rounded-full bg-pink-400 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              ))}

              <div className="text-center bg-pink-100/70 dark:bg-gray-800/70 border border-pink-200 dark:border-gray-700 rounded-xl p-6 shadow-inner">
                <p className="text-base md:text-lg font-semibold text-pink-800 dark:text-beige-100">
                  {t.closing}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};
