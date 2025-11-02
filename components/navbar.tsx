"use client";

import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

const navigation = [
  { name: 'About', href: '/about' },
  { name: 'Mission', href: '/mission' },
  { name: 'Programs', href: '/programs' },
  { name: 'VEX Robotics', href: '/vex' },
  { name: 'Get Involved', href: '/get-involved' },
  { name: 'Contact', href: '/contact' },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      const sections = navigation.map(item => item.href.substring(1));
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      setActiveSection(currentSection || '');
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-royal-dark/90 backdrop-blur-md border-b border-royal-red/30' 
        : 'bg-transparent'
    }`}>
      <nav className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          {/* Logo and Brand */}
          <a href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <Image 
              src="/assets/nonprofit_logo-removebg-preview.png" 
              alt="NextGen AI Bots Logo" 
              width={48} 
              height={48}
            />
            <div className="text-royal-cream font-semibold font-inter">
              NextGen AI BOTS
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6 text-sm text-royal-cream/80">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`font-inter transition-all duration-200 hover:text-royal-red relative ${
                  activeSection === item.href.substring(1)
                    ? 'text-royal-red'
                    : 'text-royal-cream/80'
                }`}
              >
                {item.name}
                {activeSection === item.href.substring(1) && (
                  <motion.div
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-royal-red"
                    layoutId="activeTab"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </a>
            ))}
          </div>

          {/* Controls */}
          <div className="flex items-center gap-4">
            <Button
              asChild
              className="hidden md:inline-flex royal-button-secondary px-4 py-2 rounded-full border-2 border-royal-cream text-royal-cream font-semibold hover:bg-royal-cream/5 transition"
            >
              <a href="/contact">Contact Us</a>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-royal-cream hover:text-royal-red"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden"
            >
              <div className="px-2 pt-2 pb-3 space-y-1 bg-royal-dark/95 backdrop-blur-md border-t border-royal-red/30">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                      activeSection === item.href.substring(1)
                        ? 'text-royal-red bg-royal-red/10'
                        : 'text-royal-cream/80 hover:text-royal-red hover:bg-royal-dark/50'
                    }`}
                  >
                    {item.name}
                  </a>
                ))}
                <Button asChild className="w-full mt-4 royal-button-primary px-4 py-2 rounded-full">
                  <a href="/contact" onClick={() => setIsOpen(false)}>
                    Contact Us
                  </a>
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
