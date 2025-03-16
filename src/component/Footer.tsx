'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface SocialIcon {
  id: number;
  social_url: string;
  social_icon: string;
  social_order: number;
}

interface Settings {
  footer_address: string;
  footer_email: string;
  footer_phone: string;
  footer_copyright: string;
  footer_disclamer: string;
  footer_agent_rera: string;
  logo: string;
}

interface FooterData {
  social_icons: SocialIcon[];
  g_setting: Settings;
}

const Footer = () => {
  const [footerData, setFooterData] = useState<FooterData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://www.buyindiahomes.in/api/footer?website=peakhorizonbyglobalproperties.com');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setFooterData(data);
      } catch (error) {
        console.error('Error fetching footer data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading && !footerData) {
    return (
      <div className="flex justify-center items-center h-40 bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!footerData) {
    return <div className="bg-gray-900 p-8 text-center text-white">Unable to load footer content</div>;
  }

  // Sort social icons by order
  const sortedSocialIcons = [...footerData.social_icons].sort((a, b) => a.social_order - b.social_order);

  return (
    <footer id='Footer' className="bg-gray-900 text-gray-200">
      {/* Top Section with Logo and Social Links */}
      <div className="container mx-auto px-6 pt-10">
        <div className="flex flex-col md:flex-row justify-between items-center border-b border-gray-700 pb-8">
          {/* Logo */}
          <div className="mb-6 md:mb-0">
            {footerData.g_setting.logo && (
              <img 
                src={footerData.g_setting.logo} 
                alt="Logo" 
                className="h-12 object-contain"
              />
            )}
          </div>
          
          {/* Social Icons */}
          <div className="flex space-x-5">
            {sortedSocialIcons.map((icon) => (
              <motion.a
                key={icon.id}
                href={icon.social_url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 hover:bg-blue-700 text-white p-3 rounded-full transition-colors duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <i className={`${icon.social_icon} text-xl`}></i>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
      
      {/* Main Footer Content */}
      <div className="container mx-auto px-6 py-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Contact Us */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-white relative inline-block after:content-[''] after:absolute after:w-1/2 after:h-1 after:bg-blue-600 after:bottom-0 after:left-0 pb-2">
              Contact Us
            </h3>
            <ul className="space-y-4">
              {footerData.g_setting.footer_address && (
                <li className="flex items-start">
                  <i className="fas fa-map-marker-alt mt-1 mr-3 text-blue-500"></i>
                  <span>{footerData.g_setting.footer_address}</span>
                </li>
              )}
              {footerData.g_setting.footer_email && (
                <li className="flex items-center">
                  <i className="fas fa-envelope mr-3 text-blue-500"></i>
                  <a 
                    href={`mailto:${footerData.g_setting.footer_email}`} 
                    className="hover:text-blue-400 transition-colors duration-300"
                  >
                    {footerData.g_setting.footer_email}
                  </a>
                </li>
              )}
              {footerData.g_setting.footer_phone && (
                <li className="flex items-center">
                  <i className="fas fa-phone-alt mr-3 text-blue-500"></i>
                  <a 
                    href={`tel:${footerData.g_setting.footer_phone}`} 
                    className="hover:text-blue-400 transition-colors duration-300"
                  >
                    +{footerData.g_setting.footer_phone}
                  </a>
                </li>
              )}
              {footerData.g_setting.footer_agent_rera && (
                <li className="flex items-center">
                  <i className="fas fa-id-card mr-3 text-blue-500"></i>
                  <span>RERA: {footerData.g_setting.footer_agent_rera}</span>
                </li>
              )}
            </ul>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-white relative inline-block after:content-[''] after:absolute after:w-1/2 after:h-1 after:bg-blue-600 after:bottom-0 after:left-0 pb-2">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {footerData.g_setting.footer_address && (
                <li>
                  <a href="/" className="hover:text-blue-400 transition-colors duration-300 flex items-center">
                    <i className="fas fa-chevron-right mr-2 text-sm text-blue-500"></i>
                    Home
                  </a>
                </li>
              )}
              <li>
                <a href="/properties" className="hover:text-blue-400 transition-colors duration-300 flex items-center">
                  <i className="fas fa-chevron-right mr-2 text-sm text-blue-500"></i>
                  Properties
                </a>
              </li>
              <li>
                <a href="/about" className="hover:text-blue-400 transition-colors duration-300 flex items-center">
                  <i className="fas fa-chevron-right mr-2 text-sm text-blue-500"></i>
                  About Us
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-blue-400 transition-colors duration-300 flex items-center">
                  <i className="fas fa-chevron-right mr-2 text-sm text-blue-500"></i>
                  Contact
                </a>
              </li>
              <li>
                <a href="/privacy-policy" className="hover:text-blue-400 transition-colors duration-300 flex items-center">
                  <i className="fas fa-chevron-right mr-2 text-sm text-blue-500"></i>
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
          
          {/* Disclaimer */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-white relative inline-block after:content-[''] after:absolute after:w-1/2 after:h-1 after:bg-blue-600 after:bottom-0 after:left-0 pb-2">
              Disclaimer
            </h3>
            <p className="text-sm leading-relaxed opacity-90">
              {footerData.g_setting.footer_disclamer}
            </p>
            
            {/* Newsletter Subscription Form */}
            <form className="mt-6">
              <h4 className="text-lg font-semibold mb-3 text-white">Subscribe to Newsletter</h4>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your Email" 
                  className="py-2 px-4 bg-gray-800 text-white rounded-l-lg focus:outline-none flex-grow"
                />
                <button 
                  type="submit" 
                  className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-r-lg transition-colors duration-300"
                >
                  <i className="fas fa-paper-plane"></i>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      
      {/* Copyright Section */}
      <div className="bg-gray-950 py-4">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm opacity-80">
              {footerData.g_setting.footer_copyright}
            </p>
            
            <div className="mt-4 md:mt-0">
              <a href="/terms" className="text-sm opacity-80 hover:text-blue-400 mr-4 transition-colors duration-300">
                Terms & Conditions
              </a>
              <a href="/privacy" className="text-sm opacity-80 hover:text-blue-400 transition-colors duration-300">
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
