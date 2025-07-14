import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Star, Heart, Sparkles, CheckCircle, Menu, X } from "lucide-react";
import { Link } from "wouter";
import logoPath from "@assets/image_1752511415001.png";

export const Services = (): JSX.Element => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  const services = [
    {
      id: 1,
      title: "Premium Nail Care",
      subtitle: "Complete Nail Transformation",
      image: "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      price: "€45 - €90",
      duration: "60-90 min",
      description: "Experience our signature nail care service featuring professional manicures, nail art designs, and long-lasting gel applications. Our skilled technicians use premium products to ensure your nails look flawless and healthy.",
      features: [
        "Nail shaping and cuticle care",
        "Hand massage and moisturizing treatment",
        "Choice of regular polish or gel application",
        "Custom nail art designs available",
        "Nail strengthening treatments"
      ],
      popular: true
    },
    {
      id: 2,
      title: "Luxury Pedicure Spa",
      subtitle: "Relaxation for Your Feet",
      image: "https://images.unsplash.com/photo-1595187729633-5ee2d3604e59?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      price: "€35 - €65",
      duration: "45-75 min",
      description: "Indulge in our luxurious pedicure experience with foot soaking, exfoliation, and massage. Perfect for tired feet that need pampering and professional care in a relaxing spa environment.",
      features: [
        "Warm foot soak with essential oils",
        "Callus removal and exfoliation",
        "Relaxing foot and leg massage",
        "Toenail shaping and polish",
        "Moisturizing treatment"
      ],
      popular: false
    },
    {
      id: 3,
      title: "Eyelash Extensions",
      subtitle: "Beautiful, Dramatic Lashes",
      image: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      price: "€55 - €120",
      duration: "90-120 min",
      description: "Enhance your natural beauty with our professional eyelash extension service. Choose from classic, volume, or mega volume lashes for a stunning, long-lasting result that eliminates the need for mascara.",
      features: [
        "Individual lash application",
        "Choice of curl, length, and thickness",
        "Natural or dramatic volume options",
        "Lash-safe adhesive",
        "Aftercare instructions included"
      ],
      popular: true
    },
    {
      id: 4,
      title: "Professional Waxing",
      subtitle: "Smooth, Hair-Free Skin",
      image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      price: "€20 - €80",
      duration: "15-60 min",
      description: "Experience gentle yet effective hair removal with our professional waxing services. Using high-quality warm wax, we provide comfortable treatments for various body areas with long-lasting results.",
      features: [
        "Premium warm wax application",
        "Pre and post-treatment care",
        "Various area options available",
        "Soothing aftercare products",
        "Professional hygiene standards"
      ],
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-pink-200 dark:border-gray-700 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <img 
                src={logoPath} 
                alt="Nails of the Netherlands Logo" 
                className="h-10 w-10 object-contain rounded-full border-2 border-pink-300"
              />
              <span className="text-lg font-bold text-pink-800 dark:text-pink-200">
                NAILS OF THE NETHERLANDS
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <button 
                onClick={() => scrollToSection('home')}
                className="text-pink-700 dark:text-pink-300 hover:text-pink-500 dark:hover:text-pink-400 font-medium transition-colors duration-200"
              >
                Home
              </button>
              <Link href="/services">
                <button className="text-pink-500 dark:text-pink-400 font-semibold transition-colors duration-200 border-b-2 border-pink-500">
                  Services
                </button>
              </Link>
              <button 
                onClick={() => scrollToSection('pricing')}
                className="text-pink-700 dark:text-pink-300 hover:text-pink-500 dark:hover:text-pink-400 font-medium transition-colors duration-200"
              >
                Pricing
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="text-pink-700 dark:text-pink-300 hover:text-pink-500 dark:hover:text-pink-400 font-medium transition-colors duration-200"
              >
                Contact
              </button>
              <Button 
                onClick={() => scrollToSection('contact')}
                className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white px-6 py-2 rounded-full font-semibold"
              >
                BOOK NOW
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-pink-700 dark:text-pink-300 hover:text-pink-500 dark:hover:text-pink-400"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden absolute top-16 left-0 right-0 bg-white dark:bg-gray-900 border-b border-pink-200 dark:border-gray-700 shadow-lg">
              <div className="flex flex-col space-y-4 p-6">
                <button 
                  onClick={() => scrollToSection('home')}
                  className="text-pink-700 dark:text-pink-300 hover:text-pink-500 dark:hover:text-pink-400 font-medium text-left transition-colors duration-200"
                >
                  Home
                </button>
                <Link href="/services">
                  <button 
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-pink-500 dark:text-pink-400 font-semibold text-left transition-colors duration-200"
                  >
                    Services
                  </button>
                </Link>
                <button 
                  onClick={() => scrollToSection('pricing')}
                  className="text-pink-700 dark:text-pink-300 hover:text-pink-500 dark:hover:text-pink-400 font-medium text-left transition-colors duration-200"
                >
                  Pricing
                </button>
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="text-pink-700 dark:text-pink-300 hover:text-pink-500 dark:hover:text-pink-400 font-medium text-left transition-colors duration-200"
                >
                  Contact
                </button>
                <Button 
                  onClick={() => scrollToSection('contact')}
                  className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white px-6 py-2 rounded-full font-semibold w-full"
                >
                  BOOK NOW
                </Button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Header */}
      <div className="bg-gradient-to-r from-pink-100 to-rose-100 dark:from-gray-800 dark:to-gray-700 pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-6">          
          <div className="text-center">
            <h1 className="text-6xl font-bold text-pink-800 dark:text-pink-200 mb-6">
              OUR SERVICES
            </h1>
            <p className="text-xl text-pink-600 dark:text-pink-300 max-w-3xl mx-auto leading-relaxed">
              Discover our premium nail and spa services designed to pamper you and enhance your natural beauty. 
              Each service is performed by our skilled professionals using high-quality products.
            </p>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="space-y-16">
            {services.map((service, index) => (
              <div key={service.id} className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
                {/* Image */}
                <div className={`relative group ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                  <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                    <img 
                      src={service.image}
                      alt={service.title}
                      className="w-full h-96 object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    
                    {service.popular && (
                      <div className="absolute top-6 left-6">
                        <Badge className="bg-pink-500 text-white px-4 py-2 text-sm font-semibold">
                          <Star className="w-4 h-4 mr-1" />
                          Most Popular
                        </Badge>
                      </div>
                    )}
                    
                    <div className="absolute bottom-6 left-6 text-white">
                      <div className="flex items-center gap-4 mb-2">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span className="text-sm">{service.duration}</span>
                        </div>
                        <div className="text-2xl font-bold">{service.price}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className={`space-y-6 ${index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                  <div>
                    <h2 className="text-4xl font-bold text-pink-800 dark:text-pink-200 mb-2">
                      {service.title}
                    </h2>
                    <p className="text-xl text-pink-600 dark:text-pink-300 font-medium mb-4">
                      {service.subtitle}
                    </p>
                    <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-xl font-semibold text-pink-800 dark:text-pink-200 flex items-center gap-2">
                      <Sparkles className="w-5 h-5" />
                      What's Included:
                    </h3>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                          <CheckCircle className="w-5 h-5 text-pink-500 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 pt-6">
                    <Button className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-lg">
                      <Heart className="w-4 h-4 mr-2" />
                      Book This Service
                    </Button>
                    <Button variant="outline" className="border-pink-300 text-pink-700 hover:bg-pink-50 dark:hover:bg-gray-700 px-8 py-3 rounded-full font-semibold">
                      Learn More
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-pink-50 to-rose-50 dark:from-gray-800 dark:to-gray-700">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-4xl font-bold text-pink-800 dark:text-pink-200 mb-6">
            Ready to Pamper Yourself?
          </h2>
          <p className="text-xl text-pink-600 dark:text-pink-300 mb-8 leading-relaxed">
            Book your appointment today and experience the best nail and spa services in Leeuwarden. 
            Our professional team is ready to help you look and feel your best.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white px-12 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:scale-105 shadow-xl">
              <Clock className="w-5 h-5 mr-2" />
              BOOK APPOINTMENT
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}; 