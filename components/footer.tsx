"use client";

import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-gray-200 py-12 border-t border-cyan-500/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-8"
        >
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-heading font-bold mb-2 text-cyan-400">NextGen AI BOTS Inc</h3>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Empowering the next generation of robotics and AI innovators through hands-on education and inclusive STEM programs.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap justify-center items-center gap-6 text-sm">
            <a 
              href="#about" 
              className="text-gray-400 hover:text-cyan-400 transition-colors"
            >
              About
            </a>
            <a 
              href="#mission" 
              className="text-gray-400 hover:text-cyan-400 transition-colors"
            >
              Mission
            </a>
            <a 
              href="#programs" 
              className="text-gray-400 hover:text-cyan-400 transition-colors"
            >
              Programs
            </a>
            <a 
              href="#vex" 
              className="text-gray-400 hover:text-cyan-400 transition-colors"
            >
              VEX Robotics
            </a>
            <a 
              href="#contact" 
              className="text-gray-400 hover:text-cyan-400 transition-colors"
            >
              Contact
            </a>
          </div>

          {/* Copyright and Legal */}
          <div className="space-y-4 border-t border-cyan-500/20 pt-8">
            <p className="text-gray-400 text-sm">
              © {currentYear} NextGen AI BOTS Inc. All rights reserved.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 text-xs text-gray-400">
              <a href="#contact" className="hover:text-cyan-400 transition-colors">
                Privacy Policy
              </a>
              <span className="hidden sm:inline">•</span>
              <a href="#contact" className="hover:text-cyan-400 transition-colors">
                Terms of Service
              </a>
              <span className="hidden sm:inline">•</span>
              <span>
                VEX® is a trademark of its respective owner; program references are for educational purposes.
              </span>
            </div>

            <div className="flex items-center justify-center space-x-1 text-gray-400 text-sm">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-purple-400" />
              <span>for STEM education</span>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}