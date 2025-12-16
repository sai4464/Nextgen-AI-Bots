"use client";

import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-royal-cream/8 mt-12 bg-royal-dark">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex items-center justify-between text-sm text-royal-cream/70"
        >
          <div className="flex items-center gap-3">
            <div>© NextGen AI BOTS</div>
          </div>
          
          <div className="flex items-center gap-4">
            <a href="#privacy" className="hover:text-royal-red transition-colors">Privacy</a>
            <a href="#contact" className="hover:text-royal-red transition-colors">Contact</a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
