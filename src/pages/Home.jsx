import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Shield, 
  Bell, 
  Phone, 
  FileText, 
  ChevronRight, 
  Users, 
  Map, 
  MessageCircle,
  Heart,
  Check,
  ExternalLink
} from 'lucide-react';

// Custom hook for scroll animation
const useScroll = () => {
  const [scrollY, setScrollY] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  return scrollY;
};

// Animated stats counter
const CountUp = ({ end, duration = 2 }) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [end, duration]);
  
  return <>{count.toLocaleString()}</>;
};

// Enhanced Feature Card with hover effects
const FeatureCard = ({ icon, title, description, delay }) => {
  const Icon = icon;
  return (
    <motion.div
      initial={{ y: 40, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, delay, type: "spring", stiffness: 100 }}
      whileHover={{ y: -8, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
      className="bg-white rounded-xl p-7 shadow-lg max-w-xs hover:bg-gradient-to-br hover:from-pink-50 hover:to-purple-50 transition-all duration-300"
    >
      <div className="mb-5">
        <div className="bg-pink-100 p-4 rounded-2xl inline-block mb-4">
          <Icon className="text-pink-700" size={28} />
        </div>
        <h3 className="text-xl font-bold text-purple-900 mb-2">{title}</h3>
        <p className="text-gray-700 leading-relaxed">{description}</p>
      </div>
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        whileHover={{ opacity: 1, y: 0 }}
        className="mt-4"
      >
        <Link to="/learn-more" className="text-pink-600 font-medium flex items-center">
          Learn more
          <ChevronRight className="ml-1" size={16} />
        </Link>
      </motion.div>
    </motion.div>
  );
};

// Pulsing emergency button
const EmergencyBanner = () => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 1.2 }}
      className="relative"
    >
      <motion.div
        animate={{ 
          scale: [1, 1.03, 1],
          boxShadow: [
            "0 0 0 0 rgba(239, 68, 68, 0.7)",
            "0 0 0 10px rgba(239, 68, 68, 0)",
            "0 0 0 0 rgba(239, 68, 68, 0)"
          ]
        }}
        transition={{ 
          duration: 2.5, 
          repeat: Infinity, 
          repeatType: "loop" 
        }}
        className="absolute inset-0 bg-transparent rounded-lg"
      />
      <motion.div
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`bg-gradient-to-r ${isHovered ? 'from-red-600 to-red-500' : 'from-red-500 to-red-400'} py-3 px-6 rounded-lg mt-8 flex items-center text-white cursor-pointer shadow-lg transition-all duration-300`}
      >
        <motion.div
          animate={{ rotate: isHovered ? [0, -10, 10, -10, 10, 0] : 0 }}
          transition={{ duration: 0.5 }}
        >
          <Phone className="mr-3" size={24} />
        </motion.div>
        <div>
          <span className="font-medium">Emergency? Call Helpline: </span>
          <span className="font-bold ml-1">1800-XXX-XXXX</span>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Testimonial carousel
