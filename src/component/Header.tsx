'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiMenu, FiX, FiHome, FiInfo, FiDollarSign, FiMapPin, FiPhone, FiGrid } from 'react-icons/fi';

interface HeaderData {
  property_name: string;
  logo: string;
  builder_logo: string;
  favicon: string;
  hero_banner_img: {
    desktop: string[];
    mobile: string[];
  };
  hero_banner_heading: string;
  hero_banner_subheading: string;
  location: string;
  sublocation: string;
  builder_name: string;
  property_type_price_range_text: string;
  property_area_min_max: string;
}

const Header = () => {
  const [data, setData] = useState<HeaderData | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    fetch('https://www.buyindiahomes.in/api/header?website=peakhorizonbyglobalproperties.com')
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.error('Error fetching header data:', err));

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!data) return <div className="flex justify-center items-center h-16 bg-gray-900"><div className="loader"></div></div>;

  return (
    <header className="relative w-full text-white font-sans">
      {/* Hero Banner */}
      <div className="relative w-full h-screen flex items-center justify-center">
        <div className="absolute inset-0 bg-black">
          <Image
            src={data.hero_banner_img.desktop[0]}
            alt={data.property_name}
            layout="fill"
            objectFit="cover"
            className="opacity-70"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-transparent"></div>
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 text-white drop-shadow-xl bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
            {data.hero_banner_heading}
          </h1>
          <h2 className="text-lg md:text-2xl text-yellow-400 drop-shadow-lg uppercase tracking-wide font-medium">
            {data.hero_banner_subheading}
          </h2>
          <p className="mt-2 text-lg md:text-xl text-gray-200 font-light">
            {data.location} - {data.sublocation}
          </p>
          <p className="mt-1 text-lg md:text-xl text-gray-200 font-light">
            {data.property_type_price_range_text} | {data.property_area_min_max}
          </p>
          <Link href="#enquire" className="mt-8 bg-gradient-to-r from-yellow-500 to-orange-600 hover:scale-105 transform transition-all duration-300 text-white px-8 py-3 rounded-full font-semibold text-lg shadow-xl">
            Enquire Now
          </Link>
        </div>
      </div>

      {/* Navigation Bar - Compact and Modern */}
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'h-16 bg-black/90 backdrop-blur-md' : 'h-20 bg-gradient-to-b from-black/80 to-transparent'
        }`}>
        <div className="container mx-auto flex items-center justify-between h-full px-4">
          <Link href="/" className="flex items-center">
            <Image
              src={data.logo}
              alt={data.property_name}
              width={80}
              height={20}
              className={`transition-all duration-300 ${scrolled ? 'scale-90' : 'scale-100'} max-w-[120px]`}
              objectFit="contain" // This ensures the logo maintains its aspect ratio while resizing
            />
          </Link>

          <div className="hidden md:flex space-x-6 text-sm font-medium">
            {[
              { href: 'AmenitiesSection', label: 'AmenitiesSection', icon: <FiInfo className="mr-1" /> },
              { href: 'BanksSection', label: 'BanksSection', icon: <FiDollarSign className="mr-1" /> },
              { href: 'FloorPlans', label: 'FloorPlans', icon: <FiMapPin className="mr-1" /> },
              { href: 'Footer', label: 'Contact', icon: <FiPhone className="mr-1" /> },
              { href: 'UnitLayouts', label: 'Layouts', icon: <FiGrid className="mr-1" /> },
            ].map((item, index) => (
              <a
                key={index}
                href={`#${item.href}`}
                onClick={(e) => handleSmoothScroll(e, item.href)}
                className="flex items-center text-gray-200 hover:text-yellow-400 transition-colors py-1 px-2 rounded hover:bg-white/10 cursor-pointer"
              >
                {item.icon}
                {item.label}
              </a>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <Link
              href="#enquire"
              className="hidden md:block bg-yellow-500 hover:bg-yellow-600 text-black font-medium text-sm px-4 py-2 rounded-full transition-colors"
            >
              Enquire
            </Link>

            <button
              className="md:hidden text-white text-xl bg-black/30 p-2 rounded-full hover:bg-black/50 transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu - Modern Slide-in */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 md:hidden bg-black/50 backdrop-blur-sm">
          <div className="absolute right-0 top-0 h-full w-64 bg-gray-900 shadow-2xl transform transition-transform animate-slide-in">
            <div className="flex justify-end p-4">
              <button
                onClick={() => setMenuOpen(false)}
                className="text-gray-400 hover:text-white"
                aria-label="Close menu"
              >
                <FiX size={24} />
              </button>
            </div>
            <div className="px-6 py-4">
              <Image
                src={data.logo}
                alt={data.property_name}
                width={120}
                height={40}
                className="mb-8"
                objectFit="contain"
              />
              <ul className="space-y-6">
                {[
                  { href: 'AmenitiesSection', label: 'AmenitiesSection', icon: <FiInfo className="mr-1" /> },
                  { href: 'BanksSection', label: 'BanksSection', icon: <FiDollarSign className="mr-1" /> },
                  { href: 'FloorPlans', label: 'FloorPlans', icon: <FiMapPin className="mr-1" /> },
                  { href: 'Footer', label: 'Contact', icon: <FiPhone className="mr-1" /> },
                  { href: 'UnitLayouts', label: 'Layouts', icon: <FiGrid className="mr-1" /> },
                ].map((item, index) => (
                  <li key={index}>
                    <Link
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center text-gray-300 hover:text-yellow-400 transition-colors"
                    >
                      <span className="mr-3">{item.icon}</span>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-10 pt-6 border-t border-gray-700">
                <Link
                  href="#enquire"
                  onClick={() => setMenuOpen(false)}
                  className="block text-center bg-gradient-to-r from-yellow-500 to-orange-600 text-white font-medium py-3 px-6 rounded-lg"
                >
                  Enquire Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add global styles for animations */}
      <style jsx global>{`
        @keyframes slide-in {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out forwards;
        }
        .loader {
          border: 3px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          border-top: 3px solid #fff;
          width: 24px;
          height: 24px;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </header>
  );
};

export default Header;
