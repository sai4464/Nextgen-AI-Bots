"use client";

import { Hero } from '@/components/hero';
import { Footer } from '@/components/footer';
import { motion } from 'framer-motion';
import { Gallery } from '@/components/gallery';

export default function Home() {
  return (
    <main className="min-h-screen bg-royal-dark text-royal-cream">
      <Hero />
      
      {/* Photo Gallery Section */}
      <section className="py-16 bg-royal-dark">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-playfair text-royal-cream mb-4 text-center">
              Photo Gallery
            </h2>
            <p className="text-lg text-royal-cream/80 max-w-3xl mx-auto text-center">
              Moments from our programs and events
            </p>
          </motion.div>
          
          <Gallery />
        </div>
      </section>
      
      <Footer />
    </main>
  );
}