const TestimonialCarousel = () => {
  const testimonials = [
    {
      quote: "ShieldHer gave me the confidence to navigate my daily commutes with peace of mind. The emergency alert feature has been invaluable during late-night travel.",
      author: "Sarah T., Community Member"
    },
    {
      quote: "The support system built into this app has been life-changing. I feel connected to a community that truly understands my experiences.",
      author: "Maya R., College Student"
    },
    {
      quote: "As someone who travels frequently for work, ShieldHer provides that extra layer of security I've always wanted. The location tracking feature gives my family peace of mind.",
      author: "Jennifer L., Business Professional"
    }
  ];
  
  const [currentIndex, setCurrentIndex] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 6000);
    
    return () => clearInterval(interval);
  }, [testimonials.length]);
  
  return (
    <div className="relative h-64">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.7 }}
          className="absolute inset-0 flex flex-col justify-center"
        >
          <blockquote className="text-lg italic mb-6 text-purple-700 leading-relaxed">
            "{testimonials[currentIndex].quote}"
          </blockquote>
          <p className="font-medium text-purple-900">— {testimonials[currentIndex].author}</p>
        </motion.div>
      </AnimatePresence>
      
      <div className="absolute bottom-0 left-0 right-0 flex justify-center space-x-2">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 w-2 rounded-full transition-all duration-300 ${
              index === currentIndex ? "bg-pink-600 w-6" : "bg-purple-300"
            }`}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

// Statistics section
const StatsSection = () => {
  const scrollY = useScroll();
  const isVisible = scrollY > 300;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="py-16 px-4 bg-white"
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-14 text-purple-800">Making a Difference</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {isVisible && (
            <>
              <div className="text-center">
                <p className="text-4xl font-bold text-pink-600 mb-2">
                  <CountUp end={500000} duration={2.5} />+
                </p>
                <p className="text-gray-700">Women Protected</p>
              </div>
              
              <div className="text-center">
                <p className="text-4xl font-bold text-pink-600 mb-2">
                  <CountUp end={1200} duration={2.5} />+
                </p>
                <p className="text-gray-700">Communities Served</p>
              </div>
              
              <div className="text-center">
                <p className="text-4xl font-bold text-pink-600 mb-2">
                  <CountUp end={98} duration={2.5} />%
                </p>
                <p className="text-gray-700">User Satisfaction</p>
              </div>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
};

// App features showcase
const AppShowcase = () => {
  const features = [
    { id: 1, text: "Real-time location sharing" },
    { id: 2, text: "Safe route recommendations" },
    { id: 3, text: "Community alerts" },
    { id: 4, text: "SOS emergency button" },
    { id: 5, text: "Voice-activated alerts" },
    { id: 6, text: "Offline functionality" }
  ];
  
  return (
    <div className="py-20 px-4 bg-gradient-to-br from-purple-900 via-purple-800 to-pink-800">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10">
        <div className="md:w-1/2">
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold mb-6 text-white"
          >
            The Most Comprehensive Safety App
          </motion.h2>
          
          <ul className="space-y-4">
            {features.map((feature, index) => (
              <motion.li 
                key={feature.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-center text-white"
              >
                <span className="bg-pink-500 rounded-full p-1 mr-3">
                  <Check size={16} />
                </span>
                <span>{feature.text}</span>
              </motion.li>
            ))}
          </ul>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8"
          >
            <Link to="/features">
              <button className="bg-white text-purple-900 py-3 px-6 rounded-lg font-medium flex items-center hover:bg-pink-50 transition-colors duration-300">
                Explore All Features
                <ExternalLink className="ml-2" size={18} />
              </button>
            </Link>
          </motion.div>
        </div>
        
        <div className="md:w-1/2 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative z-10"
          >
            <div className="bg-gray-900 rounded-3xl p-3 shadow-2xl mx-auto max-w-xs">
              <div className="bg-gradient-to-br from-pink-500 to-purple-700 rounded-2xl p-4 h-96 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <Shield size={64} className="mx-auto mb-4 opacity-80" />
                    <h3 className="text-xl font-bold mb-1">ShieldHer App</h3>
                    <p className="text-sm opacity-80">Always by your side</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Decorative elements */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="absolute top-20 -left-10 bg-pink-400 w-16 h-16 rounded-full opacity-30 blur-md"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="absolute bottom-20 -right-5 bg-purple-400 w-24 h-24 rounded-full opacity-30 blur-md"
          />
        </div>
      </div>
    </div>
  );
};

// Community Section
const CommunitySection = () => {
  const communities = [
    { icon: Users, title: "Support Circles", count: "10,000+" },
    { icon: Map, title: "Safe Zones Mapped", count: "25,000+" },
    { icon: MessageCircle, title: "Daily Conversations", count: "50,000+" }
  ];
  
  return (
    <div className="py-16 px-4 bg-pink-50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4 text-purple-800">Join Our Growing Community</h2>
          <p className="text-lg text-purple-700 max-w-2xl mx-auto">
            Connect with women worldwide who share your concerns and empower each other through shared experiences and support.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {communities.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-white p-6 rounded-xl shadow-md text-center hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex justify-center mb-4">
                <div className="bg-purple-100 p-4 rounded-full">
                  <item.icon className="text-purple-700" size={28} />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-purple-900 mb-2">{item.title}</h3>
              <p className="text-pink-600 font-bold text-lg">{item.count}</p>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-10 text-center"
        >
          <Link to="/community">
            <button className="bg-purple-100 text-purple-700 border-2 border-purple-300 py-3 px-6 rounded-lg font-medium hover:bg-purple-200 transition-colors duration-300">
              Join Our Community
            </button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

// Enhanced Home Component
const Home = () => {
  // Parallax effect for hero section
  const scrollY = useScroll();
  
  return (
    <div className="overflow-x-hidden bg-gradient-to-br from-pink-100 via-purple-50 to-indigo-100 text-purple-900">
      {/* Hero Section with Parallax */}
      <div 
        className="relative min-h-screen flex flex-col items-center justify-center py-16 px-4 text-center overflow-hidden"
        style={{ paddingTop: '80px' }}
      >
        {/* Decorative background elements */}
        <motion.div 
          animate={{ 
            y: scrollY * 0.2,
            opacity: 1 - scrollY * 0.001
          }}
          className="absolute top-20 right-20 bg-pink-300 w-48 h-48 rounded-full opacity-20 blur-xl"
        />
        <motion.div 
          animate={{ 
            y: scrollY * 0.3,
            opacity: 1 - scrollY * 0.001
          }}
          className="absolute bottom-40 left-10 bg-purple-400 w-56 h-56 rounded-full opacity-20 blur-xl"
        />
        <motion.div 
          animate={{ 
            y: scrollY * 0.1,
            opacity: 1 - scrollY * 0.001
          }}
          className="absolute top-60 left-1/4 bg-indigo-300 w-32 h-32 rounded-full opacity-20 blur-xl"
        />
        
        {/* Hero Content */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl relative z-10"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="inline-block mb-6"
          >
            <div className="bg-white bg-opacity-80 backdrop-blur-sm p-3 rounded-full inline-flex items-center shadow-md">
              <Shield className="text-pink-600 mr-2" size={24} />
              <span className="text-xl font-bold text-purple-800">ShieldHer</span>
            </div>
          </motion.div>
            
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-5xl md:text-6xl font-bold mb-6 text-purple-800 leading-tight"
          >
            Your Safety is <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-purple-600">Our Priority</span>
          </motion.h1>
          
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="text-xl mb-10 text-purple-700 max-w-2xl mx-auto leading-relaxed"
          >
            ShieldHer empowers women with safety tools, community support, and resources to navigate their world with confidence and peace of mind.
          </motion.p>
          
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="flex flex-wrap justify-center gap-5 mb-10"
          >
            <Link to="/register">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
                whileTap={{ scale: 0.98 }}
                className="bg-gradient-to-r from-pink-600 to-pink-500 py-4 px-8 rounded-lg shadow-lg font-bold text-lg flex items-center text-white"
              >
                Get Started
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop" }}
                >
                  <ChevronRight className="ml-2" size={20} />
                </motion.div>
              </motion.button>
            </Link>
            <Link to="/login">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
                whileTap={{ scale: 0.98 }}
                className="bg-white bg-opacity-90 backdrop-blur-sm border-2 border-purple-300 py-4 px-8 rounded-lg shadow-md hover:bg-purple-50 font-bold text-lg text-purple-700 transition-colors duration-300"
              >
                Sign In
              </motion.button>
            </Link>
          </motion.div>
          
          <EmergencyBanner />
        </motion.div>
        
        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop" }}
            className="flex flex-col items-center"
          >
            <p className="text-sm text-purple-700 mb-2">Scroll to explore</p>
            <div className="w-6 h-10 border-2 border-purple-400 rounded-full flex justify-center items-start p-1">
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop" }}
                className="w-2 h-2 bg-purple-500 rounded-full"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Features Section with enhanced styling */}
      <div className="py-20 px-4 bg-gradient-to-b from-purple-50 to-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-6 text-purple-800">How ShieldHer Protects You</h2>
            <p className="text-lg text-purple-700 max-w-2xl mx-auto">
              Our comprehensive safety features are designed to provide protection and peace of mind in every situation.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center">
            <FeatureCard 
              icon={Bell}
              title="Emergency Alerts"
              description="Send your location and alert to emergency contacts with a single tap in critical situations. Works even without cellular data."
              delay={0.2}
            />
            <FeatureCard 
              icon={Shield}
              title="Harassment Reporting"
              description="Document and report incidents of harassment with our secure and confidential reporting system with legal support options."
              delay={0.4}
            />
            <FeatureCard 
              icon={FileText}
              title="Safety Resources"
              description="Access guides, legal information, and support services tailored to your location and situation when you need them most."
              delay={0.6}
            />
            <FeatureCard 
              icon={Map}
              title="Safe Route Planning"
              description="Get recommendations for safer routes based on community data and real-time safety reports in your area."
              delay={0.8}
            />
            <FeatureCard 
              icon={Users}
              title="Community Support"
              description="Connect with a network of verified users who can provide support, advice, and assistance in your local area."
              delay={1}
            />
            <FeatureCard 
              icon={MessageCircle}
              title="24/7 Support Chat"
              description="Access trained support professionals anytime through our secure in-app messaging system for guidance and assistance."
              delay={1.2}
            />
          </div>
        </div>
      </div>

      {/* App Showcase Section */}
      <AppShowcase />

      {/* Stats Section */}
      <StatsSection />
      
      {/* Community Section */}
      <CommunitySection />

      {/* Enhanced Testimonial Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-20 px-4 bg-white"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-10 text-purple-800">Trusted by Women Across the Country</h2>
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-2xl shadow-lg">
            <TestimonialCarousel />
          </div>
        </div>
      </motion.div>

      {/* Call to Action Section */}
      <div className="py-20 px-4 bg-gradient-to-br from-pink-500 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Feel Safer Today?</h2>
            <p className="text-xl mb-10 opacity-90 max-w-2xl mx-auto">
              Join thousands of women who have taken control of their safety. Download ShieldHer now and experience peace of mind.
            </p>
            
            <div className="flex flex-wrap justify-center gap-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="bg-white py-4 px-8 rounded-lg shadow-lg font-bold text-lg text-purple-700 flex items-center"
              >
                Download App
                <Heart className="ml-2 text-pink-500" size={20} />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="bg-transparent border-2 border-white py-4 px-8 rounded-lg shadow-lg font-bold text-lg text-white flex items-center"
              >
                Schedule Demo
                <ExternalLink className="ml-2" size={20} />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>

        {/* Enhanced Footer */}
        <footer className="py-16 px-6 bg-purple-900 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
            <div>
              <div className="flex items-center mb-6">
                <Shield className="mr-2 text-pink-400" size={28} />
                <span className="text-2xl font-bold">ShieldHer</span>
              </div>
              <p className="text-purple-200 mb-6">
                Empowering women with safety tools, community support, and resources.
              </p>
              <div className="flex space-x-4">
                {/* Social media icons would go here */}
                <div className="w-10 h-10 rounded-full bg-purple-800 flex items-center justify-center hover:bg-pink-500 transition-colors duration-300 cursor-pointer">
                  <span className="sr-only">Instagram</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-bold text-lg mb-4">Features</h3>
              <ul className="space-y-3">
                <li><Link to="/emergency" className="text-purple-200 hover:text-pink-300 transition-colors">Emergency Alerts</Link></li>
                <li><Link to="/reporting" className="text-purple-200 hover:text-pink-300 transition-colors">Harassment Reporting</Link></li>
                <li><Link to="/resources" className="text-purple-200 hover:text-pink-300 transition-colors">Safety Resources</Link></li>
                <li><Link to="/community" className="text-purple-200 hover:text-pink-300 transition-colors">Community Support</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-lg mb-4">Company</h3>
              <ul className="space-y-3">
                <li><Link to="/about" className="text-purple-200 hover:text-pink-300 transition-colors">About Us</Link></li>
                <li><Link to="/team" className="text-purple-200 hover:text-pink-300 transition-colors">Our Team</Link></li>
                <li><Link to="/careers" className="text-purple-200 hover:text-pink-300 transition-colors">Careers</Link></li>
                <li><Link to="/blog" className="text-purple-200 hover:text-pink-300 transition-colors">Blog</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-lg mb-4">Support</h3>
              <ul className="space-y-3">
                <li><Link to="/help" className="text-purple-200 hover:text-pink-300 transition-colors">Help Center</Link></li>
                <li><Link to="/contact" className="text-purple-200 hover:text-pink-300 transition-colors">Contact Us</Link></li>
                <li><Link to="/privacy" className="text-purple-200 hover:text-pink-300 transition-colors">Privacy Policy</Link></li>
                <li><Link to="/terms" className="text-purple-200 hover:text-pink-300 transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 mt-8 border-t border-purple-800 flex flex-col md:flex-row justify-between items-center">
            <p className="text-purple-300 text-sm">
              © {new Date().getFullYear()} ShieldHer. All rights reserved. Created with care for women's safety.
            </p>
            <div className="mt-4 md:mt-0">
              <button className="bg-pink-500 hover:bg-pink-600 transition-colors duration-300 text-white py-2 px-4 rounded-lg text-sm font-medium">
                Download App
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;