import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Shield, Bell, Phone, FileText, ChevronRight } from 'lucide-react';

const FeatureCard = ({ icon, title, description, delay }) => {
  const Icon = icon;
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay }}
      className="bg-white bg-opacity-80 backdrop-blur-md rounded-lg p-6 shadow-lg max-w-xs"
    >
      <div className="flex items-center mb-4">
        <div className="bg-pink-100 p-3 rounded-full mr-4">
          <Icon className="text-pink-700" size={24} />
        </div>
        <h3 className="text-xl font-semibold text-purple-900">{title}</h3>
      </div>
      <p className="text-gray-700">{description}</p>
    </motion.div>
  );
};

const EmergencyBanner = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.8, delay: 1.2 }}
    className="bg-red-500 py-2 px-4 rounded-lg mt-8 flex items-center text-white"
  >
    <Phone className="mr-2" size={20} />
    <span className="font-medium">Emergency? Call Helpline: </span>
    <span className="font-bold ml-2">1800-XXX-XXXX</span>
  </motion.div>
);

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-indigo-100 text-purple-900">
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          <h1 className="text-5xl font-bold mb-4 text-purple-800">Your Safety is Our Priority</h1>
          <p className="text-xl mb-8 text-purple-700">
            ShieldHer empowers women with safety tools, community support, and resources to navigate their world with confidence.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Link to="/register">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-pink-600 py-3 px-8 rounded-lg shadow-lg hover:bg-pink-700 font-semibold text-lg flex items-center text-white"
              >
                Get Started
                <ChevronRight className="ml-2" size={20} />
              </motion.button>
            </Link>
            <Link to="/login">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-purple-600 py-3 px-8 rounded-lg shadow-lg hover:bg-purple-700 font-semibold text-lg text-white"
              >
                Sign In
              </motion.button>
            </Link>
          </div>
          
          <EmergencyBanner />
        </motion.div>
      </div>

      {/* Features Section */}
      <div className="py-16 px-4 bg-purple-100 bg-opacity-70">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-3xl font-bold text-center mb-12 text-purple-800"
          >
            How ShieldHer Protects You
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
            <FeatureCard 
              icon={Bell}
              title="Emergency Alerts"
              description="Send your location and alert to emergency contacts with a single tap in critical situations."
              delay={0.4}
            />
            <FeatureCard 
              icon={Shield}
              title="Harassment Reporting"
              description="Document and report incidents of harassment with our secure and confidential reporting system."
              delay={0.6}
            />
            <FeatureCard 
              icon={FileText}
              title="Safety Resources"
              description="Access guides, legal information, and support services tailored to your location and situation."
              delay={0.8}
            />
          </div>
        </div>
      </div>

      {/* Testimonial Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="py-12 px-4 bg-pink-50"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-semibold mb-6 text-purple-800">Trusted by Women Across the Country</h2>
          <blockquote className="text-lg italic mb-6 text-purple-700">
            "ShieldHer gave me the confidence to navigate my daily commutes with peace of mind. 
            The emergency alert feature has been invaluable during late-night travel."
          </blockquote>
          <p className="font-medium text-purple-900">— Sarah T., Community Member</p>
        </div>
      </motion.div>

      {/* Footer */}
      <footer className="py-8 px-6 bg-white bg-opacity-70">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <Shield className="mr-2 text-pink-600" size={24} />
            <span className="text-xl font-bold text-purple-800">ShieldHer</span>
          </div>
          <div className="flex space-x-8">
            <Link to="/privacy" className="text-purple-700 hover:text-pink-600 transition">Privacy Policy</Link>
            <Link to="/terms" className="text-purple-700 hover:text-pink-600 transition">Terms of Service</Link>
            <Link to="/help" className="text-purple-700 hover:text-pink-600 transition">Help Center</Link>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-6 text-center text-sm text-gray-600">
          © {new Date().getFullYear()} ShieldHer. All rights reserved. Created with care for women's safety.
        </div>
      </footer>
    </div>
  );
};

export default Home;