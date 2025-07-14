import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Sparkles, Star, MapPin, Phone, Mail, Clock, Menu, X } from "lucide-react";
import { Link } from "wouter";
import logoPath from "@assets/image_1752511415001.png";

export const Box = (): JSX.Element => {
  const [activeTab, setActiveTab] = useState<'services' | 'pricing'>('services');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
                <button className="text-pink-700 dark:text-pink-300 hover:text-pink-500 dark:hover:text-pink-400 font-medium transition-colors duration-200">
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
                    className="text-pink-700 dark:text-pink-300 hover:text-pink-500 dark:hover:text-pink-400 font-medium text-left transition-colors duration-200"
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

      {/* Hero Banner Section */}
      <section id="home" className="relative h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-rose-50 to-pink-200 dark:from-gray-800 dark:to-gray-900 overflow-hidden pt-16">
        {/* Background image */}
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1604654894610-df63bc536371?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80" 
            alt="Luxury nail spa background" 
            className="w-full h-full object-cover"
          />
        </div>
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/60"></div>
        {/* Floating decorative elements */}
        <div className="absolute inset-0 pointer-events-none">
          <Heart className="absolute top-20 left-10 text-pink-300 w-8 h-8 animate-float opacity-40" />
          <Sparkles className="absolute top-40 right-20 text-pink-400 w-6 h-6 animate-bounce-gentle opacity-50" />
          <Star className="absolute bottom-40 left-20 text-pink-300 w-5 h-5 animate-pulse-gentle opacity-30" />
          <Heart className="absolute bottom-20 right-10 text-pink-400 w-6 h-6 animate-float animation-delay-200 opacity-40" />
        </div>
        
        <div className="text-center z-10 max-w-4xl px-6">
          <div className="flex justify-center mb-8">
            <div className="relative">
              <img 
                src={logoPath} 
                alt="Nails of the Netherlands Leeuwarden Logo" 
                className="h-32 w-32 object-contain animate-pulse-gentle rounded-full border-4 border-pink-300 p-4 bg-white shadow-2xl"
              />
              <div className="absolute -top-3 -right-3">
                <Sparkles className="w-8 h-8 text-pink-500 animate-bounce-gentle" />
              </div>
            </div>
          </div>
          
          <h1 className="text-7xl font-bold text-white dark:text-white mb-6 animate-fade-in-up drop-shadow-2xl">
            NAILS OF THE NETHERLANDS
          </h1>
          
          <p className="text-3xl text-pink-200 dark:text-pink-200 font-medium mb-8 animate-fade-in-up animation-delay-200 drop-shadow-lg">
            The Best in Leeuwarden
          </p>
          
          <p className="text-xl text-pink-100 dark:text-pink-100 mb-12 max-w-2xl mx-auto animate-fade-in-up animation-delay-400 drop-shadow-lg">
            Quality – Prestige – Responsibility define our brand
          </p>
          
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 px-12 py-4 text-xl rounded-full animate-fade-in-up animation-delay-400"
          >
            BOOK APPOINTMENT
          </Button>
        </div>
      </section>

      {/* About Us Section */}
      <section id="contact" className="py-20 bg-gradient-to-br from-pink-50 via-purple-50 to-rose-100 dark:from-gray-800 dark:to-gray-700 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-32 h-32 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
          <div className="absolute top-40 right-20 w-32 h-32 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-32 h-32 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
          <div className="absolute bottom-20 right-10 w-32 h-32 bg-rose-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-1000"></div>
        </div>
        
        {/* Floating Hearts */}
        <div className="absolute inset-0 pointer-events-none">
          <Heart className="absolute top-32 left-1/4 text-pink-200 w-6 h-6 animate-float opacity-20" />
          <Heart className="absolute top-20 right-1/3 text-rose-200 w-4 h-4 animate-bounce-gentle opacity-30" />
          <Sparkles className="absolute bottom-32 left-1/3 text-purple-200 w-5 h-5 animate-pulse-gentle opacity-25" />
          <Star className="absolute bottom-20 right-1/4 text-pink-200 w-6 h-6 animate-float animation-delay-1000 opacity-20" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="animate-fade-in-up">
              <h2 className="text-5xl font-bold text-pink-800 dark:text-pink-200 mb-8">ABOUT US</h2>
              <p className="text-lg text-pink-700 dark:text-pink-300 mb-8 leading-relaxed">
                Premium nail salon in Leeuwarden city center, we offer nail, pedicure, eyelash extensions and waxing services. 
                We have a high-quality, well-trained and professional team. Quality – Price makes the brand.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-pink-800 dark:text-pink-200">Address</h3>
                    <p className="text-pink-600 dark:text-pink-400">Leeuwarden City Center, Netherlands</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-pink-800 dark:text-pink-200">Hotline</h3>
                    <p className="text-pink-600 dark:text-pink-400">+31 (0)58 XXX XXXX</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-pink-800 dark:text-pink-200">Opening Hours</h3>
                    <p className="text-pink-600 dark:text-pink-400">Mon-Sat: 9:00 - 18:00</p>
                  </div>
                </div>
              </div>
              
              <Button className="mt-8 bg-pink-500 hover:bg-pink-600 text-white px-8 py-3 rounded-full">
                CONTACT US
              </Button>
            </div>
            
            <div className="relative animate-fade-in-up animation-delay-200">
              <div className="w-full h-96 bg-gradient-to-br from-pink-200 to-rose-300 rounded-3xl shadow-2xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" 
                  alt="Luxury spa room interior with comfortable seating and relaxing atmosphere" 
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Elegant overlay with spa room details */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-3xl"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-2xl font-bold mb-2 drop-shadow-lg">Luxury Spa Experience</h3>
                <p className="text-pink-100 drop-shadow-md">Relax in our beautiful, modern spa rooms designed for your comfort</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services & Pricing Section with Tabs */}
      <section id="services" className="py-20 bg-gradient-to-tr from-rose-50 via-pink-50 to-purple-100 dark:from-gray-800 dark:to-gray-900 relative overflow-hidden">
        {/* Geometric Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ec4899' fill-opacity='0.3'%3E%3Cpath d='m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>
        
        {/* Floating Service Icons */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-12 w-16 h-16 bg-pink-200 rounded-full flex items-center justify-center animate-float opacity-20">
            <Heart className="w-8 h-8 text-pink-600" />
          </div>
          <div className="absolute top-32 right-16 w-12 h-12 bg-purple-200 rounded-full flex items-center justify-center animate-bounce-gentle opacity-25">
            <Sparkles className="w-6 h-6 text-purple-600" />
          </div>
          <div className="absolute bottom-40 left-20 w-14 h-14 bg-rose-200 rounded-full flex items-center justify-center animate-pulse-gentle opacity-20">
            <Star className="w-7 h-7 text-rose-600" />
          </div>
          <div className="absolute bottom-20 right-24 w-18 h-18 bg-pink-200 rounded-full flex items-center justify-center animate-float animation-delay-2000 opacity-15">
            <Heart className="w-9 h-9 text-pink-600" />
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <h2 className="text-5xl font-bold text-pink-800 dark:text-pink-200 text-center mb-16">SERVICES & PRICING</h2>
          
          <div className="w-full">
            <div className="flex justify-center mb-12">
              <div className="grid w-full max-w-md grid-cols-2 h-14 bg-white dark:bg-gray-700 rounded-full p-2 shadow-lg">
                <button 
                  onClick={() => setActiveTab('services')}
                  className={`rounded-full text-lg font-semibold transition-all duration-300 ${
                    activeTab === 'services' 
                      ? 'bg-pink-500 text-white' 
                      : 'text-gray-600 dark:text-gray-300 hover:text-pink-500'
                  }`}
                >
                  Our Services
                </button>
                <button 
                  onClick={() => setActiveTab('pricing')}
                  className={`rounded-full text-lg font-semibold transition-all duration-300 ${
                    activeTab === 'pricing' 
                      ? 'bg-pink-500 text-white' 
                      : 'text-gray-600 dark:text-gray-300 hover:text-pink-500'
                  }`}
                >
                  Pricing & Packages
                </button>
              </div>
            </div>

            <div id="pricing"></div>

            {activeTab === 'services' && (
            <div className="space-y-8">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Nail Care */}
            <Card className="bg-gradient-to-br from-pink-50 to-rose-50 dark:from-gray-800 dark:to-gray-700 border-none shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 text-center p-6 group overflow-hidden">
              <div className="flex justify-center mb-4">
                <div className="w-24 h-24 bg-gradient-to-br from-pink-100 to-rose-200 rounded-full flex items-center justify-center group-hover:animate-bounce-gentle overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1519014816548-bf5fe059798b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80" 
                    alt="Nail care" 
                    className="w-16 h-16 object-cover rounded-full"
                  />
                </div>
              </div>
              <CardTitle className="text-xl font-bold text-pink-800 dark:text-pink-200 mb-4">
                Nail Care
              </CardTitle>
              <CardDescription className="text-pink-600 dark:text-pink-300 mb-4">
                New modelling gel/acrylic, manicure, nail design, Shellac
              </CardDescription>
            </Card>

            {/* Foot Care */}
            <Card className="bg-gradient-to-br from-pink-50 to-rose-50 dark:from-gray-800 dark:to-gray-700 border-none shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 text-center p-6 group overflow-hidden">
              <div className="flex justify-center mb-4">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-cyan-200 rounded-full flex items-center justify-center group-hover:animate-bounce-gentle overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1595187729633-5ee2d3604e59?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80" 
                    alt="Foot care spa" 
                    className="w-20 h-16 object-cover rounded-full"
                  />
                </div>
              </div>
              <CardTitle className="text-xl font-bold text-pink-800 dark:text-pink-200 mb-4">
                Foot Care
              </CardTitle>
              <CardDescription className="text-pink-600 dark:text-pink-300 mb-4">
                Clean feet, exfoliate, paint toenails, relaxing treatments
              </CardDescription>
            </Card>

            {/* Eyelash Extensions */}
            <Card className="bg-gradient-to-br from-pink-50 to-rose-50 dark:from-gray-800 dark:to-gray-700 border-none shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 text-center p-8 group">
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-pink-500 rounded-full flex items-center justify-center group-hover:animate-bounce-gentle overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80" 
                    alt="Eyelash extensions" 
                    className="w-10 h-10 object-cover rounded-full"
                  />
                </div>
              </div>
              <CardTitle className="text-xl font-bold text-pink-800 dark:text-pink-200 mb-4">
                Eyelash Extensions
              </CardTitle>
              <CardDescription className="text-pink-600 dark:text-pink-300 mb-4">
                Volume Lashes, Mega Volume Lashes, professional application
              </CardDescription>
            </Card>

            {/* Waxing */}
            <Card className="bg-gradient-to-br from-pink-50 to-rose-50 dark:from-gray-800 dark:to-gray-700 border-none shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 text-center p-8 group">
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-pink-500 rounded-full flex items-center justify-center group-hover:animate-bounce-gentle overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80" 
                    alt="Waxing services" 
                    className="w-10 h-10 object-cover rounded-full"
                  />
                </div>
              </div>
              <CardTitle className="text-xl font-bold text-pink-800 dark:text-pink-200 mb-4">
                Waxing
              </CardTitle>
              <CardDescription className="text-pink-600 dark:text-pink-300 mb-4">
                Professional waxing services with warm wax, gentle and effective
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
                    <CardHeader className="bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-t-xl">
                      <CardTitle className="text-2xl font-bold text-center">Nail Services</CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div className="flex justify-between items-center py-3 border-b border-pink-200 dark:border-gray-600">
                          <div>
                            <span className="text-pink-700 dark:text-pink-300 font-medium">New Acryl/Gel with color</span>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Professional application</p>
                          </div>
                          <Badge className="bg-pink-500 text-white text-lg px-3 py-1">€90</Badge>
                        </div>
                        <div className="flex justify-between items-center py-3 border-b border-pink-200 dark:border-gray-600">
                          <div>
                            <span className="text-pink-700 dark:text-pink-300 font-medium">Fill Acryl/Gel with color</span>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Maintenance service</p>
                          </div>
                          <Badge className="bg-pink-500 text-white text-lg px-3 py-1">€70</Badge>
                        </div>
                        <div className="flex justify-between items-center py-3 border-b border-pink-200 dark:border-gray-600">
                          <div>
                            <span className="text-pink-700 dark:text-pink-300 font-medium">Ombre/French Design</span>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Gradient & French tips</p>
                          </div>
                          <Badge className="bg-pink-500 text-white text-lg px-3 py-1">€80</Badge>
                        </div>
                        <div className="flex justify-between items-center py-3 border-b border-pink-200 dark:border-gray-600">
                          <div>
                            <span className="text-pink-700 dark:text-pink-300 font-medium">Pedicure with Shellac</span>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Complete foot treatment</p>
                          </div>
                          <Badge className="bg-pink-500 text-white text-lg px-3 py-1">€80</Badge>
                        </div>
                        <div className="flex justify-between items-center py-3">
                          <div>
                            <span className="text-pink-700 dark:text-pink-300 font-medium">Manicure with Shellac</span>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Hand care & polish</p>
                          </div>
                          <Badge className="bg-pink-500 text-white text-lg px-3 py-1">€60</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-pink-500 to-rose-500 text-white border-none shadow-2xl">
                    <CardContent className="p-6 text-center">
                      <h3 className="text-2xl font-bold mb-4">Special Package Deal</h3>
                      <p className="text-pink-100 mb-4">
                        Get a full manicure + pedicure combo for the best value!
                      </p>
                      <div className="flex items-center justify-center space-x-2 mb-4">
                        <span className="text-lg line-through opacity-70">€140</span>
                        <span className="text-3xl font-bold">€120</span>
                      </div>
                      <Button className="bg-white text-pink-500 hover:bg-pink-50 font-semibold px-6 py-2 rounded-full transition-all duration-300 hover:scale-105">
                        Book Now & Save €20
                      </Button>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="space-y-6">
                  <div className="relative animate-fade-in-up">
                    <div className="w-full h-80 bg-gradient-to-br from-pink-200 to-rose-300 rounded-3xl shadow-2xl overflow-hidden">
                      <img 
                        src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" 
                        alt="Elegant spa room with modern décor and relaxing ambiance" 
                        className="w-full h-full object-cover"
                      />
                      {/* Elegant overlay with spa room details */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                      <div className="absolute bottom-6 left-6 text-white">
                        <h3 className="text-2xl font-bold mb-2 drop-shadow-lg">Luxury Spa Room</h3>
                        <p className="text-pink-100 drop-shadow-md">Experience ultimate relaxation in our beautifully designed spa environment</p>
                      </div>
                    </div>
                  </div>

                  <div className="text-center">
                    <Button className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white px-12 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:scale-105 shadow-2xl">
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
      <section className="py-20 bg-gradient-to-bl from-purple-50 via-pink-50 to-rose-100 dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">
        {/* Radial Gradient Overlays */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-72 h-72 bg-gradient-radial from-pink-200/30 to-transparent rounded-full animate-pulse-slow"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-gradient-radial from-purple-200/20 to-transparent rounded-full animate-pulse-slow animation-delay-3000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-radial from-rose-200/25 to-transparent rounded-full animate-pulse-slow animation-delay-1500"></div>
        </div>
        
        {/* Sparkle Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <Sparkles className="absolute top-16 left-1/4 text-pink-300 w-4 h-4 animate-twinkle opacity-40" />
          <Sparkles className="absolute top-24 right-1/3 text-purple-300 w-3 h-3 animate-twinkle animation-delay-1000 opacity-50" />
          <Sparkles className="absolute bottom-24 left-1/3 text-rose-300 w-5 h-5 animate-twinkle animation-delay-2000 opacity-30" />
          <Sparkles className="absolute bottom-16 right-1/4 text-pink-300 w-4 h-4 animate-twinkle animation-delay-500 opacity-45" />
          <Star className="absolute top-32 left-2/3 text-purple-300 w-3 h-3 animate-twinkle animation-delay-3000 opacity-35" />
          <Star className="absolute bottom-32 left-1/5 text-rose-300 w-4 h-4 animate-twinkle animation-delay-1500 opacity-40" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <h2 className="text-5xl font-bold text-pink-800 dark:text-pink-200 text-center mb-16">OUR GALLERY</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-3xl transition-all duration-300">
              <img 
                src="https://images.unsplash.com/photo-1604654894610-df63bc536371?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80" 
                alt="Creative nail art designs" 
                className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-white text-xl font-bold">Creative Designs</p>
              </div>
            </div>
            <div className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-3xl transition-all duration-300">
              <img 
                src="https://images.unsplash.com/photo-1632345031435-8727f6897d53?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80" 
                alt="Elegant nail styles" 
                className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-110"
              />
               <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-white text-xl font-bold">Elegant Styles</p>
              </div>
            </div>
            <div className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-3xl transition-all duration-300">
              <img 
                src="https://images.unsplash.com/photo-1519014816548-bf5fe059798b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80" 
                alt="Modern nail looks" 
                className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-110"
              />
               <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-white text-xl font-bold">Modern Looks</p>
              </div>
            </div>
            <div className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-3xl transition-all duration-300">
              <img 
                src="https://images.unsplash.com/photo-1610992015732-2449b76344bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80" 
                alt="Vibrant nail colors" 
                className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-110"
              />
               <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-white text-xl font-bold">Vibrant Colors</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-20 bg-gradient-to-r from-amber-50 via-pink-50 to-purple-100 dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">
        {/* Diagonal Stripes Background */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(236, 72, 153, 0.1) 10px, rgba(236, 72, 153, 0.1) 20px)`
          }}></div>
        </div>
        
        {/* Floating Product Icons */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-24 left-16 w-8 h-8 bg-pink-300 rounded-full animate-bounce-gentle opacity-20"></div>
          <div className="absolute top-16 right-20 w-6 h-6 bg-purple-300 rounded-full animate-float opacity-25"></div>
          <div className="absolute bottom-32 left-24 w-10 h-10 bg-amber-300 rounded-full animate-pulse-gentle opacity-20"></div>
          <div className="absolute bottom-16 right-16 w-7 h-7 bg-rose-300 rounded-full animate-bounce-gentle animation-delay-1000 opacity-30"></div>
          <div className="absolute top-1/2 left-12 w-5 h-5 bg-pink-400 rounded-full animate-float animation-delay-2000 opacity-25"></div>
          <div className="absolute top-1/3 right-12 w-9 h-9 bg-purple-400 rounded-full animate-pulse-gentle animation-delay-3000 opacity-20"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <h2 className="text-5xl font-bold text-pink-800 dark:text-pink-200 text-center mb-16">FEATURED PRODUCTS</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {/* Nail Polish Collection */}
            <div className="relative group overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <div className="aspect-square bg-gradient-to-br from-pink-100 to-rose-200 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80" 
                  alt="Premium nail polish collection" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="font-bold text-lg">Nail Polish</h3>
                <p className="text-sm opacity-90">Premium Collection</p>
              </div>
            </div>
            
            {/* Nail Care Tools */}
            <div className="relative group overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <div className="aspect-square bg-gradient-to-br from-pink-100 to-rose-200 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1519014816548-bf5fe059798b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80" 
                  alt="Professional nail care tools" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="font-bold text-lg">Care Tools</h3>
                <p className="text-sm opacity-90">Professional Kit</p>
              </div>
            </div>

            {/* Gel Polish Collection */}
            <div className="relative group overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <div className="aspect-square bg-gradient-to-br from-pink-100 to-rose-200 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1604654894610-df63bc536371?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80" 
                  alt="Gel polish collection" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="font-bold text-lg">Gel Polish</h3>
                <p className="text-sm opacity-90">Long-lasting Shine</p>
              </div>
            </div>

            {/* Nail Art Accessories */}
            <div className="relative group overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <div className="aspect-square bg-gradient-to-br from-orange-100 to-amber-200 overflow-hidden">
                <img 
                  src="https://unsplash.com/photos/a-woman-getting-her-nails-done-at-a-nail-salon-gb6gtiTZKB8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80" 
                  alt="Nail art accessories and decorations" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="font-bold text-lg">Art Supplies</h3>
                <p className="text-sm opacity-90">Creative Tools</p>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <Button className="bg-pink-500 hover:bg-pink-600 text-white px-12 py-4 rounded-full text-lg font-semibold">
              BOOKING
            </Button>
          </div>
        </div>
      </section>

      {/* Customer Testimonials */}
      <section className="py-20 bg-gradient-to-tl from-violet-100 via-pink-100 to-amber-50 dark:from-gray-800 dark:to-gray-700 relative overflow-hidden">
        {/* Wave Pattern Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='20' viewBox='0 0 100 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M21.184 20c.357-.13.72-.264 1.088-.402l1.768-.661C33.64 15.347 39.647 14 50 14c10.271 0 15.362 1.222 24.629 4.928.955.383 1.869.74 2.75 1.072h6.225c-2.51-.73-5.139-1.691-8.233-2.928C65.888 13.278 60.562 12 50 12c-10.626 0-16.855 1.397-26.66 5.063l-1.767.662c-2.475.923-4.66 1.674-6.724 2.275h6.335zm0-20C13.258 2.892 8.077 4 0 4V2c5.744 0 9.951-.574 14.85-2h6.334zM77.38 0C85.239 2.966 90.502 4 100 4V2c-6.842 0-11.386-.542-16.396-2h-6.225zM0 14c8.44 0 13.718-1.21 22.272-4.402l1.768-.661C33.64 5.347 39.647 4 50 4c10.271 0 15.362 1.222 24.629 4.928C84.112 12.722 89.438 14 100 14v-2c-10.271 0-15.362-1.222-24.629-4.928C65.888 3.278 60.562 2 50 2 39.374 2 33.145 3.397 23.34 7.063l-1.767.662C13.223 10.84 8.163 12 0 12v2z' fill='%23ec4899' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E")`
          }}></div>
        </div>
        
        {/* Testimonial Hearts */}
        <div className="absolute inset-0 pointer-events-none">
          <Heart className="absolute top-20 left-16 text-pink-200 w-5 h-5 animate-pulse-gentle opacity-30" />
          <Heart className="absolute top-32 right-20 text-violet-200 w-4 h-4 animate-float opacity-25" />
          <Heart className="absolute bottom-24 left-20 text-amber-200 w-6 h-6 animate-bounce-gentle opacity-20" />
          <Heart className="absolute bottom-16 right-16 text-pink-200 w-4 h-4 animate-pulse-gentle animation-delay-1000 opacity-35" />
          <Star className="absolute top-1/3 left-1/4 text-violet-200 w-3 h-3 animate-twinkle animation-delay-2000 opacity-40" />
          <Star className="absolute bottom-1/3 right-1/4 text-amber-200 w-5 h-5 animate-twinkle animation-delay-3000 opacity-30" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <h2 className="text-5xl font-bold text-pink-800 dark:text-pink-200 text-center mb-16">CUSTOMER FEEDBACK</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: "Emma S.", text: "Fantastic service and beautiful nails! I've never been happier with the results." },
              { name: "Lisa M.", text: "The ambiance is so calming, and the staff are absolute professionals. Highly recommended!" },
              { name: "Sarah K.", text: "A perfect experience! My nails look flawless, and the staff were so welcoming." },
              { name: "Anna B.", text: "Every detail was perfect. The quality of service here is unmatched. I'll be back!" },
              { name: "Julia H.", text: "This place is amazing! My nails have never looked this good, and the team is so friendly." },
              { name: "Nina L.", text: "Such a wonderful experience every time I come here. Great results and fantastic service!" }
            ].map((testimonial, index) => (
              <Card key={index} className="bg-white dark:bg-gray-800 border-none shadow-xl p-6 hover:shadow-2xl transition-all duration-300">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold text-pink-800 dark:text-pink-200">{testimonial.name}</h3>
                </div>
                <p className="text-pink-600 dark:text-pink-300 italic">"{testimonial.text}"</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 bg-pink-800 dark:bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12">
            <div>
              <h3 className="text-2xl font-bold mb-6">NAILS OF THE NETHERLANDS</h3>
              <p className="text-pink-200 mb-6">Premium nail salon in Leeuwarden providing exceptional beauty services with quality and prestige.</p>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-6">Contact</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5" />
                  <span className="text-pink-200">info@nailsnetherlands.nl</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5" />
                  <span className="text-pink-200">+31 (0)58 XXX XXXX</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5" />
                  <span className="text-pink-200">Leeuwarden City Center, Netherlands</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-6">Opening Hours</h3>
              <div className="space-y-2 text-pink-200">
                <p>Monday - Friday: 9:00 - 18:00</p>
                <p>Saturday: 9:00 - 17:00</p>
                <p>Sunday: Closed</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-pink-700 mt-12 pt-8 text-center">
            <p className="text-pink-200">© 2024 Nails of the Netherlands Leeuwarden. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
