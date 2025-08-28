"use client";

import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';

const navigation = [
  { name: 'About', href: '#about' },
  { name: 'Mission', href: '#mission' },
  { name: 'Programs', href: '#programs' },
  { name: 'VEX Robotics', href: '#vex' },
  { name: 'Get Involved', href: '#get-involved' },
  { name: 'Contact', href: '#contact' },
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
        ? 'bg-slate-900/90 backdrop-blur-md border-b border-cyan-500/30' 
        : 'bg-transparent'
    }`}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <span className="font-heading font-bold text-xl text-cyan-400">
              NextGen AI BOTS Inc
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`text-sm font-medium transition-all duration-200 hover:text-cyan-300 relative ${
                  activeSection === item.href.substring(1)
                    ? 'text-cyan-400'
                    : 'text-gray-300'
                }`}
              >
                {item.name}
                {activeSection === item.href.substring(1) && (
                  <motion.div
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-cyan-400"
                    layoutId="activeTab"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </a>
            ))}
          </div>

          {/* Controls */}
          <div className="flex items-center space-x-4">

            <Button
              asChild
              className="hidden md:inline-flex bg-cyan-500 hover:bg-cyan-400 text-white rounded-lg shadow-lg shadow-cyan-500/30 transition-all duration-200"
            >
              <a href="#vex">Join a VEX Team</a>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-gray-300 hover:text-cyan-400"
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
              <div className="px-2 pt-2 pb-3 space-y-1 bg-slate-900/95 backdrop-blur-md border-t border-cyan-500/30">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                      activeSection === item.href.substring(1)
                        ? 'text-cyan-400 bg-cyan-500/10'
                        : 'text-gray-300 hover:text-cyan-300 hover:bg-slate-800'
                    }`}
                  >
                    {item.name}
                  </a>
                ))}
                <Button asChild className="w-full mt-4 bg-cyan-500 hover:bg-cyan-400 text-white shadow-lg shadow-cyan-500/30">
                  <a href="#vex" onClick={() => setIsOpen(false)}>
                    Join a VEX Team
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