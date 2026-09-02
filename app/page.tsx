"use client";

import { Hero } from '@/components/hero';
import { Footer } from '@/components/footer';
import { motion } from 'framer-motion';
import { Gallery } from '@/components/gallery';

export default function Home() {
  return (
    <main className="min-h-screen bg-royal-dark text-royal-cream">
      <Hero />

      {/* Intro line. Lifted out of the hero so the fold is just the heading,
          the donate button and the frame layout. */}
      <section className="bg-royal-dark px-6 pb-4 pt-12">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-4xl text-center text-lg leading-relaxed text-royal-cream/85 md:text-xl"
        >
          Hands-on camps, VEX teams, and inclusive pathways into STEM for students worldwide.
          We teach <span className="font-semibold text-royal-red">engineering fundamentals</span>,
          build <span className="font-bold">competitive robot teams</span>, and unlock{' '}
          <span className="font-semibold text-royal-red">creative problem solving</span>.
        </motion.p>
      </section>

      {/* Photo Gallery Section */}
      <section className="bg-royal-dark py-12">
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
